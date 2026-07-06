import React from "react";

const Loader = ({
  loading = false,
  progress = 0,
  message = "Processing..."
}) => {

  if (!loading) return null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "40px auto",
        padding: "30px",
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}
    >

      {/* Spinner */}

      <div
        style={{
          width: "70px",
          height: "70px",
          border: "8px solid #e5e7eb",
          borderTop: "8px solid #2563eb",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto"
        }}
      />

      <h2
        style={{
          marginTop: "25px",
          marginBottom: "10px"
        }}
      >
        {message}
      </h2>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "20px"
        }}
      >
        Please wait while OCR processes your document.
      </p>

      {/* Progress Bar */}

      <div
        style={{
          width: "100%",
          height: "14px",
          background: "#e5e7eb",
          borderRadius: "999px",
          overflow: "hidden"
        }}
      >

        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#2563eb",
            transition: "width .3s ease"
          }}
        />

      </div>

      <div
        style={{
          marginTop: "10px",
          fontWeight: "bold"
        }}
      >
        {progress}%
      </div>

      <style>
        {`
            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }

                100% {
                    transform: rotate(360deg);
                }
            }
        `}
      </style>

    </div>
  );
};

export default Loader;