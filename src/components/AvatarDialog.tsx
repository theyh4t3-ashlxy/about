import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Icon,
  Avatar,
  Badge,
} from "@rbx/foundation-ui";
import { useTheme, moodPresets } from "../context/ThemeContext";
import { avatarPresets } from "../data/avatars";

export function AvatarDialog() {
  const {
    avatarId,
    setAvatar,
    isAvatarDialogOpen,
    setIsAvatarDialogOpen,
    statusMood,
    setStatusMood,
    playSound,
  } = useTheme();

  const [customMoodInput, setCustomMoodInput] = useState("");

  const handleCustomMoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMoodInput.trim()) {
      setStatusMood(customMoodInput.trim().toLowerCase());
      playSound("pop");
      setCustomMoodInput("");
    }
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
      <DialogContent className="max-width-[620px] clip shadow-transient-high">
        {/* Content Wrapper */}
        <div className="padding-x-xlarge padding-top-xlarge padding-bottom-large text-body-medium flex flex-col gap-large font-builder lowercase max-height-[75vh] overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col gap-xxsmall padding-right-[42px]">
            <DialogTitle className="text-heading-small margin-none content-emphasis lowercase font-extended">
              persona & status mood
            </DialogTitle>
            <p className="text-body-small content-muted margin-none">
              select your active avatar and runtime status line.
            </p>
          </div>

          {/* Section 1: Preset Avatars */}
          <div className="flex flex-col gap-small">
            <span className="text-label-medium content-sub lowercase">
              which ashley do you want?
            </span>
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
                      <div className="size-1000 shrink-0 radius-circle clip flex items-center justify-center bg-shift-100 stroke-standard stroke-default">
                        <Avatar
                          src={preset.src}
                          initials={preset.initials || "AS"}
                          size="Medium"
                          alt={preset.name}
                          className="object-cover width-full height-full"
                        />
                      </div>

                      <div className="flex flex-col items-start min-width-0">
                        <span className="text-label-medium font-extended content-emphasis text-truncate-end">
                          {preset.name}
                        </span>
                        <span className="text-caption-small content-muted text-truncate-end">
                          {preset.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Right Side: Radio Indicator */}
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

          {/* Section 2: Status Mood Switcher */}
          <div className="flex flex-col gap-small">
            <div className="flex items-center justify-between">
              <span className="text-label-medium content-sub lowercase">
                active status line
              </span>
              <Badge label={statusMood} size="Small" variant="Success" />
            </div>

            {/* Quick Mood Chips */}
            <div className="flex flex-wrap gap-xsmall">
              {moodPresets.map((mood) => {
                const isSelected = statusMood.toLowerCase() === mood.toLowerCase();
                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => {
                      setStatusMood(mood);
                      playSound("pop");
                    }}
                    data-state={isSelected ? "checked" : "unchecked"}
                    className="foundation-web-button relative clip group/interactable focus-visible:outline-focus cursor-pointer padding-x-small padding-y-xsmall radius-small text-label-small stroke-standard stroke-default bg-surface-100 data-[state=checked]:bg-system-emphasis data-[state=checked]:content-inverse-emphasis data-[state=unchecked]:content-default transition-colors lowercase"
                  >
                    <div
                      aria-hidden="true"
                      data-testid="foundation-web-state-layer"
                      className="absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)]"
                    />
                    <span className="relative z-10">{mood}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Mood Input */}
            <form onSubmit={handleCustomMoodSubmit} className="flex gap-small margin-top-xxsmall">
              <input
                type="text"
                value={customMoodInput}
                onChange={(e) => setCustomMoodInput(e.target.value)}
                placeholder="type custom status..."
                className="width-full padding-x-medium height-800 radius-medium bg-shift-100 stroke-standard stroke-default outline-none content-emphasis placeholder:content-muted text-body-medium font-mono lowercase"
              />
              <Button
                variant="Standard"
                size="Small"
                type="submit"
                className="shrink-0 cursor-pointer lowercase"
              >
                <span>set</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="padding-x-xlarge padding-bottom-xlarge width-full flex flex-col gap-small">
          <Button
            variant="Emphasis"
            size="Medium"
            onClick={() => {
              playSound("pop");
              setIsAvatarDialogOpen(false);
            }}
            className="width-full cursor-pointer lowercase"
          >
            <span>done</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
