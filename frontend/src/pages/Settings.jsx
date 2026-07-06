import React, { useEffect, useState } from "react";
import { defaultSettings, loadSettings, saveSettings } from "../utils/settings";

const ENGINES   = ["TrOCR", "EasyOCR", "PaddleOCR", "Tesseract"];
const LANGUAGES = ["English", "Hindi", "French", "Spanish", "German", "Arabic", "Chinese"];
const THEMES    = ["dark", "light"];

function SettingRow({ label, hint, children }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", justifyContent: "space-between",
      gap: "24px", padding: "20px 0",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      flexWrap: "wrap",
    }}>
      <div style={{ flex: "1 1 200px" }}>
        <div style={{ fontWeight: 600, fontSize: "14px", color: "#e2e8f0", marginBottom: "4px" }}>
          {label}
        </div>
        {hint && <div style={{ fontSize: "12px", color: "#475569", lineHeight: "1.5" }}>{hint}</div>}
      </div>
      <div style={{ flex: "1 1 220px" }}>{children}</div>
    </div>
  );
}

function StyledSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: "100%", padding: "10px 14px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "10px", color: "#f1f5f9",
        fontSize: "14px", cursor: "pointer", outline: "none",
        transition: "border-color 0.2s",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "calc(100% - 12px) center",
        paddingRight: "36px",
      }}
      onFocus={e  => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
      onBlur={e   => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
    >
      {options.map(o => (
        <option key={o} value={o} style={{ background: "#1a2235", color: "#f1f5f9" }}>{o}</option>
      ))}
    </select>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: "44px", height: "24px", borderRadius: "99px",
          background: checked
            ? "linear-gradient(135deg,#6366f1,#4f46e5)"
            : "rgba(255,255,255,0.1)",
          border: `1px solid ${checked ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.12)"}`,
          position: "relative", cursor: "pointer", transition: "all 0.25s",
          boxShadow: checked ? "0 0 12px rgba(99,102,241,0.3)" : "none",
        }}
      >
        <div style={{
          position: "absolute", top: "3px",
          left: checked ? "22px" : "3px",
          width: "16px", height: "16px",
          background: "#fff", borderRadius: "50%",
          transition: "left 0.25s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
        }}/>
      </div>
      <span style={{ fontSize: "14px", color: "#94a3b8" }}>{label}</span>
    </label>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved]       = useState(false);

  useEffect(() => { setSettings(loadSettings()); }, []);

  const update = (field, value) => {
    const next = { ...settings, [field]: value };
    setSettings(next);
    saveSettings(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px", animation: "fadeIn 0.4s ease both" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#f1f5f9", marginBottom: "4px" }}>Settings</h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Configure your OCR preferences</p>
        </div>
        <div style={{
          padding: "7px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
          background: saved ? "rgba(74,222,128,0.12)" : "transparent",
          border: saved ? "1px solid rgba(74,222,128,0.3)" : "1px solid transparent",
          color: saved ? "#4ade80" : "transparent",
          transition: "all 0.3s",
        }}>
          {saved ? "✓ Saved" : "·"}
        </div>
      </div>

      {/* Card */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "18px", padding: "0 24px",
      }}>
        {/* Section label */}
        <div style={{ padding: "16px 0 0", fontSize: "11px", fontWeight: 700, color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Recognition
        </div>

        <SettingRow
          label="OCR Engine"
          hint="TrOCR gives the best results on handwritten cursive text"
        >
          <StyledSelect
            value={settings.engine}
            onChange={v => update("engine", v)}
            options={ENGINES}
          />
        </SettingRow>

        <SettingRow
          label="Language"
          hint="Primary language of the document being recognized"
        >
          <StyledSelect
            value={settings.language}
            onChange={v => update("language", v)}
            options={LANGUAGES}
          />
        </SettingRow>

        <SettingRow
          label="GPU Acceleration"
          hint="Enable if you have a CUDA-compatible GPU available on the backend server"
        >
          <Toggle
            checked={settings.gpuMode}
            onChange={v => update("gpuMode", v)}
            label={settings.gpuMode ? "Enabled" : "Disabled"}
          />
        </SettingRow>

        <SettingRow
          label="Confidence Threshold"
          hint="Minimum confidence score to display (affects result highlighting only)"
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", color: "#475569" }}>Threshold</span>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#818cf8" }}>
                {settings.confidenceThreshold}%
              </span>
            </div>
            <input
              type="range" min="0" max="100"
              value={settings.confidenceThreshold}
              onChange={e => update("confidenceThreshold", Number(e.target.value))}
              style={{
                width: "100%", height: "6px", cursor: "pointer",
                accentColor: "#6366f1", appearance: "auto",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
              <span style={{ fontSize: "10px", color: "#334155" }}>0%</span>
              <span style={{ fontSize: "10px", color: "#334155" }}>100%</span>
            </div>
          </div>
        </SettingRow>

        {/* Section label */}
        <div style={{ padding: "20px 0 0", fontSize: "11px", fontWeight: 700, color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Interface
        </div>

        <SettingRow
          label="Theme"
          hint="Note: full theme switching is coming soon — the app currently uses a premium dark mode"
        >
          <div style={{ display: "flex", gap: "8px" }}>
            {THEMES.map(t => (
              <button key={t} onClick={() => update("theme", t)} style={{
                flex: 1, padding: "10px",
                borderRadius: "10px", textTransform: "capitalize", fontWeight: 600, fontSize: "13px",
                border: settings.theme === t ? "1.5px solid rgba(99,102,241,0.6)" : "1px solid rgba(255,255,255,0.08)",
                background: settings.theme === t ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
                color: settings.theme === t ? "#818cf8" : "#64748b",
                cursor: "pointer", transition: "all 0.2s",
              }}>
                {t === "dark" ? "🌙 Dark" : "☀️ Light"}
              </button>
            ))}
          </div>
        </SettingRow>

        <SettingRow
          label="Auto-save Results"
          hint="Automatically save every OCR result to history"
        >
          <Toggle
            checked={settings.autoSave}
            onChange={v => update("autoSave", v)}
            label={settings.autoSave ? "Auto-saving enabled" : "Auto-save disabled"}
          />
        </SettingRow>

        {/* Reset */}
        <div style={{ padding: "20px 0" }}>
          <button
            onClick={() => { setSettings(defaultSettings); saveSettings(defaultSettings); setSaved(true); setTimeout(() => setSaved(false), 1800); }}
            style={{
              padding: "9px 18px", borderRadius: "9px", fontSize: "13px", fontWeight: 600,
              background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)",
              color: "#f87171", cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(244,63,94,0.18)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(244,63,94,0.08)"}
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
