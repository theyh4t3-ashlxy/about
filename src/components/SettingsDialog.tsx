import React from "react";
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
      <DialogContent className="max-w-xl bg-surface-100 border border-stroke-default rounded-large overflow-hidden shadow-2xl">
        <DialogHeroMedia className="bg-surface-0 border-b border-stroke-default px-6 py-4 flex items-center pr-16">
          <div className="flex items-center gap-medium">
            <div className="w-9 h-9 rounded-medium bg-shift-100 border border-stroke-default flex items-center justify-center text-content-emphasis shadow-sm">
              <Icon name="icon-regular-gear" size="Medium" />
            </div>
            <div>
              <span className="text-title-medium font-extended font-bold content-emphasis lowercase tracking-tight">
                settings
              </span>
              <p className="text-body-medium content-muted lowercase mt-0.5">
                interface mode & foundation color engine
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

            <div className="grid grid-cols-3 gap-small p-1 bg-surface-0 rounded-medium border border-stroke-default">
              <button
                type="button"
                onClick={() => setMode("auto")}
                className={`flex items-center justify-center gap-small py-2 px-3 rounded-small text-body-medium transition-colors cursor-pointer ${
                  mode === "auto"
                    ? "bg-shift-200 content-emphasis font-bold shadow-sm"
                    : "bg-shift-100 content-muted hover:content-emphasis hover:bg-shift-200"
                }`}
              >
                <Icon name="icon-regular-three-sliders-horizontal" size="Small" />
                <span className="lowercase">auto</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("light")}
                className={`flex items-center justify-center gap-small py-2 px-3 rounded-small text-body-medium transition-colors cursor-pointer ${
                  mode === "light"
                    ? "bg-shift-200 content-emphasis font-bold shadow-sm"
                    : "bg-shift-100 content-muted hover:content-emphasis hover:bg-shift-200"
                }`}
              >
                <Icon name="icon-regular-sun" size="Small" />
                <span className="lowercase">light</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("dark")}
                className={`flex items-center justify-center gap-small py-2 px-3 rounded-small text-body-medium transition-colors cursor-pointer ${
                  mode === "dark"
                    ? "bg-shift-200 content-emphasis font-bold shadow-sm"
                    : "bg-shift-100 content-muted hover:content-emphasis hover:bg-shift-200"
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
                    className={`group relative flex items-center gap-small p-2.5 rounded-medium border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-system-emphasis bg-shift-200 shadow-sm ring-1 ring-system-emphasis"
                        : "border-stroke-default bg-surface-0 hover:bg-shift-100 hover:border-stroke-emphasis"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-circle shrink-0 shadow-sm transition-transform group-hover:scale-110"
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

          {/* Custom Theme Popout Trigger */}
          <div className="p-4 rounded-medium bg-surface-0 border border-stroke-default flex items-center justify-between gap-medium">
            <div className="flex items-center gap-small min-w-0">
              <span
                className="w-8 h-8 rounded-circle border border-stroke-default shrink-0 shadow-sm flex items-center justify-center"
                style={{ backgroundColor: customColor }}
              >
                {isCustom && <Icon name="icon-regular-check" size="Small" className="text-white drop-shadow" />}
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-body-medium font-bold content-emphasis lowercase">
                  custom canvas color
                </span>
                <p className="text-caption-large content-muted lowercase truncate">
                  {isCustom ? `active: ${customColor}` : "procedural color wheel & hex generator"}
                </p>
              </div>
            </div>

            <Button
              variant={isCustom ? "Emphasis" : "Standard"}
              size="Small"
              onClick={handleOpenColorGenerator}
              className="flex items-center gap-xsmall shrink-0"
            >
              <span>{isCustom ? "edit custom" : "color wheel"}</span>
              <Icon name="icon-regular-paint-brush" size="Small" />
            </Button>
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
