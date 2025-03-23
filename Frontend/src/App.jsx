import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file before uploading.");

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/api/upload", {  // Ensure proxy is set up in vite.config.js
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        console.log("Upload Response:", data);
        alert("File uploaded successfully!");
    } catch (error) {
        console.error("Error uploading file:", error);
    }
  };

  const handleGenerateUrl = async () => {
    if (!file) return alert("Please upload a file before generating the URL.");

    try {
        const response = await fetch(`/api/generate-url?filename=${file.name}`);
        const data = await response.json();
        setFileUrl(data.signed_url);
    } catch (error) {
        console.error("Error generating URL:", error);
    }
  };

  return (
    <div>
      <h1>School Security File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleGenerateUrl}>Get File URL</button>
      {fileUrl && (
        <div>
          <p>Download Link:</p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Download File
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
