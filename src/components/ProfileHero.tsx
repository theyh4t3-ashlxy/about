import React from "react";
import { Avatar, Badge, Card, Icon } from "@rbx/foundation-ui";
import { profileData } from "../data/profile";
import type { AccentColor } from "../types";

interface ProfileHeroProps {
  currentAccent: AccentColor;
  onAccentChange: (accent: AccentColor) => void;
}

export function ProfileHero({ currentAccent, onAccentChange }: ProfileHeroProps) {
  return (
    <Card
      variant="Emphasis"
      density="Comfortable"
      className="border border-stroke-default shadow-md"
      leading={
        <Avatar
          initials={profileData.avatarInitials}
          size="XLarge"
          status="InExperience"
          alt="Ashley avatar"
          className="ring-2 ring-stroke-emphasis"
        />
      }
      title={
        <span className="text-heading-large font-extended content-emphasis">
          {profileData.handle}
        </span>
      }
      badge={<Badge label="In Experience" size="Small" variant="Success" />}
      description={
        <div className="flex flex-col gap-xxsmall mt-1">
          <div className="flex flex-wrap items-center gap-xsmall text-body-medium content-muted">
            <span className="font-mono content-default">{profileData.deviceTag}</span>
            <span className="content-subtle">•</span>
            <span className="font-mono content-system-emphasis font-semibold">
              {profileData.osTag}
            </span>
            <span className="content-subtle">•</span>
            <span className="font-mono">{profileData.location}</span>
          </div>

          <p className="text-body-medium content-default pt-2 max-w-2xl leading-relaxed">
            {profileData.bio}
          </p>
        </div>
      }
      trailing={
        <div className="flex flex-col items-end gap-xsmall">
          <span className="text-label-small uppercase tracking-wider content-muted font-bold">
            photon accents
          </span>
          <div className="flex items-center gap-xsmall">
            {profileData.accentOptions.map((accent) => {
              const isSelected = currentAccent === accent.id;
              return (
                <button
                  key={accent.id}
                  onClick={() => onAccentChange(accent.id as AccentColor)}
                  title={accent.label}
                  aria-label={accent.label}
                  className={`w-6 h-6 rounded-circle transition-all flex items-center justify-center cursor-pointer ${
                    isSelected ? "ring-2 ring-white scale-110" : "hover:scale-105 opacity-80"
                  }`}
                  style={{ backgroundColor: accent.hex }}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-circle bg-white shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      }
    />
  );
}
