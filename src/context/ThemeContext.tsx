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
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = "about-theme-config";

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

    const apply = () => {
      // 1. Mode classes
      root.classList.remove("light-theme", "dark-theme");
      body.classList.remove("light-theme", "dark-theme");

      if (mode === "light") {
        root.classList.add("light-theme");
        body.classList.add("light-theme");
      } else if (mode === "dark") {
        root.classList.add("dark-theme");
        body.classList.add("dark-theme");
      }

      const isDarkActive =
        mode === "dark" || (mode === "auto" && mediaQuery.matches);

      // 2. Colors & Surfaces
      if (isCustom) {
        root.style.setProperty("--color-system-emphasis", customColor);
        root.style.setProperty("--color-action-emphasis-background", customColor);
        root.style.setProperty("--accent-color", customColor);
        root.style.removeProperty("--color-surface-0");
        root.style.removeProperty("--color-surface-100");
        root.style.removeProperty("--color-surface-200");
      } else {
        const preset =
          themePresets.find((p) => p.id === presetId) || themePresets[0];

        root.style.setProperty("--color-system-emphasis", preset.accentColor);
        root.style.setProperty(
          "--color-action-emphasis-background",
          preset.accentColor
        );
        root.style.setProperty("--accent-color", preset.accentColor);

        if (preset.id !== "default") {
          if (isDarkActive) {
            root.style.setProperty("--color-surface-0", preset.darkSurface0);
            root.style.setProperty("--color-surface-100", preset.darkSurface100);
            root.style.setProperty("--color-surface-200", preset.darkSurface200);
          } else {
            root.style.setProperty("--color-surface-0", preset.lightSurface0);
            root.style.setProperty("--color-surface-100", preset.lightSurface100);
            root.style.setProperty("--color-surface-200", preset.lightSurface200);
          }
        } else {
          root.style.removeProperty("--color-surface-0");
          root.style.removeProperty("--color-surface-100");
          root.style.removeProperty("--color-surface-200");
        }
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
