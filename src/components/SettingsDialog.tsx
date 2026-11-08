import React from "react";
import {
  Dialog,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogFooter,
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
  } = useTheme();

  const handleOpenColorGenerator = () => {
    setIsSettingsOpen(false);
    setIsCustomColorOpen(true);
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
      <DialogContent className="relative radius-large bg-surface-100 stroke-muted stroke-standard foundation-web-dialog-content shadow-transient-high">

        {/* CONTENT WRAPPER - Added lowercase here to cascade down */}
        <div className="padding-x-xlarge padding-top-xlarge padding-bottom-xlarge text-body-medium flex flex-col gap-large font-builder lowercase">

          <DialogTitle className="text-heading-small margin-none content-emphasis lowercase">
            Settings
          </DialogTitle>

          {/* --- APPEARANCE MODE --- */}
          <div className="flex flex-col gap-small">
            <span className="text-label-medium content-sub lowercase">Appearance mode</span>
            <div className="flex bg-shift-100 padding-xxsmall radius-medium">
              {[
                { id: "auto", label: "auto", icon: "icon-regular-three-sliders-horizontal" },
                { id: "light", label: "light", icon: "icon-regular-sun" },
                { id: "dark", label: "dark", icon: "icon-regular-moon" }
              ].map((m) => {
                const isSelected = mode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id as any)}
                    data-state={isSelected ? "checked" : "unchecked"}
                    className="foundation-web-button relative clip group/interactable focus-visible:outline-focus flex-1 flex items-center justify-center padding-y-small radius-small text-label-medium bg-none data-[state=checked]:bg-surface-100 data-[state=checked]:content-emphasis data-[state=checked]:shadow-sm data-[state=unchecked]:content-sub stroke-none lowercase"
                  >
                    <div aria-hidden="true" data-testid="foundation-web-state-layer" className="absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)]"></div>
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
            <span className="text-label-medium content-sub lowercase">Foundation presets</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-small">
              {themePresets.map((preset) => {
                const isSelected = !isCustom && presetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setPresetId(preset.id)}
                    data-state={isSelected ? "checked" : "unchecked"}
                    className="foundation-web-button relative clip group/interactable focus-visible:outline-focus flex items-center padding-small radius-medium bg-shift-100 data-[state=checked]:bg-shift-200 stroke-none text-align-x-left lowercase"
                  >
                    <div aria-hidden="true" data-testid="foundation-web-state-layer" className="absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)]"></div>

                    <span className="size-400 radius-circle shrink-0 relative z-10" style={{ backgroundColor: preset.accentColor }} />
                    <span className="text-label-medium content-emphasis text-truncate-end grow-1 margin-left-small relative z-10">
                      {preset.name}
                    </span>

                    <span className={`content-emphasis shrink-0 relative z-10 ${isSelected ? 'visible' : 'invisible'}`}>
                      <Icon name="icon-regular-check" size="Small" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* --- CUSTOM THEME --- */}
          <div className="bg-shift-100 padding-medium radius-medium flex items-center justify-between gap-medium lowercase">
            <div className="flex items-center gap-medium min-width-0">
              <span
                className="size-800 radius-circle shrink-0 flex items-center justify-center stroke-standard stroke-default"
                style={{ backgroundColor: customColor }}
              >
                {isCustom && <Icon name="icon-regular-check" size="Small" className="content-inverse-emphasis" />}
              </span>
              <div className="flex flex-col min-width-0">
                <span className="text-label-medium content-emphasis text-truncate-end">
                  Custom canvas color
                </span>
                <span className="text-caption-small content-sub text-truncate-end">
                  {isCustom ? `active: ${customColor}` : "procedural color wheel & hex generator"}
                </span>
              </div>
            </div>

            <Button
              variant="Standard"
              size="Small"
              onClick={handleOpenColorGenerator}
              className="shrink-0 flex items-center gap-xsmall lowercase"
            >
              <span>{isCustom ? "Edit" : "Color wheel"}</span>
              <Icon name="icon-regular-paint-brush" size="Small" />
            </Button>
          </div>

        </div>

        {/* --- FOOTER WRAPPER --- */}
        <div className="padding-x-xlarge padding-bottom-xlarge width-full flex flex-col gap-small lowercase">
          <Button
            variant="Emphasis"
            size="Medium"
            onClick={() => setIsSettingsOpen(false)}
            className="width-full lowercase"
          >
            Done
          </Button>
          <Button
            variant="Standard"
            size="Medium"
            onClick={resetTheme}
            className="width-full lowercase"
          >
            Reset default
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
