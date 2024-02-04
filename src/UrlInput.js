import React, {useState} from 'react';
import API from './api';
import "./App.css";

export default function UrlInput({closeModal,setUrl}){
    const [inputValue, setInputValue] = useState('');
    const [response,setResponse] = useState('Enter RSTP Url')

    const handleInputChange = (e) =>{
        setInputValue(e.target.value);
    }

    const handleModalSubmit = () => {
        // Handle the submission logic here
        console.log('Input Value:', inputValue);
        setUrl(inputValue);
        API.post(`rstp`,{url: inputValue}).then((res) => {
         console.log(res.data);
         setResponse(res.data);
        });
        setInputValue('');
        closeModal();
      };
    return (
        <div className='modal-overlay'>
            <div className='modal'>
          <h2>{response}</h2>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter something..."
          />
          <button onClick={handleModalSubmit}>Submit</button>
          <button onClick={closeModal}>Cancel</button>
         
          </div>
        </div>
    )
}
