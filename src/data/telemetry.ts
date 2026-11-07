import type { HardwareSpec } from "../types";

export const bareMetalSpecs: HardwareSpec[] = [
  {
    title: "kernel & toolchain",
    subtitle: "linux 7.2.3-arch1-3 (x86_64) · gcc 16.2.1",
    badge: "arch",
    details: [
      { label: "kernel", value: "linux 7.2.3-arch1-3 x86_64" },
      { label: "compiler", value: "gcc 16.2.1 / clang 21.0.0" },
      { label: "libc", value: "glibc 2.43" },
    ],
  },
  {
    title: "compositor & shell",
    subtitle: "hyprland 0.56.2 (wayland) + quickshell",
    badge: "wayland",
    details: [
      { label: "display protocol", value: "wayland wlroots" },
      { label: "window manager", value: "hyprland v0.56.2" },
      { label: "status bar", value: "quickshell qml daemon" },
    ],
  },
  {
    title: "uefi & firmware",
    subtitle: "lenovo v: n3bet70w (1.48) 05/14/2026",
    badge: "firmware",
    details: [
      { label: "vendor", value: "lenovo thinkpad bios" },
      { label: "version", value: "n3bet70w (1.48)" },
      { label: "secure boot", value: "disabled" },
    ],
  },
];

export const siliconSpecs: HardwareSpec[] = [
  {
    title: "12th gen intel core i7-1260p",
    subtitle: "12-core (4p + 8e, 16 threads) · 4.70 ghz boost",
    badge: "18 mib l3",
    details: [
      { label: "architecture", value: "alder lake-p (rev 3)" },
      { label: "cache sizes", value: "l1: 1.1 mib · l2: 9 mib · l3: 18 mib" },
      { label: "clock bounds", value: "400 mhz floor / 4700 mhz peak" },
      { label: "bogomips", value: "79872" },
    ],
  },
  {
    title: "hybrid dual silicon",
    subtitle: "intel iris xe (i915) + nvidia geforce mx550 [tu117m]",
    badge: "switcheroo",
    details: [
      { label: "integrated", value: "intel alder lake-p gt2 (iris xe)" },
      { label: "discrete", value: "nvidia geforce mx550 (driver 610.57.04)" },
      { label: "mesa driver", value: "mesa 26.2.2-arch1.1 (opengl 4.6.0)" },
      { label: "displays", value: "1080p internal 60hz + 1200p external" },
    ],
  },
  {
    title: "storage, power & thermals",
    subtitle: "samsung nvme btrfs · 79% juice · 64°c · 3070 rpm",
    badge: "sensors",
    details: [
      { label: "primary nvme", value: "samsung mzvl4512hblu 476.94 gib" },
      { label: "filesystem", value: "btrfs (root/home/var) + 4 gib zram" },
      { label: "battery health", value: "34 wh (79%) · 82% condition" },
      { label: "cooling", value: "cpu 64.0°c · fan at 3070 rpm" },
    ],
  },
];
