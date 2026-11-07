import React from "react";
import { Badge, Card, StatusIndicator } from "@rbx/foundation-ui";
import { anomaliesData } from "../data/anomalies";

export function AnomaliesView() {
  return (
    <div className="flex flex-col gap-medium">
      <div className="mb-2">
        <h2 className="text-title-medium uppercase tracking-wider content-emphasis font-bold">
          known issues & regressions
        </h2>
        <p className="text-body-medium content-muted">runtime quirks and past bugfixes</p>
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
              className="border border-stroke-default hover:border-stroke-emphasis transition-colors"
              leading={
                <StatusIndicator
                  variant="Dot"
                  color={isResolved ? "Success" : isPushed ? "Emphasis" : "Warning"}
                  size="Medium"
                />
              }
              title={
                <span className="text-title-small font-mono content-emphasis">
                  {item.title}
                </span>
              }
              description={
                <span className="text-body-medium content-muted">
                  {item.description}
                </span>
              }
              trailing={
                <Badge
                  label={item.tag}
                  size="Small"
                  variant={isResolved ? "Success" : isPushed ? "Standard" : "Warning"}
                />
              }
            />
          );
        })}
      </div>
    </div>
  );
}
