import type { AnomalyItem } from "../types";

export const anomaliesData: AnomalyItem[] = [
  {
    id: "recursive-loop",
    title: "recursive binding loop in wallpaper browser",
    description: "fixed recursive geometry binding updates causing runaway cpu usage during wallpaper load.",
    status: "resolved",
    tag: "237bbd9",
    affectedComponent: "quickshell/wallpaper_browser.qml",
    postmortem: "dynamic aspect ratio calculations were causing bindings to continually trigger on parent geometry changes. solved by decoupling image dimension updates from the container layout with an explicit state lock.",
  },
  {
    id: "bar-collision",
    title: "multi-monitor bar instance collision",
    description: "prevented duplicate bar studio instances from conflicting over layer-shell ownership on multi-head setups.",
    status: "resolved",
    tag: "c7cba32",
    affectedComponent: "hyprland/socket_watcher",
    postmortem: "connecting an external display caused two bar processes to race for exclusive wayland layer-shell namespaces and drop dbus connections. resolved by scoping socket listeners per output name.",
  },
  {
    id: "ghost-pixels",
    title: "app launcher initial position glitch",
    description: "fixed popup launcher mapping at coordinate 0,0 before compositor finishes monitor configuration.",
    status: "resolved",
    tag: "resolved",
    affectedComponent: "quickshell/app_launcher.qml",
    postmortem: "popup window rendered before the wayland compositor reported display dimensions, leaving an invisible click interceptor. resolved by anchoring layout to the completed surface event.",
  },
  {
    id: "smart-fridge",
    title: "embedded doom on smart fridge display",
    description: "compiled and tested a no-heap doom wad renderer on appliance screen framebuffer.",
    status: "pushed",
    tag: "pushed",
    affectedComponent: "embedded rust frame buffer",
    postmortem: "compiled a no-std doom wad parser and direct framebuffer blitter targeting low-power embedded display controllers. maintains a stable 35 fps render loop with zero memory leaks.",
  },
  {
    id: "caffeine-sleep",
    title: "late-night debugging cycles",
    description: "compiling wayland configurations past 4 am leading to typos and diminishing cognitive speed.",
    status: "open",
    tag: "open",
    affectedComponent: "sleep schedule",
    postmortem: "debugging kernel parameters and declarative flake revisions until dawn degrades velocity. recommended resolution: step away from the terminal and get actual sleep.",
  },
];
