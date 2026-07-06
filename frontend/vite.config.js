import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  return {
    base: mode === "production" ? "/handwritten-digital-recognition-system/" : "/",
    plugins: [react()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@services": path.resolve(__dirname, "./src/services"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@styles": path.resolve(__dirname, "./src/styles"),
      },
    },

    server: {
      host: "0.0.0.0",
      port: 5173,
      open: true,
    },

    preview: {
      port: 4173,
    },

    build: {
      outDir: "dist",
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
    },
  };
});