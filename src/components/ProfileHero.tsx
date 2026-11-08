import React from "react";
import { Avatar, Badge, Button, Icon } from "@rbx/foundation-ui";
import { profileData } from "../data/profile";
import { useTheme } from "../context/ThemeContext";

export function ProfileHero() {
  const { avatarSrc, avatarInitials, setIsAvatarDialogOpen } = useTheme();

  return (
    <div className="bg-surface-100 border border-stroke-default rounded-large p-6 sm:p-7 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-large">
        <div className="flex items-start sm:items-center gap-medium min-w-0">
          <button
            type="button"
            onClick={() => setIsAvatarDialogOpen(true)}
            className="group relative cursor-pointer rounded-full p-0 border-0 bg-transparent outline-none focus-visible:outline-focus shrink-0 transition-transform active:scale-95"
            aria-label="switch profile picture"
            title="click to change profile picture"
          >
            <Avatar
              src={avatarSrc}
              initials={avatarInitials}
              size="XLarge"
              status="InExperience"
              alt="Ashley avatar"
              className="shrink-0"
            />
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Icon name="icon-regular-photo-camera" size="Small" className="text-white drop-shadow" />
            </div>
          </button>

          <div className="flex flex-col gap-xxsmall min-w-0">
            <div className="flex flex-wrap items-center gap-small">
              <h1 className="text-heading-large font-extended content-emphasis tracking-tight truncate lowercase">
                {profileData.handle}
              </h1>
              <Badge label="in experience" size="Small" variant="Success" />
            </div>

            <div className="flex flex-wrap items-center gap-xsmall text-body-medium content-muted pt-0.5">
              <span className="font-mono content-emphasis font-bold">@theyh4t3-ashlxy</span>
              <span className="content-subtle">•</span>
              <span className="font-mono content-default">{profileData.deviceTag}</span>
              <span className="content-subtle">•</span>
              <span className="font-mono content-system-emphasis font-semibold">
                {profileData.osTag}
              </span>
            </div>

            <p className="text-body-medium content-default pt-2 max-w-2xl leading-relaxed">
              {profileData.bio}
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-small border-t sm:border-t-0 border-stroke-default pt-3 sm:pt-0 shrink-0">
          <Button
            asChild
            variant="Emphasis"
            size="Medium"
            className="cursor-pointer"
          >
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-xsmall"
            >
              <span>github profile</span>
              <Icon name="icon-regular-arrow-up-right-from-square" size="XSmall" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
