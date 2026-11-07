import type { HardwareSpec } from "../types";

export const environmentSpecs: HardwareSpec[] = [
  {
    title: "os & toolchain",
    subtitle: "nixos 26.11 (zokor) · linux 7.3.1 · gcc 16.2.0",
    badge: "nixos",
    details: [
      { label: "distribution", value: "nixos 26.11 (zokor) x86_64" },
      { label: "kernel", value: "linux 7.3.1 (declarative build)" },
      { label: "toolchain", value: "gcc 16.2.0 · glibc 2.43" },
      { label: "package manager", value: "nix flakes (nix-daemon)" },
    ],
  },
  {
    title: "compositor & audio",
    subtitle: "hyprland 0.57.1 (wayland) · pipewire 1.6.9",
    badge: "wayland",
    details: [
      { label: "window manager", value: "hyprland v0.57.1 (wlroots)" },
      { label: "xwayland bridge", value: "xwayland v24.1.14" },
      { label: "audio server", value: "pipewire v1.6.9 + wireplumber" },
      { label: "displays", value: "1080p internal 60hz + 1200p external" },
    ],
  },
  {
    title: "userland shell",
    subtitle: "quickshell (qml) · zsh 5.9",
    badge: "shell",
    details: [
      { label: "desktop shell", value: "quickshell qml layer-shell" },
      { label: "shell", value: "zsh 5.9 (pure prompt)" },
      { label: "terminal", value: "kitty (gpu accelerated)" },
      { label: "editor", value: "neovim (custom lua config)" },
    ],
  },
];

export const siliconSpecs: HardwareSpec[] = [
  {
    title: "12th gen intel core i7-1260p",
    subtitle: "12-core (4p + 8e, 16 threads) · 4.70 ghz peak",
    badge: "alder lake",
    details: [
      { label: "architecture", value: "alder lake rev 3 (mst amcp)" },
      { label: "cache hierarchy", value: "l1: 1.1 mib · l2: 9 mib · l3: 18 mib" },
      { label: "clock bounds", value: "400 mhz floor / 4700 mhz boost" },
      { label: "bogomips", value: "79872" },
    ],
  },
  {
    title: "hybrid dual graphics",
    subtitle: "intel iris xe (i915) + nvidia geforce mx550 (nouveau)",
    badge: "switcheroo",
    details: [
      { label: "integrated gpu", value: "intel alder lake-p gt2 (driver: i915)" },
      { label: "discrete gpu", value: "nvidia tu117m [geforce mx550] (driver: nouveau)" },
      { label: "acceleration", value: "opengl 4.6 · mesa 26.2" },
      { label: "multi-monitor", value: "hybrid dual head rendering" },
    ],
  },
  {
    title: "storage, power & thermals",
    subtitle: "nvme btrfs + external ssd · 38% battery · 52°c · 1928 rpm",
    badge: "sensors",
    details: [
      { label: "storage", value: "samsung nvme 476.94 gib (btrfs) + 931.51 gib ssd" },
      { label: "memory & zram", value: "16 gib ram (74% active) + 7.64 gib zram" },
      { label: "battery health", value: "16.4 wh (38%) discharging · 83% health" },
      { label: "cooling", value: "cpu 52.0°c · fan at 1928 rpm" },
    ],
  },
];
