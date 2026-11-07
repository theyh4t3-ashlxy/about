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
  StatusIndicator,
} from "@rbx/foundation-ui";
import { anomaliesData } from "../data/anomalies";
import type { AnomalyItem } from "../types";

export function AnomaliesView() {
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyItem | null>(null);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const handleCopyTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1500);
  };

  return (
    <div className="flex flex-col gap-medium">
      <div className="mb-2">
        <h2 className="text-title-medium uppercase tracking-wider content-emphasis font-bold">
          known issues
        </h2>
        <p className="text-body-medium content-muted">
          bug tracker and desktop quirks
        </p>
      </div>

      <div className="flex flex-col gap-small">
        {anomaliesData.map((item) => {
          const isResolved = item.status === "resolved";
          const isPushed = item.status === "pushed";

          return (
            <Card
              key={item.id}
              variant="Standard"
              density="Compact"
              className="border border-stroke-default hover:border-stroke-emphasis transition-all duration-150 cursor-pointer group"
              onClick={() => setSelectedAnomaly(item)}
              leading={
                <StatusIndicator
                  variant="Dot"
                  color={isResolved ? "Success" : isPushed ? "Emphasis" : "Warning"}
                  size="Medium"
                />
              }
              title={
                <span className="text-title-small font-medium content-emphasis group-hover:underline">
                  {item.title}
                </span>
              }
              description={
                <span className="text-body-medium content-muted">
                  {item.description}
                </span>
              }
              trailing={
                <div className="flex items-center gap-small" onClick={(e) => e.stopPropagation()}>
                  <Badge
                    label={item.tag}
                    size="Small"
                    variant={isResolved ? "Success" : isPushed ? "Standard" : "Warning"}
                  />
                  <Button
                    variant="Standard"
                    size="Small"
                    onClick={() => setSelectedAnomaly(item)}
                  >
                    view
                  </Button>
                </div>
              }
            />
          );
        })}
      </div>

      {/* Foundation Dialog popup for incident postmortems */}
      {selectedAnomaly && (
        <Dialog
          size="Large"
          isModal={true}
          hasCloseAffordance={true}
          closeLabel="Close dialog"
          open={!!selectedAnomaly}
          onOpenChange={(open) => !open && setSelectedAnomaly(null)}
        >
          <DialogContent className="max-w-xl bg-surface-100 border border-stroke-default rounded-xl overflow-hidden shadow-2xl">
            <DialogHeroMedia className="bg-surface-0 border-b border-stroke-default px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-small">
                <StatusIndicator
                  variant="Dot"
                  color={
                    selectedAnomaly.status === "resolved"
                      ? "Success"
                      : selectedAnomaly.status === "pushed"
                      ? "Emphasis"
                      : "Warning"
                  }
                  size="Large"
                />
                <div>
                  <span className="text-title-medium font-medium content-emphasis">
                    {selectedAnomaly.title}
                  </span>
                  <p className="text-caption-large font-mono content-muted">
                    status: {selectedAnomaly.status}
                  </p>
                </div>
              </div>
              <Badge
                label={selectedAnomaly.tag}
                size="Small"
                variant={
                  selectedAnomaly.status === "resolved"
                    ? "Success"
                    : selectedAnomaly.status === "pushed"
                    ? "Emphasis"
                    : "Warning"
                }
              />
            </DialogHeroMedia>

            <DialogBody className="p-6 flex flex-col gap-medium">
              <div className="flex flex-col gap-xxsmall">
                <DialogTitle className="text-heading-small content-emphasis font-extended">
                  overview
                </DialogTitle>
                <p className="text-body-medium content-default leading-relaxed">
                  {selectedAnomaly.description}
                </p>
              </div>

              {selectedAnomaly.affectedComponent && (
                <div className="p-3.5 rounded-medium bg-surface-0 border border-stroke-default flex flex-col gap-xxsmall">
                  <span className="text-label-small uppercase tracking-wider content-muted font-bold font-mono">
                    affected component
                  </span>
                  <span className="text-body-medium font-mono content-emphasis">
                    {selectedAnomaly.affectedComponent}
                  </span>
                </div>
              )}

              {selectedAnomaly.postmortem && (
                <div className="p-3.5 rounded-medium bg-surface-0 border-l-4 border-system-emphasis border-stroke-default">
                  <span className="text-label-small uppercase tracking-wider content-muted font-bold font-mono block mb-1">
                    root cause & fix
                  </span>
                  <p className="text-body-medium content-default font-mono leading-relaxed text-sm">
                    {selectedAnomaly.postmortem}
                  </p>
                </div>
              )}
            </DialogBody>

            <Divider />

            <DialogFooter className="px-6 py-4 flex items-center justify-between bg-surface-100">
              <Button
                variant="Standard"
                size="Medium"
                onClick={() => setSelectedAnomaly(null)}
              >
                close
              </Button>

              <Button
                variant="Standard"
                size="Medium"
                onClick={() => handleCopyTag(selectedAnomaly.tag)}
                className="flex items-center gap-xsmall"
              >
                <Icon name="icon-regular-code" size="Small" />
                <span>{copiedTag === selectedAnomaly.tag ? "copied" : "copy tag"}</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
