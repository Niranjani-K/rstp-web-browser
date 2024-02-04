
import "./App.css";
import API from "./api"
import axios from 'axios';
import { useState,useEffect } from 'react';

export default function VideoPlayer({videoUrl,overlay}){
 const [isPlaying, setIsPlaying] = useState(true);
 const [volume, setVolume] = useState(50); 

    useEffect ( () => {

    },[overlay])
 const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    // Update the volume using API.post('volume')
    API.post('volume', { volume: newVolume }).then(res => {
        console.log(res.data);
    }).catch(error => {
        console.error("Error making Axios request:", error);
    });
}

    const handleToggle =  () => {
        setIsPlaying(!isPlaying);
        API.get('toggle').then(res => {
            console.log(res.data);
        }).catch(error => {
            console.error("Error making Axios request:", error);
         });
    }

    const getOverlayStyle = () => {
        const positions = {
          'top-left': { top: 0, left: 0 },
          'top-right': { top: 0, right: 0 },
          'bottom-left': { bottom: 0, left: 0 },
          'bottom-right': { bottom: 0, right: 0 },
          'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        };
      
        const positionStyle = positions[overlay.position] || {};
      
        return {
          position: 'absolute',
          ...positionStyle,
          fontSize: `${overlay.fontSize}`,
          color: overlay.fontColor,
          display: overlay.inputText.length > 0 ? 'block' : 'none',
        };
      };
      
    return(
        <div className="container-wrapper">
             <div className="controls">
                <button className = 'toggleButton' onClick= {() => handleToggle()}>{ isPlaying? "Pause" : "Play"}</button>
                <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => handleVolumeChange(e.target.value)}
                />
             </div>
        <div className="container">
        {/* <img  src="http://localhost:5000/video_feed" width="640" height="480" /> */}
        <img className="image" src="https://www.example.com/image1.jpg" width="640" height="480" />
        {
            overlay.inputText.length > 0 ? 
            <div style={getOverlayStyle()}>
                <span>{overlay.inputText}</span>
            </div>
            :
            null
        }
        </div>
        </div>
    )
}


      