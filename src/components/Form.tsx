import '../styles/Form.css';
import React, { useState } from 'react';



function Form() {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event: any) => {
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
                <h1 className='text-login'>Form</h1>
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
       
    </div>

  );
}

export default Form;