import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeroMedia,
  DialogBody,
  DialogTitle,
  DialogFooter,
  Button,
  Icon,
  Divider,
} from "@rbx/foundation-ui";
import { useTheme, ThemeMode } from "../context/ThemeContext";
import { themePresets, customColorSwatches } from "../data/themes";

export function SettingsDialog() {
  const {
    mode,
    setMode,
    presetId,
    setPresetId,
    customColor,
    setCustomColor,
    isCustom,
    isSettingsOpen,
    setIsSettingsOpen,
    resetTheme,
  } = useTheme();

  const [hexInput, setHexInput] = useState(customColor);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val) || /^#[0-9A-Fa-f]{3}$/.test(val)) {
      setCustomColor(val);
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHexInput(val);
    setCustomColor(val);
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
      <DialogContent className="max-w-xl bg-surface-100 border border-stroke-default rounded-2xl overflow-hidden shadow-2xl">
        <DialogHeroMedia className="bg-surface-0 border-b border-stroke-default px-6 py-5 flex items-center pr-16">
          <div className="flex items-center gap-medium">
            <div className="w-10 h-10 rounded-xl bg-surface-200 border border-stroke-default flex items-center justify-center text-content-emphasis shadow-sm">
              <Icon name="icon-regular-gear" size="Medium" />
            </div>
            <div>
              <span className="text-title-medium font-extended font-bold content-emphasis lowercase tracking-tight">
                settings
              </span>
              <p className="text-body-medium content-muted lowercase mt-0.5">
                interface mode & procedural foundation color engine
              </p>
            </div>
          </div>
        </DialogHeroMedia>

        <DialogBody className="p-6 flex flex-col gap-large max-h-[75vh] overflow-y-auto">
          {/* Appearance Mode */}
          <div className="flex flex-col gap-small">
            <div className="flex flex-col gap-xxsmall">
              <DialogTitle className="text-title-small content-emphasis font-bold lowercase">
                appearance mode
              </DialogTitle>
              <p className="text-body-medium content-muted lowercase">
                system dynamic sync, daylight mode, or high-contrast dark
              </p>
            </div>

            <div className="grid grid-cols-3 gap-small p-1.5 bg-surface-0/70 rounded-xl border border-stroke-default shadow-inner">
              <button
                type="button"
                onClick={() => setMode("auto")}
                className={`flex items-center justify-center gap-small py-2.5 px-3 rounded-lg text-body-medium font-medium transition-all ${
                  mode === "auto"
                    ? "bg-surface-200 text-content-emphasis font-bold shadow-sm border border-stroke-default"
                    : "text-content-muted hover:text-content-emphasis hover:bg-surface-100/50"
                }`}
              >
                <Icon name="icon-regular-three-sliders-horizontal" size="Small" />
                <span className="lowercase">auto</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("light")}
                className={`flex items-center justify-center gap-small py-2.5 px-3 rounded-lg text-body-medium font-medium transition-all ${
                  mode === "light"
                    ? "bg-surface-200 text-content-emphasis font-bold shadow-sm border border-stroke-default"
                    : "text-content-muted hover:text-content-emphasis hover:bg-surface-100/50"
                }`}
              >
                <Icon name="icon-regular-sun" size="Small" />
                <span className="lowercase">light</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("dark")}
                className={`flex items-center justify-center gap-small py-2.5 px-3 rounded-lg text-body-medium font-medium transition-all ${
                  mode === "dark"
                    ? "bg-surface-200 text-content-emphasis font-bold shadow-sm border border-stroke-default"
                    : "text-content-muted hover:text-content-emphasis hover:bg-surface-100/50"
                }`}
              >
                <Icon name="icon-regular-moon" size="Small" />
                <span className="lowercase">dark</span>
              </button>
            </div>
          </div>

          <Divider />

          {/* Foundation Presets */}
          <div className="flex flex-col gap-small">
            <div className="flex flex-col gap-xxsmall">
              <span className="text-title-small content-emphasis font-bold lowercase">
                foundation presets
              </span>
              <p className="text-body-medium content-muted lowercase">
                official foundation palettes without corporate drone names
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-small">
              {themePresets.map((preset) => {
                const isSelected = !isCustom && presetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setPresetId(preset.id)}
                    className={`group relative flex items-center gap-small p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-system-emphasis bg-surface-200 shadow-md ring-1 ring-system-emphasis"
                        : "border-stroke-default bg-surface-0 hover:bg-surface-200/60 hover:border-stroke-emphasis"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 shadow-sm transition-transform group-hover:scale-110"
                      style={{ backgroundColor: preset.accentColor }}
                    />
                    <span className="text-body-medium font-medium content-emphasis lowercase truncate flex-1">
                      {preset.name}
                    </span>
                    {isSelected && (
                      <span className="content-system-emphasis shrink-0">
                        <Icon name="icon-regular-check" size="Small" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <Divider />

          {/* Procedural Custom Color Engine */}
          <div className="flex flex-col gap-small">
            <div className="flex flex-col gap-xxsmall">
              <span className="text-title-small content-emphasis font-bold lowercase">
                custom color engine
              </span>
              <p className="text-body-medium content-muted lowercase">
                transforms the entire canvas, surfaces, and borders to any hex code
              </p>
            </div>

            {/* Quick swatches */}
            <div className="flex items-center flex-wrap gap-small">
              {customColorSwatches.map((swatch) => {
                const isSelected =
                  isCustom &&
                  customColor.toLowerCase() === swatch.color.toLowerCase();
                return (
                  <button
                    key={swatch.color}
                    type="button"
                    onClick={() => {
                      setHexInput(swatch.color);
                      setCustomColor(swatch.color);
                    }}
                    className={`w-8 h-8 rounded-full border transition-all ${
                      isSelected
                        ? "scale-110 ring-2 ring-system-emphasis ring-offset-2 ring-offset-surface-100 border-white"
                        : "border-white/20 hover:scale-110 opacity-85 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: swatch.color }}
                    title={swatch.name}
                  />
                );
              })}
            </div>

            {/* Hex code input & native color picker */}
            <div className="flex items-center gap-small p-2.5 rounded-xl bg-surface-0 border border-stroke-default mt-1">
              <label
                className="relative w-8 h-8 rounded-lg overflow-hidden cursor-pointer border border-stroke-default shrink-0 shadow-sm"
                style={{ backgroundColor: customColor }}
                title="open native color wheel"
              >
                <input
                  type="color"
                  value={customColor}
                  onChange={handleColorPickerChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </label>

              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={hexInput}
                  onChange={handleHexChange}
                  placeholder="#00e5ff"
                  className="w-full bg-transparent border-none outline-none font-mono text-body-medium content-emphasis lowercase px-1"
                />
              </div>

              <span className="text-caption-large font-mono px-2 py-1 rounded bg-surface-200 border border-stroke-default content-muted lowercase">
                hex
              </span>
            </div>
          </div>
        </DialogBody>

        <Divider />

        <DialogFooter className="px-6 py-4 flex items-center justify-between bg-surface-100">
          <Button
            variant="Standard"
            size="Small"
            onClick={resetTheme}
            className="flex items-center gap-xsmall"
          >
            <span>reset default</span>
          </Button>

          <Button
            variant="Emphasis"
            size="Medium"
            onClick={() => setIsSettingsOpen(false)}
          >
            done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
