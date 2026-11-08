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
      <DialogContent className="relative radius-large bg-surface-100 stroke-muted stroke-standard foundation-web-dialog-content shadow-transient-high max-width-[480px] width-full">
        {/* Content Wrapper */}
        <div className="padding-x-xlarge padding-top-xlarge padding-bottom-large text-body-medium flex flex-col gap-large font-builder lowercase">
          
          {/* Header */}
          <div className="flex flex-col gap-xxsmall">
            <DialogTitle className="text-heading-small margin-none content-emphasis lowercase font-extended">
              which ashley do you want?
            </DialogTitle>
            <p className="text-body-small content-muted margin-none">
              select your active mood for the profile and status bar.
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
                  onClick={() => setAvatar(preset.id)}
                  className={`foundation-web-button relative clip group/interactable focus-visible:outline-focus cursor-pointer flex items-center justify-between width-full padding-medium radius-medium stroke-standard text-left ${
                    isSelected
                      ? "bg-surface-200 stroke-emphasis"
                      : "bg-surface-100 stroke-default"
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
                      hasBorder={true}
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
                    <div className="relative z-10 shrink-0 content-system-success">
                      <Icon name="icon-regular-circle-check" size="Small" />
                    </div>
                  ) : (
                    <div className="relative z-10 shrink-0 content-muted opacity-40 group-hover/interactable:opacity-100 transition-opacity">
                      <Icon name="icon-regular-circle" size="Small" />
                    </div>
                  )}
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
