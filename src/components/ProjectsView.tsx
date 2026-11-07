import React from "react";
import { Badge, Button, Card, Icon } from "@rbx/foundation-ui";
import { projectsData } from "../data/projects";

export function ProjectsView() {
  const getProjectIcon = (id: string) => {
    switch (id) {
      case "delirium":
        return "icon-regular-computer-monitor";
      case "forktune":
        return "icon-regular-circle-play";
      case "cxh-opener":
        return "icon-regular-code";
      case "rust-doom":
        return "icon-regular-flame";
      case "keygen":
        return "icon-regular-shield-check";
      case "fan-control":
        return "icon-regular-gear";
      case "about":
        return "icon-filled-studio";
      default:
        return "icon-regular-folder";
    }
  };

  return (
    <div className="flex flex-col gap-medium">
      <div className="mb-2">
        <h2 className="text-title-medium uppercase tracking-wider content-emphasis font-bold">
          public repositories
        </h2>
        <p className="text-body-medium content-muted">
          codebases on github (@theyh4t3-ashlxy)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-medium">
        {projectsData.map((project) => (
          <Card
            key={project.id}
            variant="Standard"
            density="Default"
            className="border border-stroke-default hover:border-stroke-emphasis transition-all duration-150 flex flex-col justify-between"
            leading={<Icon name={getProjectIcon(project.id) as any} size="Medium" className="content-emphasis" />}
            title={
              <span className="font-mono text-title-small content-emphasis break-all">
                {project.title}
              </span>
            }
            badge={
              project.badge ? (
                <Badge
                  label={project.badge.label}
                  size="XSmall"
                  variant={project.badge.variant}
                />
              ) : undefined
            }
            description={
              <span className="text-body-medium content-muted leading-relaxed">
                {project.subtitle}
              </span>
            }
          >
            <div className="pt-medium mt-auto flex items-center justify-between border-t border-stroke-default/60">
              <span className="text-caption-large font-mono content-subtle">
                {project.localOnly ? "offline payload" : "github.com"}
              </span>

              {project.url ? (
                <Button
                  asChild
                  variant="Standard"
                  size="Small"
                  className="cursor-pointer"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-xsmall"
                  >
                    <span>open</span>
                    <Icon name="icon-regular-arrow-up-right-from-square" size="XSmall" />
                  </a>
                </Button>
              ) : (
                <Badge label="local only" size="Small" variant="Neutral" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
