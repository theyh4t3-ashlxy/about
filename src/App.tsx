import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, Icon, Badge } from "@rbx/foundation-ui";
import { Header } from "./components/Header";
import { ProfileHero } from "./components/ProfileHero";
import { TelemetryView } from "./components/TelemetryView";
import { ProjectsView } from "./components/ProjectsView";
import { AnomaliesView } from "./components/AnomaliesView";
import { MediaView } from "./components/MediaView";
import { SettingsDialog } from "./components/SettingsDialog";
import { CustomColorDialog } from "./components/CustomColorDialog";
import { AvatarDialog } from "./components/AvatarDialog";
import { ShortcutsDialog } from "./components/ShortcutsDialog";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

function MainDashboard() {
  const {
    activeTab,
    setActiveTab,
    isScanlinesEnabled,
    setIsShortcutsOpen,
    playSound,
  } = useTheme();

  // Bind global keyboard shortcuts (1-4 tabs, s, a, c, m, ?)
  useKeyboardShortcuts();

  return (
    <div className="min-h-[100dvh] bg-surface-0 content-default flex flex-col font-sans selection:bg-system-emphasis/30 transition-colors duration-200 relative">
      {/* CRT Scanline & Phosphor Overlay */}
      {isScanlinesEnabled && (
        <div
          aria-hidden="true"
          className="crt-scanlines fixed inset-[0] [z-index:9999] pointer-events-none"
        />
      )}

      <Header />

      <main className="flex-1 max-width-[1024px] width-full margin-x-auto padding-x-medium sm:padding-x-large padding-y-xlarge flex flex-col gap-large">
        <ProfileHero />

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          size="Medium"
          variant="Contained"
          fitBehavior="Fit"
          className="width-full"
        >
          <TabsList className="margin-bottom-large">
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
              <Badge
                label="1 open"
                size="XSmall"
                variant="Warning"
                shape="Box"
                className="margin-left-xsmall font-mono"
              />
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

      <footer className="width-full stroke-standard stroke-default border-x-0 border-b-0 bg-surface-100 padding-y-large text-center text-caption-large font-mono content-muted flex flex-col sm:flex-row items-center justify-center gap-small sm:gap-medium">
        <span>thinkpad t16 · nixos 26.11</span>
        <span className="hidden sm:inline">·</span>
        <button
          type="button"
          onClick={() => {
            playSound("pop");
            setIsShortcutsOpen(true);
          }}
          className="padding-none stroke-none bg-none outline-none cursor-pointer content-muted hover:content-emphasis transition-colors flex items-center gap-xxsmall"
        >
          <span>press</span>
          <kbd className="bg-surface-200 stroke-standard stroke-default radius-xsmall padding-x-xxsmall content-emphasis font-bold">
            ?
          </kbd>
          <span>for shortcuts</span>
        </button>
      </footer>

      <SettingsDialog />
      <CustomColorDialog />
      <AvatarDialog />
      <ShortcutsDialog />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainDashboard />
    </ThemeProvider>
  );
}
