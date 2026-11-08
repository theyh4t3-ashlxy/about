import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Icon,
  Avatar,
} from "@rbx/foundation-ui";
import { useTheme } from "../context/ThemeContext";
import { avatarPresets } from "../data/avatars";

export function AvatarDialog() {
  const {
    avatarId,
    avatarSrc,
    setAvatar,
    isAvatarDialogOpen,
    setIsAvatarDialogOpen,
  } = useTheme();

  const [customInput, setCustomInput] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSelectPreset = (id: string) => {
    setAvatar(id);
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setAvatar("custom", customInput.trim());
    setCustomInput("");
    setShowCustomInput(false);
  };

  return (
    <Dialog
      size="Medium"
      isModal={true}
      hasCloseAffordance={true}
      closeLabel="close avatar switcher"
      open={isAvatarDialogOpen}
      onOpenChange={setIsAvatarDialogOpen}
    >
      <DialogContent className="relative radius-large bg-surface-100 stroke-muted stroke-standard foundation-web-dialog-content shadow-transient-high max-width-[480px] width-full">
        {/* Content Wrapper */}
        <div className="padding-x-xlarge padding-top-xlarge padding-bottom-large text-body-medium flex flex-col gap-large font-builder lowercase">
          
          {/* Header */}
          <div className="flex flex-col gap-xxsmall">
            <DialogTitle className="text-heading-small margin-none content-emphasis lowercase font-extended">
              switch avatar
            </DialogTitle>
            <p className="text-body-small content-muted margin-none">
              select your active profile picture or paste a custom asset url.
            </p>
          </div>

          {/* Preset Avatars List (Roblox Switch Accounts Style) */}
          <div className="flex flex-col gap-small">
            {avatarPresets.map((preset) => {
              const isSelected = avatarId === preset.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`foundation-web-button relative clip group/interactable focus-visible:outline-focus cursor-pointer flex items-center justify-between width-full padding-medium radius-medium stroke-standard text-left transition-all ${
                    isSelected
                      ? "bg-surface-200 stroke-emphasis"
                      : "bg-surface-100 hover:bg-shift-100 stroke-default"
                  }`}
                >
                  <div
                    aria-hidden="true"
                    data-testid="foundation-web-state-layer"
                    className="absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)]"
                  />

                  <div className="flex items-center gap-medium min-width-0 relative z-10">
                    <Avatar
                      src={preset.src}
                      initials={preset.initials || "AS"}
                      size="Medium"
                      status="InExperience"
                      alt={preset.name}
                      className="shrink-0"
                    />

                    <div className="flex flex-col min-width-0">
                      <span className="text-label-medium font-extended content-emphasis text-truncate-end">
                        {preset.name}
                      </span>
                      <span className="text-caption-small font-mono content-muted text-truncate-end">
                        {preset.subtitle}
                      </span>
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="relative z-10 shrink-0 text-system-success">
                      <Icon name="icon-regular-circle-check" size="Small" />
                    </div>
                  ) : (
                    <div className="relative z-10 shrink-0 text-content-sub opacity-40 group-hover/interactable:opacity-100">
                      <Icon name="icon-regular-circle" size="Small" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Custom Avatar Option */}
          <div className="bg-shift-100 padding-medium radius-medium flex flex-col gap-small">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-small">
                <Icon name="icon-regular-chain-link" size="Small" className="content-muted" />
                <span className="text-label-small content-emphasis font-extended">
                  custom image url
                </span>
              </div>
              <Button
                variant="Standard"
                size="XSmall"
                onClick={() => setShowCustomInput(!showCustomInput)}
                className="cursor-pointer"
              >
                <span>{showCustomInput ? "cancel" : "+ add url"}</span>
              </Button>
            </div>

            {avatarId === "custom" && !showCustomInput && (
              <div className="flex items-center justify-between text-caption-small font-mono content-muted bg-surface-0 padding-small radius-small stroke-standard stroke-default">
                <span className="truncate max-width-[260px]">{avatarSrc}</span>
                <span className="text-system-success font-bold">active</span>
              </div>
            )}

            {showCustomInput && (
              <form onSubmit={handleApplyCustom} className="flex flex-col gap-xsmall margin-top-xsmall">
                <input
                  type="text"
                  placeholder="https://... or ./media/desktop.png"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="width-full padding-small radius-small bg-surface-0 stroke-standard stroke-default text-body-small content-emphasis font-mono outline-none focus:stroke-emphasis"
                />
                <Button
                  type="submit"
                  variant="Emphasis"
                  size="Small"
                  isDisabled={!customInput.trim()}
                  className="width-full cursor-pointer margin-top-xxsmall"
                >
                  <span>apply image</span>
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="padding-x-xlarge padding-bottom-xlarge width-full flex flex-col gap-small">
          <Button
            variant="Emphasis"
            size="Medium"
            onClick={() => setIsAvatarDialogOpen(false)}
            className="width-full cursor-pointer lowercase"
          >
            <span>done</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
