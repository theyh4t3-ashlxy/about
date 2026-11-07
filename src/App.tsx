import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, useFoundationTheme } from "@rbx/foundation-ui";
import { Header } from "./components/Header";
import { ProfileHero } from "./components/ProfileHero";
import { TelemetryView } from "./components/TelemetryView";
import { ProjectsView } from "./components/ProjectsView";
import { AnomaliesView } from "./components/AnomaliesView";
import { MediaView } from "./components/MediaView";

export default function App() {
  // Initialize official Roblox Foundation theme
  useFoundationTheme("dark", typeof document !== "undefined" ? document.documentElement : undefined);

  return (
    <div className="dark-theme min-h-screen bg-surface-0 content-default flex flex-col font-sans selection:bg-system-emphasis/30">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col gap-large">
        <ProfileHero />

        <div className="bg-surface-100 rounded-large border border-stroke-default p-6 shadow-sm">
          <Tabs defaultValue="telemetry" size="Medium" variant="Contained">
            <TabsList className="bg-surface-0 border border-stroke-default p-1.5 rounded-medium mb-6 flex flex-wrap gap-xsmall">
              <TabsTrigger
                value="telemetry"
                className="px-4 py-2 rounded-small text-label-medium content-muted data-[state=active]:content-emphasis data-[state=active]:bg-surface-200 transition-all cursor-pointer"
              >
                system & hardware
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="px-4 py-2 rounded-small text-label-medium content-muted data-[state=active]:content-emphasis data-[state=active]:bg-surface-200 transition-all cursor-pointer"
              >
                projects
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="px-4 py-2 rounded-small text-label-medium content-muted data-[state=active]:content-emphasis data-[state=active]:bg-surface-200 transition-all cursor-pointer"
              >
                captures
              </TabsTrigger>
              <TabsTrigger
                value="bugs"
                className="px-4 py-2 rounded-small text-label-medium content-muted data-[state=active]:content-emphasis data-[state=active]:bg-surface-200 transition-all cursor-pointer flex items-center gap-xsmall"
              >
                <span>known issues</span>
                <span className="px-1.5 py-0.5 rounded-full text-caption-small bg-system-warning/20 content-system-warning font-mono">
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

            <TabsContent value="media" className="outline-none focus:outline-none">
              <MediaView />
            </TabsContent>

            <TabsContent value="bugs" className="outline-none focus:outline-none">
              <AnomaliesView />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="w-full border-t border-stroke-default bg-surface-100 py-6 text-center text-caption-large font-mono content-muted">
        thinkpad t16 · nixos 26.11
      </footer>
    </div>
  );
}
