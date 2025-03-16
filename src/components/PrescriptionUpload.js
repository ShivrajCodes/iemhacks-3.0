import React, { useState } from "react";

const PrescriptionUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  return (
    <div className="upload-card">
      <h2>Upload Prescription</h2>
      <input type="file" onChange={handleFileChange} />
      {file && <p>Selected File: {file.name}</p>}
      <button>Upload</button>
    </div>
  );
};

export default PrescriptionUpload;
