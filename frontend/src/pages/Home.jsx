import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      title: "Handwritten OCR",
      description: "Recognize handwritten notes with high accuracy."
    },
    {
      title: "Printed Text OCR",
      description: "Extract text from printed documents and books."
    },
    {
      title: "Multiple OCR Engines",
      description: "EasyOCR, TrOCR, PaddleOCR and Tesseract."
    },
    {
      title: "Export Results",
      description: "Export OCR results as PDF, DOCX, TXT and JSON."
    }
  ];

  const engines = [
    "EasyOCR",
    "TrOCR",
    "PaddleOCR",
    "Tesseract"
  ];

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px"
      }}
    >
      {/* Hero */}

      <div
        style={{
          textAlign: "center",
          padding: "70px 20px",
          background: "#2563eb",
          color: "#fff",
          borderRadius: "20px"
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "20px"
          }}
        >
          Handwritten Digital Recognition System
        </h1>

        <p
          style={{
            fontSize: "20px",
            maxWidth: "850px",
            margin: "0 auto 40px"
          }}
        >
          AI-powered OCR platform capable of recognizing handwritten
          and printed documents using multiple state-of-the-art OCR
          engines.
        </p>

        <Link to="/upload">
          <button
            style={{
              padding: "15px 35px",
              fontSize: "18px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              background: "#ffffff",
              color: "#2563eb",
              fontWeight: "bold"
            }}
          >
            Start Recognition
          </button>
        </Link>
      </div>

      {/* Statistics */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
          marginTop: "50px"
        }}
      >
        <StatCard title="OCR Engines" value="4" />
        <StatCard title="Export Formats" value="4" />
        <StatCard title="Supported Images" value="7+" />
        <StatCard title="API Version" value="1.0.0" />
      </div>

      {/* Features */}

      <h2
        style={{
          marginTop: "60px",
          marginBottom: "25px"
        }}
      >
        Features
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px"
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            style={{
              padding: "25px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,.08)"
            }}
          >
            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Workflow */}

      <h2
        style={{
          marginTop: "60px"
        }}
      >
        OCR Workflow
      </h2>

      <div
        style={{
          marginTop: "20px",
          padding: "25px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)"
        }}
      >
        <pre
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "16px"
          }}
        >
{`Upload
   ↓
Preprocessing
   ↓
OCR Engine
   ↓
Post Processing
   ↓
Export
`}
        </pre>
      </div>

      {/* OCR Engines */}

      <h2
        style={{
          marginTop: "60px"
        }}
      >
        Supported OCR Engines
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginTop: "20px"
        }}
      >
        {engines.map((engine) => (
          <div
            key={engine}
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "30px",
              fontWeight: "bold"
            }}
          >
            {engine}
          </div>
        ))}
      </div>

      {/* Footer */}

      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          padding: "30px",
          color: "#6b7280"
        }}
      >
        <h3>Handwritten Digital Recognition System</h3>

        <p>
          Built with FastAPI • React • OpenCV • PyTorch • EasyOCR •
          TrOCR
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: "12px",
      padding: "30px",
      textAlign: "center",
      boxShadow: "0 5px 15px rgba(0,0,0,.08)"
    }}
  >
    <h1
      style={{
        color: "#2563eb",
        marginBottom: "10px"
      }}
    >
      {value}
    </h1>

    <p>{title}</p>
  </div>
);

export default Home;