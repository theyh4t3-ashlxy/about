import React, { createContext, useContext, useState, useEffect } from "react";
import { themePresets, FoundationThemePreset } from "../data/themes";

export type ThemeMode = "auto" | "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  presetId: string;
  setPresetId: (id: string) => void;
  customColor: string;
  setCustomColor: (hex: string) => void;
  isCustom: boolean;
  setIsCustom: (custom: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  activePreset: FoundationThemePreset;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = "about-theme-config-v3";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.mode) return parsed.mode;
      }
    } catch {}
    return "auto";
  });

  const [presetId, setPresetIdState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.presetId) return parsed.presetId;
      }
    } catch {}
    return "default";
  });

  const [customColor, setCustomColorState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.customColor) return parsed.customColor;
      }
    } catch {}
    return "#00e5ff";
  });

  const [isCustom, setIsCustomState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed.isCustom);
      }
    } catch {}
    return false;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ mode, presetId, customColor, isCustom })
      );
    } catch {}
  }, [mode, presetId, customColor, isCustom]);

  // Apply to DOM
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const setCssVar = (name: string, val: string) => {
      root.style.setProperty(name, val, "important");
      body.style.setProperty(name, val, "important");
    };

    const clearVar = (name: string) => {
      root.style.removeProperty(name);
      body.style.removeProperty(name);
    };

    const apply = () => {
      const isDarkActive =
        mode === "dark" || (mode === "auto" && mediaQuery.matches);

      // 1. Toggle mode classes
      root.classList.remove("light-theme", "dark-theme");
      body.classList.remove("light-theme", "dark-theme");

      if (isDarkActive) {
        root.classList.add("dark-theme");
        body.classList.add("dark-theme");
      } else {
        root.classList.add("light-theme");
        body.classList.add("light-theme");
      }

      // 2. Custom color vs Foundation Presets
      if (isCustom) {
        // Custom hex strictly applies to primary buttons and active accents
        setCssVar("--color-system-emphasis", customColor);
        setCssVar("--color-action-emphasis-background", customColor);
        setCssVar("--accent-color", customColor);

        // Clear custom surface overrides so shift tokens and surfaces remain authentic
        clearVar("--color-surface-0");
        clearVar("--color-surface-100");
        clearVar("--color-surface-200");
        clearVar("--color-stroke-default");
        clearVar("--color-stroke-emphasis");
        clearVar("--color-content-emphasis");
        clearVar("--color-content-default");
        clearVar("--color-content-muted");
      } else {
        // Foundation Presets
        const preset =
          themePresets.find((p) => p.id === presetId) || themePresets[0];

        const s0 = isDarkActive ? preset.darkSurface0 : preset.lightSurface0;
        const s1 = isDarkActive ? preset.darkSurface100 : preset.lightSurface100;
        const s2 = isDarkActive ? preset.darkSurface200 : preset.lightSurface200;

        setCssVar("--color-surface-0", s0);
        setCssVar("--color-surface-100", s1);
        setCssVar("--color-surface-200", s2);
        setCssVar("--color-system-emphasis", preset.accentColor);
        setCssVar("--color-action-emphasis-background", preset.accentColor);
        setCssVar("--accent-color", preset.accentColor);

        clearVar("--color-stroke-default");
        clearVar("--color-stroke-emphasis");
        clearVar("--color-content-emphasis");
        clearVar("--color-content-default");
        clearVar("--color-content-muted");
      }
    };

    apply();

    const handleSystemChange = () => {
      if (mode === "auto") apply();
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [mode, presetId, customColor, isCustom]);

  const activePreset =
    themePresets.find((p) => p.id === presetId) || themePresets[0];

  const setMode = (m: ThemeMode) => setModeState(m);
  const setPresetId = (id: string) => {
    setPresetIdState(id);
    setIsCustomState(false);
  };
  const setCustomColor = (hex: string) => {
    setCustomColorState(hex);
    setIsCustomState(true);
  };
  const setIsCustom = (c: boolean) => setIsCustomState(c);
  const resetTheme = () => {
    setModeState("auto");
    setPresetIdState("default");
    setIsCustomState(false);
    setCustomColorState("#00e5ff");
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        presetId,
        setPresetId,
        customColor,
        setCustomColor,
        isCustom,
        setIsCustom,
        isSettingsOpen,
        setIsSettingsOpen,
        activePreset,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
