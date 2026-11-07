import React, { useState } from "react";
import { Badge, Card } from "@rbx/foundation-ui";
import { bareMetalSpecs, siliconSpecs } from "../data/telemetry";

export function TelemetryView() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Bare metal section */}
      <div>
        <div className="mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#cbd3d9]">
            bare metal & firmware
          </h2>
          <p className="text-xs text-[#8f98a0]">telemetry queried via inxi -fxz</p>
        </div>

        <div className="space-y-2">
          {bareMetalSpecs.map((spec, i) => (
            <Card
              key={i}
              className="!bg-[#191b1d] border border-[#2d3136] !p-4 rounded-xl flex items-center justify-between hover:border-[#3e444b] transition-colors"
            >
              <div className="space-y-1">
                <div className="text-sm font-semibold text-[#f2f4f5] font-mono">
                  {spec.title}
                </div>
                <div className="text-xs text-[#a7b0b5] font-mono">{spec.subtitle}</div>
              </div>

              <div className="flex items-center gap-2">
                {spec.badge && (
                  <Badge label={spec.badge} size="Small" variant="Standard" />
                )}
                <button
                  onClick={() => handleCopy(spec.subtitle, spec.title)}
                  className="px-2 py-1 text-xs font-mono rounded bg-[#24272c] hover:bg-[#2d3136] text-[#cbd3d9] transition-colors"
                  title="copy info"
                >
                  {copiedKey === spec.title ? "copied" : "copy"}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Compute & silicon section */}
      <div>
        <div className="mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#cbd3d9]">
            compute & silicon
          </h2>
          <p className="text-xs text-[#8f98a0]">alder lake cores and dual hybrid gpus</p>
        </div>

        <div className="space-y-2">
          {siliconSpecs.map((spec, i) => (
            <details
              key={i}
              className="group bg-[#191b1d] border border-[#2d3136] rounded-xl overflow-hidden hover:border-[#3e444b] transition-colors"
              open={i === 0}
            >
              <summary className="cursor-pointer p-4 list-none flex items-center justify-between select-none">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#00A2FF] font-mono group-open:rotate-90 transition-transform">
                      ▶
                    </span>
                    <span className="text-sm font-semibold text-[#f2f4f5] font-mono">
                      {spec.title}
                    </span>
                  </div>
                  <div className="text-xs text-[#a7b0b5] font-mono pl-4">
                    {spec.subtitle}
                  </div>
                </div>

                {spec.badge && (
                  <Badge label={spec.badge} size="Small" variant="Emphasis" />
                )}
              </summary>

              {spec.details && (
                <div className="px-4 pb-4 pt-2 border-t border-[#24272c] bg-[#141518] space-y-1.5 font-mono text-xs">
                  {spec.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[#a7b0b5]">
                      <span className="text-[#8f98a0]">{detail.label}:</span>
                      <span className="text-[#f2f4f5]">{detail.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
