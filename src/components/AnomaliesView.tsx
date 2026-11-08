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
      <div className="margin-bottom-small">
        <h2 className="text-title-medium content-emphasis font-bold lowercase">
          known issues
        </h2>
        <p className="text-body-medium content-muted lowercase">
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
              className="bg-surface-100 stroke-standard stroke-default hover:stroke-emphasis transition-colors cursor-pointer group radius-medium"
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
          <DialogContent className="max-width-[576px] clip shadow-transient-high">
            <DialogHeroMedia className="bg-surface-200/50 stroke-b padding-x-xlarge padding-y-medium flex items-center padding-right-[64px]">
              <div className="flex items-center gap-small">
                <div className="padding-small radius-small bg-surface-200 shrink-0">
                  <Icon name="icon-regular-bug" size="Large" className="content-emphasis" />
                </div>
                <div>
                  <div className="flex items-center gap-xsmall">
                    <StatusIndicator
                      variant="Dot"
                      color={
                        selectedAnomaly.status === "resolved"
                          ? "Success"
                          : selectedAnomaly.status === "pushed"
                          ? "Emphasis"
                          : "Warning"
                      }
                      size="Small"
                    />
                    <span className="text-title-medium font-medium content-emphasis">
                      {selectedAnomaly.title}
                    </span>
                  </div>
                  <p className="text-caption-large font-mono content-muted margin-top-xxsmall">
                    status: {selectedAnomaly.status}
                  </p>
                </div>
              </div>
            </DialogHeroMedia>

            <DialogBody className="padding-xlarge flex flex-col gap-medium">
              <div className="flex flex-col gap-xxsmall">
                <DialogTitle className="text-heading-small content-emphasis font-extended lowercase">
                  overview
                </DialogTitle>
                <p className="text-body-medium content-default leading-relaxed">
                  {selectedAnomaly.description}
                </p>
              </div>

              {selectedAnomaly.affectedComponent && (
                <div className="padding-medium radius-medium bg-surface-0 stroke-standard stroke-default flex flex-col gap-xxsmall">
                  <span className="text-label-small content-muted font-semibold lowercase">
                    affected component
                  </span>
                  <span className="text-body-medium font-mono content-emphasis">
                    {selectedAnomaly.affectedComponent}
                  </span>
                </div>
              )}

              {selectedAnomaly.postmortem && (
                <div className="padding-medium radius-medium bg-surface-0 stroke-standard stroke-default border-y-0 border-r-0 border-l-[4px] border-l-[var(--color-system-emphasis)]">
                  <span className="text-label-small content-muted font-semibold lowercase block margin-bottom-xxsmall">
                    root cause & fix
                  </span>
                  <p className="text-body-medium content-default font-mono leading-relaxed">
                    {selectedAnomaly.postmortem}
                  </p>
                </div>
              )}
            </DialogBody>

            <Divider />

            <DialogFooter className="padding-x-xlarge padding-y-medium flex items-center justify-between bg-surface-100">
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
                <span>{copiedTag === selectedAnomaly.tag ? "copied" : "copy tag"}</span>
                <Icon
                  name={copiedTag === selectedAnomaly.tag ? "icon-regular-check" : "icon-regular-two-stacked-squares"}
                  size="Small"
                />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
