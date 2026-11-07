import type { AnomalyItem } from "../types";

export const anomaliesData: AnomalyItem[] = [
  {
    id: "recursive-loop",
    title: "err_recursive_binding_loop",
    description: "killed 50+ recursive qml loops in wallpaper browser before cpu melted.",
    status: "resolved",
    tag: "237bbd9",
  },
  {
    id: "bar-homicide",
    title: "err_bar_studio_homicide",
    description: "stopped bar studio instances from murdering each other on multi-head.",
    status: "resolved",
    tag: "c7cba32",
  },
  {
    id: "ghost-pixels",
    title: "err_ghost_pixels",
    description: "app launcher no longer renders at 0x0 invisible ghost coordinates.",
    status: "resolved",
    tag: "resolved",
  },
  {
    id: "smart-fridge",
    title: "err_smart_fridge_doom",
    description: "can the samsung fridge run doom? yes it does. rust crate pushed.",
    status: "pushed",
    tag: "pushed",
  },
  {
    id: "low-caffeine",
    title: "err_low_caffeine",
    description: "cold brew reservoir depleted. terminal panic imminent.",
    status: "open",
    tag: "open",
  },
];
