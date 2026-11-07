import React, { useState, useEffect } from "react";
import { Badge, StatusIndicator } from "@rbx/foundation-ui";

export function Header() {
  const [time, setTime] = useState("");

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
    <header className="w-full bg-[#191b1d] border-b border-[#2d3136] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-[#00A2FF] rounded flex items-center justify-center font-bold text-black text-xs select-none">
          R
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-wide text-[#f2f4f5] font-extended">ashley_os</span>
          <Badge label="foundation" size="XSmall" variant="Emphasis" />
          <Badge label="tokyo.r0" size="XSmall" variant="Neutral" />
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-[#a7b0b5]">
        <div className="flex items-center gap-2 font-mono bg-[#111216] px-2.5 py-1 rounded-full border border-[#2d3136]">
          <StatusIndicator variant="Dot" color="Success" size="Small" />
          <span>online</span>
          <span className="text-[#646b73]">|</span>
          <span className="text-[#f2f4f5]">{time || "23:35"}</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 font-mono">
          <span className="text-xs bg-[#24272c] px-2 py-0.5 rounded text-[#cbd3d9]">
            79% juice
          </span>
          <span className="text-xs bg-[#24272c] px-2 py-0.5 rounded text-[#cbd3d9]">
            64°c
          </span>
        </div>
      </div>
    </header>
  );
}
