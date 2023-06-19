import { useActive, useCommands, useRemirrorContext } from "@remirror/react";
import {
  HeadingExtensionAttributes,
  TableExtension,
  ParagraphExtension,
} from "remirror/extensions";
import {
  Code,
  Heading1,
  Heading2,
  Heading3,
  ListChecksIcon,
  ListOrderedIcon,
} from "lucide-react";
import { useMemo } from "react";
import {
  BorderBottomIcon,
  BorderLeftIcon,
  BorderRightIcon,
  BorderTopIcon,
  CodeIcon,
  DividerHorizontalIcon,
  FontBoldIcon,
  FontItalicIcon,
  ListBulletIcon,
  QuoteIcon,
  StrikethroughIcon,
  TableIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import { MarktionExtension } from "../ui-editor-extensions/extensions";

export function useToolbarActions() {
  const ctx = useRemirrorContext();
  const {
    convertParagraph: toggleParagraph,
    insertHorizontalRule: toggleHorizontalRule,
    toggleBlockquote,
    toggleCodeBlock,
    toggleHeading,
    toggleOrderedList,
    toggleBulletList,
    toggleTaskList,
    createTable,
  } = useCommands<MarktionExtension | ParagraphExtension>();

  const active = useActive<MarktionExtension | ParagraphExtension>();

  const { tools: TableTools } = useTableTools();

  const Tools = [
    {
      key: "paragraph",
      active: active.paragraph(),
      toggle: () => {
        if (toggleParagraph.enabled()) {
          toggleParagraph();
        }
      },
      icon: <TextIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "heading1",
      active: active.heading({ level: 1 }),
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
      active: active.heading({ level: 2 }),
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
      active: active.heading({ level: 3 }),
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
      active: active.orderedList(),
      toggle: () => {
        if (toggleOrderedList.enabled()) {
          toggleOrderedList();
        }
      },
      icon: <ListOrderedIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "bullet-list",
      active: active.bulletList(),
      toggle: () => {
        if (toggleBulletList.enabled()) {
          toggleBulletList();
        }
      },
      icon: <ListBulletIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "task-list",
      active: active.taskList(),
      toggle: () => {
        if (toggleTaskList.enabled()) {
          toggleTaskList();
        }
      },
      icon: <ListChecksIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "blockquote",
      active: active.blockquote(),
      toggle: () => {
        if (toggleBlockquote.enabled()) {
          toggleBlockquote();
        }
      },
      icon: <QuoteIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "codeblock",
      active: active.codeBlock(),
      toggle: () => {
        if (toggleCodeBlock.enabled()) {
          toggleCodeBlock();
        }
      },
      icon: <CodeIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "table",
      active: active.table(),
      toggle: () => {
        if (createTable.enabled()) {
          const cellContent = ctx.schema.nodes.paragraph.create({ level: 3 }, [
            ctx.schema.text("-"),
          ]);

          createTable({
            withHeaderRow: true,
            cellContent,
          });
        }
      },
      icon: <TableIcon className="w-[14px] h-[14px]" />,
    },
    {
      key: "divider",
      active: active.horizontalRule(),
      toggle: () => {
        if (toggleHorizontalRule.enabled()) {
          toggleHorizontalRule();
        }
      },
      icon: <DividerHorizontalIcon className="w-[14px] h-[14px]" />,
    },
  ];

  const blockFormatValues = Tools.filter(item => item.active).map(
    item => item.key
  );

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
    Tools: active.table() ? TableTools : Tools,

    blockFormatValues,

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

export function useInlineTools() {
  const { toggleBold, toggleItalic, toggleStrike, toggleCode } = useCommands<
    MarktionExtension | ParagraphExtension
  >();

  const active = useActive<MarktionExtension | ParagraphExtension>();

  const tools = [
    {
      key: "bold",
      active: active.bold(),
      toggle: () => {
        if (toggleBold.enabled()) {
          toggleBold();
        }
      },
      icon: <FontBoldIcon />,
    },
    {
      key: "italic",
      active: active.italic(),
      toggle: () => {
        if (toggleItalic.enabled()) {
          toggleItalic();
        }
      },
      icon: <FontItalicIcon />,
    },
    {
      key: "strike",
      active: active.strike(),
      toggle: () => {
        if (toggleStrike.enabled()) {
          toggleStrike();
        }
      },
      icon: <StrikethroughIcon />,
    },
    {
      key: "code",
      active: active.code(),
      toggle: () => {
        if (toggleCode.enabled()) {
          toggleCode();
        }
      },
      icon: <Code className="w-[14px] h-[14px]" />,
    },
  ];

  const formats = tools.filter(item => item.active).map(item => item.key);

  return {
    formats,
    tools,
  };
}
