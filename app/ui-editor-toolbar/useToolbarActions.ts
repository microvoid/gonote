import { useActive, useCommands } from "@remirror/react";
import {
  BlockquoteExtension,
  BoldExtension,
  CodeBlockExtension,
  ItalicExtension,
  StrikeExtension,
  HeadingExtension,
  HeadingExtensionAttributes,
} from "remirror/extensions";
import { useCallback, useMemo } from "react";

export function useToolbarActions() {
  const { toggleBlockquote } = useCommands<BlockquoteExtension>();
  const { toggleCodeBlock } = useCommands<CodeBlockExtension>();
  const { toggleHeading } = useCommands<HeadingExtension>();

  const blockquoteActive = useActive<BlockquoteExtension>();
  const codeblockActive = useActive<CodeBlockExtension>();
  const headingActive = useActive<HeadingExtension>();

  const { toggleBold } = useCommands<BoldExtension>();
  const { toggleItalic } = useCommands<ItalicExtension>();
  const { toggleStrike } = useCommands<StrikeExtension>();

  const boldActive = useActive<BoldExtension>().bold();
  const italicActive = useActive<ItalicExtension>().italic();
  const strikeActive = useActive<StrikeExtension>().strike();

  const Tools = [
    {
      key: "heading1",
      active: headingActive.heading({ level: 1 }),
      toggle: () => {
        if (toggleHeading.enabled()) {
          toggleHeading({
            level: 1,
          });
        }
      },
    },
    {
      key: "heading2",
      active: headingActive.heading({ level: 2 }),
      toggle: () => {
        if (toggleHeading.enabled()) {
          toggleHeading({
            level: 2,
          });
        }
      },
    },
    {
      key: "heading3",
      active: headingActive.heading({ level: 3 }),
      toggle: () => {
        if (toggleHeading.enabled()) {
          toggleHeading({
            level: 3,
          });
        }
      },
    },
    {
      key: "blockquote",
      active: blockquoteActive.blockquote(),
      toggle: () => {
        if (toggleBlockquote.enabled()) {
          toggleBlockquote();
        }
      },
    },
    {
      key: "codeblock",
      active: codeblockActive.codeBlock(),
      toggle: () => {
        if (toggleCodeBlock.enabled()) {
          toggleCodeBlock();
        }
      },
    },
  ];

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

  const blockFormatValues = Tools.filter(item => item.active).map(
    item => item.key
  );

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

  const { onToggleBlockquote, onToggleCodeblock, onToggleHeading } =
    useMemo(() => {
      return {
        onToggleBlockquote: () => {
          if (toggleBlockquote.enabled()) {
            toggleBlockquote();
          }
        },
        onToggleCodeblock: () => {
          if (toggleCodeBlock.enabled()) {
            toggleCodeBlock();
          }
        },
        onToggleHeading: (attrs?: HeadingExtensionAttributes) => {
          if (toggleHeading.enabled()) {
            toggleHeading(attrs);
          }
        },
      };
    }, [toggleBlockquote, toggleCodeBlock, toggleHeading]);

  return {
    Tools,

    textFormatValues,
    blockFormatValues,

    onToggleBold,
    onToggleItalic,
    onToggleStrike,

    toggleBlockquote,
    toggleCodeBlock,
    toggleHeading,

    onToggleBlockquote,
    onToggleCodeblock,
    onToggleHeading,
  };
}
