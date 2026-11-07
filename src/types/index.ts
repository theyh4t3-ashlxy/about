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
  techStack?: string[];
  quote?: string;
  commandSnippet?: string;
  fullDescription?: string;
  previewMedia?: {
    type: "image" | "video";
    src: string;
    caption: string;
  };
}

export interface MediaCaptureItem {
  id: string;
  title: string;
  subtitle: string;
  type: "image" | "video";
  src: string;
  tag: string;
  resolution: string;
  description: string;
  timestamp: string;
}

export interface AnomalyItem {
  id: string;
  title: string;
  description: string;
  status: "resolved" | "open" | "pushed";
  tag: string;
  postmortem?: string;
  affectedComponent?: string;
}
