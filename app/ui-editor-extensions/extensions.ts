import jsx from "refractor/lang/jsx.js";
import typescript from "refractor/lang/typescript.js";
import { ExtensionPriority } from "remirror";
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  ImageExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  OrderedListExtension,
  PlaceholderExtension,
  StrikeExtension,
  TableExtension,
  TaskListExtension,
  TrailingNodeExtension,
  HorizontalRuleExtension,
} from "remirror/extensions";
import { MarkdownExtension } from "./extension-marktion";

export type MarktionExtension = ReturnType<typeof createExtensions>[number];

export const createExtensions = (placeholder?: string) => {
  return [
    new LinkExtension({ autoLink: true }),
    new PlaceholderExtension({ placeholder }),
    new BoldExtension(),
    new StrikeExtension(),
    new ItalicExtension(),
    new HorizontalRuleExtension(),
    new HeadingExtension(),
    new BlockquoteExtension(),
    new ImageExtension(),
    new BulletListExtension({ enableSpine: true }),
    new OrderedListExtension(),
    new TaskListExtension({
      extraAttributes: {
        class: "remirror-task-list",
      },
    }),
    new ListItemExtension({
      extraAttributes: {
        ["data-role"]: "list",
      },
      priority: ExtensionPriority.High,
      enableCollapsible: true,
    }),
    new CodeExtension(),
    new CodeBlockExtension({ supportedLanguages: [jsx, typescript] }),
    new TrailingNodeExtension(),
    new TableExtension(),
    new MarkdownExtension({
      copyAsMarkdown: false,
    }),
    /**
     * `HardBreakExtension` allows us to create a newline inside paragraphs.
     * e.g. in a list item
     */
    new HardBreakExtension(),
  ];
};
