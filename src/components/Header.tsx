import React, { useState, useEffect } from "react";
import { Button, Icon, StatusIndicator } from "@rbx/foundation-ui";
import { useTheme } from "../context/ThemeContext";

export function Header() {
  const [time, setTime] = useState("");
  const { setIsSettingsOpen } = useTheme();

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
    <header className="w-full bg-surface-100 border-b border-stroke-default sticky top-0 z-50">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-small min-w-0">
          <div className="flex items-center justify-center p-1.5 rounded-small bg-surface-200 shrink-0">
            <Icon name="icon-filled-studio" size="Small" className="content-emphasis" />
          </div>
          <span className="font-extended text-title-medium content-emphasis truncate">
            ashley
          </span>
        </div>

        <div className="flex items-center gap-small sm:gap-medium text-caption-large content-muted shrink-0">
          <div className="flex items-center gap-xsmall font-mono bg-surface-0 px-3 py-1 rounded-circle border border-stroke-default shrink-0">
            <StatusIndicator variant="Dot" color="Success" size="Small" />
            <span className="content-default">online</span>
            <span className="content-subtle">|</span>
            <span className="content-emphasis font-bold">{time || "15:23"}</span>
          </div>

          <div className="hidden md:flex items-center gap-small font-mono shrink-0">
            <span className="bg-surface-0 px-2.5 py-1 rounded-small border border-stroke-default content-default">
              38% juice
            </span>
            <span className="bg-surface-0 px-2.5 py-1 rounded-small border border-stroke-default content-default">
              52°c
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="bg-shift-100 hover:bg-shift-200 active:bg-shift-300 px-2.5 py-1 rounded-small border border-stroke-default content-default hover:content-emphasis flex items-center gap-xsmall font-mono transition-colors cursor-pointer shrink-0"
            aria-label="theme settings"
          >
            <span className="lowercase">settings</span>
            <Icon name="icon-regular-gear" size="Small" />
          </button>
        </div>
      </div>
    </header>
  );
}
