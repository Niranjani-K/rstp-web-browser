
import UrlInput from "./UrlInput";
import './Header.css';

export default function Header({openModal,openOverlay}){

    return(
        <div className="header">
        <button onClick = {openModal}> Enter URL</button>
        <button onClick = {() => openOverlay()}>Overlays</button>
        </div>
    )
}