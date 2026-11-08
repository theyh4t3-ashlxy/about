import React from "react";
import { Avatar, Badge, Button, Icon } from "@rbx/foundation-ui";
import { profileData } from "../data/profile";
import { useTheme } from "../context/ThemeContext";

export function ProfileHero() {
  const { avatarSrc, avatarInitials, setIsAvatarDialogOpen } = useTheme();

  return (
    <div className="bg-surface-100 stroke-standard stroke-default radius-large padding-large sm:padding-xlarge transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-large">
        <div className="flex items-start sm:items-center gap-medium min-width-0">
          <button
            type="button"
            onClick={() => setIsAvatarDialogOpen(true)}
            className="group relative cursor-pointer radius-circle padding-none stroke-none bg-none outline-none focus-visible:outline-focus shrink-0 transition-transform active:scale-95"
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
            <div className="absolute inset-[0] radius-circle bg-common-backdrop opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Icon name="icon-regular-photo-camera" size="Small" className="content-emphasis drop-shadow" />
            </div>
          </button>

          <div className="flex flex-col gap-xxsmall min-width-0">
            <div className="flex flex-wrap items-center gap-small">
              <h1 className="text-heading-large font-extended content-emphasis tracking-tight text-truncate-end lowercase">
                {profileData.handle}
              </h1>
              <Badge label="in experience" size="Small" variant="Success" />
            </div>

            <div className="flex flex-wrap items-center gap-xsmall text-body-medium content-muted padding-top-xxsmall">
              <span className="font-mono content-emphasis font-bold">@theyh4t3-ashlxy</span>
              <span className="content-sub">•</span>
              <span className="font-mono content-default">{profileData.deviceTag}</span>
              <span className="content-sub">•</span>
              <span className="font-mono content-system-emphasis font-semibold">
                {profileData.osTag}
              </span>
            </div>

            <p className="text-body-medium content-default padding-top-xsmall max-width-[672px] leading-relaxed">
              {profileData.bio}
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-small stroke-standard stroke-default border-x-0 border-b-0 sm:border-t-0 padding-top-small sm:padding-top-none shrink-0">
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
