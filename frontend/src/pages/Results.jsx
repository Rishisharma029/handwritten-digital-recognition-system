import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import OCRResult from "../components/OCRResult";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  useEffect(() => {
    if (!result) {
      navigate("/upload", { replace: true });
    }
  }, [result, navigate]);

  if (!result) {
    return null;
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
