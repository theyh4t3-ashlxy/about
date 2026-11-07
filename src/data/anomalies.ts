import type { AnomalyItem } from "../types";

export const anomaliesData: AnomalyItem[] = [
  {
    id: "recursive-loop",
    title: "err_recursive_binding_loop",
    description: "killed 50+ recursive qml loops in wallpaper browser before cpu melted.",
    status: "resolved",
    tag: "237bbd9",
    affectedComponent: "quickshell / wallpaper_browser.qml",
    postmortem: "bindings were recursively subscribing to parent geometry changes whenever image aspect ratio was computed dynamically, triggering a 100% core burn loop. solved by breaking the binding cycle with an explicit javascript state lock.",
  },
  {
    id: "bar-homicide",
    title: "err_bar_studio_homicide",
    description: "stopped bar studio instances from murdering each other on multi-head.",
    status: "resolved",
    tag: "c7cba32",
    affectedComponent: "hyprland multi-monitor socket watcher",
    postmortem: "connecting a second 1200p display caused dual bar instances to race for wayland layer-shell exclusivity and kill each other's dbus listeners. resolved by isolating output names in the socket listener.",
  },
  {
    id: "ghost-pixels",
    title: "err_ghost_pixels",
    description: "app launcher no longer renders at 0x0 invisible ghost coordinates.",
    status: "resolved",
    tag: "resolved",
    affectedComponent: "app_launcher.qml popup",
    postmortem: "layer-shell popup window was mapping at 0,0 with zero alpha before wayland compositor reported initial monitor geometry, leaving an invisible click-blocking box. fixed with an explicit onCompleted layout anchor.",
  },
  {
    id: "smart-fridge",
    title: "err_smart_fridge_doom",
    description: "can the samsung fridge run doom? yes it does. rust crate pushed.",
    status: "pushed",
    tag: "pushed",
    affectedComponent: "embedded rust frame buffer",
    postmortem: "successfully compiled a no-std doom wad renderer targeting the smart fridge display controller over framebuffer device nodes. runs at stable 35 fps with zero crashes.",
  },
  {
    id: "low-caffeine",
    title: "err_low_caffeine",
    description: "cold brew reservoir depleted. terminal panic imminent.",
    status: "open",
    tag: "open",
    affectedComponent: "human developer nervous system",
    postmortem: "critical biological hardware interrupt. cold brew level reached 0%. system operating at degraded cognitive velocity. workaround: brew another batch or sleep.",
  },
];
