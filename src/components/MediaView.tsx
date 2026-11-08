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
import { mediaData } from "../data/media";
import type { MediaCaptureItem } from "../types";

export function MediaView() {
  const [selectedItem, setSelectedItem] = useState<MediaCaptureItem | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "recording":
        return "icon-regular-video-camera";
      case "wallpaper":
        return "icon-regular-image";
      case "artwork":
        return "icon-regular-paint-brush";
      default:
        return "icon-regular-folder";
    }
  };

  return (
    <div className="flex flex-col gap-medium">
      <div className="mb-2">
        <h2 className="text-title-medium content-emphasis font-bold lowercase">
          captures
        </h2>
        <p className="text-body-medium content-muted lowercase">
          desktop screenshots, compositor recordings, and wallpapers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-medium">
        {mediaData.map((item) => (
          <Card
            key={item.id}
            variant="Standard"
            density="Default"
            className="border border-stroke-default hover:border-stroke-emphasis transition-all duration-150 flex flex-col justify-between cursor-pointer group overflow-hidden"
            onClick={() => setSelectedItem(item)}
            title={
              <span className="font-mono text-title-small content-emphasis">
                {item.title}
              </span>
            }
            badge={
              <Badge
                label={item.tag}
                size="XSmall"
                variant={item.type === "video" ? "Emphasis" : "Standard"}
              />
            }
            description={
              <span className="text-body-medium content-muted line-clamp-2">
                {item.subtitle}
              </span>
            }
          >
            {/* Thumbnail preview */}
            <div className="my-3 relative rounded-medium overflow-hidden border border-stroke-default bg-surface-200/50 aspect-video w-full flex items-center justify-center">
              {item.type === "video" ? (
                <div className="w-full h-full relative flex items-center justify-center">
                  <video
                    src={item.src}
                    muted
                    preload="metadata"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                    <div className="p-2.5 rounded-full bg-surface-100/90 text-content-emphasis shadow-lg group-hover:scale-110 transition-transform">
                      <Icon name="icon-regular-circle-play" size="Medium" />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              )}
            </div>

            <div className="pt-2 mt-auto flex items-center justify-between border-t border-stroke-default/60">
              <span className="text-caption-large font-mono content-subtle">
                {item.resolution}
              </span>

              <div className="flex items-center gap-xsmall" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="Standard"
                  size="Small"
                  onClick={() => setSelectedItem(item)}
                >
                  {item.type === "video" ? "play" : "view"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Foundation Dialog popup for media viewing */}
      {selectedItem && (
        <Dialog
          size="Large"
          isModal={true}
          hasCloseAffordance={true}
          closeLabel="Close dialog"
          open={!!selectedItem}
          onOpenChange={(open) => !open && setSelectedItem(null)}
        >
          <DialogContent className="max-w-2xl bg-surface-100 border border-stroke-default rounded-xl overflow-hidden shadow-2xl">
            <DialogHeroMedia className="bg-surface-200/50 border-b border-stroke-default p-4 flex items-center justify-center overflow-hidden">
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  className="max-h-[50vh] max-w-full rounded-small object-contain shadow-md bg-black"
                />
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="max-h-[50vh] max-w-full rounded-small object-contain shadow-md"
                />
              )}
            </DialogHeroMedia>

            <DialogBody className="p-6 flex flex-col gap-medium">
              <div className="flex items-start justify-between gap-medium flex-wrap">
                <div>
                  <DialogTitle className="text-heading-small content-emphasis font-extended">
                    {selectedItem.title}
                  </DialogTitle>
                  <p className="text-body-medium content-default pt-1">
                    {selectedItem.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-xsmall">
                  <Badge
                    label={selectedItem.tag}
                    size="Small"
                    variant={selectedItem.type === "video" ? "Emphasis" : "Standard"}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-medium bg-surface-0 border border-stroke-default">
                <p className="text-body-medium content-muted font-mono leading-relaxed text-sm">
                  {selectedItem.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-small text-caption-large font-mono">
                <div className="p-2.5 rounded-small bg-surface-0 border border-stroke-default">
                  <span className="content-muted block text-caption-small">resolution</span>
                  <span className="content-emphasis font-semibold">{selectedItem.resolution}</span>
                </div>
                <div className="p-2.5 rounded-small bg-surface-0 border border-stroke-default">
                  <span className="content-muted block text-caption-small">type</span>
                  <span className="content-emphasis font-semibold">{selectedItem.type}</span>
                </div>
                <div className="p-2.5 rounded-small bg-surface-0 border border-stroke-default col-span-2 sm:col-span-1">
                  <span className="content-muted block text-caption-small">timestamp</span>
                  <span className="content-emphasis font-semibold">{selectedItem.timestamp}</span>
                </div>
              </div>
            </DialogBody>

            <Divider />

            <DialogFooter className="px-6 py-4 flex items-center justify-between bg-surface-100">
              <Button
                variant="Standard"
                size="Medium"
                onClick={() => setSelectedItem(null)}
              >
                close
              </Button>

              <Button asChild variant="Standard" size="Medium">
                <a
                  href={selectedItem.src}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-xsmall"
                >
                  <span>open raw asset</span>
                  <Icon name="icon-regular-arrow-up-right-from-square" size="Small" />
                </a>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
