import React, { useState } from "react";
import {
  exportToPDF,
  exportToDocx,
  exportToTxt,
  exportToJson,
} from "../services/export";

const ExportButton = ({ exportData }) => {
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState("");

  const handleExport = async (exportFunc, formatName, extension) => {
    try {
      setLoading(true);
      setFormat(formatName);
      const filename = `${exportData.filename}.${extension}`;
      await exportFunc(exportData, filename);
    } catch (error) {
      console.error(error);
      alert(`Export to ${formatName.toUpperCase()} failed.`);
    } finally {
      setLoading(false);
      setFormat("");
    }
  };

  const buttonStyle = {
    padding: "12px 22px",
    background: loading ? "#94a3b8" : "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: loading ? "not-allowed" : "pointer",
    fontSize: "14px",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => handleExport(exportToPDF, "pdf", "pdf")}
        disabled={loading}
        style={buttonStyle}
      >
        📄 Export PDF
      </button>

      <button
        onClick={() => handleExport(exportToDocx, "docx", "docx")}
        disabled={loading}
        style={buttonStyle}
      >
        📝 Export DOCX
      </button>

      <button
        onClick={() => handleExport(exportToTxt, "txt", "txt")}
        disabled={loading}
        style={buttonStyle}
      >
        📃 Export TXT
      </button>

      <button
        onClick={() => handleExport(exportToJson, "json", "json")}
        disabled={loading}
        style={buttonStyle}
      >
        📦 Export JSON
      </button>

      {loading && (
        <span style={{ marginLeft: "10px", color: "#6b7280" }}>
          Exporting to {format.toUpperCase()}...
        </span>
      )}
    </div>
  );
};

export default ExportButton;