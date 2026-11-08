import React, { useState } from "react";
import {
  Badge, // We'll use this only if it works, but I've replaced it with native divs below
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Icon,
} from "@rbx/foundation-ui";
import { mediaData } from "../data/media";
import type { MediaCaptureItem } from "../types";

export function MediaView() {
  const [selectedItem, setSelectedItem] = useState<MediaCaptureItem | null>(null);

  return (
    <div className="flex flex-col gap-large lowercase">
      {/* Section Header */}
      <div className="flex flex-col gap-xsmall">
        <h2 className="text-heading-small content-emphasis">
          captures
        </h2>
        <p className="text-body-medium content-sub">
          desktop screenshots, compositor recordings, and wallpapers
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-large">
        {mediaData.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedItem(item)}
            className="foundation-web-button relative clip group/interactable focus-visible:outline-focus flex flex-col justify-between bg-surface-100 stroke-standard stroke-default radius-large padding-medium text-align-x-left cursor-pointer"
          >
            {/* STATE LAYER */}
            <div
              aria-hidden="true"
              data-testid="foundation-web-state-layer"
              className="absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)]"
            ></div>

            {/* Header Row */}
            <div className="flex flex-row items-start justify-between gap-small relative z-10">
              <div className="flex flex-col gap-xsmall min-width-0">
                <span className="text-label-medium content-emphasis text-truncate-end">
                  {item.title}
                </span>
                <span className="text-caption-small content-sub text-truncate-end">
                  {item.subtitle}
                </span>
              </div>

              {/* Native Foundation Badge Structure */}
              <div className="foundation-web-badge flex items-center select-none gap-[var(--size-150)] radius-circle height-600 width-[fit-content] padding-x-small bg-shift-200 content-emphasis stroke-none shrink-0">
                <span className="text-no-wrap text-truncate-split text-label-small padding-y-xsmall padding-x-xxsmall content-emphasis">
                  {item.tag}
                </span>
              </div>
            </div>

            {/* Media Preview */}
            <div className="relative width-full radius-medium overflow-hidden clip margin-y-small relative z-10 aspect-video bg-surface-200">
              {item.type === "video" ? (
                <div className="width-full height-full relative flex items-center justify-center">
                  <video src={item.src} muted preload="metadata" className="width-full height-full object-cover opacity-80" />
                  <div className="absolute inset-[0] flex items-center justify-center bg-[rgba(0,0,0,0.4)] group-hover/interactable:bg-[rgba(0,0,0,0.2)] transition-colors">
                    <div className="padding-small radius-circle bg-surface-100 content-emphasis shadow-transient-high">
                      <Icon name="icon-regular-circle-play" size="Medium" />
                    </div>
                  </div>
                </div>
              ) : (
                <img src={item.src} alt={item.title} className="width-full height-full object-cover" loading="lazy" />
              )}
            </div>

            {/* Metadata Row */}
            <div className="flex flex-row items-center justify-between relative z-10 margin-top-auto">
              <span className="text-caption-small content-muted font-mono">
                {item.resolution}
              </span>
              <span className="text-caption-small content-muted">
                {item.timestamp}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Dialog */}
      {selectedItem && (
        <Dialog size="Large" isModal={true} hasCloseAffordance={true} closeLabel="close" open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="relative radius-large bg-surface-100 stroke-muted stroke-standard foundation-web-dialog-content shadow-transient-high">

            {/* Content Wrapper */}
            <div className="padding-x-xlarge padding-top-xlarge padding-bottom-xlarge text-body-medium flex flex-col gap-large lowercase">

              {/* Header */}
              <div className="flex flex-col gap-xsmall">
                <DialogTitle className="text-heading-small margin-none content-emphasis">
                  {selectedItem.title}
                </DialogTitle>
                <p className="text-body-medium content-sub">
                  {selectedItem.subtitle}
                </p>
              </div>

              {/* Media Container */}
              <div className="width-full radius-medium overflow-hidden clip bg-surface-0 flex items-center justify-center stroke-standard stroke-default">
                {selectedItem.type === "video" ? (
                  <video src={selectedItem.src} controls autoPlay className="max-height-[50vh] width-full object-contain" />
                ) : (
                  <img src={selectedItem.src} alt={selectedItem.title} className="max-height-[50vh] width-full object-contain" />
                )}
              </div>

              {/* Description Box */}
              <div className="bg-shift-100 padding-medium radius-medium">
                <p className="text-body-medium content-sub font-mono">
                  {selectedItem.description}
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-3 gap-small">
                <div className="bg-shift-100 padding-small radius-small flex flex-col gap-y-xsmall">
                  <span className="text-caption-small content-sub">resolution</span>
                  <span className="text-label-medium content-emphasis font-mono">{selectedItem.resolution}</span>
                </div>
                <div className="bg-shift-100 padding-small radius-small flex flex-col gap-y-xsmall">
                  <span className="text-caption-small content-sub">type</span>
                  <span className="text-label-medium content-emphasis font-mono">{selectedItem.type}</span>
                </div>
                <div className="bg-shift-100 padding-small radius-small flex flex-col gap-y-xsmall">
                  <span className="text-caption-small content-sub">timestamp</span>
                  <span className="text-label-medium content-emphasis font-mono">{selectedItem.timestamp}</span>
                </div>
              </div>

            </div>

            {/* Footer Wrapper (Stacked Native) */}
            <div className="padding-x-xlarge padding-bottom-xlarge width-full flex flex-col gap-small lowercase">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="foundation-web-button relative clip group/interactable focus-visible:outline-focus flex items-center justify-center stroke-none padding-y-none select-none radius-medium text-label-medium height-1000 padding-x-medium bg-action-emphasis content-action-emphasis width-full"
              >
                <div aria-hidden="true" data-testid="foundation-web-state-layer" className="absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)]"></div>
                <span className="flex items-center min-width-0 gap-small relative z-10">
                  <span className="padding-y-xsmall text-truncate-end text-no-wrap">close</span>
                </span>
              </button>

              <a
                href={selectedItem.src}
                target="_blank"
                rel="noreferrer"
                className="foundation-web-button relative clip group/interactable focus-visible:outline-focus flex items-center justify-center stroke-standard stroke-default padding-y-none select-none radius-medium text-label-medium height-1000 padding-x-medium bg-none content-emphasis width-full text-no-wrap no-underline"
              >
                <div aria-hidden="true" data-testid="foundation-web-state-layer" className="absolute inset-[0] transition-colors group-hover/interactable:bg-[var(--color-state-hover)] group-active/interactable:bg-[var(--color-state-press)]"></div>
                <span className="flex items-center min-width-0 gap-small relative z-10">
                  <span className="padding-y-xsmall text-truncate-end text-no-wrap">open raw asset</span>
                  <Icon name="icon-regular-arrow-up-right-from-square" size="Small" />
                </span>
              </a>
            </div>

          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
