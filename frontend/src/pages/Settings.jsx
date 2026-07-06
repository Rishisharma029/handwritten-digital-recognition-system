import React, { useEffect, useState } from "react";

import { defaultSettings, loadSettings, saveSettings } from "../utils/settings";

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const updateSetting = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "24px" }}>Settings</h1>

      <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
        <label style={{ display: "block", marginBottom: "16px" }}>
          <span style={{ display: "block", marginBottom: "6px" }}>OCR Engine</span>
          <select value={settings.engine} onChange={(e) => updateSetting("engine", e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px" }}>
            <option value="EasyOCR">EasyOCR</option>
            <option value="TrOCR">TrOCR</option>
            <option value="PaddleOCR">PaddleOCR</option>
            <option value="Tesseract">Tesseract</option>
          </select>
        </label>

        <label style={{ display: "block", marginBottom: "16px" }}>
          <span style={{ display: "block", marginBottom: "6px" }}>Language</span>
          <select value={settings.language} onChange={(e) => updateSetting("language", e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px" }}>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="French">French</option>
          </select>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <input type="checkbox" checked={settings.gpuMode} onChange={(e) => updateSetting("gpuMode", e.target.checked)} />
          Enable GPU Mode
        </label>

        <label style={{ display: "block", marginBottom: "16px" }}>
          <span style={{ display: "block", marginBottom: "6px" }}>Confidence Threshold (%)</span>
          <input type="range" min="50" max="100" value={settings.confidenceThreshold} onChange={(e) => updateSetting("confidenceThreshold", Number(e.target.value))} style={{ width: "100%" }} />
          <div>{settings.confidenceThreshold}%</div>
        </label>

        <label style={{ display: "block", marginBottom: "16px" }}>
          <span style={{ display: "block", marginBottom: "6px" }}>Theme</span>
          <select value={settings.theme} onChange={(e) => updateSetting("theme", e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px" }}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input type="checkbox" checked={settings.autoSave} onChange={(e) => updateSetting("autoSave", e.target.checked)} />
          Auto-save OCR results
        </label>
      </div>
    </div>
  );
};

export default Settings;
