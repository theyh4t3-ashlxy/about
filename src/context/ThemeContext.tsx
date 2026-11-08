import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { themePresets, FoundationThemePreset } from "../data/themes";
import { generateProceduralPalette } from "../utils/color";
import { avatarPresets } from "../data/avatars";
import { playTactileClick, SwitchSound } from "../utils/audio";

export type ThemeMode = "auto" | "light" | "dark";

export const moodPresets = [
  "in experience",
  "compiling nixos 26.11",
  "crying over css grid",
  "debugging race conditions",
  "staring at xrandr telemetry",
  "38% juice remaining",
  "optimizing kernel params",
  "offline in vim",
];

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
  isCustomColorOpen: boolean;
  setIsCustomColorOpen: (open: boolean) => void;
  activePreset: FoundationThemePreset;
  resetTheme: () => void;
  avatarId: string;
  avatarSrc?: string;
  avatarInitials: string;
  setAvatar: (id: string) => void;
  isAvatarDialogOpen: boolean;
  setIsAvatarDialogOpen: (open: boolean) => void;
  // Modern web audio mechanical keyboard switch sounds
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  switchSound: SwitchSound;
  setSwitchSound: (sound: SwitchSound) => void;
  playSound: (sound?: SwitchSound) => void;
  // Terminal CRT scanline overlay
  isScanlinesEnabled: boolean;
  setIsScanlinesEnabled: (enabled: boolean) => void;
  // Custom status mood
  statusMood: string;
  setStatusMood: (mood: string) => void;
  // Shortcuts modal
  isShortcutsOpen: boolean;
  setIsShortcutsOpen: (open: boolean) => void;
  // Active Tab state for global navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const STORAGE_KEY = "about-theme-config-v4";
const AVATAR_STORAGE_KEY = "about-avatar-config-v1";
const SOUND_STORAGE_KEY = "about-sound-config-v1";
const SCANLINES_STORAGE_KEY = "about-scanlines-config-v1";
const MOOD_STORAGE_KEY = "about-status-mood-v1";

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
  const [isCustomColorOpen, setIsCustomColorOpen] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [activeTab, setActiveTabState] = useState("telemetry");

  // Sound settings
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SOUND_STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed.soundEnabled);
      }
    } catch {}
    return true;
  });

  const [switchSound, setSwitchSoundState] = useState<SwitchSound>(() => {
    try {
      const saved = localStorage.getItem(SOUND_STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (parsed.switchSound) return parsed.switchSound;
      }
    } catch {}
    return "thock";
  });

  // CRT scanlines
  const [isScanlinesEnabled, setIsScanlinesEnabledState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SCANLINES_STORAGE_KEY);
      if (saved !== null) {
        return Boolean(JSON.parse(saved));
      }
    } catch {}
    return false;
  });

  // Status mood
  const [statusMood, setStatusMoodState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(MOOD_STORAGE_KEY);
      if (saved) return saved;
    } catch {}
    return "in experience";
  });

  const [avatarState, setAvatarState] = useState<{ id: string }>(() => {
    try {
      const saved = localStorage.getItem(AVATAR_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.id && avatarPresets.some((a) => a.id === parsed.id)) {
          return { id: parsed.id };
        }
      }
    } catch {}
    return { id: "hiashley" };
  });

  const activeAvatarPreset =
    avatarPresets.find((a) => a.id === avatarState.id) || avatarPresets[0];

  const avatarId = activeAvatarPreset.id;
  const avatarSrc = activeAvatarPreset.src;
  const avatarInitials = activeAvatarPreset.initials || "AS";

  const playSound = useCallback(
    (sound?: SwitchSound) => {
      playTactileClick(sound || switchSound, soundEnabled);
    },
    [switchSound, soundEnabled]
  );

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    try {
      localStorage.setItem(
        SOUND_STORAGE_KEY,
        JSON.stringify({ soundEnabled: enabled, switchSound })
      );
    } catch {}
  };

  const setSwitchSound = (sound: SwitchSound) => {
    setSwitchSoundState(sound);
    playTactileClick(sound, true);
    try {
      localStorage.setItem(
        SOUND_STORAGE_KEY,
        JSON.stringify({ soundEnabled, switchSound: sound })
      );
    } catch {}
  };

  const setIsScanlinesEnabled = (enabled: boolean) => {
    setIsScanlinesEnabledState(enabled);
    playSound("pop");
    try {
      localStorage.setItem(SCANLINES_STORAGE_KEY, JSON.stringify(enabled));
    } catch {}
  };

  const setStatusMood = (mood: string) => {
    setStatusMoodState(mood);
    try {
      localStorage.setItem(MOOD_STORAGE_KEY, mood);
    } catch {}
  };

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    playSound("thock");
  };

  const setAvatar = (id: string) => {
    setAvatarState({ id });
    playSound("pop");
    try {
      localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify({ id }));
    } catch {}
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ mode, presetId, customColor, isCustom })
      );
    } catch {}
  }, [mode, presetId, customColor, isCustom]);

  // Apply to DOM (Modern CSS standards: color-scheme & theme-color sync)
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

      // Modern CSS standard: sync native color-scheme property
      root.style.colorScheme = isDarkActive ? "dark" : "light";
      body.style.colorScheme = isDarkActive ? "dark" : "light";

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

      let activeSurface0 = "";

      // 2. Custom color procedural engine vs Foundation Presets
      if (isCustom) {
        const palette = generateProceduralPalette(customColor, isDarkActive);
        activeSurface0 = palette.surface0;

        setCssVar("--color-surface-0", palette.surface0);
        setCssVar("--color-surface-100", palette.surface100);
        setCssVar("--color-surface-200", palette.surface200);
        setCssVar("--color-stroke-default", palette.strokeDefault);
        setCssVar("--color-stroke-emphasis", palette.strokeEmphasis);
        setCssVar("--color-system-emphasis", palette.accent);
        setCssVar("--color-action-emphasis-background", palette.accent);
        setCssVar("--accent-color", palette.accent);
        setCssVar("--color-content-emphasis", palette.contentEmphasis);
        setCssVar("--color-content-default", palette.contentDefault);
        setCssVar("--color-content-muted", palette.contentMuted);
      } else {
        const preset =
          themePresets.find((p) => p.id === presetId) || themePresets[0];

        const s0 = isDarkActive ? preset.darkSurface0 : preset.lightSurface0;
        const s1 = isDarkActive ? preset.darkSurface100 : preset.lightSurface100;
        const s2 = isDarkActive ? preset.darkSurface200 : preset.lightSurface200;
        activeSurface0 = s0;

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

      // Modern standard: sync <meta name="theme-color"> with active surface-0
      if (typeof document !== "undefined") {
        let metaTheme = document.querySelector('meta[name="theme-color"]');
        if (!metaTheme) {
          metaTheme = document.createElement("meta");
          metaTheme.setAttribute("name", "theme-color");
          document.head.appendChild(metaTheme);
        }
        if (activeSurface0) {
          metaTheme.setAttribute("content", activeSurface0);
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

  const setMode = (m: ThemeMode) => {
    setModeState(m);
    playSound("pop");
  };
  const setPresetId = (id: string) => {
    setPresetIdState(id);
    setIsCustomState(false);
    playSound("pop");
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
    playSound("pop");
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
        isCustomColorOpen,
        setIsCustomColorOpen,
        activePreset,
        resetTheme,
        avatarId,
        avatarSrc,
        avatarInitials,
        setAvatar,
        isAvatarDialogOpen,
        setIsAvatarDialogOpen,
        soundEnabled,
        setSoundEnabled,
        switchSound,
        setSwitchSound,
        playSound,
        isScanlinesEnabled,
        setIsScanlinesEnabled,
        statusMood,
        setStatusMood,
        isShortcutsOpen,
        setIsShortcutsOpen,
        activeTab,
        setActiveTab,
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
