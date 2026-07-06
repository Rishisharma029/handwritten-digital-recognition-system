import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home",     path: "/",        icon: "⌂" },
  { name: "Upload",   path: "/upload",  icon: "↑" },
  { name: "Results",  path: "/results", icon: "◈" },
  { name: "History",  path: "/history", icon: "◷" },
  { name: "Settings", path: "/settings",icon: "⚙" },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(null);

  return (
    <aside
      style={{
        width: collapsed ? "72px" : "230px",
        background: "linear-gradient(180deg, #111827 0%, #0f1623 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0",
        transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
        position: "relative",
        zIndex: 10,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{
        padding: collapsed ? "24px 0" : "24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        gap: "12px",
        minHeight: "72px",
      }}>
        {!collapsed && (
          <Link to="/" style={{ display:"flex", alignItems:"center", gap:"10px", textDecoration:"none" }}>
            <div style={{
              width: "34px", height: "34px",
              background: "linear-gradient(135deg, #6366f1, #14b8a6)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", flexShrink: 0,
              boxShadow: "0 0 20px rgba(99,102,241,0.4)",
            }}>✍</div>
            <div>
              <div style={{ fontWeight:700, fontSize:"14px", color:"#f1f5f9", letterSpacing:"-0.3px" }}>
                HandOCR
              </div>
              <div style={{ fontSize:"11px", color:"#475569", fontWeight:500 }}>AI Recognition</div>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link to="/" style={{
            width:"34px", height:"34px",
            background:"linear-gradient(135deg,#6366f1,#14b8a6)",
            borderRadius:"10px", display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:"18px",
            boxShadow:"0 0 20px rgba(99,102,241,0.4)",
          }}>✍</Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:"8px", width:"28px", height:"28px",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"#94a3b8", cursor:"pointer", fontSize:"13px",
            transition:"all 0.2s", flexShrink:0,
          }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.color="#f1f5f9"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.color="#94a3b8"; }}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"12px 10px", display:"flex", flexDirection:"column", gap:"4px" }}>
        {navItems.map((item, i) => {
          const active = location.pathname === item.path;
          return (
            <div
              key={item.path}
              className="tooltip-wrap"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <Link
                to={item.path}
                onMouseEnter={() => setHovered(item.path)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display:"flex", alignItems:"center",
                  gap:"12px",
                  padding: collapsed ? "11px 0" : "11px 14px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  borderRadius:"10px",
                  color: active ? "#fff" : hovered === item.path ? "#e2e8f0" : "#64748b",
                  background: active
                    ? "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(20,184,166,0.15))"
                    : hovered === item.path
                    ? "rgba(255,255,255,0.05)"
                    : "transparent",
                  border: active ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
                  textDecoration:"none",
                  transition:"all 0.2s",
                  boxShadow: active ? "0 0 20px rgba(99,102,241,0.1)" : "none",
                  position:"relative",
                }}
              >
                {active && (
                  <div style={{
                    position:"absolute", left:0, top:"25%", bottom:"25%",
                    width:"3px", borderRadius:"0 3px 3px 0",
                    background:"linear-gradient(180deg,#6366f1,#14b8a6)",
                  }}/>
                )}
                <span style={{ fontSize:"17px", flexShrink:0, width:"20px", textAlign:"center" }}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span style={{ fontWeight: active ? 600 : 500, fontSize:"14px" }}>
                    {item.name}
                  </span>
                )}
              </Link>
              {collapsed && <span className="tooltip" style={{ left:"calc(100% + 12px)", bottom:"auto", top:"50%", transform:"translateY(-50%) scale(0.9)" }}>{item.name}</span>}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div style={{
          padding:"16px 20px",
          borderTop:"1px solid rgba(255,255,255,0.06)",
          fontSize:"11px", color:"#334155",
        }}>
          © 2026 Rishi Sharma · MIT
        </div>
      )}
    </aside>
  );
}