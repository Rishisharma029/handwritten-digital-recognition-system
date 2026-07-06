import React from "react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon:"✦", title:"TrOCR Transformer", desc:"Microsoft's Vision Transformer — best-in-class for cursive & stylized handwriting recognition.", color:"#818cf8" },
  { icon:"◈", title:"Line Segmentation", desc:"Custom vertical center-density valley clustering algorithm correctly splits multi-line handwritten images.", color:"#34d399" },
  { icon:"⬡", title:"4 OCR Engines",    desc:"Switch between TrOCR, EasyOCR, PaddleOCR, and Tesseract based on your document type.", color:"#fbbf24" },
  { icon:"⬦", title:"Smart Export",     desc:"Export recognized text to PDF, DOCX, TXT or JSON with one click.", color:"#f472b6" },
  { icon:"◷", title:"OCR History",      desc:"Every recognition job is automatically saved with metadata, confidence scores, and timestamps.", color:"#60a5fa" },
  { icon:"⚡", title:"~1s Model Load",  desc:"Models load in under 1 second in offline mode — no Hugging Face cloud checks on startup.", color:"#a78bfa" },
];

const TECH = [
  { name:"TrOCR",        tag:"Transformer OCR",    color:"#818cf8" },
  { name:"EasyOCR",      tag:"CRAFT Detector",     color:"#34d399" },
  { name:"FastAPI",      tag:"Backend",            color:"#fbbf24" },
  { name:"React + Vite", tag:"Frontend",           color:"#60a5fa" },
  { name:"OpenCV",       tag:"Computer Vision",    color:"#f472b6" },
  { name:"SQLite",       tag:"Database",           color:"#a78bfa" },
  { name:"PyTorch",      tag:"Deep Learning",      color:"#fb923c" },
  { name:"Hugging Face", tag:"Model Hub",          color:"#facc15" },
];

const STATS = [
  { value:"4",    label:"OCR Engines" },
  { value:"4",    label:"Export Formats" },
  { value:"7+",   label:"File Formats" },
  { value:"~90%", label:"Handwriting Accuracy" },
];

export default function Home() {
  return (
    <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"32px 24px", animation:"fadeIn 0.4s ease both" }}>

      {/* Hero */}
      <div style={{
        position:"relative", overflow:"hidden",
        background:"linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(20,184,166,0.08) 100%)",
        border:"1px solid rgba(99,102,241,0.2)",
        borderRadius:"24px", padding:"64px 40px",
        textAlign:"center", marginBottom:"48px",
      }}>
        {/* Background decoration */}
        <div style={{ position:"absolute", top:"-60px", left:"-60px", width:"240px", height:"240px", background:"radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-60px", right:"-60px", width:"200px", height:"200px", background:"radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)", pointerEvents:"none" }}/>

        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            padding:"6px 16px", borderRadius:"99px", marginBottom:"24px",
            background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.3)",
            fontSize:"13px", fontWeight:600, color:"#818cf8",
          }}>
            ✦ AI-Powered Handwriting Recognition
          </div>

          <h1 style={{
            fontSize:"clamp(32px,5vw,52px)", fontWeight:900, lineHeight:1.15,
            color:"#f1f5f9", marginBottom:"20px", letterSpacing:"-1px",
          }}>
            Turn Handwriting into<br/>
            <span style={{
              background:"linear-gradient(135deg,#818cf8,#34d399)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>Digital Text — Instantly</span>
          </h1>

          <p style={{
            color:"#64748b", fontSize:"17px", maxWidth:"600px", margin:"0 auto 36px",
            lineHeight:"1.75",
          }}>
            HDRS uses Microsoft's TrOCR Transformer combined with a custom line-segmentation
            pipeline to accurately transcribe multi-line cursive handwriting from photos,
            scans, and documents.
          </p>

          <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/upload" style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              padding:"16px 32px",
              background:"linear-gradient(135deg,#6366f1,#4f46e5)",
              color:"#fff", borderRadius:"12px", fontWeight:700, fontSize:"16px",
              boxShadow:"0 8px 28px rgba(99,102,241,0.4)", textDecoration:"none",
              transition:"all 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 36px rgba(99,102,241,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(99,102,241,0.4)"; }}
            >↑ Start Recognition</Link>
            <Link to="/about" style={{
              display:"inline-flex", alignItems:"center", gap:"8px",
              padding:"16px 28px", background:"rgba(255,255,255,0.05)",
              border:"1px solid rgba(255,255,255,0.12)", color:"#94a3b8",
              borderRadius:"12px", fontWeight:600, fontSize:"16px", textDecoration:"none",
              transition:"all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color="#f1f5f9"; e.currentTarget.style.background="rgba(255,255,255,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.color="#94a3b8"; e.currentTarget.style.background="rgba(255,255,255,0.05)"; }}
            >Learn More →</Link>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"14px", marginBottom:"56px" }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:"16px", padding:"24px", textAlign:"center",
            transition:"all 0.2s", cursor:"default",
            animationDelay:`${i*0.08}s`,
          }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.transform="translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.transform="translateY(0)"; }}
          >
            <div style={{
              fontSize:"36px", fontWeight:900, marginBottom:"6px",
              background:"linear-gradient(135deg,#818cf8,#34d399)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>{s.value}</div>
            <div style={{ fontSize:"13px", color:"#475569", fontWeight:500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ marginBottom:"56px" }}>
        <h2 style={{ fontSize:"22px", fontWeight:800, color:"#f1f5f9", marginBottom:"24px" }}>
          Why HDRS?
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"16px" }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} style={{
              padding:"24px", background:"rgba(255,255,255,0.02)",
              border:"1px solid rgba(255,255,255,0.07)", borderRadius:"16px",
              transition:"all 0.25s", cursor:"default",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background="rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";
              e.currentTarget.style.transform="translateY(-3px)";
              e.currentTarget.style.boxShadow="0 12px 30px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background="rgba(255,255,255,0.02)";
              e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";
              e.currentTarget.style.transform="translateY(0)";
              e.currentTarget.style.boxShadow="none";
            }}
            >
              <div style={{
                width:"40px", height:"40px", borderRadius:"10px", marginBottom:"14px",
                background:`rgba(${f.color==="#818cf8"?"129,140,248":f.color==="#34d399"?"52,211,153":f.color==="#fbbf24"?"251,191,36":f.color==="#f472b6"?"244,114,182":f.color==="#60a5fa"?"96,165,250":"167,139,250"},0.15)`,
                border:`1px solid ${f.color}30`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"20px", color:f.color,
              }}>{f.icon}</div>
              <h3 style={{ fontSize:"15px", fontWeight:700, color:"#f1f5f9", marginBottom:"8px" }}>{f.title}</h3>
              <p style={{ fontSize:"13px", color:"#64748b", lineHeight:"1.65" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div>
        <h2 style={{ fontSize:"22px", fontWeight:800, color:"#f1f5f9", marginBottom:"20px" }}>Technology Stack</h2>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
          {TECH.map(t => (
            <div key={t.name} style={{
              padding:"8px 16px",
              background:`rgba(${t.color==="#818cf8"?"129,140,248":t.color==="#34d399"?"52,211,153":t.color==="#fbbf24"?"251,191,36":t.color==="#60a5fa"?"96,165,250":t.color==="#f472b6"?"244,114,182":t.color==="#a78bfa"?"167,139,250":t.color==="#fb923c"?"251,146,60":"250,204,21"},0.1)`,
              border:`1px solid ${t.color}30`,
              borderRadius:"99px", cursor:"default",
              transition:"all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform="scale(1.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; }}
            >
              <span style={{ fontWeight:700, fontSize:"13px", color:t.color }}>{t.name}</span>
              <span style={{ color:"#334155", fontSize:"12px", marginLeft:"6px" }}>· {t.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}