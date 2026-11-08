import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, Icon } from "@rbx/foundation-ui";
import { Header } from "./components/Header";
import { ProfileHero } from "./components/ProfileHero";
import { TelemetryView } from "./components/TelemetryView";
import { ProjectsView } from "./components/ProjectsView";
import { AnomaliesView } from "./components/AnomaliesView";
import { MediaView } from "./components/MediaView";
import { SettingsDialog } from "./components/SettingsDialog";
import { CustomColorDialog } from "./components/CustomColorDialog";
import { AvatarDialog } from "./components/AvatarDialog";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface-0 content-default flex flex-col font-sans selection:bg-system-emphasis/30 transition-colors duration-200">
        <Header />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-large">
          <ProfileHero />

          <Tabs defaultValue="telemetry" size="Medium" variant="Contained" fitBehavior="Fit" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="telemetry">
                <Icon name="icon-regular-computer-monitor" size="Small" />
                <span>system & hardware</span>
              </TabsTrigger>
              <TabsTrigger value="projects">
                <Icon name="icon-regular-hammer-code" size="Small" />
                <span>projects</span>
              </TabsTrigger>
              <TabsTrigger value="media">
                <Icon name="icon-regular-photo-camera" size="Small" />
                <span>captures</span>
              </TabsTrigger>
              <TabsTrigger value="bugs">
                <Icon name="icon-regular-bug" size="Small" />
                <span>known issues</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-small text-caption-small bg-system-warning/20 content-system-warning font-mono">
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
        </main>

        <footer className="w-full border-t border-stroke-default bg-surface-100 py-6 text-center text-caption-large font-mono content-muted">
          thinkpad t16 · nixos 26.11
        </footer>

        <SettingsDialog />
        <CustomColorDialog />
        <AvatarDialog />
      </div>
    </ThemeProvider>
  );
}
