import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home",    path: "/" },
  { name: "Upload",  path: "/upload" },
  { name: "History", path: "/history" },
  { name: "About",   path: "/about" },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled
          ? "rgba(10,13,20,0.85)"
          : "rgba(10,13,20,0.5)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "transparent"}`,
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}>
        <div style={{
          maxWidth: "100%", margin: "0 auto",
          padding: "0 28px", height: "64px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link to="/" style={{ display:"flex", alignItems:"center", gap:"10px", textDecoration:"none" }}>
            <div style={{
              width:"32px", height:"32px",
              background:"linear-gradient(135deg,#6366f1,#14b8a6)",
              borderRadius:"9px", display:"flex", alignItems:"center",
              justifyContent:"center", fontSize:"17px",
              boxShadow:"0 0 16px rgba(99,102,241,0.4)",
            }}>✍</div>
            <span style={{
              fontWeight:700, fontSize:"16px", color:"#f1f5f9",
              background:"linear-gradient(135deg,#818cf8,#14b8a6)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text",
            }}>HandOCR</span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display:"flex", gap:"4px", alignItems:"center" }} className="desktop-nav">
            {navLinks.map(link => {
              const active = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path} style={{
                  padding:"7px 16px", borderRadius:"8px",
                  fontSize:"14px", fontWeight: active ? 600 : 500,
                  color: active ? "#fff" : "#94a3b8",
                  background: active ? "rgba(99,102,241,0.2)" : "transparent",
                  border: active ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
                  transition:"all 0.2s",
                  textDecoration:"none",
                }}
                onMouseEnter={e => { if(!active){ e.currentTarget.style.color="#e2e8f0"; e.currentTarget.style.background="rgba(255,255,255,0.05)"; } }}
                onMouseLeave={e => { if(!active){ e.currentTarget.style.color="#94a3b8"; e.currentTarget.style.background="transparent"; } }}
                >{link.name}</Link>
              );
            })}
            <Link to="/upload" style={{
              marginLeft:"8px", padding:"8px 18px",
              background:"linear-gradient(135deg,#6366f1,#4f46e5)",
              color:"#fff", borderRadius:"8px", fontWeight:600, fontSize:"14px",
              boxShadow:"0 4px 14px rgba(99,102,241,0.35)",
              transition:"all 0.2s", textDecoration:"none",
              display:"inline-flex", alignItems:"center", gap:"6px",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(99,102,241,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 14px rgba(99,102,241,0.35)"; }}
            >
              ↑ Try Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            style={{
              display:"none", background:"rgba(255,255,255,0.07)",
              border:"1px solid rgba(255,255,255,0.1)",
              color:"#94a3b8", padding:"8px 12px", borderRadius:"8px",
              fontSize:"18px", transition:"all 0.2s",
            }}
          >{mobileOpen ? "✕" : "☰"}</button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mobile-menu" style={{
            padding:"12px 20px 20px",
            borderTop:"1px solid rgba(255,255,255,0.06)",
            display:"flex", flexDirection:"column", gap:"4px",
            animation:"slideDown 0.2s ease both",
          }}>
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} style={{
                padding:"12px 16px", borderRadius:"10px",
                color: location.pathname === link.path ? "#fff" : "#94a3b8",
                background: location.pathname === link.path ? "rgba(99,102,241,0.2)" : "transparent",
                fontWeight:500, fontSize:"15px",
              }}>{link.name}</Link>
            ))}
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}