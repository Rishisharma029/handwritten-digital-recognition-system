import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Upload", path: "/upload" },
    { name: "History", path: "/history" },
    { name: "About", path: "/about" }
  ];

  return (
    <>
      <nav
        style={{
          background: "#1f2937",
          color: "#ffffff",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }}
      >
        {/* Logo */}

        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#fff",
            fontSize: "22px",
            fontWeight: "bold"
          }}
        >
          📝 Handwritten OCR
        </Link>

        {/* Desktop Navigation */}

        <div
          className="desktop-nav"
          style={{
            display: "flex",
            gap: "25px"
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer"
          }}
          className="menu-button"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}

      {menuOpen && (
        <div
          style={{
            background: "#374151",
            display: "flex",
            flexDirection: "column",
            padding: "10px"
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#fff",
                padding: "12px",
                textDecoration: "none"
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* Responsive CSS */}

      <style>
        {`
          @media (max-width:768px){

            .desktop-nav{
              display:none !important;
            }

            .menu-button{
              display:block !important;
            }

          }
        `}
      </style>
    </>
  );
};

export default Navbar;