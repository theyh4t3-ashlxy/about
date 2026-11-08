import React, { useState } from "react";
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
      <DialogContent className="relative radius-large bg-surface-100 stroke-muted stroke-standard foundation-web-dialog-content shadow-transient-high">

        {/* CONTENT WRAPPER */}
        <div className="padding-x-xlarge padding-top-xlarge padding-bottom-xlarge text-body-medium flex flex-col gap-large font-builder lowercase">

          <div className="flex flex-col gap-xsmall">
            <DialogTitle className="text-heading-small margin-none content-emphasis lowercase">
              Canvas color generator
            </DialogTitle>
            <p className="text-body-medium content-sub lowercase">
              procedural surface engine · shifts entire website
            </p>
          </div>

          {/* --- HEX INPUT & COLOR WHEEL --- */}
          <div className="flex flex-col gap-small">
            <span className="text-label-medium content-sub lowercase">pick or enter hex code</span>

            {/* Using the EXACT foundation-web-input structure from the Change Name dump */}
            <div className="foundation-web-input flex items-center width-full stroke-standard bg-shift-100 height-1000 radius-medium padding-x-medium gap-small stroke-contrast-alpha focus-within:stroke-system-emphasis">

              {/* The Color Swatch / Native Picker Trigger */}
              <label
                className="relative size-600 radius-circle overflow-hidden cursor-pointer shrink-0 stroke-standard stroke-default shadow-sm"
                style={{ backgroundColor: customColor }}
                title="open native color wheel"
              >
                <input
                  type="color"
                  value={customColor}
                  onChange={handleColorPickerChange}
                  className="absolute inset-[0] opacity-0 cursor-pointer width-full height-full"
                />
              </label>

              {/* The Input Field */}
              <input
                type="text"
                value={hexInput}
                onChange={handleHexChange}
                placeholder="#00e5ff"
                className="width-full padding-none bg-none stroke-none outline-none content-emphasis placeholder:content-muted text-body-medium lowercase"
              />

              {/* The 'hex' badge on the right */}
              <span className="foundation-web-badge flex items-center select-none gap-[var(--size-150)] radius-circle height-600 width-[fit-content] padding-x-small bg-shift-200 content-emphasis stroke-none">
                <span className="text-no-wrap text-truncate-split text-label-small padding-y-xsmall padding-x-xxsmall content-emphasis lowercase">
                  hex
                </span>
              </span>
            </div>
          </div>

          {/* --- QUICK SWATCHES --- */}
          <div className="flex flex-col gap-small">
            <span className="text-label-medium content-sub lowercase">preset swatches</span>
            <div className="flex items-center flex-wrap gap-small">
              {customColorSwatches.map((swatch) => {
                const isSelected = customColor.toLowerCase() === swatch.color.toLowerCase();
                return (
                  <button
                    key={swatch.color}
                    type="button"
                    onClick={() => {
                      setHexInput(swatch.color);
                      setCustomColor(swatch.color);
                    }}
                    data-state={isSelected ? "checked" : "unchecked"}
                    className="foundation-web-button relative clip group/interactable focus-visible:outline-focus flex items-center justify-center size-800 radius-circle bg-none data-[state=checked]:stroke-[3px] data-[state=checked]:stroke-system-contrast data-[state=unchecked]:stroke-none transition-all"
                    style={{ backgroundColor: swatch.color }}
                    title={swatch.name}
                  >
                    <div aria-hidden="true" data-testid="foundation-web-state-layer" className="absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)]"></div>
                    {isSelected && (
                      <Icon name="icon-regular-check" size="Small" className="content-inverse-emphasis relative z-10 drop-shadow-md" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* --- LIVE PREVIEW CARD --- */}
          <div className="bg-shift-100 padding-medium radius-medium flex flex-col gap-small">
            <span className="text-label-medium content-sub lowercase">live generated palette</span>

            <div className="grid grid-cols-4 gap-small padding-top-xxsmall">
              <div className="flex flex-col items-center gap-small">
                <div className="width-full height-800 radius-small stroke-standard stroke-default bg-surface-0 shadow-sm" title="canvas (surface-0)" />
                <span className="text-caption-small content-muted lowercase">canvas</span>
              </div>
              <div className="flex flex-col items-center gap-small">
                <div className="width-full height-800 radius-small stroke-standard stroke-default bg-surface-100 shadow-sm" title="cards (surface-100)" />
                <span className="text-caption-small content-muted lowercase">cards</span>
              </div>
              <div className="flex flex-col items-center gap-small">
                <div className="width-full height-800 radius-small stroke-standard stroke-default bg-surface-200 shadow-sm" title="elevated (surface-200)" />
                <span className="text-caption-small content-muted lowercase">elevated</span>
              </div>
              <div className="flex flex-col items-center gap-small">
                <div className="width-full height-800 radius-small stroke-standard stroke-default shadow-sm" style={{ backgroundColor: customColor }} title="accent (system-emphasis)" />
                <span className="text-caption-small content-muted lowercase">accent</span>
              </div>
            </div>
          </div>

        </div>

        {/* --- FOOTER WRAPPER --- */}
        <div className="padding-x-xlarge padding-bottom-xlarge width-full flex flex-col gap-small lowercase">
          <Button
            variant="Emphasis"
            size="Medium"
            onClick={() => setIsCustomColorOpen(false)}
            className="width-full lowercase"
          >
            apply & close
          </Button>
          <Button
            variant="Standard"
            size="Medium"
            onClick={handleBackToSettings}
            className="width-full lowercase flex items-center justify-center gap-xsmall"
          >
            <Icon name="icon-regular-gear" size="Small" />
            <span>settings</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
