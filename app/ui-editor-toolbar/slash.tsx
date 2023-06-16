import * as MenuPrimitives from "@radix-ui/react-menu";
import { usePositioner } from "@remirror/react-hooks";
import { useEditorEvent } from "@remirror/react";
import { useCallback, useMemo, useState } from "react";
import { useToolbarActions } from "./useToolbarActions";

export function SlashToolbar() {
  const positioner = usePositioner("cursor");
  const [slashToolbarOpen, setSlashToolbarOpen] = useState(false);
  const [slashPositioner, setSlashPositioner] = useState(positioner);
  const { Tools } = useToolbarActions();

  useEditorEvent(
    "keydown",
    useCallback(
      e => {
        const isSlashKeyDown = !e.ctrlKey && !e.metaKey && e.key === "/";

        if (positioner.active && isSlashKeyDown) {
          setTimeout(() => {
            setSlashToolbarOpen(true);
            setSlashPositioner(positioner);
          });
        }
      },
      [positioner]
    )
  );

  const inlineStyle: React.CSSProperties = useMemo(
    () => ({
      position: "absolute",
      pointerEvents: "none",
      left: positioner.x,
      top: positioner.y,
      width: positioner.width,
      height: positioner.height,
    }),
    [positioner.x, positioner.y, positioner.width, positioner.height]
  );

  return (
    <div role="slash-toolbar">
      <div
        role="slash-positioner"
        style={inlineStyle}
        ref={slashPositioner.ref}
      ></div>

      <MenuPrimitives.Menu
        open={slashToolbarOpen}
        onOpenChange={setSlashToolbarOpen}
        modal={false}
      >
        <MenuPrimitives.Anchor asChild>
          <div style={inlineStyle} role="bubble-positioner-trigger"></div>
        </MenuPrimitives.Anchor>

        <MenuPrimitives.MenuContent
          side="bottom"
          align="start"
          sideOffset={10}
          className="p-2 bg-white rounded-md shadow-md border will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
        >
          {Tools.map(tool => {
            return (
              <MenuPrimitives.Item
                className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none"
                onSelect={() => {
                  tool.toggle();
                }}
                key={tool.key}
              >
                {tool.key}
              </MenuPrimitives.Item>
            );
          })}
        </MenuPrimitives.MenuContent>
      </MenuPrimitives.Menu>
    </div>
  );
}
