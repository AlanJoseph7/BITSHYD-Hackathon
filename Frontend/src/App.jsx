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

    await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });
  };

  const handleGenerateUrl = async () => {
    if (!file) return alert("Please upload a file before generating the URL.");

    const response = await fetch(`http://localhost:5000/generate-url?filename=${file.name}`);
    const data = await response.json();
    setFileUrl(data.signed_url);
  };

  return (
    <div>
      <h1>School Security File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleGenerateUrl}>Get File URL</button>
      {fileUrl && <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download File</a>}
    </div>
  );
}

export default App;
