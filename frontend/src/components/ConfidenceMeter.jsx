import React from "react";

const ConfidenceMeter = ({ confidence = 0 }) => {
  const value = Math.max(0, Math.min(100, confidence));

  const getStatus = () => {
    if (value >= 95)
      return {
        label: "Excellent",
        color: "#22c55e",
      };

    if (value >= 90)
      return {
        label: "Very Good",
        color: "#84cc16",
      };

    if (value >= 80)
      return {
        label: "Good",
        color: "#eab308",
      };

    if (value >= 70)
      return {
        label: "Fair",
        color: "#f97316",
      };

    return {
      label: "Poor",
      color: "#ef4444",
    };
  };

  const status = getStatus();

  return (
    <div
      style={{
        width: "100%",
        background: "#ffffff",
        borderRadius: "12px",
        padding: "18px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          fontWeight: "600",
        }}
      >
        <span>OCR Confidence</span>

        <span>{value.toFixed(2)}%</span>
      </div>

      <div
        style={{
          width: "100%",
          height: "16px",
          background: "#e5e7eb",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: status.color,
            transition: "width 0.6s ease",
          }}
        />
      </div>

      <div
        style={{
          marginTop: "12px",
          textAlign: "center",
          fontWeight: "bold",
          color: status.color,
        }}
      >
        {status.label}
      </div>
    </div>
  );
};

export default ConfidenceMeter;