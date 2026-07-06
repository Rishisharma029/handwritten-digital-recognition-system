import React from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Upload", path: "/upload" },
  { name: "Results", path: "/results" },
  { name: "History", path: "/history" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      style={{
        width: "220px",
        background: "#1f2937",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        OCR System
      </h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              color: location.pathname === item.path ? "#60a5fa" : "#fff",
              textDecoration: "none",
              padding: "10px",
              borderRadius: "8px",
              background:
                location.pathname === item.path
                  ? "#374151"
                  : "transparent",
            }}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}