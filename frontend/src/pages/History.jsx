import React, { useEffect, useState } from "react";

import { clearHistory, deleteHistory, getHistory } from "../services/api";

const History = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const response = await getHistory();
      setItems(response.data || []);
    } catch (error) {
      console.error(error);
      alert("Unable to load OCR history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteHistory(id);
      await loadHistory();
    } catch (error) {
      console.error(error);
      alert("Unable to delete history item.");
    }
  };

  const handleClear = async () => {
    try {
      await clearHistory();
      await loadHistory();
    } catch (error) {
      console.error(error);
      alert("Unable to clear history.");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1>OCR History</h1>
        <button onClick={handleClear} style={{ padding: "10px 16px", border: "none", borderRadius: "8px", background: "#ef4444", color: "#fff", cursor: "pointer" }}>
          Clear All
        </button>
      </div>

      {loading ? (
        <p>Loading history...</p>
      ) : items.length === 0 ? (
        <div style={{ background: "#fff", padding: "24px", borderRadius: "12px" }}>
          <p>No OCR history yet.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {items.map((item) => (
            <div key={item.id} style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: "10px" }}>
                <div>
                  <h3 style={{ marginBottom: "4px" }}>{item.filename}</h3>
                  <p style={{ color: "#6b7280", fontSize: "14px" }}>{item.created_at}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p><strong>Confidence:</strong> {item.confidence}%</p>
                  <p><strong>Engine:</strong> {item.engine}</p>
                </div>
              </div>
              <p style={{ marginBottom: "12px", whiteSpace: "pre-wrap" }}>{item.text}</p>
              <button onClick={() => handleDelete(item.id)} style={{ padding: "8px 12px", border: "none", borderRadius: "8px", background: "#2563eb", color: "#fff", cursor: "pointer" }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;