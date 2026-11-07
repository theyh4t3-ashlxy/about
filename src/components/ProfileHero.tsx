import React from "react";
import { Avatar, Badge, Button, Card, Icon } from "@rbx/foundation-ui";
import { profileData } from "../data/profile";

export function ProfileHero() {
  return (
    <Card
      variant="Emphasis"
      density="Comfortable"
      className="border border-stroke-default shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-large">
        <div className="flex items-start sm:items-center gap-medium min-w-0">
          <Avatar
            initials={profileData.avatarInitials}
            size="XLarge"
            status="InExperience"
            alt="Ashley avatar"
            className="ring-2 ring-stroke-emphasis shrink-0"
          />

          <div className="flex flex-col gap-xxsmall min-w-0">
            <div className="flex flex-wrap items-center gap-small">
              <h1 className="text-heading-medium font-extended content-emphasis tracking-tight truncate">
                {profileData.handle}
              </h1>
              <Badge label="in experience" size="Small" variant="Success" />
            </div>

            <div className="flex flex-wrap items-center gap-xsmall text-body-medium content-muted pt-0.5">
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
            variant="Standard"
            size="Medium"
            className="cursor-pointer"
          >
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-xsmall"
            >
              <span>github</span>
              <Icon name="icon-regular-arrow-up-right-from-square" size="XSmall" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
