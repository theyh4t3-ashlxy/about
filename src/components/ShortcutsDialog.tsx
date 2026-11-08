import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Icon,
} from "@rbx/foundation-ui";
import { useTheme } from "../context/ThemeContext";

const shortcutList = [
  { key: "1", description: "system & hardware telemetry" },
  { key: "2", description: "projects & repositories" },
  { key: "3", description: "desktop captures & media" },
  { key: "4", description: "known issues & bug tracker" },
  { key: "s", description: "appearance & sound settings" },
  { key: "a", description: "persona & mood switcher" },
  { key: "c", description: "canvas color generator" },
  { key: "m", description: "toggle mechanical switch audio" },
  { key: "?", description: "keyboard shortcuts help" },
];

export function ShortcutsDialog() {
  const { isShortcutsOpen, setIsShortcutsOpen, playSound } = useTheme();

  return (
    <Dialog
      size="Medium"
      isModal={true}
      hasCloseAffordance={true}
      closeLabel="close shortcuts"
      open={isShortcutsOpen}
      onOpenChange={setIsShortcutsOpen}
    >
      <DialogContent className="max-width-[576px] clip shadow-transient-high">
        {/* Content Wrapper */}
        <div className="padding-x-xlarge padding-top-xlarge padding-bottom-large text-body-medium flex flex-col gap-large font-builder lowercase">
          {/* Header */}
          <div className="flex flex-col gap-xxsmall padding-right-[42px]">
            <div className="flex items-center gap-small">
              <Icon name="icon-regular-keyboard" size="Medium" className="content-emphasis" />
              <DialogTitle className="text-heading-small margin-none content-emphasis lowercase font-extended">
                terminal shortcuts
              </DialogTitle>
            </div>
            <p className="text-body-small content-muted margin-none">
              instant keyboard navigation for power users.
            </p>
          </div>

          {/* Shortcuts Grid */}
          <div className="flex flex-col gap-xsmall">
            {shortcutList.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between padding-x-medium padding-y-small radius-small bg-shift-100 stroke-standard stroke-default"
              >
                <span className="text-body-medium content-default">
                  {item.description}
                </span>
                <kbd className="font-mono text-label-small font-bold content-emphasis bg-surface-200 stroke-standard stroke-default radius-xsmall padding-x-small padding-y-none shadow-sm">
                  {item.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="padding-x-xlarge padding-bottom-xlarge width-full flex flex-col gap-small">
          <Button
            variant="Emphasis"
            size="Medium"
            onClick={() => {
              playSound("pop");
              setIsShortcutsOpen(false);
            }}
            className="width-full cursor-pointer lowercase"
          >
            <span>got it</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
