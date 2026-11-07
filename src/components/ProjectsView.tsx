import React from "react";
import { Badge, Button, Card } from "@rbx/foundation-ui";
import { projectsData } from "../data/projects";

export function ProjectsView() {
  return (
    <div className="space-y-4">
      <div className="mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#cbd3d9]">
          git repos & payloads
        </h2>
        <p className="text-xs text-[#8f98a0]">
          published codebases (@theyh4t3-ashlxy)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectsData.map((project) => (
          <Card
            key={project.id}
            className="!bg-[#191b1d] border border-[#2d3136] !p-5 rounded-2xl flex flex-col justify-between hover:border-[#3e444b] transition-all duration-200"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-mono text-sm font-bold text-[#f2f4f5] break-all">
                  {project.title}
                </span>
                {project.badge && (
                  <Badge
                    label={project.badge.label}
                    size="XSmall"
                    variant={project.badge.variant}
                  />
                )}
              </div>

              <p className="text-xs text-[#8f98a0] leading-relaxed mb-4">
                {project.subtitle}
              </p>
            </div>

            <div className="pt-3 border-t border-[#24272c] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#646b73]">
                {project.localOnly ? "offline asset" : "github.com"}
              </span>

              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-[#24272c] hover:bg-[#2d3136] text-[#f2f4f5] transition-colors border border-[#3e444b]"
                >
                  open ↗
                </a>
              ) : (
                <span className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-[#24272c] text-[#a7b0b5]">
                  local only
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
