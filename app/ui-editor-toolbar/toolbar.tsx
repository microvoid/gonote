import * as Toolbar from "@radix-ui/react-toolbar";
import {
  StrikethroughIcon,
  FontBoldIcon,
  FontItalicIcon,
  QuoteIcon,
  CodeIcon,
  ImageIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { Toast } from "../ui-toast";
import { useToolbarActions } from "./useToolbarActions";

export type EditorToolbarProps = {
  suffix?: React.ReactNode;
};

export function EditorToolbar(props: EditorToolbarProps) {
  const [isCommingSoonToastOpen, setCommingSoonToastOpen] = useState(false);
  const { blockFormatValues, onToggleBlockquote, onToggleCodeblock } =
    useToolbarActions();

  return (
    <Toolbar.Root
      className="flex p-[10px] mb-2 w-full min-w-max rounded-md shadow-md border"
      aria-label="Formatting options"
    >
      <Toolbar.ToggleGroup
        type="multiple"
        value={blockFormatValues}
        aria-label="block type"
      >
        <Toolbar.ToggleItem
          className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-secondary data-[state=on]:text-secondary-content"
          value="blockquote"
          aria-label="blockquote"
          onClick={onToggleBlockquote}
        >
          <QuoteIcon />
        </Toolbar.ToggleItem>

        <Toolbar.ToggleItem
          className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-secondary data-[state=on]:text-secondary-content"
          value="codeblock"
          aria-label="code block"
          onClick={onToggleCodeblock}
        >
          <CodeIcon />
        </Toolbar.ToggleItem>

        <Toolbar.ToggleItem
          className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-secondary data-[state=on]:text-secondary-content"
          value="image"
          aria-label="image block"
          onClick={() => {
            setCommingSoonToastOpen(false);
            setTimeout(() => {
              setCommingSoonToastOpen(true);
            }, 100);
          }}
        >
          <ImageIcon />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>

      <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />
      {props.suffix}

      <Toast
        open={isCommingSoonToastOpen}
        onOpenChange={setCommingSoonToastOpen}
      >
        Comming Soon
      </Toast>
    </Toolbar.Root>
  );
}

export function InlineToolBtn() {
  const { textFormatValues, onToggleBold, onToggleItalic, onToggleStrike } =
    useToolbarActions();

  return (
    <Toolbar.ToggleGroup
      type="multiple"
      aria-label="Text formatting"
      value={textFormatValues}
    >
      <Toolbar.ToggleItem
        className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-secondary data-[state=on]:text-secondary-content"
        value="bold"
        aria-label="Bold"
        onClick={onToggleBold}
      >
        <FontBoldIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-secondary data-[state=on]:text-secondary-content"
        value="italic"
        aria-label="Italic"
        onClick={onToggleItalic}
      >
        <FontItalicIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className="flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-secondary data-[state=on]:text-secondary-content"
        value="strikethrough"
        aria-label="Strike through"
        onClick={onToggleStrike}
      >
        <StrikethroughIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
  );
}
