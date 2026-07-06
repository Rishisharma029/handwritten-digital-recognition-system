import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ConfidenceMeter from "../components/ConfidenceMeter";
import ExportButton from "../components/ExportButton";
import { prepareExportData } from "../services/export";

export default function Results() {
  const location = useLocation();
  const result = location.state?.result;
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div style={{ maxWidth:"560px", margin:"80px auto", padding:"48px 40px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"20px", textAlign:"center", animation:"bounce-in 0.45s ease both" }}>
        <div style={{ fontSize:"64px", marginBottom:"20px", animation:"float 3s ease-in-out infinite" }}>📭</div>
        <h2 style={{ fontSize:"22px", fontWeight:700, color:"#f1f5f9", marginBottom:"12px" }}>No Results Yet</h2>
        <p style={{ color:"#64748b", lineHeight:"1.7", marginBottom:"32px" }}>
          Upload a handwritten image and run OCR to see results here.<br/>
          Results are lost on page refresh — re-upload to process again.
        </p>
        <Link to="/upload" style={{
          display:"inline-flex", alignItems:"center", gap:"8px",
          padding:"14px 28px", background:"linear-gradient(135deg,#6366f1,#4f46e5)",
          color:"#fff", borderRadius:"12px", fontWeight:700, fontSize:"15px",
          boxShadow:"0 6px 20px rgba(99,102,241,0.35)", textDecoration:"none",
          transition:"all 0.2s",
        }}>↑ Upload an Image</Link>
      </div>
    );
  }

  const {
    extracted_text = "", text = extracted_text,
    confidence = 0, engine = "Unknown",
    processing_time = 0, language = "English",
    filename = "ocr_result",
  } = result;

  const exportData = prepareExportData(result, filename);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { alert("Unable to copy."); }
  };

  const stats = [
    { label:"Engine",          value: engine,                    icon:"⚙", color:"#818cf8" },
    { label:"Language",        value: language,                  icon:"🌐", color:"#34d399" },
    { label:"Processing Time", value: `${processing_time}s`,     icon:"⏱", color:"#fbbf24" },
    { label:"Characters",      value: text.length.toLocaleString(), icon:"#", color:"#f472b6" },
    { label:"Words",           value: text.split(/\s+/).filter(Boolean).length.toLocaleString(), icon:"W", color:"#60a5fa" },
    { label:"Lines",           value: text.split("\n").filter(Boolean).length.toLocaleString(), icon:"≡", color:"#a78bfa" },
  ];

  return (
    <div style={{ maxWidth:"1000px", margin:"0 auto", padding:"32px 24px", animation:"fadeIn 0.4s ease both" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"32px", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <h1 style={{ fontSize:"28px", fontWeight:800, color:"#f1f5f9", marginBottom:"4px" }}>OCR Results</h1>
          <p style={{ color:"#64748b", fontSize:"14px" }}>{filename}</p>
        </div>
        <Link to="/upload" style={{
          padding:"10px 20px", background:"rgba(255,255,255,0.05)",
          border:"1px solid rgba(255,255,255,0.1)", color:"#94a3b8",
          borderRadius:"10px", fontWeight:600, fontSize:"14px", textDecoration:"none",
          transition:"all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.color="#f1f5f9"; e.currentTarget.style.background="rgba(255,255,255,0.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.color="#94a3b8"; e.currentTarget.style.background="rgba(255,255,255,0.05)"; }}
        >+ New Upload</Link>
      </div>

      {/* Stats grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(145px,1fr))", gap:"12px", marginBottom:"24px" }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:"14px", padding:"16px",
            transition:"all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}
          >
            <div style={{ fontSize:"20px", marginBottom:"8px" }}>
              <span style={{ fontFamily:"monospace", color:s.color, fontWeight:700, fontSize:"16px" }}>{s.icon}</span>
            </div>
            <div style={{ fontSize:"20px", fontWeight:800, color:"#f1f5f9", marginBottom:"4px" }}>{s.value}</div>
            <div style={{ fontSize:"12px", color:"#475569", fontWeight:500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Confidence */}
      <div style={{ marginBottom:"24px" }}>
        <ConfidenceMeter confidence={confidence} />
      </div>

      {/* Extracted Text */}
      <div style={{
        background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:"16px", overflow:"hidden", marginBottom:"24px",
      }}>
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"14px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)",
          background:"rgba(255,255,255,0.02)",
        }}>
          <span style={{ fontWeight:600, fontSize:"14px", color:"#94a3b8" }}>Extracted Text</span>
          <button onClick={copyText} style={{
            display:"flex", alignItems:"center", gap:"6px",
            padding:"6px 14px", borderRadius:"8px", fontSize:"13px", fontWeight:600,
            background: copied ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
            border: copied ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.1)",
            color: copied ? "#4ade80" : "#94a3b8",
            cursor:"pointer", transition:"all 0.2s",
          }}>
            {copied ? "✓ Copied!" : "⎘ Copy"}
          </button>
        </div>
        <textarea
          value={text} readOnly
          style={{
            width:"100%", minHeight:"280px", padding:"20px 24px",
            background:"transparent", border:"none", outline:"none", resize:"vertical",
            fontFamily:"'JetBrains Mono', 'Courier New', monospace",
            fontSize:"14px", lineHeight:"1.8", color:"#e2e8f0",
          }}
        />
      </div>

      {/* Export */}
      <ExportButton exportData={exportData} />
    </div>
  );
}
