import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  Badge,
  Button,
  Card,
  Icon,
} from "@rbx/foundation-ui";
import { bareMetalSpecs, siliconSpecs } from "../data/telemetry";

export function TelemetryView() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const getBareMetalIcon = (index: number) => {
    switch (index) {
      case 0:
        return "icon-regular-code";
      case 1:
        return "icon-regular-computer-monitor";
      default:
        return "icon-regular-shield-check";
    }
  };

  const getSiliconIcon = (index: number) => {
    switch (index) {
      case 0:
        return "icon-filled-studio";
      case 1:
        return "icon-regular-computer-monitor";
      default:
        return "icon-regular-clock";
    }
  };

  return (
    <div className="flex flex-col gap-large">
      {/* Bare metal section */}
      <div>
        <div className="mb-4">
          <h2 className="text-title-medium uppercase tracking-wider content-emphasis font-bold">
            bare metal & firmware
          </h2>
          <p className="text-body-medium content-muted">telemetry queried via inxi -fxz</p>
        </div>

        <div className="flex flex-col gap-small">
          {bareMetalSpecs.map((spec, i) => (
            <Card
              key={i}
              variant="Standard"
              density="Compact"
              className="border border-stroke-default hover:border-stroke-emphasis transition-colors"
              leading={<Icon name={getBareMetalIcon(i) as any} size="Medium" className="content-muted" />}
              title={<span className="text-title-small font-mono content-emphasis">{spec.title}</span>}
              description={<span className="text-body-medium font-mono content-default">{spec.subtitle}</span>}
              trailing={
                <div className="flex items-center gap-small">
                  {spec.badge && <Badge label={spec.badge} size="Small" variant="Standard" />}
                  <Button
                    variant="Standard"
                    size="Small"
                    onClick={() => handleCopy(spec.subtitle, spec.title)}
                  >
                    {copiedKey === spec.title ? "copied" : "copy"}
                  </Button>
                </div>
              }
            />
          ))}
        </div>
      </div>

      {/* Compute & silicon section */}
      <div>
        <div className="mb-4">
          <h2 className="text-title-medium uppercase tracking-wider content-emphasis font-bold">
            compute & silicon
          </h2>
          <p className="text-body-medium content-muted">alder lake cores and dual hybrid gpus</p>
        </div>

        <Card variant="Standard" density="Default" className="border border-stroke-default p-0 overflow-hidden">
          <Accordion size="Medium" hasDivider isContained>
            {siliconSpecs.map((spec, i) => (
              <AccordionItem key={i} defaultOpen={i === 0}>
                <AccordionItemTrigger className="py-3">
                  <div className="flex items-center justify-between width-full pr-4">
                    <div className="flex items-center gap-small min-w-0">
                      <Icon name={getSiliconIcon(i) as any} size="Medium" className="content-emphasis" />
                      <div className="flex flex-col text-align-x-start min-w-0">
                        <span className="text-title-medium content-emphasis font-mono">
                          {spec.title}
                        </span>
                        <span className="text-body-medium content-muted font-mono">
                          {spec.subtitle}
                        </span>
                      </div>
                    </div>
                    {spec.badge && (
                      <Badge label={spec.badge} size="Small" variant="Emphasis" />
                    )}
                  </div>
                </AccordionItemTrigger>

                <AccordionItemContent className="bg-surface-0 border-t border-stroke-default p-4">
                  {spec.details && (
                    <div className="flex flex-col gap-xsmall font-mono text-body-small">
                      {spec.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center justify-between py-1 border-b border-stroke-default/50 last:border-b-0">
                          <span className="content-muted">{detail.label}:</span>
                          <span className="content-emphasis font-semibold">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </AccordionItemContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </div>
  );
}
