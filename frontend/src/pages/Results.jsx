import React from "react";
import { Link, useLocation } from "react-router-dom";

import OCRResult from "../components/OCRResult";

const Results = () => {
  const location = useLocation();
  const result = location.state?.result;

  // No result state — show a friendly prompt instead of 404
  if (!result) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "100px auto",
          padding: "40px",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "56px", marginBottom: "16px" }}>📄</div>
        <h2 style={{ margin: "0 0 12px", color: "#1e293b" }}>No Results Yet</h2>
        <p style={{ color: "#64748b", marginBottom: "28px", lineHeight: "1.6" }}>
          You haven't run any OCR yet, or the page was refreshed and the result
          was lost. Upload a handwritten image to get started.
        </p>
        <Link
          to="/upload"
          style={{
            display: "inline-block",
            padding: "12px 28px",
            background: "#2563eb",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          ⬆️ Upload an Image
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ margin: 0 }}>OCR Results</h1>
        <Link
          to="/upload"
          style={{
            padding: "10px 18px",
            background: "#2563eb",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Recognize Another
        </Link>
      </div>

      <OCRResult result={result} />
    </div>
  );
};

export default Results;
