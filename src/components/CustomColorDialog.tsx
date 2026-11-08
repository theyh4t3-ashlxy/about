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
import { useTheme } from "../context/ThemeContext";
import { customColorSwatches } from "../data/themes";

export function CustomColorDialog() {
  const {
    customColor,
    setCustomColor,
    isCustomColorOpen,
    setIsCustomColorOpen,
    setIsSettingsOpen,
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

  const handleBackToSettings = () => {
    setIsCustomColorOpen(false);
    setIsSettingsOpen(true);
  };

  return (
    <Dialog
      size="Medium"
      isModal={true}
      hasCloseAffordance={true}
      closeLabel="close color generator"
      open={isCustomColorOpen}
      onOpenChange={setIsCustomColorOpen}
    >
      <DialogContent className="max-w-md bg-surface-100 border border-stroke-default rounded-large overflow-hidden shadow-2xl">
        <DialogHeroMedia className="bg-surface-0 border-b border-stroke-default px-6 py-4 flex items-center pr-16">
          <div className="flex items-center gap-medium">
            <div
              className="w-9 h-9 rounded-circle border border-stroke-default flex items-center justify-center shadow-sm shrink-0"
              style={{ backgroundColor: customColor }}
            >
              <Icon name="icon-regular-circle" size="Small" className="text-white drop-shadow" />
            </div>
            <div>
              <span className="text-title-medium font-extended font-bold content-emphasis lowercase tracking-tight">
                canvas color generator
              </span>
              <p className="text-body-medium content-muted lowercase mt-0.5">
                procedural surface engine · shifts entire website
              </p>
            </div>
          </div>
        </DialogHeroMedia>

        <DialogBody className="p-6 flex flex-col gap-large">
          {/* Color Wheel & Hex Input */}
          <div className="flex flex-col gap-small">
            <div className="flex flex-col gap-xxsmall">
              <DialogTitle className="text-title-small content-emphasis font-bold lowercase">
                pick or enter hex code
              </DialogTitle>
              <p className="text-body-medium content-muted lowercase">
                click the circle to open color wheel or type a hex
              </p>
            </div>

            <div className="flex items-center gap-small p-3 rounded-medium bg-surface-0 border border-stroke-default shadow-inner">
              <label
                className="relative w-10 h-10 rounded-circle overflow-hidden cursor-pointer border-2 border-white/40 shadow-sm shrink-0 transition-transform hover:scale-105"
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
                  className="w-full bg-transparent border-none outline-none font-mono text-title-small content-emphasis lowercase px-1"
                />
              </div>

              <span className="text-caption-small font-mono px-2 py-0.5 rounded bg-shift-200 border border-stroke-default content-muted lowercase">
                hex
              </span>
            </div>
          </div>

          <Divider />

          {/* Quick Swatches */}
          <div className="flex flex-col gap-small">
            <div className="flex flex-col gap-xxsmall">
              <span className="text-title-small content-emphasis font-bold lowercase">
                preset swatches
              </span>
              <p className="text-body-medium content-muted lowercase">
                vibrant foundations tuned for procedural contrast
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-small">
              {customColorSwatches.map((swatch) => {
                const isSelected =
                  customColor.toLowerCase() === swatch.color.toLowerCase();
                return (
                  <button
                    key={swatch.color}
                    type="button"
                    onClick={() => {
                      setHexInput(swatch.color);
                      setCustomColor(swatch.color);
                    }}
                    className={`w-8 h-8 rounded-circle border transition-all cursor-pointer ${
                      isSelected
                        ? "scale-110 ring-2 ring-system-emphasis ring-offset-2 ring-offset-surface-100 border-white shadow-md"
                        : "border-white/20 hover:scale-110 opacity-85 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: swatch.color }}
                    title={swatch.name}
                  />
                );
              })}
            </div>
          </div>

          <Divider />

          {/* Live Preview Card */}
          <div className="p-3.5 rounded-medium bg-surface-0 border border-stroke-default flex flex-col gap-xsmall">
            <span className="text-caption-large font-mono content-muted lowercase">
              live generated palette
            </span>
            <div className="grid grid-cols-4 gap-small pt-1">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-full h-7 rounded border border-stroke-default bg-surface-0"
                  title="canvas (surface-0)"
                />
                <span className="text-caption-small font-mono content-muted">canvas</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-full h-7 rounded border border-stroke-default bg-surface-100"
                  title="cards (surface-100)"
                />
                <span className="text-caption-small font-mono content-muted">cards</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-full h-7 rounded border border-stroke-default bg-surface-200"
                  title="elevated (surface-200)"
                />
                <span className="text-caption-small font-mono content-muted">elevated</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-full h-7 rounded border border-stroke-default"
                  style={{ backgroundColor: customColor }}
                  title="accent (system-emphasis)"
                />
                <span className="text-caption-small font-mono content-muted">accent</span>
              </div>
            </div>
          </div>
        </DialogBody>

        <Divider />

        <DialogFooter className="px-6 py-4 flex items-center justify-between bg-surface-100">
          <Button
            variant="Standard"
            size="Small"
            onClick={handleBackToSettings}
            className="flex items-center gap-xsmall"
          >
            <span>settings</span>
            <Icon name="icon-regular-gear" size="Small" />
          </Button>

          <Button
            variant="Emphasis"
            size="Medium"
            onClick={() => setIsCustomColorOpen(false)}
          >
            apply & close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
