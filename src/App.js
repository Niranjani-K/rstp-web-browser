import React, {useState,useEffect} from 'react';
import Header from './Header';
import VideoPlayer from './VideoPlayer';
import UrlInput from "./UrlInput";
import TextOverlay from "./TextOverlay";
import './App.css';

function App() {
  const [isShowing, setIsShowing] = useState(false);
  const [addOverlayShowing, setAddOverlayShowing] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [displayText, setDisplayText] = useState({
    inputText: '',
    position: 'center',
    fontSize: '16px',
    fontColor: '#000000',
  });

  const [volume, setVolume] = useState(50); 

  useEffect ( () => {

  },[displayText])

  function openModal(){
    setIsShowing(true);
  }
  function closeModal(){
    setIsShowing(false);
  }
  function openOverlay(){
    setAddOverlayShowing(true);
  }
  function closeOverlay(){
    setAddOverlayShowing(false);
  }


  return (
    <div className="App">
      <Header  openModal = {openModal} openOverlay = {openOverlay} />
      {isShowing && <UrlInput setUrl ={setVideoUrl} closeModal = {closeModal}/>}
      <VideoPlayer videoUrl = {videoUrl} overlay={displayText}/>
      {addOverlayShowing && <TextOverlay displayText={displayText} setDisplayText={setDisplayText} closeOverlay = {closeOverlay}/>}
    </div>
  );
}

export default App;
