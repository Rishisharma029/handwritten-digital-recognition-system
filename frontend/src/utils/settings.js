const SETTINGS_KEY = "hdrs-settings";

export const defaultSettings = {
  engine: "TrOCR",
  language: "English",
  gpuMode: false,
  confidenceThreshold: 75,
  theme: "light",
  autoSave: true,
};

export const loadSettings = () => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) {
      return { ...defaultSettings };
    }
    return { ...defaultSettings, ...JSON.parse(stored) };
  } catch {
    return { ...defaultSettings };
  }
};

export const saveSettings = (settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export default loadSettings;
