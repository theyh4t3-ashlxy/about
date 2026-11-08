import React from "react";
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
    setAvatar,
    isAvatarDialogOpen,
    setIsAvatarDialogOpen,
  } = useTheme();

  return (
    <Dialog
      size="Medium"
      isModal={true}
      hasCloseAffordance={true}
      closeLabel="close avatar switcher"
      open={isAvatarDialogOpen}
      onOpenChange={setIsAvatarDialogOpen}
    >
      <DialogContent className="relative radius-large bg-surface-100 stroke-muted stroke-standard foundation-web-dialog-content shadow-transient-high">

        {/* Content Wrapper */}
        <div className="padding-x-xlarge padding-top-xlarge padding-bottom-large text-body-medium flex flex-col gap-large font-builder lowercase">

          {/* Header - Added padding-right to clear the close button */}
          <div className="flex flex-col gap-xxsmall padding-right-[42px]">
            <DialogTitle className="text-heading-small margin-none content-emphasis lowercase font-extended">
              which ashley do you want?
            </DialogTitle>
            <p className="text-body-small content-muted margin-none">
              select your active mood for the profile and status bar.
            </p>
          </div>

          {/* Preset Avatars List */}
          <div className="flex flex-col gap-small">
            {avatarPresets.map((preset) => {
              const isSelected = avatarId === preset.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setAvatar(preset.id)}
                  data-state={isSelected ? "checked" : "unchecked"}
                  className="foundation-web-button relative clip group/interactable focus-visible:outline-focus cursor-pointer flex flex-row items-center justify-between width-full padding-small radius-medium stroke-standard stroke-default bg-none data-[state=checked]:bg-shift-200 text-align-x-left transition-colors"
                >
                  {/* State Layer */}
                  <div
                    aria-hidden="true"
                    data-testid="foundation-web-state-layer"
                    className="absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)]"
                  />

                  {/* Left Side: Avatar & Text */}
                  <div className="flex flex-row items-center gap-medium min-width-0 relative z-10">

                    {/* Avatar Container */}
                    <div className="size-1000 shrink-0 radius-circle clip flex items-center justify-center bg-shift-100 stroke-standard stroke-default">
                      <Avatar
                        src={preset.src}
                        initials={preset.initials || "AS"}
                        size="Medium"
                        alt={preset.name}
                        className="object-cover width-full height-full"
                      />
                    </div>

                    {/* Text Container */}
                    <div className="flex flex-col items-start min-width-0">
                      <span className="text-label-medium font-extended content-emphasis text-truncate-end">
                        {preset.name}
                      </span>
                      <span className="text-caption-small content-muted text-truncate-end">
                        {preset.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: High-Contrast Radio Button */}
                  <div className="relative z-10 shrink-0 flex items-center justify-center padding-x-small">
                    <div
                      data-state={isSelected ? "checked" : "unchecked"}
                      className="size-500 radius-circle stroke-standard flex items-center justify-center transition-colors data-[state=checked]:stroke-emphasis data-[state=unchecked]:stroke-default"
                    >
                      {isSelected && (
                        <div className="size-250 radius-circle bg-system-emphasis shadow-sm" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
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
