import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeroMedia,
  DialogBody,
  DialogTitle,
  DialogFooter,
  SegmentedControl,
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
  } = useTheme();

  return (
    <Dialog
      size="Medium"
      isModal={true}
      hasCloseAffordance={true}
      closeLabel="close settings"
      open={isSettingsOpen}
      onOpenChange={setIsSettingsOpen}
    >
      <DialogContent className="max-w-xl bg-surface-100 border border-stroke-default rounded-xl overflow-hidden shadow-2xl">
        <DialogHeroMedia className="bg-surface-0 border-b border-stroke-default px-6 py-4 flex items-center pr-16">
          <div className="flex items-center gap-small">
            <div className="p-2 rounded-small bg-surface-200">
              <Icon name="icon-regular-gear" size="Large" className="content-emphasis" />
            </div>
            <div>
              <span className="text-title-medium font-extended content-emphasis lowercase">
                settings
              </span>
              <p className="text-caption-large font-mono content-muted lowercase">
                appearance mode & foundation color overrides
              </p>
            </div>
          </div>
        </DialogHeroMedia>

        <DialogBody className="p-6 flex flex-col gap-large max-h-[75vh] overflow-y-auto">
          {/* Appearance Mode */}
          <div className="flex flex-col gap-small">
            <div className="flex flex-col gap-xxsmall">
              <DialogTitle className="text-heading-small content-emphasis font-extended lowercase">
                appearance mode
              </DialogTitle>
              <p className="text-body-medium content-muted lowercase">
                switch between light, dark, or system preferences
              </p>
            </div>

            <SegmentedControl
              value={mode}
              onValueChange={(val) => setMode(val as ThemeMode)}
              size="Medium"
              variant="Text"
              items={[
                { value: "auto", label: "auto" },
                { value: "light", label: "light" },
                { value: "dark", label: "dark" },
              ]}
              className="w-full"
            />
          </div>

          <Divider />

          {/* Foundation Presets */}
          <div className="flex flex-col gap-small">
            <div className="flex flex-col gap-xxsmall">
              <span className="text-label-small content-muted font-semibold lowercase">
                foundation presets
              </span>
              <p className="text-body-medium content-muted lowercase">
                official color palettes without corporate drone names
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
                    className={`flex items-center gap-small p-2.5 rounded-medium border text-left transition-all ${
                      isSelected
                        ? "border-system-emphasis bg-surface-200/80 shadow-sm"
                        : "border-stroke-default bg-surface-0 hover:border-stroke-emphasis"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-circle shrink-0 border border-white/20"
                      style={{ backgroundColor: preset.accentColor }}
                    />
                    <span className="text-body-medium font-mono content-emphasis lowercase truncate">
                      {preset.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <Divider />

          {/* Custom Accent Color */}
          <div className="flex flex-col gap-small">
            <div className="flex flex-col gap-xxsmall">
              <span className="text-label-small content-muted font-semibold lowercase">
                custom accent color
              </span>
              <p className="text-body-medium content-muted lowercase">
                pick quick swatches or any hex color
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-small">
              {customColorSwatches.map((swatch) => {
                const isSelected = isCustom && customColor.toLowerCase() === swatch.color.toLowerCase();
                return (
                  <button
                    key={swatch.color}
                    type="button"
                    onClick={() => setCustomColor(swatch.color)}
                    className={`w-7 h-7 rounded-circle border transition-transform ${
                      isSelected ? "ring-2 ring-system-emphasis scale-110 border-white" : "border-white/20 hover:scale-105"
                    }`}
                    style={{ backgroundColor: swatch.color }}
                    title={swatch.name}
                  />
                );
              })}

              <div className="flex items-center gap-xsmall ml-auto bg-surface-0 border border-stroke-default px-3 py-1.5 rounded-medium">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-6 h-6 rounded-circle cursor-pointer border-0 bg-transparent p-0"
                  aria-label="custom color picker"
                />
                <span className="text-caption-large font-mono content-emphasis lowercase">
                  {isCustom ? customColor : "picker"}
                </span>
              </div>
            </div>
          </div>
        </DialogBody>

        <Divider />

        <DialogFooter className="px-6 py-4 flex items-center justify-end bg-surface-100">
          <Button
            variant="Standard"
            size="Medium"
            onClick={() => setIsSettingsOpen(false)}
          >
            close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
