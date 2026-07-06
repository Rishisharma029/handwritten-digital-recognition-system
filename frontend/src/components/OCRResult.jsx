import React from "react";

import ConfidenceMeter from "./ConfidenceMeter";
import ExportButton from "./ExportButton";
import { prepareExportData } from "../services/export";

const OCRResult = ({ result }) => {
  if (!result) return null;

  const {
    extracted_text = "",
    text = extracted_text,
    confidence = 0,
    engine = "Unknown",
    processing_time = 0,
    language = "English",
    filename = "ocr_result",
  } = result;

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
    } catch (error) {
      console.error(error);
      alert("Unable to copy text.");
    }
  };

  const exportData = prepareExportData(result, filename);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "25px",
        background: "#ffffff",
        borderRadius: "15px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.12)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>OCR Result</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <InfoCard title="OCR Engine" value={engine} />
        <InfoCard title="Language" value={language} />
        <InfoCard title="Processing Time" value={`${processing_time} sec`} />
        <InfoCard title="Characters" value={text.length} />
      </div>

      <ConfidenceMeter confidence={confidence} />

      <div style={{ marginTop: "30px" }}>
        <h3>Extracted Text</h3>
        <textarea
          value={text}
          readOnly
          style={{
            width: "100%",
            height: "300px",
            marginTop: "15px",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            resize: "vertical",
            fontSize: "15px",
            lineHeight: "1.6",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginTop: "20px" }}>
        <button
          onClick={copyText}
          style={{
            padding: "12px 22px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📋 Copy Text
        </button>

        <ExportButton exportData={exportData} />
      </div>
    </div>
  );
};

const InfoCard = ({ title, value }) => (
  <div
    style={{
      background: "#f8fafc",
      padding: "15px",
      borderRadius: "10px",
      textAlign: "center",
      border: "1px solid #e5e7eb",
    }}
  >
    <h4 style={{ marginBottom: "8px", color: "#6b7280" }}>{title}</h4>
    <div style={{ fontWeight: "bold", fontSize: "18px" }}>{value}</div>
  </div>
);

export default OCRResult;