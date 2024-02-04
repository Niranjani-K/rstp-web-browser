import React, { useState } from 'react';
import "./App.css";

const TextOverlay = ({  displayText,setDisplayText,closeOverlay }) => {
  
    const [overlay,setOverlay] = useState(displayText);

  const handleInputChange = (e) => {
    setOverlay({ ...overlay, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setDisplayText(overlay);
    closeOverlay();
  };

  return (
    <div className='modal-overlay'>
        <div className='modal'>
        <h2>Add Overlay Text</h2>
      <input type="text"
        placeholder="Enter text"
        name="inputText"
        value={overlay.inputText}
        onChange={handleInputChange}
        style={styles.input}
        required
      />
      <label style={styles.label}>
        Position:
        <select name="position" value={overlay.position} onChange={handleInputChange} style={styles.select}>
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="center">Center</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
      </label>
      <label style={styles.label}>
        Font Size:
        <input
          type="text"
          name="fontSize"
          value={overlay.fontSize}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
      </label>
      <label style={styles.label}>
        Font Color:
        <input
          type="color"
          name="fontColor"
          value={overlay.fontColor}
          onChange={handleInputChange}
          style={styles.colorInput}
          required
        />
      </label>
      <button onClick={() => handleSubmit()} style={styles.button}>
        Submit
      </button>
      <button onClick={() => closeOverlay()} style={styles.button}>
        Cancel
      </button>
      </div>
    </div>
  );
};

const styles = {
 
  label: {
    display: 'block',
    margin: '10px 0',
  },
  select: {
    width: '94%',
    padding: '8px',
    fontSize: '16px',
  },
  input: {
    width: '90%',
    padding: '8px',
    fontSize: '16px',
  },
  colorInput: {
    fontSize: '16px',
  },
  displayText: {
    margin: '20px 0',
    fontSize: '24px',
  },
  
};

export default TextOverlay;
