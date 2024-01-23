// UploadForm.js

import React, { useState } from 'react';
import axios from 'axios';


const UploadForm = ({ id, onUpload, type }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`images`, file);
      });

      // Make a POST request to the server
      const response = await axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/upload/${type}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Access the generated image URLs from the server response
      const { imageUrls } = response.data;

      // Call the onUpload callback with the image URLs
      onUpload(id, imageUrls);
    } catch (error) {
      console.error('Error uploading images:', error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <div className="container">
      <button onClick={handleUpload}>Upload</button>
      {imageUrls.map((url, index) => (
        <img key={index} src={url} alt={`Uploaded ${index + 1}`} />
      ))}
      </div>
    </div>
  );
};

export default UploadForm;
