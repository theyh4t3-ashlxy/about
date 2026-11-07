import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, Badge } from "@rbx/foundation-ui";
import { Header } from "./components/Header";
import { ProfileHero } from "./components/ProfileHero";
import { TelemetryView } from "./components/TelemetryView";
import { ProjectsView } from "./components/ProjectsView";
import { AnomaliesView } from "./components/AnomaliesView";
import { profileData } from "./data/profile";
import type { AccentColor } from "./types";

export default function App() {
  const [accent, setAccent] = useState<AccentColor>("blue");

  useEffect(() => {
    const hex = profileData.accentOptions.find((a) => a.id === accent)?.hex || "#3584e4";
    document.documentElement.style.setProperty("--accent-color", hex);
    document.body.setAttribute("data-accent", accent);
  }, [accent]);

  return (
    <div className="dark-theme min-h-screen bg-[#111216] text-[#f2f4f5] flex flex-col font-sans selection:bg-[#00A2FF]/30 selection:text-[#f2f4f5]">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
        <ProfileHero currentAccent={accent} onAccentChange={setAccent} />

        <div className="bg-[#16181b] border border-[#2d3136] rounded-2xl p-6 shadow-2xl">
          <Tabs defaultValue="telemetry" size="Medium" variant="Contained">
            <TabsList className="!bg-[#111216] !border !border-[#2d3136] !p-1.5 rounded-xl mb-6 flex flex-wrap gap-1">
              <TabsTrigger
                value="telemetry"
                className="!px-4 !py-2 rounded-lg text-xs font-semibold tracking-wide data-[state=active]:!bg-[#24272c] data-[state=active]:!text-[#f2f4f5] text-[#a7b0b5] transition-all"
              >
                telemetry & silicon
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="!px-4 !py-2 rounded-lg text-xs font-semibold tracking-wide data-[state=active]:!bg-[#24272c] data-[state=active]:!text-[#f2f4f5] text-[#a7b0b5] transition-all"
              >
                repos & payloads
              </TabsTrigger>
              <TabsTrigger
                value="bugs"
                className="!px-4 !py-2 rounded-lg text-xs font-semibold tracking-wide data-[state=active]:!bg-[#24272c] data-[state=active]:!text-[#f2f4f5] text-[#a7b0b5] transition-all flex items-center gap-2"
              >
                <span>anomalies & chaos</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#e5a50a]/20 text-[#e5a50a] font-mono">
                  1 open
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="telemetry" className="outline-none focus:outline-none">
              <TelemetryView />
            </TabsContent>

            <TabsContent value="projects" className="outline-none focus:outline-none">
              <ProjectsView />
            </TabsContent>

            <TabsContent value="bugs" className="outline-none focus:outline-none">
              <AnomaliesView />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="w-full border-t border-[#24272c] bg-[#141518] py-4 text-center text-xs font-mono text-[#646b73]">
        thinkpad t16 · roblox foundation-web · arch linux (x86_64)
      </footer>
    </div>
  );
}
