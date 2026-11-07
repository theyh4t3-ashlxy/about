import type { ProjectItem } from "../types";

export const projectsData: ProjectItem[] = [
  {
    id: "hyprland-dots",
    title: "theyh4t3-ashlxy / my_hyprland_dots",
    subtitle: "quickshell, pipewire, google material symbols, pure pitch black.",
    url: "https://github.com/theyh4t3-ashlxy/my_hyprland_dots",
    badge: { label: "wayland", variant: "Emphasis" },
  },
  {
    id: "fan-control",
    title: "theyh4t3-ashlxy / fan-control",
    subtitle: "thinkpad t16 hardware fan daemon and dbus controller.",
    url: "https://github.com/theyh4t3-ashlxy/fan-control",
    badge: { label: "daemon", variant: "Standard" },
  },
  {
    id: "keygen",
    title: "theyh4t3-ashlxy / keygen",
    subtitle: "vaultforge cryptographic engine with gtk4 libadwaita ui.",
    url: "https://github.com/theyh4t3-ashlxy/keygen",
    badge: { label: "crypto", variant: "Success" },
  },
  {
    id: "rust-doom",
    title: "theyh4t3-ashlxy / rust",
    subtitle: "smart fridge doom runner crate. rust 2024 edition.",
    url: "https://github.com/theyh4t3-ashlxy/rust",
    badge: { label: "rust", variant: "Emphasis" },
  },
  {
    id: "libadwaita-web",
    title: "theyh4t3-ashlxy / libadwaita-web",
    subtitle: "roblox foundation web desktop interface with real hardware telemetry.",
    url: "https://github.com/theyh4t3-ashlxy/libadwaita-web",
    badge: { label: "foundation", variant: "Warning" },
  },
  {
    id: "roblox-local",
    title: "roblox (local only)",
    subtitle: "decompiled luau scripts, rbxl projects, and animation clones.",
    localOnly: true,
    badge: { label: "local only", variant: "Neutral" },
  },
];
