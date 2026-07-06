/**
 * Export service for handling different export formats
 */
import api, {
  exportDOCX,
  exportJSON,
  exportPDF,
  exportTXT,
} from "./api";

const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const exportToPDF = async (data, filename = "ocr_result.pdf") => {
  const response = await exportPDF(data);
  downloadFile(response.data, filename);
  return response.data;
};

export const exportToDocx = async (data, filename = "ocr_result.docx") => {
  const response = await exportDOCX(data);
  downloadFile(response.data, filename);
  return response.data;
};

export const exportToTxt = async (data, filename = "ocr_result.txt") => {
  const response = await exportTXT(data);
  downloadFile(response.data, filename);
  return response.data;
};

export const exportToJson = async (data, filename = "ocr_result.json") => {
  const response = await exportJSON(data);
  downloadFile(response.data, filename);
  return response.data;
};

export const prepareExportData = (result, customFilename = null) => {
  const filename = customFilename || result.filename || "ocr_result";
  return {
    filename: filename,
    text: result.text || result.extracted_text || "",
    confidence: result.confidence || 0,
    engine: result.engine || "TrOCR",
    language: result.language || "English",
  };
};

export default {
  exportToPDF,
  exportToDocx,
  exportToTxt,
  exportToJson,
  downloadFile,
  prepareExportData,
};
