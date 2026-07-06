import React from "react";
import { useState, useEffect } from "react";
import { clearHistory, deleteHistory, getHistory } from "../services/api";

const ENGINE_COLORS = { TrOCR:"#818cf8", EasyOCR:"#34d399", Tesseract:"#fbbf24", PaddleOCR:"#f472b6" };

function ConfBadge({ conf }) {
  const v = Math.max(0, Math.min(100, conf));
  const color = v >= 90 ? "#4ade80" : v >= 75 ? "#fbbf24" : "#f87171";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
      <div style={{ flex:1, height:"4px", background:"rgba(255,255,255,0.08)", borderRadius:"99px", overflow:"hidden", width:"80px" }}>
        <div style={{ height:"100%", width:`${v}%`, background:color, borderRadius:"99px", transition:"width 0.5s ease" }}/>
      </div>
      <span style={{ fontSize:"12px", fontWeight:700, color, minWidth:"40px", textAlign:"right" }}>{v.toFixed(0)}%</span>
    </div>
  );
}

export default function History() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    try { setLoading(true); const r = await getHistory(); setItems(r.data || []); }
    catch { /* no-op */ }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    setDeleting(id);
    try { await deleteHistory(id); await load(); }
    catch { alert("Failed to delete."); }
    finally { setDeleting(null); }
  };

  const handleClear = async () => {
    if (!window.confirm("Clear all OCR history?")) return;
    try { await clearHistory(); await load(); }
    catch { alert("Failed to clear."); }
  };

  const filtered = items.filter(i =>
    !search ||
    i.filename?.toLowerCase().includes(search.toLowerCase()) ||
    i.engine?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth:"1000px", margin:"0 auto", padding:"32px 24px", animation:"fadeIn 0.4s ease both" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"28px", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <h1 style={{ fontSize:"28px", fontWeight:800, color:"#f1f5f9", marginBottom:"4px" }}>OCR History</h1>
          <p style={{ color:"#64748b", fontSize:"14px" }}>{items.length} recognition{items.length !== 1 ? "s" : ""} saved</p>
        </div>
        {items.length > 0 && (
          <button onClick={handleClear} style={{
            padding:"9px 18px", borderRadius:"9px",
            background:"rgba(244,63,94,0.12)", border:"1px solid rgba(244,63,94,0.25)",
            color:"#f87171", fontWeight:600, fontSize:"13px", cursor:"pointer", transition:"all 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background="rgba(244,63,94,0.22)"}
          onMouseLeave={e => e.currentTarget.style.background="rgba(244,63,94,0.12)"}
          >✕ Clear All</button>
        )}
      </div>

      {/* Search */}
      {items.length > 0 && (
        <div style={{ position:"relative", marginBottom:"20px" }}>
          <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", color:"#475569", fontSize:"16px" }}>⌕</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by filename or engine..."
            style={{
              width:"100%", padding:"12px 14px 12px 40px",
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:"12px", color:"#f1f5f9", fontSize:"14px", outline:"none",
              transition:"all 0.2s",
            }}
            onFocus={e => e.target.style.borderColor="rgba(99,102,241,0.5)"}
            onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.08)"}
          />
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div style={{ display:"grid", gap:"12px" }}>
          {[1,2,3].map(i => (
            <div key={i} className="skeleton" style={{ height:"100px", borderRadius:"14px", opacity: 1 - i * 0.2 }}/>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign:"center", padding:"64px 40px",
          background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)",
          borderRadius:"20px",
        }}>
          <div style={{ fontSize:"56px", marginBottom:"16px" }}>◷</div>
          <h3 style={{ color:"#f1f5f9", marginBottom:"8px" }}>
            {search ? "No matches found" : "No history yet"}
          </h3>
          <p style={{ color:"#475569", fontSize:"14px" }}>
            {search ? "Try a different search term" : "Run OCR on a document to see it here"}
          </p>
        </div>
      ) : (
        <div style={{ display:"grid", gap:"10px" }}>
          {filtered.map((item, idx) => {
            const isOpen = expanded === item.id;
            const engColor = ENGINE_COLORS[item.engine] || "#94a3b8";
            return (
              <div key={item.id} style={{
                background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:"14px", overflow:"hidden", transition:"all 0.2s",
                animationDelay:`${idx * 0.04}s`,
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.12)"}
              onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}
              >
                {/* Row header */}
                <div
                  style={{ display:"flex", alignItems:"center", gap:"14px", padding:"16px 20px", cursor:"pointer" }}
                  onClick={() => setExpanded(isOpen ? null : item.id)}
                >
                  {/* Engine dot */}
                  <div style={{
                    width:"36px", height:"36px", borderRadius:"10px", flexShrink:0,
                    background:`${engColor}18`, border:`1px solid ${engColor}30`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:"11px", fontWeight:800, color:engColor,
                  }}>{(item.engine||"?").slice(0,2).toUpperCase()}</div>

                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:600, fontSize:"14px", color:"#f1f5f9", marginBottom:"3px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {item.filename || "Untitled"}
                    </div>
                    <div style={{ fontSize:"12px", color:"#475569" }}>
                      {item.created_at ? new Date(item.created_at).toLocaleString() : "—"}
                    </div>
                  </div>

                  <div style={{ display:"flex", alignItems:"center", gap:"16px", flexShrink:0 }}>
                    <ConfBadge conf={item.confidence || 0} />
                    <span style={{
                      padding:"3px 10px", borderRadius:"99px", fontSize:"11px", fontWeight:600,
                      background:`${engColor}18`, color:engColor, border:`1px solid ${engColor}30`,
                    }}>{item.engine}</span>
                    <span style={{ color:"#475569", fontSize:"16px", transform: isOpen ? "rotate(90deg)" : "none", transition:"transform 0.2s" }}>›</span>
                  </div>
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"16px 20px", animation:"slideDown 0.2s ease both" }}>
                    <pre style={{
                      fontFamily:"'JetBrains Mono',monospace", fontSize:"13px", lineHeight:"1.7",
                      color:"#94a3b8", maxHeight:"160px", overflow:"auto", marginBottom:"14px",
                      whiteSpace:"pre-wrap", wordBreak:"break-word",
                    }}>{item.extracted_text || item.text || "(no text)"}</pre>
                    <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id} style={{
                      padding:"7px 16px", borderRadius:"8px", fontSize:"13px", fontWeight:600,
                      background:"rgba(244,63,94,0.12)", border:"1px solid rgba(244,63,94,0.25)",
                      color:"#f87171", cursor:"pointer", transition:"all 0.2s",
                    }}>
                      {deleting === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}