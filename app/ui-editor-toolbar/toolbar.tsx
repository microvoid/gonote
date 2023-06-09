import * as Toolbar from "@radix-ui/react-toolbar";

import {
  StrikethroughIcon,
  FontBoldIcon,
  FontItalicIcon,
  QuoteIcon,
  CodeIcon,
} from "@radix-ui/react-icons";
import { useActive, useCommands } from "@remirror/react";
import {
  BlockquoteExtension,
  BoldExtension,
  CodeBlockExtension,
  ItalicExtension,
  StrikeExtension,
} from "remirror/extensions";
import { useCallback, useMemo } from "react";

export function EditorToolbar() {
  const { toggleBold } = useCommands<BoldExtension>();
  const { toggleItalic } = useCommands<ItalicExtension>();
  const { toggleStrike } = useCommands<StrikeExtension>();
  const { toggleBlockquote } = useCommands<BlockquoteExtension>();
  const { toggleCodeBlock } = useCommands<CodeBlockExtension>();

  const boldActive = useActive<BoldExtension>().bold();
  const italicActive = useActive<ItalicExtension>().italic();
  const strikeActive = useActive<StrikeExtension>().strike();
  const blockquoteActive = useActive<BlockquoteExtension>().blockquote();
  const codeblockActive = useActive<CodeBlockExtension>().codeBlock();

  const textFormatValues = useMemo(() => {
    const values: ("bold" | "italic" | "strikethrough")[] = [];

    if (boldActive) {
      values.push("bold");
    }

    if (italicActive) {
      values.push("italic");
    }

    if (strikeActive) {
      values.push("strikethrough");
    }
    return values;
  }, [boldActive, italicActive, strikeActive]);

  const blockTypeValues = useMemo(() => {
    const values: ("blockquote" | "codeblock")[] = [];

    if (blockquoteActive) {
      values.push("blockquote");
    }

    if (codeblockActive) {
      values.push("codeblock");
    }

    return values;
  }, [blockquoteActive, codeblockActive]);

  const onToggleBold = useCallback(() => {
    if (toggleBold.enabled()) {
      toggleBold();
    }
  }, [toggleBold]);

  const onToggleItalic = useCallback(() => {
    if (toggleItalic.enabled()) {
      toggleItalic();
    }
  }, [toggleItalic]);

  const onToggleStrike = useCallback(() => {
    if (toggleStrike.enabled()) {
      toggleStrike();
    }
  }, [toggleStrike]);

  const onToggleBlockquote = useCallback(() => {
    if (toggleBlockquote.enabled()) {
      toggleBlockquote();
    }
  }, [toggleBlockquote]);

  const onToggleCodeblock = useCallback(() => {
    if (toggleCodeBlock.enabled()) {
      toggleCodeBlock();
    }
  }, [toggleCodeBlock]);

  return (
    <Toolbar.Root
      className="flex p-[10px] mb-2 w-full min-w-max rounded-md shadow-md border"
      aria-label="Formatting options"
    >
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
      <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />
      <Toolbar.ToggleGroup
        type="multiple"
        value={blockTypeValues}
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
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />
      <Toolbar.Link
        className="bg-transparent text-mauve11 inline-flex justify-center items-center hover:bg-transparent hover:cursor-pointer flex-shrink-0 flex-grow-0 basis-auto h-[25px] px-[5px] rounded text-[13px] leading-none  ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-secondary data-[state=on]:text-secondary-content"
        href="#"
        target="_blank"
        style={{ marginRight: 10 }}
      >
        Edited 2 hours ago
      </Toolbar.Link>
      <Toolbar.Button
        className="px-[10px] text-primary-content bg-primary flex-shrink-0 flex-grow-0 basis-auto h-[25px] rounded inline-flex text-[13px] leading-none items-center justify-center outline-none hover:bg-violet10 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7"
        style={{ marginLeft: "auto" }}
      >
        Share
      </Toolbar.Button>
    </Toolbar.Root>
  );
}
