import '../styles/Form.css';
import plant4 from '../assets/plant4.png';
import plant5 from '../assets/plant5.png';

import React, { useState } from 'react';

function Form() {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event: { target: { files: React.SetStateAction<null>[]; }; }) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      alert('File uploaded successfully!');
    } else {
      setMessage('Please select a file to upload');
    }
  };

  const handleDownload = () => {
   alert('File downloaded successfully!');
  }
  return (
    <div className='upload-container'>
        <div className='upload-box'>
            <div className='container-input'>
                <h1 className='text-login'>Plant Data</h1>
                
                <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" className='upload-button'>Upload</button>
                </form>
                {message && <p>{message}</p>}
            </div>
            <div className='download'>
              <button onClick ={handleDownload} id = 'download-button' className='download-button'>Download</button>
            </div>
            </div>
        <div>
            <img src={plant4} alt='plant2' className='plant2'/>
        </div>
        <div>
            <img src={plant5} alt='plant3' className='plant3'/>
        </div>
    </div>

  );
}

export default Form;