export type AccentColor = "blue" | "teal" | "green" | "yellow" | "orange" | "purple";

export interface HardwareSpec {
  title: string;
  subtitle: string;
  badge?: string;
  details?: { label: string; value: string }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  url?: string;
  badge?: {
    label: string;
    variant: "Standard" | "Emphasis" | "Success" | "Warning" | "Alert" | "Neutral";
  };
  localOnly?: boolean;
}

export interface AnomalyItem {
  id: string;
  title: string;
  description: string;
  status: "resolved" | "open" | "pushed";
  tag: string;
}
