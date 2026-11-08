import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeroMedia,
  DialogTitle,
  Divider,
  Icon,
} from "@rbx/foundation-ui";
import { projectsData } from "../data/projects";
import type { ProjectItem } from "../types";

export function ProjectsView() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [copied, setCopied] = useState(false);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case "delirium":
        return "icon-regular-computer-monitor";
      case "forktune":
        return "icon-regular-music-note";
      case "cxh-opener":
        return "icon-regular-hammer-code";
      case "rust-doom":
        return "icon-regular-controller-with-cog";
      case "keygen":
        return "icon-regular-shield-check";
      case "fan-control":
        return "icon-regular-gear";
      case "about":
        return "icon-filled-tilt";
      default:
        return "icon-regular-folder";
    }
  };

  const handleCopySnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col gap-medium">
      <div className="margin-bottom-small">
        <h2 className="text-title-medium content-emphasis font-bold lowercase">
          projects
        </h2>
        <p className="text-body-medium content-muted lowercase">
          repositories on github (@theyh4t3-ashlxy)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-medium">
        {projectsData.map((project) => (
          <Card
            key={project.id}
            variant="Standard"
            density="Default"
            className="bg-surface-100 stroke-standard stroke-default hover:stroke-emphasis radius-large flex flex-col justify-between cursor-pointer group transition-colors"
            onClick={() => setSelectedProject(project)}
            leading={<Icon name={getProjectIcon(project.id) as any} size="Medium" className="content-emphasis group-hover:scale-110 transition-transform" />}
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
              <span className="text-body-medium content-muted leading-relaxed line-clamp-2">
                {project.subtitle}
              </span>
            }
          >
            <div className="padding-top-medium margin-top-auto flex items-center justify-between stroke-standard stroke-default border-x-0 border-b-0">
              <span className="text-caption-large font-mono content-sub">
                {project.localOnly ? "local repository" : "github.com"}
              </span>

              <div className="flex items-center gap-xsmall" onClick={(e) => e.stopPropagation()}>
                {project.url && (
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
                      <span>github</span>
                      <Icon name="icon-regular-arrow-up-right-from-square" size="XSmall" />
                    </a>
                  </Button>
                )}
                <Button
                  variant="Standard"
                  size="Small"
                  onClick={() => setSelectedProject(project)}
                >
                  view
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Foundation Dialog popup for project details */}
      {selectedProject && (
        <Dialog
          size="Large"
          isModal={true}
          hasCloseAffordance={true}
          closeLabel="Close dialog"
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        >
          <DialogContent className="max-width-[672px] clip shadow-transient-high">
            <DialogHeroMedia className="bg-surface-200/50 stroke-standard stroke-default border-x-0 border-t-0 padding-x-xlarge padding-y-medium flex items-center padding-right-[64px]">
              <div className="flex items-center gap-small">
                <div className="padding-small radius-small bg-surface-200">
                  <Icon name={getProjectIcon(selectedProject.id) as any} size="Large" className="content-emphasis" />
                </div>
                <div>
                  <span className="text-title-medium font-extended content-emphasis">
                    {selectedProject.title}
                  </span>
                  <p className="text-caption-large font-mono content-muted">
                    {selectedProject.localOnly ? "local repository" : "github repository"}
                  </p>
                </div>
              </div>
            </DialogHeroMedia>

            <DialogBody className="padding-xlarge flex flex-col gap-medium max-height-[70vh] overflow-y-auto">
              {selectedProject.previewMedia && (
                <div className="clip radius-medium stroke-standard stroke-default bg-surface-0 shadow-sm flex flex-col items-center">
                  <div className="width-full bg-surface-200/60 padding-medium flex items-center justify-center">
                    {selectedProject.previewMedia.type === "video" ? (
                      <video
                        src={selectedProject.previewMedia.src}
                        controls
                        className="max-height-[240px] max-width-full radius-small object-contain shadow-sm bg-black"
                      />
                    ) : (
                      <img
                        src={selectedProject.previewMedia.src}
                        alt={selectedProject.previewMedia.caption}
                        className="max-height-[240px] max-width-full radius-small object-contain shadow-sm"
                      />
                    )}
                  </div>
                  <div className="width-full padding-x-medium padding-y-small bg-surface-100 stroke-standard stroke-default border-x-0 border-b-0 flex items-center justify-between text-caption-large font-mono content-muted">
                    <span className="text-truncate-end margin-right-small">{selectedProject.previewMedia.caption}</span>
                    <Badge label="preview" size="Small" variant="Standard" />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-xxsmall">
                <DialogTitle className="text-heading-small content-emphasis font-extended lowercase">
                  overview
                </DialogTitle>
                <p className="text-body-medium content-default leading-relaxed">
                  {selectedProject.fullDescription || selectedProject.subtitle}
                </p>
              </div>

              {selectedProject.quote && (
                <div className="padding-medium radius-medium bg-surface-0 stroke-standard stroke-default border-y-0 border-r-0 border-l-[4px] border-l-[var(--color-system-emphasis)]">
                  <p className="text-body-medium italic content-muted font-mono leading-relaxed">
                    "{selectedProject.quote}"
                  </p>
                </div>
              )}

              {selectedProject.techStack && (
                <div className="flex flex-col gap-xsmall">
                  <span className="text-label-small content-muted font-semibold lowercase">
                    tech stack
                  </span>
                  <div className="flex flex-wrap gap-xsmall">
                    {selectedProject.techStack.map((tech, idx) => (
                      <Badge key={idx} label={tech} size="Small" variant="Standard" />
                    ))}
                  </div>
                </div>
              )}

              {selectedProject.commandSnippet && (
                <div className="flex flex-col gap-xsmall">
                  <span className="text-label-small content-muted font-semibold lowercase">
                    run command
                  </span>
                  <div className="flex items-center justify-between bg-surface-0 stroke-standard stroke-default padding-x-medium padding-y-small radius-medium font-mono text-caption-large">
                    <code className="content-emphasis select-all break-all margin-right-medium">
                      {selectedProject.commandSnippet}
                    </code>
                    <Button
                      variant="Standard"
                      size="Small"
                      onClick={() => handleCopySnippet(selectedProject.commandSnippet!)}
                      className="shrink-0 flex items-center gap-xsmall"
                    >
                      <span>{copied ? "copied" : "copy"}</span>
                      <Icon
                        name={copied ? "icon-regular-check" : "icon-regular-two-stacked-squares-code"}
                        size="XSmall"
                      />
                    </Button>
                  </div>
                </div>
              )}
            </DialogBody>

            <Divider />

            <DialogFooter className="padding-x-xlarge padding-y-medium flex items-center justify-between bg-surface-100">
              <Button
                variant="Standard"
                size="Medium"
                onClick={() => setSelectedProject(null)}
              >
                close
              </Button>

              {selectedProject.url && (
                <Button asChild variant="Emphasis" size="Medium">
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-xsmall"
                  >
                    <span>view on github</span>
                    <Icon name="icon-regular-arrow-up-right-from-square" size="Small" />
                  </a>
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
