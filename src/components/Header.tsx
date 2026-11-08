import React, { useState, useEffect } from "react";
import { Icon, StatusIndicator, Avatar } from "@rbx/foundation-ui";
import { useTheme } from "../context/ThemeContext";

export function Header() {
  const [time, setTime] = useState("");
  const { setIsSettingsOpen, avatarSrc, avatarInitials, setIsAvatarDialogOpen } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="width-full bg-surface-100 stroke-standard stroke-default border-l-0 border-t-0 border-r-0 sticky top-[0] [z-index:50] lowercase">
      <div className="max-width-[1024px] width-full margin-x-auto padding-x-medium padding-y-small flex items-center justify-between">

        {/* Brand + Avatar */}
        <div className="flex items-center gap-small min-width-0">
          <button
            type="button"
            onClick={() => setIsAvatarDialogOpen(true)}
            className="group cursor-pointer p-0 border-0 bg-transparent outline-none flex items-center shrink-0"
            title="switch profile picture"
          >
            <Avatar
              src={avatarSrc}
              initials={avatarInitials}
              size="Small"
              status="InExperience"
              alt="ashley"
              className="ring-1 ring-stroke-emphasis group-hover:ring-stroke-default transition-all"
            />
          </button>
          <span className="font-extended text-title-medium content-emphasis text-truncate-end">
            ashley
          </span>
        </div>

        {/* Telemetry + Settings */}
        <div className="flex items-center gap-small text-label-small content-muted shrink-0 font-mono">

          {/* Online + Time */}
          <div className="flex items-center gap-xsmall bg-shift-100 padding-x-small padding-y-xsmall radius-small shrink-0">
            <StatusIndicator variant="Dot" color="Success" size="Small" />
            <span className="content-default">online</span>
            <span className="content-sub">|</span>
            <span className="content-emphasis">{time || "15:23"}</span>
          </div>

          {/* Battery + Temp */}
          <div className="hidden md:flex items-center gap-small shrink-0">
            <span className="bg-shift-100 padding-x-small padding-y-xsmall radius-small content-default flex items-center gap-xsmall">
              <Icon name="icon-regular-lightning-bolt" size="XSmall" className="content-system-emphasis" />
              <span>38% juice</span>
            </span>
            <span className="bg-shift-100 padding-x-small padding-y-xsmall radius-small content-default flex items-center gap-xsmall">
              <Icon name="icon-regular-speedometer" size="XSmall" className="content-system-warning" />
              <span>52°c</span>
            </span>
          </div>

          {/* Settings — Native Foundation Button */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="foundation-web-button relative clip group/interactable focus-visible:outline-focus cursor-pointer flex items-center justify-center bg-shift-100 padding-x-small padding-y-xsmall radius-small content-default gap-xsmall shrink-0 stroke-none"
            aria-label="theme settings"
          >
            <div
              aria-hidden="true"
              data-testid="foundation-web-state-layer"
              className="absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)]"
            ></div>
            <span className="lowercase relative z-10">settings</span>
            <Icon name="icon-regular-gear" size="Small" className="relative z-10" />
          </button>
        </div>
      </div>
    </header>
  );
}
