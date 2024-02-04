from flask import Flask,request, Response
import cv2
import numpy as np
import threading
from queue import Queue
import time
import pyaudio
from pydub import AudioSegment
from pydub.playback import play
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Audio configuration
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
p = pyaudio.PyAudio()
audio_stream = p.open(format=FORMAT,
                      channels=CHANNELS,
                      rate=RATE,
                      input=True,
                      frames_per_buffer=CHUNK)

# Use a queue to communicate between the video streaming thread and Flask
frame_queue = Queue(maxsize=30)
is_streaming = True
volume = 50

def video_stream(sourcePath):
    camera = cv2.VideoCapture(sourcePath)
    while True:
        success, frame = camera.read()
        if not success:
            break

        # Read audio frame
        audio_frame = audio_stream.read(CHUNK)
        audio_array = np.frombuffer(audio_frame, dtype=np.int16)

        # Process audio data if needed

        # Encode video frame
        ret, jpeg = cv2.imencode('.jpg', frame)

        # Put both video and audio frames into the queue
        frame_queue.put((jpeg.tobytes(), audio_array))
    
    camera.release()

def play_audio(audio_array):
    
    audio_data = audio_array.tobytes()
    
    audio_segment = AudioSegment(
        audio_data, 
        sample_width=p.get_sample_size(FORMAT),
        channels=CHANNELS,
        frame_rate=RATE
    )
    play(audio_segment)

def gen_frames():
    while True:
        if is_streaming:
            frame, audio_array = frame_queue.get()
            
            # Play audio
            audio_thread = threading.Thread(target=play_audio, args=(audio_array,))
            audio_thread.start()

            # Yield video frame
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else:
            time.sleep(0.1)


@app.route('/toggle', methods=['GET'])
def toggle_stream():
    global is_streaming
    is_streaming = not is_streaming
    return  Response('Stream toggled')


@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/rstp', methods=['POST'])
def url_submitted():
    data = request.get_json() 
    url = data.get('url')

    video_thread = threading.Thread(target=video_stream, args=(url,))
    video_thread.daemon = True
    video_thread.start()

    return Response("Video streaming started for the provided URL.")

@app.route('/volume', methods=['POST'])
def set_volume():
    data = request.get_json()
    new_volume = data.get('volume')



if __name__ == '__main__':
    app.run(debug=True, port=5000)
