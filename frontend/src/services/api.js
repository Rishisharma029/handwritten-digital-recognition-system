import axios from "axios";

const API_ROOT_URL =
  import.meta.env.VITE_API_ROOT_URL || "http://localhost:8000";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || `${API_ROOT_URL}/api/v1`;

const getRecognizeTimeout = (engine = "EasyOCR") =>
  engine === "TrOCR" ? 180000 : 60000;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[API ERROR]", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const uploadFile = (formData, config = {}) =>
  api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...config,
  });

export const recognizeDocument = (formData, config = {}) => {
  const { engine = "EasyOCR", ...restConfig } = config;

  return api.post("/recognize", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: getRecognizeTimeout(engine),
    ...restConfig,
  });
};

export const getHistory = () => api.get("/history");
export const getHistoryById = (id) => api.get(`/history/${id}`);
export const deleteHistory = (id) => api.delete(`/history/${id}`);
export const clearHistory = () => api.delete("/history");

export const exportPDF = (data) =>
  api.post("/export/pdf", data, { responseType: "blob" });

export const exportDOCX = (data) =>
  api.post("/export/docx", data, { responseType: "blob" });

export const exportTXT = (data) =>
  api.post("/export/txt", data, { responseType: "blob" });

export const exportJSON = (data) =>
  api.post("/export/json", data, { responseType: "blob" });

export const health = () =>
  axios.get(`${API_ROOT_URL}/health`, { timeout: 10000 });

export const root = () =>
  axios.get(`${API_ROOT_URL}/`, { timeout: 10000 });

export default api;
