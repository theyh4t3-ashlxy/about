import type { AccentColor } from "../types";

export const profileData = {
  handle: "ashley@lost",
  realName: "Ashley",
  avatarInitials: "AS",
  deviceTag: "ThinkPad T16 Gen 1 (21BWS23200)",
  osTag: "NixOS 26.11 (Zokor) x86_64",
  location: "tokyo.r0 / neurodesk",
  bio: "chronically online developer compiling rust, managing declarative nix flakes, and reverse engineering roblox client packages.",
  socials: {
    github: "https://github.com/theyh4t3-ashlxy",
  },
  accentOptions: [
    { id: "blue", label: "Cobalt Blue", hex: "#3584e4" },
    { id: "teal", label: "Aqua Teal", hex: "#21a499" },
    { id: "green", label: "Mint Green", hex: "#33d17a" },
    { id: "yellow", label: "Amber Yellow", hex: "#e5a50a" },
    { id: "orange", label: "Solar Orange", hex: "#e66100" },
    { id: "purple", label: "Void Purple", hex: "#9141ac" },
  ] as const,
};
