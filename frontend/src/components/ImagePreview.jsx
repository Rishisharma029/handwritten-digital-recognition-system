import React from "react";

const ImagePreview = ({ file, imageUrl, onRemove }) => {
  if (!file || !imageUrl) return null;

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(2)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "20px auto",
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
      }}
    >
      <img
        src={imageUrl}
        alt="Preview"
        style={{
          width: "100%",
          maxHeight: "450px",
          objectFit: "contain",
          background: "#f3f4f6",
        }}
      />

      <div
        style={{
          padding: "15px",
        }}
      >
        <h3
          style={{
            marginBottom: "10px",
          }}
        >
          Image Preview
        </h3>

        <p>
          <strong>Name:</strong> {file.name}
        </p>

        <p>
          <strong>Type:</strong> {file.type}
        </p>

        <p>
          <strong>Size:</strong> {formatSize(file.size)}
        </p>

        <button
          onClick={onRemove}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background: "#ef4444",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Remove Image
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;