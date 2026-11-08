import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Icon,
} from "@rbx/foundation-ui";
import { useTheme } from "../context/ThemeContext";
import { themePresets } from "../data/themes";

export function SettingsDialog() {
  const {
    mode,
    setMode,
    presetId,
    setPresetId,
    customColor,
    isCustom,
    isSettingsOpen,
    setIsSettingsOpen,
    setIsCustomColorOpen,
    resetTheme,
    soundEnabled,
    setSoundEnabled,
    switchSound,
    setSwitchSound,
    isScanlinesEnabled,
    setIsScanlinesEnabled,
    setIsShortcutsOpen,
    playSound,
  } = useTheme();

  const handleOpenColorGenerator = () => {
    setIsSettingsOpen(false);
    setIsCustomColorOpen(true);
  };

  const handleOpenShortcuts = () => {
    setIsSettingsOpen(false);
    setIsShortcutsOpen(true);
  };

  return (
    <Dialog
      size="Medium"
      isModal={true}
      hasCloseAffordance={true}
      closeLabel="close settings"
      open={isSettingsOpen}
      onOpenChange={setIsSettingsOpen}
    >
      <DialogContent className="max-width-[620px] clip shadow-transient-high">
        {/* CONTENT WRAPPER */}
        <div className="padding-x-xlarge padding-top-xlarge padding-bottom-xlarge text-body-medium flex flex-col gap-large font-builder lowercase max-height-[75vh] overflow-y-auto">
          <div className="flex flex-col gap-xxsmall">
            <DialogTitle className="text-heading-small margin-none content-emphasis lowercase font-extended">
              settings & preferences
            </DialogTitle>
            <p className="text-body-small content-muted margin-none">
              system appearance, tactile feedback, and terminal options.
            </p>
          </div>

          {/* --- APPEARANCE MODE --- */}
          <div className="flex flex-col gap-small">
            <span className="text-label-medium content-sub lowercase">appearance mode</span>
            <div className="flex bg-shift-100 padding-xxsmall radius-medium">
              {[
                { id: "auto", label: "auto", icon: "icon-regular-three-sliders-horizontal" },
                { id: "light", label: "light", icon: "icon-regular-sun" },
                { id: "dark", label: "dark", icon: "icon-regular-moon" },
              ].map((m) => {
                const isSelected = mode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id as any)}
                    data-state={isSelected ? "checked" : "unchecked"}
                    className="foundation-web-button relative clip group/interactable focus-visible:outline-focus flex-1 flex items-center justify-center padding-y-small radius-small text-label-medium bg-none data-[state=checked]:bg-surface-100 data-[state=checked]:content-emphasis data-[state=checked]:shadow-sm data-[state=unchecked]:content-sub stroke-none lowercase cursor-pointer"
                  >
                    <div
                      aria-hidden="true"
                      data-testid="foundation-web-state-layer"
                      className="absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)]"
                    />
                    <span className="flex items-center gap-small relative z-10">
                      <Icon name={m.icon as any} size="Small" />
                      <span>{m.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* --- FOUNDATION PRESETS --- */}
          <div className="flex flex-col gap-small">
            <span className="text-label-medium content-sub lowercase">foundation color presets</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-small">
              {themePresets.map((preset) => {
                const isSelected = !isCustom && presetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setPresetId(preset.id)}
                    data-state={isSelected ? "checked" : "unchecked"}
                    className="foundation-web-button relative clip group/interactable focus-visible:outline-focus flex items-center padding-small radius-medium bg-shift-100 data-[state=checked]:bg-shift-200 stroke-none text-align-x-left lowercase cursor-pointer"
                  >
                    <div
                      aria-hidden="true"
                      data-testid="foundation-web-state-layer"
                      className="absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)]"
                    />

                    <span
                      className="size-400 radius-circle shrink-0 relative z-10"
                      style={{ backgroundColor: preset.accentColor }}
                    />
                    <span className="text-label-medium content-emphasis text-truncate-end grow-1 margin-left-small relative z-10">
                      {preset.name}
                    </span>

                    <span
                      className={`content-emphasis shrink-0 relative z-10 ${
                        isSelected ? "visible" : "invisible"
                      }`}
                    >
                      <Icon name="icon-regular-check" size="Small" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* --- CUSTOM CANVAS COLOR --- */}
          <div className="bg-shift-100 padding-medium radius-medium flex items-center justify-between gap-medium lowercase">
            <div className="flex items-center gap-medium min-width-0">
              <span
                className="size-800 radius-circle shrink-0 flex items-center justify-center stroke-standard stroke-default"
                style={{ backgroundColor: customColor }}
              >
                {isCustom && (
                  <Icon
                    name="icon-regular-check"
                    size="Small"
                    className="content-inverse-emphasis"
                  />
                )}
              </span>
              <div className="flex flex-col min-width-0">
                <span className="text-label-medium content-emphasis text-truncate-end">
                  procedural canvas color
                </span>
                <span className="text-caption-small content-sub text-truncate-end">
                  {isCustom
                    ? `active: ${customColor}`
                    : "generate full custom palette via hex code"}
                </span>
              </div>
            </div>

            <Button
              variant="Standard"
              size="Small"
              onClick={handleOpenColorGenerator}
              className="shrink-0 flex items-center gap-xsmall lowercase cursor-pointer"
            >
              <span>{isCustom ? "edit" : "color wheel"}</span>
              <Icon name="icon-regular-paint-brush" size="Small" />
            </Button>
          </div>

          {/* --- TACTILE MECHANICAL SOUNDS --- */}
          <div className="bg-shift-100 padding-medium radius-medium flex flex-col gap-small lowercase">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-small">
                <Icon
                  name={
                    soundEnabled
                      ? "icon-regular-speaker"
                      : "icon-regular-speaker-slash"
                  }
                  size="Medium"
                  className="content-emphasis"
                />
                <div className="flex flex-col">
                  <span className="text-label-medium content-emphasis">
                    mechanical switch audio
                  </span>
                  <span className="text-caption-small content-muted">
                    synthesized web audio key clicks on interaction
                  </span>
                </div>
              </div>

              <Button
                variant={soundEnabled ? "Emphasis" : "Standard"}
                size="Small"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="cursor-pointer"
              >
                <span>{soundEnabled ? "on" : "off"}</span>
              </Button>
            </div>

            {soundEnabled && (
              <div className="flex items-center gap-xsmall margin-top-xxsmall pt-1">
                {(["thock", "clicky", "pop"] as const).map((sound) => {
                  const isCurrent = switchSound === sound;
                  return (
                    <button
                      key={sound}
                      type="button"
                      onClick={() => setSwitchSound(sound)}
                      data-state={isCurrent ? "checked" : "unchecked"}
                      className="foundation-web-button relative clip group/interactable focus-visible:outline-focus flex-1 padding-y-xsmall radius-small text-label-small content-default bg-surface-100 data-[state=checked]:bg-system-emphasis data-[state=checked]:content-inverse-emphasis stroke-standard stroke-default cursor-pointer text-center"
                    >
                      <div
                        aria-hidden="true"
                        data-testid="foundation-web-state-layer"
                        className="absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)]"
                      />
                      <span className="relative z-10">{sound}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* --- CRT SCANLINES & SHORTCUTS --- */}
          <div className="bg-shift-100 padding-medium radius-medium flex flex-col gap-small lowercase">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-small">
                <Icon
                  name="icon-regular-computer-monitor"
                  size="Medium"
                  className="content-emphasis"
                />
                <div className="flex flex-col">
                  <span className="text-label-medium content-emphasis">
                    crt scanline overlay
                  </span>
                  <span className="text-caption-small content-muted">
                    retro terminal phosphor scanlines effect
                  </span>
                </div>
              </div>

              <Button
                variant={isScanlinesEnabled ? "Emphasis" : "Standard"}
                size="Small"
                onClick={() => setIsScanlinesEnabled(!isScanlinesEnabled)}
                className="cursor-pointer"
              >
                <span>{isScanlinesEnabled ? "active" : "disabled"}</span>
              </Button>
            </div>

            <div className="stroke-standard stroke-default border-x-0 border-b-0 margin-top-xxsmall padding-top-small flex items-center justify-between">
              <span className="text-caption-small content-muted">
                hotkeys cheat sheet (press <kbd className="font-mono content-emphasis font-bold">?</kbd>)
              </span>
              <Button
                variant="Standard"
                size="Small"
                onClick={handleOpenShortcuts}
                className="cursor-pointer flex items-center gap-xsmall"
              >
                <Icon name="icon-regular-keyboard" size="XSmall" />
                <span>view shortcuts</span>
              </Button>
            </div>
          </div>
        </div>

        {/* --- FOOTER WRAPPER --- */}
        <div className="padding-x-xlarge padding-bottom-xlarge width-full flex flex-col gap-small lowercase">
          <Button
            variant="Emphasis"
            size="Medium"
            onClick={() => {
              playSound("pop");
              setIsSettingsOpen(false);
            }}
            className="width-full lowercase cursor-pointer"
          >
            done
          </Button>
          <Button
            variant="Standard"
            size="Medium"
            onClick={resetTheme}
            className="width-full lowercase cursor-pointer"
          >
            reset default
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
