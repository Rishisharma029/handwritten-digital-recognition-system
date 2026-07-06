import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ImagePreview from "../components/ImagePreview";
import Loader from "../components/Loader";
import { recognizeDocument } from "../services/api";
import { loadSettings, saveSettings } from "../utils/settings";

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [engine, setEngine] = useState(() => {
    const settings = loadSettings();
    return settings.engine || "TrOCR";
  });

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview("");
  };

  const recognize = async () => {
    if (!file) {
      alert("Please select an image or PDF.");
      return;
    }

    const settings = loadSettings();

    try {
      setLoading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("engine", engine);
      formData.append("language", settings.language);
      formData.append("gpu", String(settings.gpuMode));
      formData.append("auto_save", String(settings.autoSave));
      
      // Sync engine back to settings
      saveSettings({ ...settings, engine });

      const response = await recognizeDocument(formData, {
        engine: engine,
        onUploadProgress: (event) => {
          if (!event.total) return;
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      setProgress(100);
      navigate("/results", { state: { result: response.data } });
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.detail ||
        "OCR failed. Please make sure the backend is running.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "30px" }}>Upload Document</h1>

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

        {/* Engine Selection Dropdown */}
        <div style={{ marginTop: "20px", marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#334155" }}>
            Select OCR Engine:
          </label>
          <select
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#fff",
              fontSize: "15px",
              width: "100%",
              maxWidth: "360px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="TrOCR">TrOCR (Recommended for Handwriting)</option>
            <option value="EasyOCR">EasyOCR (Standard printed text)</option>
            <option value="Tesseract">Tesseract (Standard printed text)</option>
          </select>
        </div>

        {preview && <ImagePreview file={file} imageUrl={preview} onRemove={removeFile} />}

        <button
          onClick={recognize}
          disabled={loading || !file}
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            border: "none",
            borderRadius: "8px",
            background: loading || !file ? "#94a3b8" : "#2563eb",
            color: "#fff",
            cursor: loading || !file ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Processing..." : "Start OCR"}
        </button>
      </div>

      <Loader loading={loading} progress={progress} message="Recognizing handwriting..." />
    </div>
  );
};

export default Upload;
