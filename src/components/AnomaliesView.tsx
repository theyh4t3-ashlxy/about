import React from "react";
import { Badge, Card, StatusIndicator } from "@rbx/foundation-ui";
import { anomaliesData } from "../data/anomalies";

export function AnomaliesView() {
  return (
    <div className="space-y-4">
      <div className="mb-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#cbd3d9]">
          ledger of shame & anomalies
        </h2>
        <p className="text-xs text-[#8f98a0]">runtime bugs and fixed regressions</p>
      </div>

      <div className="space-y-3">
        {anomaliesData.map((item) => {
          const isResolved = item.status === "resolved";
          const isPushed = item.status === "pushed";
          const isOpen = item.status === "open";

          return (
            <Card
              key={item.id}
              className="!bg-[#191b1d] border border-[#2d3136] !p-4 rounded-xl flex items-center justify-between hover:border-[#3e444b] transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <StatusIndicator
                  variant="Dot"
                  color={isResolved ? "Success" : isPushed ? "Emphasis" : "Warning"}
                  size="Medium"
                />
                <div>
                  <div className="text-sm font-bold text-[#f2f4f5] font-mono">
                    {item.title}
                  </div>
                  <div className="text-xs text-[#8f98a0] mt-0.5 max-w-xl">
                    {item.description}
                  </div>
                </div>
              </div>

              <div>
                <Badge
                  label={item.tag}
                  size="Small"
                  variant={isResolved ? "Success" : isPushed ? "Standard" : "Warning"}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
