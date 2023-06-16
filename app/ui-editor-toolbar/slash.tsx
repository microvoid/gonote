import Menu, { MenuItem } from "rc-menu";
import * as Popover from "@radix-ui/react-popover";
import { usePositioner } from "@remirror/react-hooks";
import {
  useCommands,
  useCurrentSelection,
  useEditorEvent,
} from "@remirror/react";
import { useMemo, useRef, useState } from "react";
import { useToolbarActions } from "./useToolbarActions";
import { getPositioner } from "@remirror/extension-positioner";
import { FromToProps } from "remirror";

export function SlashToolbar() {
  const positioner = usePositioner(() => {
    return getPositioner("cursor");
  }, []);
  const commands = useCommands();

  const [activeIndex, setActiveIndex] = useState(0);
  const [slashToolbarOpen, setSlashToolbarOpen] = useState(false);
  const [slashPositioner, setSlashPositioner] = useState(positioner);
  const [slashStartSelection, setSlashStartSelection] =
    useState<FromToProps | null>(null);

  const { Tools } = useToolbarActions();
  const positionerRef = useRef(positioner);

  positionerRef.current = positioner;

  const activeDown = () => {
    if (activeIndex + 1 >= Tools.length) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const activeUp = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(Tools.length - 1);
    }
  };

  const onChoseTool = (index: number) => {
    const tool = Tools[index];

    if (tool) {
      slashStartSelection && commands.delete(slashStartSelection);

      tool.toggle();
      setSlashToolbarOpen(false);
      commands.focus();
    }
  };

  useEditorEvent("textInput", e => {
    const isSlashKeyDown = e.text.trim() === "/";

    setTimeout(() => {
      if (positionerRef.current.active && isSlashKeyDown) {
        setSlashToolbarOpen(true);
        setSlashPositioner(positionerRef.current);
        setSlashStartSelection({
          from: e.from,
          to: e.to + 1,
        });
      }
    });
  });

  useEditorEvent("keydown", e => {
    if (slashToolbarOpen) {
      if (e.key === "Enter") {
        e.preventDefault();

        onChoseTool(activeIndex);
      }

      if (e.key === "Escape") {
        setSlashToolbarOpen(false);
      }
      if (e.key === "ArrowDown") {
        activeDown();
        e.preventDefault();
      }

      if (e.key === "ArrowUp") {
        activeUp();
        e.preventDefault();
      }
    }
  });

  const inlineStyle: React.CSSProperties = useMemo(
    () => ({
      position: "absolute",
      pointerEvents: "none",
      left: slashPositioner.x,
      top: slashPositioner.y,
      width: slashPositioner.width,
      height: slashPositioner.height,
    }),
    [
      slashPositioner.x,
      slashPositioner.y,
      slashPositioner.width,
      slashPositioner.height,
    ]
  );

  return (
    <div role="slash-toolbar">
      <div role="slash-positioner" ref={positioner.ref}></div>

      <Popover.Root open={slashToolbarOpen} onOpenChange={setSlashToolbarOpen}>
        <Popover.Anchor asChild>
          <div style={inlineStyle} role="bubble-positioner-trigger"></div>
        </Popover.Anchor>

        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="start"
            sideOffset={10}
            onOpenAutoFocus={e => e.preventDefault()}
            className="bg-white rounded-md shadow-md border will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          >
            <Menu activeKey={Tools[activeIndex].key}>
              {Tools.map((tool, index) => {
                return (
                  <MenuItem
                    key={tool.key}
                    onClick={() => onChoseTool(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    {tool.key}
                  </MenuItem>
                );
              })}
            </Menu>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
