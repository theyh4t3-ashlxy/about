import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export function useKeyboardShortcuts() {
  const {
    setActiveTab,
    setIsSettingsOpen,
    isSettingsOpen,
    setIsAvatarDialogOpen,
    isAvatarDialogOpen,
    setIsCustomColorOpen,
    isCustomColorOpen,
    setIsShortcutsOpen,
    isShortcutsOpen,
    soundEnabled,
    setSoundEnabled,
    playSound,
  } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Ignore if command / ctrl / alt modifiers are active
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      switch (e.key) {
        case "1":
          e.preventDefault();
          setActiveTab("telemetry");
          break;
        case "2":
          e.preventDefault();
          setActiveTab("projects");
          break;
        case "3":
          e.preventDefault();
          setActiveTab("media");
          break;
        case "4":
          e.preventDefault();
          setActiveTab("bugs");
          break;
        case "s":
        case "S":
          e.preventDefault();
          playSound("thock");
          setIsSettingsOpen(!isSettingsOpen);
          break;
        case "a":
        case "A":
          e.preventDefault();
          playSound("thock");
          setIsAvatarDialogOpen(!isAvatarDialogOpen);
          break;
        case "c":
        case "C":
          e.preventDefault();
          playSound("thock");
          setIsCustomColorOpen(!isCustomColorOpen);
          break;
        case "?":
          e.preventDefault();
          playSound("thock");
          setIsShortcutsOpen(!isShortcutsOpen);
          break;
        case "m":
        case "M":
          e.preventDefault();
          setSoundEnabled(!soundEnabled);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    setActiveTab,
    setIsSettingsOpen,
    isSettingsOpen,
    setIsAvatarDialogOpen,
    isAvatarDialogOpen,
    setIsCustomColorOpen,
    isCustomColorOpen,
    setIsShortcutsOpen,
    isShortcutsOpen,
    soundEnabled,
    setSoundEnabled,
    playSound,
  ]);
}
