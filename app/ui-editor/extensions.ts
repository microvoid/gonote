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
  PositionerExtension,
  StrikeExtension,
  TableExtension,
  TaskListExtension,
  TrailingNodeExtension,
} from "remirror/extensions";
import { MarkdownExtension } from "../ui-editor-extensions/remirror-extension-marktion";

export const createExtensions = (placeholder?: string) => {
  return [
    new LinkExtension({ autoLink: true }),
    new PlaceholderExtension({ placeholder }),
    new BoldExtension(),
    new StrikeExtension(),
    new ItalicExtension(),
    new HeadingExtension(),
    new BlockquoteExtension(),
    new ImageExtension(),
    new BulletListExtension({ enableSpine: true }),
    new OrderedListExtension(),
    new TaskListExtension(),
    new ListItemExtension({
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
