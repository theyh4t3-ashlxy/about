import React from "react";
import { Avatar, Badge, Card } from "@rbx/foundation-ui";
import { profileData } from "../data/profile";
import type { AccentColor } from "../types";

interface ProfileHeroProps {
  currentAccent: AccentColor;
  onAccentChange: (accent: AccentColor) => void;
}

export function ProfileHero({ currentAccent, onAccentChange }: ProfileHeroProps) {
  return (
    <Card className="!bg-[#191b1d] border border-[#2d3136] !p-6 rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Avatar
            initials={profileData.avatarInitials}
            size="XLarge"
            status="InExperience"
            alt="Ashley avatar"
            className="ring-2 ring-[#2d3136] !bg-[#24272c]"
          />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold text-[#f2f4f5] tracking-tight font-extended">
                {profileData.handle}
              </h1>
              <Badge label="In Experience" size="XSmall" variant="Success" />
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-[#a7b0b5]">
              <span className="font-mono">{profileData.deviceTag}</span>
              <span className="text-[#646b73]">•</span>
              <span className="font-mono text-[#00A2FF]">{profileData.osTag}</span>
              <span className="text-[#646b73]">•</span>
              <span className="font-mono">{profileData.location}</span>
            </div>

            <p className="mt-2 text-xs text-[#8f98a0] max-w-xl leading-relaxed">
              {profileData.bio}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-[#2d3136]">
          <span className="text-xs uppercase font-semibold tracking-wider text-[#8f98a0]">
            photon accents
          </span>
          <div className="flex items-center gap-2">
            {profileData.accentOptions.map((accent) => {
              const isSelected = currentAccent === accent.id;
              return (
                <button
                  key={accent.id}
                  onClick={() => onAccentChange(accent.id as AccentColor)}
                  title={accent.label}
                  aria-label={accent.label}
                  className={`w-6 h-6 rounded-full transition-all duration-150 flex items-center justify-center ${
                    isSelected ? "ring-2 ring-white scale-110" : "hover:scale-105 opacity-80"
                  }`}
                  style={{ backgroundColor: accent.hex }}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
