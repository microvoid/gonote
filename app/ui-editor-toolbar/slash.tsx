import * as MenuPrimitives from "@radix-ui/react-menu";
import { usePositioner } from "@remirror/react-hooks";
import { useEditorEvent } from "@remirror/react";
import { useCallback, useMemo, useState } from "react";

export function SlashToolbar() {
  const positioner = usePositioner("cursor");
  const [slashToolbarOpen, setSlashToolbarOpen] = useState(false);
  const [slashPositioner, setSlashPositioner] = useState(positioner);

  useEditorEvent(
    "keydown",
    useCallback(
      e => {
        const isSlashKeyDown = !e.ctrlKey && !e.metaKey && e.key === "/";

        console.log(positioner.active, isSlashKeyDown);

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
          // @ts-ignore
          onOpenAutoFocus={() => false}
          className="p-3 bg-white rounded-md shadow-md border will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
        >
          <MenuPrimitives.Item
            className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none"
            onSelect={() => window.alert("minimize")}
          >
            Minimize window
          </MenuPrimitives.Item>
          <MenuPrimitives.Item
            className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none"
            onSelect={() => window.alert("zoom")}
          >
            Zoom
          </MenuPrimitives.Item>
          <MenuPrimitives.Item
            className="group text-[13px] leading-none text-violet11 rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none"
            onSelect={() => window.alert("smaller")}
          >
            Smaller
          </MenuPrimitives.Item>
        </MenuPrimitives.MenuContent>
      </MenuPrimitives.Menu>
    </div>
  );
}
