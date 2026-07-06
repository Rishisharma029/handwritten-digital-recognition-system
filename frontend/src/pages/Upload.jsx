import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { recognizeDocument, health } from "../services/api";
import { loadSettings, saveSettings } from "../utils/settings";

const ENGINES = [
  { value: "TrOCR",     label: "TrOCR",     tag: "Best for Handwriting", color: "#6366f1" },
  { value: "EasyOCR",  label: "EasyOCR",   tag: "Printed Text",         color: "#14b8a6" },
  { value: "Tesseract",label: "Tesseract", tag: "Lightweight",           color: "#f59e0b" },
];

const FORMATS = ["JPG","JPEG","PNG","BMP","TIFF","WEBP","PDF"];

export default function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [backendStatus, setBackendStatus] = useState("checking"); // "ok" | "down" | "checking"

  useEffect(() => {
    health()
      .then(() => setBackendStatus("ok"))
      .catch(() => setBackendStatus("down"));
  }, []);
  const [copied, setCopied] = useState(false);
  const [engine, setEngine] = useState(() => loadSettings().engine || "TrOCR");

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    if (f.type.startsWith("image/")) setPreview(URL.createObjectURL(f));
    else setPreview("");
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null); setPreview(""); setProgress(0);
  };

  const formatSize = (b) => b < 1024*1024 ? `${(b/1024).toFixed(1)} KB` : `${(b/(1024*1024)).toFixed(2)} MB`;

  const recognize = async () => {
    if (!file) return;
    const settings = loadSettings();
    saveSettings({ ...settings, engine });
    try {
      setLoading(true); setProgress(0);
      const fd = new FormData();
      fd.append("file", file);
      fd.append("engine", engine);
      fd.append("language", settings.language || "English");
      fd.append("gpu", String(settings.gpuMode || false));
      fd.append("auto_save", String(settings.autoSave !== false));
      const res = await recognizeDocument(fd, {
        engine,
        onUploadProgress: (ev) => {
          if (ev.total) setProgress(Math.round((ev.loaded * 100) / ev.total));
        },
      });
      setProgress(100);
      navigate("/results", { state: { result: res.data } });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "OCR failed. Is the backend running?");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth:"900px", margin:"0 auto", padding:"32px 24px", animation:"fadeIn 0.4s ease both" }}>
      {/* Header */}
      <div style={{ marginBottom:"24px" }}>
        <h1 style={{ fontSize:"28px", fontWeight:800, color:"#f1f5f9", marginBottom:"8px" }}>
          Upload Document
        </h1>
        <p style={{ color:"#64748b", fontSize:"15px" }}>
          Upload a handwritten image or PDF to begin OCR recognition
        </p>
      </div>

      {/* Backend Status Banner */}
      {backendStatus === "down" && (
        <div style={{
          display:"flex", alignItems:"flex-start", gap:"12px",
          padding:"14px 18px", borderRadius:"12px", marginBottom:"24px",
          background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.25)",
          animation:"fadeIn 0.3s ease both",
        }}>
          <span style={{ fontSize:"20px", flexShrink:0 }}>⚠️</span>
          <div>
            <div style={{ fontWeight:700, fontSize:"14px", color:"#fbbf24", marginBottom:"4px" }}>
              Backend not reachable
            </div>
            <div style={{ fontSize:"13px", color:"#92400e", lineHeight:"1.6" }}>
              The OCR backend is not running or is not accessible from this browser.
              {" "}<strong>GitHub Pages only hosts the static frontend</strong> — to use OCR, start the local
              FastAPI server with <code style={{ background:"rgba(0,0,0,0.3)", padding:"1px 6px", borderRadius:"4px", fontFamily:"monospace", color:"#fcd34d" }}>python -m uvicorn backend.app:app --port 8000</code> on your machine and open{" "}
              <a href="http://localhost:5173" target="_blank" rel="noreferrer" style={{ color:"#fbbf24", textDecoration:"underline" }}>localhost:5173</a> instead.
            </div>
          </div>
        </div>
      )}
      {backendStatus === "ok" && (
        <div style={{
          display:"flex", alignItems:"center", gap:"10px",
          padding:"10px 16px", borderRadius:"10px", marginBottom:"20px",
          background:"rgba(74,222,128,0.06)", border:"1px solid rgba(74,222,128,0.2)",
          animation:"fadeIn 0.3s ease both",
        }}>
          <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 8px #4ade80", animation:"pulse-ring 2s ease infinite" }}/>
          <span style={{ fontSize:"13px", color:"#4ade80", fontWeight:600 }}>Backend connected — ready to recognize</span>
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? "#6366f1" : file ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)"}`,
          borderRadius:"18px",
          padding: file ? "0" : "56px 24px",
          textAlign:"center",
          background: dragging ? "rgba(99,102,241,0.08)" : file ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.02)",
          cursor: file ? "default" : "pointer",
          transition:"all 0.25s",
          overflow:"hidden",
          boxShadow: dragging ? "0 0 0 4px rgba(99,102,241,0.2)" : "none",
        }}
      >
        <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.bmp,.tif,.tiff,.webp,.pdf"
          onChange={(e) => handleFile(e.target.files[0])} style={{ display:"none" }} />

        {!file ? (
          <>
            <div style={{ fontSize:"48px", marginBottom:"16px", animation:"float 3s ease-in-out infinite" }}>🖼️</div>
            <div style={{ fontSize:"18px", fontWeight:600, color:"#f1f5f9", marginBottom:"8px" }}>
              Drop your image here or <span style={{ color:"#818cf8" }}>browse</span>
            </div>
            <div style={{ color:"#475569", fontSize:"13px" }}>
              Supported: {FORMATS.join(" · ")} · Max 10MB
            </div>
          </>
        ) : (
          <div style={{ position:"relative" }}>
            {preview && (
              <img src={preview} alt="preview" style={{
                width:"100%", maxHeight:"360px", objectFit:"contain",
                background:"rgba(0,0,0,0.2)", display:"block",
              }}/>
            )}
            {!preview && (
              <div style={{ padding:"32px", color:"#94a3b8", fontSize:"15px" }}>
                📄 {file.name}
              </div>
            )}
            {/* File info bar */}
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"14px 18px",
              borderTop:"1px solid rgba(255,255,255,0.08)",
              background:"rgba(17,24,39,0.95)",
            }}>
              <div>
                <div style={{ fontWeight:600, fontSize:"14px", color:"#f1f5f9" }}>{file.name}</div>
                <div style={{ fontSize:"12px", color:"#64748b" }}>
                  {file.type || "PDF"} · {formatSize(file.size)}
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); removeFile(); }} style={{
                background:"rgba(244,63,94,0.15)", border:"1px solid rgba(244,63,94,0.3)",
                color:"#f87171", padding:"6px 14px", borderRadius:"8px",
                fontSize:"13px", fontWeight:600, cursor:"pointer", transition:"all 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(244,63,94,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background="rgba(244,63,94,0.15)"}
              >Remove</button>
            </div>
          </div>
        )}
      </div>

      {/* Engine selector */}
      <div style={{ marginTop:"28px" }}>
        <div style={{ fontSize:"13px", fontWeight:600, color:"#94a3b8", marginBottom:"12px", textTransform:"uppercase", letterSpacing:"0.08em" }}>
          OCR Engine
        </div>
        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
          {ENGINES.map(eng => (
            <button key={eng.value} onClick={() => setEngine(eng.value)} style={{
              flex:"1 1 160px",
              padding:"14px 18px",
              borderRadius:"12px",
              border: engine === eng.value ? `1.5px solid ${eng.color}` : "1px solid rgba(255,255,255,0.08)",
              background: engine === eng.value ? `rgba(${eng.value==="TrOCR"?"99,102,241":eng.value==="EasyOCR"?"20,184,166":"245,158,11"},0.12)` : "rgba(255,255,255,0.03)",
              cursor:"pointer",
              textAlign:"left",
              transition:"all 0.2s",
              boxShadow: engine === eng.value ? `0 0 20px rgba(${eng.value==="TrOCR"?"99,102,241":eng.value==="EasyOCR"?"20,184,166":"245,158,11"},0.15)` : "none",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"4px" }}>
                <div style={{
                  width:"8px", height:"8px", borderRadius:"50%",
                  background: engine === eng.value ? eng.color : "#334155",
                  transition:"all 0.2s",
                  boxShadow: engine === eng.value ? `0 0 8px ${eng.color}` : "none",
                }}/>
                <span style={{ fontWeight:700, color: engine === eng.value ? "#f1f5f9" : "#64748b", fontSize:"14px" }}>
                  {eng.label}
                </span>
              </div>
              <div style={{ fontSize:"11px", color:"#475569", paddingLeft:"18px" }}>{eng.tag}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      {loading && (
        <div style={{ marginTop:"24px", animation:"fadeIn 0.3s ease" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
            <span style={{ fontSize:"13px", color:"#94a3b8" }}>Processing with {engine}...</span>
            <span style={{ fontSize:"13px", fontWeight:700, color:"#818cf8" }}>{progress}%</span>
          </div>
          <div style={{ height:"6px", background:"rgba(255,255,255,0.06)", borderRadius:"99px", overflow:"hidden" }}>
            <div style={{
              height:"100%", width:`${progress}%`,
              background:"linear-gradient(90deg,#6366f1,#14b8a6)",
              borderRadius:"99px", transition:"width 0.3s ease",
              boxShadow:"0 0 10px rgba(99,102,241,0.5)",
            }}/>
          </div>
          <div style={{ textAlign:"center", marginTop:"12px", color:"#475569", fontSize:"13px" }}>
            {progress < 50 ? "Uploading image..." : progress < 95 ? "Running OCR recognition..." : "Finalizing results..."}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ marginTop:"28px", display:"flex", gap:"12px", flexWrap:"wrap" }}>
        <button onClick={recognize} disabled={loading || !file} style={{
          flex:"1 1 200px",
          padding:"16px 28px",
          background: loading || !file ? "rgba(99,102,241,0.3)" : "linear-gradient(135deg,#6366f1,#4f46e5)",
          color: loading || !file ? "#475569" : "#fff",
          borderRadius:"12px", fontWeight:700, fontSize:"16px",
          cursor: loading || !file ? "not-allowed" : "pointer",
          border:"none", transition:"all 0.25s",
          boxShadow: loading || !file ? "none" : "0 6px 24px rgba(99,102,241,0.35)",
          display:"flex", alignItems:"center", justifyContent:"center", gap:"10px",
        }}
        onMouseEnter={e => { if(!loading && file) { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(99,102,241,0.5)"; } }}
        onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 24px rgba(99,102,241,0.35)"; }}
        >
          {loading ? (
            <>
              <div style={{ width:"18px", height:"18px", border:"2px solid rgba(255,255,255,0.3)", borderTop:"2px solid #fff", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
              Recognizing...
            </>
          ) : "✦ Start Recognition"}
        </button>

        {!file && (
          <button onClick={() => fileInputRef.current?.click()} style={{
            padding:"16px 28px", borderRadius:"12px",
            background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
            color:"#94a3b8", fontWeight:600, fontSize:"15px", cursor:"pointer",
            transition:"all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.style.color="#f1f5f9"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.color="#94a3b8"; }}
          >Browse Files</button>
        )}
      </div>
    </div>
  );
}
