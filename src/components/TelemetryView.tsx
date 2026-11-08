import React, { useState } from "react";
import { Badge, Button, Icon } from "@rbx/foundation-ui";
import { environmentSpecs, siliconSpecs } from "../data/telemetry";

export function TelemetryView() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const getEnvIcon = (index: number) => {
    switch (index) {
      case 0:
        return "icon-regular-hammer-code";
      case 1:
        return "icon-regular-computer-monitor";
      default:
        return "icon-regular-teletype";
    }
  };

  const getSiliconIcon = (index: number) => {
    switch (index) {
      case 0:
        return "icon-regular-speedometer";
      case 1:
        return "icon-regular-cube-vertexes";
      default:
        return "icon-regular-lightning-bolt";
    }
  };

  return (
    <div className="flex flex-col gap-large">
      {/* Environment section */}
      <div>
        <div className="mb-4">
          <h2 className="text-title-medium content-emphasis font-bold lowercase">
            desktop environment
          </h2>
          <p className="text-body-medium content-muted lowercase">telemetry queried via inxi</p>
        </div>

        <div className="flex flex-col gap-medium">
          {environmentSpecs.map((spec, i) => (
            <div
              key={i}
              className="bg-surface-100 border border-stroke-default hover:border-stroke-emphasis rounded-large p-5 transition-colors flex flex-col gap-small"
            >
              <div className="flex items-start justify-between gap-small">
                <div className="flex items-center gap-small min-w-0">
                  <div className="p-2 rounded-small bg-surface-200 shrink-0">
                    <Icon name={getEnvIcon(i) as any} size="Medium" className="content-emphasis" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-xsmall flex-wrap">
                      <span className="text-title-small font-mono content-emphasis font-bold truncate">
                        {spec.title}
                      </span>
                      {spec.badge && <Badge label={spec.badge} size="XSmall" variant="Standard" />}
                    </div>
                    <span className="text-caption-large font-mono content-muted truncate mt-0.5">
                      {spec.subtitle}
                    </span>
                  </div>
                </div>

                <Button
                  variant="Standard"
                  size="Small"
                  onClick={() => handleCopy(spec.subtitle, spec.title)}
                  className="shrink-0 flex items-center gap-xsmall"
                >
                  <span>{copiedKey === spec.title ? "copied" : "copy"}</span>
                  <Icon
                    name={copiedKey === spec.title ? "icon-regular-check" : "icon-regular-two-stacked-squares"}
                    size="XSmall"
                  />
                </Button>
              </div>

              {spec.details && (
                <div className="mt-2 pt-3 border-t border-stroke-default/60 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 font-mono text-caption-large">
                  {spec.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center justify-between py-0.5 border-b border-stroke-default/30">
                      <span className="content-muted">{detail.label}</span>
                      <span className="content-emphasis font-medium truncate ml-2">{detail.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Processor & silicon section */}
      <div>
        <div className="mb-4">
          <h2 className="text-title-medium content-emphasis font-bold lowercase">
            processor & silicon
          </h2>
          <p className="text-body-medium content-muted lowercase">alder lake cores and dual hybrid gpus</p>
        </div>

        <div className="flex flex-col gap-medium">
          {siliconSpecs.map((spec, i) => (
            <div
              key={i}
              className="bg-surface-100 border border-stroke-default hover:border-stroke-emphasis rounded-large p-5 transition-colors flex flex-col gap-small"
            >
              <div className="flex items-start justify-between gap-small">
                <div className="flex items-center gap-small min-w-0">
                  <div className="p-2 rounded-small bg-surface-200 shrink-0">
                    <Icon name={getSiliconIcon(i) as any} size="Medium" className="content-emphasis" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-xsmall flex-wrap">
                      <span className="text-title-small font-mono content-emphasis font-bold truncate">
                        {spec.title}
                      </span>
                      {spec.badge && <Badge label={spec.badge} size="XSmall" variant="Emphasis" />}
                    </div>
                    <span className="text-caption-large font-mono content-muted truncate mt-0.5">
                      {spec.subtitle}
                    </span>
                  </div>
                </div>

                <Button
                  variant="Standard"
                  size="Small"
                  onClick={() => handleCopy(spec.subtitle, spec.title)}
                  className="shrink-0 flex items-center gap-xsmall"
                >
                  <span>{copiedKey === spec.title ? "copied" : "copy"}</span>
                  <Icon
                    name={copiedKey === spec.title ? "icon-regular-check" : "icon-regular-two-stacked-squares"}
                    size="XSmall"
                  />
                </Button>
              </div>

              {spec.details && (
                <div className="mt-2 pt-3 border-t border-stroke-default/60 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 font-mono text-caption-large">
                  {spec.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center justify-between py-0.5 border-b border-stroke-default/30">
                      <span className="content-muted">{detail.label}</span>
                      <span className="content-emphasis font-medium truncate ml-2">{detail.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
