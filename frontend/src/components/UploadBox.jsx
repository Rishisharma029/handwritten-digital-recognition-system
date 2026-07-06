import React, { useState } from "react";
import axios from "axios";

import ImagePreview from "../components/ImagePreview";
import Loader from "../components/Loader";
import OCRResult from "../components/OCRResult";

const API_URL = "http://localhost:8000/api/v1";

const Upload = () => {
  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [result, setResult] = useState(null);

  const handleFile = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    setFile(selected);

    setPreview(URL.createObjectURL(selected));

    setResult(null);
  };

  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);

    setPreview("");

    setResult(null);
  };

  const recognize = async () => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    try {
      setLoading(true);

      setProgress(0);

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post(
        `${API_URL}/recognize`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (event) => {
            if (!event.total) return;

            const percent = Math.round(
              (event.loaded * 100) / event.total
            );

            setProgress(percent);
          },
        }
      );

      setResult(response.data);

      setProgress(100);
    } catch (error) {
      console.error(error);

      alert("OCR failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        Upload Document
      </h1>

      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        }}
      >
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.bmp,.tif,.tiff,.webp,.pdf"
          onChange={handleFile}
        />

        {preview && (
          <ImagePreview
            file={file}
            imageUrl={preview}
            onRemove={removeFile}
          />
        )}

        <button
          onClick={recognize}
          disabled={loading || !file}
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Processing..." : "Start OCR"}
        </button>
      </div>

      <Loader
        loading={loading}
        progress={progress}
        message="Recognizing handwriting..."
      />

      <OCRResult
        result={result}
      />
    </div>
  );
};

export default Upload;