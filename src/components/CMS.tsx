import "../styles/CMS.css";
import React, { useState } from "react";
import plant10 from "../assets/plant10.png";
import plant12 from "../assets/plant12.png";

const CMS: React.FC = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    document: null,
    text: "",
    publicationDate: "",
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      alert("File uploaded successfully!");
    } else {
      setMessage("Please select a file to upload");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.name === 'document' && target.files ? target.files[0] : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="container-input">
          <h1 className="text-login">CMS</h1>
          <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit" className="upload-button">
              Upload
            </button>
            <div>
              <textarea name="text" value={formData.text} onChange={handleChange} placeholder="Enter new content here" required className="cms-box"/>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
      <div>
            <img src={plant10} alt='plant2' className='plant2'/>
        </div>
        <div>
            <img src={plant12} alt='plant3' className='plant3'/>
        </div>
    </div>
  );
}

export default CMS;