import React, { useState } from "react";
import { exportToPDF, exportToDocx, exportToTxt, exportToJson } from "../services/export";

const EXPORTS = [
  { key:"pdf",  label:"PDF",  icon:"📄", fn: exportToPDF,  color:"#f87171" },
  { key:"docx", label:"DOCX", icon:"📝", fn: exportToDocx, color:"#60a5fa" },
  { key:"txt",  label:"TXT",  icon:"📃", fn: exportToTxt,  color:"#a3e635" },
  { key:"json", label:"JSON", icon:"📦", fn: exportToJson, color:"#fbbf24" },
];

export default function ExportButton({ exportData }) {
  const [active, setActive] = useState(null);
  const [done, setDone] = useState(null);

  const handle = async (exp) => {
    if (active) return;
    setActive(exp.key);
    try {
      await exp.fn(exportData, `${exportData.filename}.${exp.key}`);
      setDone(exp.key);
      setTimeout(() => setDone(null), 2000);
    } catch (e) {
      console.error(e);
      alert(`Export to ${exp.label} failed.`);
    } finally {
      setActive(null);
    }
  };

  return (
    <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
      {EXPORTS.map(exp => {
        const isLoading = active === exp.key;
        const isDone    = done === exp.key;
        return (
          <button
            key={exp.key}
            onClick={() => handle(exp)}
            disabled={!!active}
            style={{
              display:"flex", alignItems:"center", gap:"7px",
              padding:"11px 20px", borderRadius:"10px",
              background: isDone
                ? "rgba(74,222,128,0.12)"
                : `${exp.color}14`,
              border: `1px solid ${isDone ? "rgba(74,222,128,0.3)" : exp.color + "30"}`,
              color: isDone ? "#4ade80" : exp.color,
              fontWeight:600, fontSize:"13px",
              cursor: active ? "not-allowed" : "pointer",
              opacity: active && !isLoading ? 0.5 : 1,
              transition:"all 0.2s",
            }}
            onMouseEnter={e => { if(!active) e.currentTarget.style.background=`${exp.color}22`; }}
            onMouseLeave={e => { if(!active) e.currentTarget.style.background=isDone?"rgba(74,222,128,0.12)":`${exp.color}14`; }}
          >
            {isLoading ? (
              <div style={{ width:"13px", height:"13px", border:`2px solid ${exp.color}40`, borderTop:`2px solid ${exp.color}`, borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
            ) : (
              <span style={{ fontSize:"14px" }}>{isDone ? "✓" : exp.icon}</span>
            )}
            {isDone ? "Saved!" : `Export ${exp.label}`}
          </button>
        );
      })}
    </div>
  );
}