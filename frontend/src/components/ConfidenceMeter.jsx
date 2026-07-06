import React from "react";

export default function ConfidenceMeter({ confidence = 0 }) {
  const value = Math.max(0, Math.min(100, confidence));

  const getStatus = () => {
    if (value >= 95) return { label:"Excellent", color:"#4ade80", bg:"rgba(74,222,128,0.12)", border:"rgba(74,222,128,0.25)" };
    if (value >= 85) return { label:"Very Good", color:"#a3e635", bg:"rgba(163,230,53,0.12)", border:"rgba(163,230,53,0.25)" };
    if (value >= 70) return { label:"Good",      color:"#fbbf24", bg:"rgba(251,191,36,0.12)", border:"rgba(251,191,36,0.25)" };
    if (value >= 55) return { label:"Fair",      color:"#fb923c", bg:"rgba(251,146,60,0.12)", border:"rgba(251,146,60,0.25)" };
    return                  { label:"Poor",      color:"#f87171", bg:"rgba(248,113,113,0.12)", border:"rgba(248,113,113,0.25)" };
  };

  const s = getStatus();

  return (
    <div style={{
      background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)",
      borderRadius:"16px", padding:"20px 24px",
    }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"14px" }}>
        <span style={{ fontWeight:600, fontSize:"14px", color:"#94a3b8" }}>OCR Confidence</span>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ fontSize:"24px", fontWeight:900, color:s.color }}>{value.toFixed(1)}%</span>
          <span style={{
            padding:"3px 10px", borderRadius:"99px", fontSize:"12px", fontWeight:700,
            background:s.bg, color:s.color, border:`1px solid ${s.border}`,
          }}>{s.label}</span>
        </div>
      </div>

      {/* Track */}
      <div style={{ height:"8px", background:"rgba(255,255,255,0.06)", borderRadius:"99px", overflow:"hidden", position:"relative" }}>
        {/* Gradient fill */}
        <div style={{
          height:"100%", width:`${value}%`,
          background:`linear-gradient(90deg, #f87171 0%, #fbbf24 40%, #4ade80 100%)`,
          backgroundSize:"600px 100%",
          backgroundPosition: `${(1 - value/100) * -400}px 0`,
          borderRadius:"99px",
          transition:"width 0.8s cubic-bezier(0.4,0,0.2,1)",
          boxShadow:`0 0 10px ${s.color}60`,
          animation:"bar-grow 0.8s cubic-bezier(0.4,0,0.2,1) both",
          transformOrigin:"left",
        }}/>
      </div>

      {/* Scale labels */}
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:"8px" }}>
        {["0", "25", "50", "75", "100"].map(v => (
          <span key={v} style={{ fontSize:"10px", color:"#334155", fontFamily:"monospace" }}>{v}%</span>
        ))}
      </div>
    </div>
  );
}