export interface AvatarPreset {
  id: string;
  name: string;
  subtitle: string;
  src?: string;
  initials?: string;
}

export const avatarPresets: AvatarPreset[] = [
  {
    id: "hiashley",
    name: "hi ashley",
    subtitle: "waving hello · wide eyes",
    src: "./avatars/hiashley.png",
    initials: "AS",
  },
  {
    id: "shyash",
    name: "shy ash",
    subtitle: "blushing · flustered",
    src: "./avatars/shyash.png",
    initials: "AS",
  },
  {
    id: "sleepyash",
    name: "sleepy ash",
    subtitle: "tired on pillow · dev burnout",
    src: "./avatars/sleepyash.png",
    initials: "AS",
  },
  {
    id: "monogram",
    name: "monogram",
    subtitle: "fallback letters AS",
    initials: "AS",
  },
];
