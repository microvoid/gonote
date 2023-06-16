import { useActive, useCommands, useRemirrorContext } from "@remirror/react";
import {
  BlockquoteExtension,
  BoldExtension,
  CodeBlockExtension,
  ItalicExtension,
  StrikeExtension,
  HeadingExtension,
  HeadingExtensionAttributes,
  BulletListExtension,
  OrderedListExtension,
  TaskListExtension,
  TableExtension,
} from "remirror/extensions";
import {
  Heading1,
  Heading2,
  Heading3,
  ListChecksIcon,
  ListOrderedIcon,
} from "lucide-react";
import { useCallback, useMemo } from "react";
import {
  BorderBottomIcon,
  BorderLeftIcon,
  BorderRightIcon,
  BorderTopIcon,
  CodeIcon,
  ListBulletIcon,
  QuoteIcon,
  TableIcon,
} from "@radix-ui/react-icons";

export function useToolbarActions() {
  const ctx = useRemirrorContext();

  const { toggleBlockquote } = useCommands<BlockquoteExtension>();
  const { toggleCodeBlock } = useCommands<CodeBlockExtension>();
  const { toggleHeading } = useCommands<HeadingExtension>();
  const { toggleOrderedList } = useCommands<OrderedListExtension>();
  const { toggleBulletList } = useCommands<BulletListExtension>();
  const { toggleTaskList } = useCommands<TaskListExtension>();
  const { createTable } = useCommands<TableExtension>();

  const blockquoteActive = useActive<BlockquoteExtension>();
  const codeblockActive = useActive<CodeBlockExtension>();
  const headingActive = useActive<HeadingExtension>();
  const orderedListActive = useActive<OrderedListExtension>();
  const bulletListActive = useActive<BulletListExtension>();
  const taskListActive = useActive<TaskListExtension>();
  const tableActive = useActive<TableExtension>();

  const { toggleBold } = useCommands<BoldExtension>();
  const { toggleItalic } = useCommands<ItalicExtension>();
  const { toggleStrike } = useCommands<StrikeExtension>();

  const boldActive = useActive<BoldExtension>().bold();
  const italicActive = useActive<ItalicExtension>().italic();
  const strikeActive = useActive<StrikeExtension>().strike();

  const { tools: TableTools } = useTableTools();

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
      icon: <Heading1 className="w-[14px] h-[14px]" />,
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
      icon: <Heading2 className="w-[14px] h-[14px]" />,
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
      icon: <Heading3 className="w-[14px] h-[14px]" />,
    },
    {
      key: "ordered-list",
      active: orderedListActive.orderedList(),
      toggle: () => {
        if (toggleOrderedList.enabled()) {
          toggleOrderedList();
        }
      },
      icon: <ListOrderedIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "bullet-list",
      active: bulletListActive.bulletList(),
      toggle: () => {
        if (toggleBulletList.enabled()) {
          toggleBulletList();
        }
      },
      icon: <ListBulletIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "task-list",
      active: taskListActive.taskList(),
      toggle: () => {
        if (toggleTaskList.enabled()) {
          toggleTaskList();
        }
      },
      icon: <ListChecksIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "blockquote",
      active: blockquoteActive.blockquote(),
      toggle: () => {
        if (toggleBlockquote.enabled()) {
          toggleBlockquote();
        }
      },
      icon: <QuoteIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "codeblock",
      active: codeblockActive.codeBlock(),
      toggle: () => {
        if (toggleCodeBlock.enabled()) {
          toggleCodeBlock();
        }
      },
      icon: <CodeIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "table",
      active: tableActive.table(),
      toggle: () => {
        if (createTable.enabled()) {
          const cellContent = ctx.schema.nodes.paragraph.create({ level: 3 }, [
            ctx.schema.text("cell"),
          ]);

          createTable({
            withHeaderRow: true,
            cellContent,
          });
        }
      },
      icon: <TableIcon className="w-[14px] h-[14px]" />,
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
    Tools: tableActive.table() ? TableTools : Tools,

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

export function useTableTools() {
  const {
    addTableColumnAfter,
    addTableColumnBefore,
    addTableRowBefore,
    addTableRowAfter,
  } = useCommands<TableExtension>();
  const tableActive = useActive<TableExtension>();

  const tools = [
    {
      key: "table-row-add-before",
      active: tableActive.tableCell(),
      toggle: () => {
        if (addTableRowBefore.enabled()) {
          addTableRowBefore();
        }
      },
      icon: <BorderTopIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "table-row-add-after",
      active: tableActive.tableCell(),
      toggle: () => {
        if (addTableRowAfter.enabled()) {
          addTableRowAfter();
        }
      },
      icon: <BorderBottomIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "table-col-add-before",
      active: tableActive.tableCell(),
      toggle: () => {
        if (addTableColumnBefore.enabled()) {
          addTableColumnBefore();
        }
      },
      icon: <BorderLeftIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "table-col-add-after",
      active: tableActive.tableCell(),
      toggle: () => {
        if (addTableColumnAfter.enabled()) {
          addTableColumnAfter();
        }
      },
      icon: <BorderRightIcon className="w-[14px] h-[14px]" />,
    },
  ];

  return {
    tools,
  };
}
