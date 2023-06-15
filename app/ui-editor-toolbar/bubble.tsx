import React, { CSSProperties, useCallback, useMemo, useState } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import * as Popover from "@radix-ui/react-popover";
import { getPositioner } from "@remirror/extension-positioner";
import { usePositioner } from "@remirror/react-hooks";
import { useEditorEvent } from "@remirror/react";
import { InlineToolBtn } from "./toolbar";

export type BubbleToolbarProps = {};

export function BubbleToolbar(props: BubbleToolbarProps) {
  const [bubbleOpen, setBubbleOpen] = useState(false);

  const { ref, x, y, width, height, active } = usePositioner(() => {
    return getPositioner("selection");
  }, []);

  useEditorEvent(
    "mouseup",
    useCallback(() => {
      if (active) {
        setBubbleOpen(true);
      }
    }, [active])
  );

  useEditorEvent(
    "keyup",
    useCallback(
      e => {
        if (active) {
          setBubbleOpen(true);
        }
      },
      [active]
    )
  );

  const inlineStyle: CSSProperties = useMemo(
    () => ({
      position: "absolute",
      pointerEvents: "none",
      left: x,
      top: y,
      width,
      height,
    }),
    [x, y, width, height]
  );

  return (
    <div role="bubble-toolbar">
      <div ref={ref} data-bubble-positioner></div>
      <Popover.Root open={bubbleOpen} onOpenChange={setBubbleOpen}>
        <Popover.Anchor asChild>
          <div
            style={inlineStyle}
            data-bubble-positioner-dropdown-trigger
          ></div>
        </Popover.Anchor>

        <Popover.Portal>
          <Popover.Content
            side="top"
            sideOffset={15}
            onOpenAutoFocus={e => e.preventDefault()}
            className="p-3 w-[260px] bg-white rounded-md shadow-md border will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          >
            <Toolbar.Root>
              <InlineToolBtn />
            </Toolbar.Root>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
