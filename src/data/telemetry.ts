import type { HardwareSpec } from "../types";

export const bareMetalSpecs: HardwareSpec[] = [
  {
    title: "kernel & toolchain",
    subtitle: "linux 7.3.1 (x86_64) · gcc 16.2.0 · nixos 26.11",
    badge: "nixos",
    details: [
      { label: "kernel", value: "linux 7.3.1 x86_64" },
      { label: "distro", value: "nixos 26.11 (zokor)" },
      { label: "compiler", value: "gcc 16.2.0" },
      { label: "init", value: "systemd v258 / nix-daemon" },
    ],
  },
  {
    title: "compositor & shell",
    subtitle: "hyprland 0.57.1 (wayland) + pipewire 1.6.9",
    badge: "wayland",
    details: [
      { label: "display protocol", value: "wayland wlroots" },
      { label: "compositor", value: "hyprland v0.57.1" },
      { label: "xwayland", value: "xwayland v24.1.14" },
      { label: "audio server", value: "pipewire v1.6.9" },
    ],
  },
  {
    title: "uefi & firmware",
    subtitle: "lenovo v: n3bet70w (1.48) 05/14/2026",
    badge: "firmware",
    details: [
      { label: "vendor", value: "lenovo thinkpad bios" },
      { label: "model", value: "thinkpad t16 gen 1 (21bws23200)" },
      { label: "motherboard", value: "lenovo sdk0k17763 win" },
      { label: "version", value: "n3bet70w (1.48)" },
    ],
  },
];

export const siliconSpecs: HardwareSpec[] = [
  {
    title: "12th gen intel core i7-1260p",
    subtitle: "12-core (4p + 8e, 16 threads) · 4.70 ghz peak",
    badge: "18 mib l3",
    details: [
      { label: "architecture", value: "alder lake rev 3 (mst amcp)" },
      { label: "cache sizes", value: "l1: 1.1 mib · l2: 9 mib · l3: 18 mib" },
      { label: "clock bounds", value: "400 mhz floor / 4700 mhz peak" },
      { label: "bogomips", value: "79872" },
    ],
  },
  {
    title: "hybrid dual silicon",
    subtitle: "intel alder lake-p (i915) + nvidia geforce mx550 (nouveau)",
    badge: "switcheroo",
    details: [
      { label: "integrated", value: "intel alder lake-p gt2 (driver: i915)" },
      { label: "discrete", value: "nvidia tu117m [geforce mx550] (driver: nouveau)" },
      { label: "displays", value: "1: 1920x1080@60hz · 2: 1920x1200@60hz" },
      { label: "camera", value: "sunplusit integrated usb uvcvideo" },
    ],
  },
  {
    title: "storage, power & thermals",
    subtitle: "samsung nvme + seagate ssd · 38% battery · 52°c · 1928 rpm",
    badge: "sensors",
    details: [
      { label: "primary nvme", value: "samsung mzvl4512hblu 476.94 gib (btrfs)" },
      { label: "external ssd", value: "seagate one touch 931.51 gib (usb)" },
      { label: "memory & zram", value: "16 gib ram (74% used) + 7.64 gib zram" },
      { label: "battery status", value: "16.4 wh (38%) discharging · 83% health" },
      { label: "cooling & fan", value: "cpu 52.0°c · fan at 1928 rpm" },
    ],
  },
];
