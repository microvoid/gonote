"use client";

import type {
  ReactExtensions,
  RemirrorProps,
  UseRemirrorReturn,
  UseThemeProps,
} from "@remirror/react";
import React, { useCallback, useImperativeHandle, useRef } from "react";
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
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  PlaceholderExtension,
  StrikeExtension,
  TableExtension,
  TrailingNodeExtension,
} from "remirror/extensions";
import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import { EditorToolbar, EditorToolbarProps } from "../ui-editor-toolbar";

export type MarkdownEditorProps = {
  placeholder?: string;
  toolbarProps?: EditorToolbarProps;
  theme?: UseThemeProps["theme"];
} & Omit<RemirrorProps<MarktionExtensions[number]>, "manager">;

export type MarkdownEditorRef = UseRemirrorReturn<ReactExtensions<any>>;
export type MarktionExtensions = ReturnType<typeof createExtensions>;

const createExtensions = (placeholder?: string) => {
  return [
    new LinkExtension({ autoLink: true }),
    new PlaceholderExtension({ placeholder }),
    new BoldExtension(),
    new StrikeExtension(),
    new ItalicExtension(),
    new HeadingExtension(),
    new BlockquoteExtension(),
    new BulletListExtension({ enableSpine: true }),
    new OrderedListExtension(),
    new ListItemExtension({
      priority: ExtensionPriority.High,
      enableCollapsible: true,
    }),
    new CodeExtension(),
    new CodeBlockExtension({ supportedLanguages: [jsx, typescript] }),
    new TrailingNodeExtension(),
    new TableExtension(),
    new MarkdownExtension({ copyAsMarkdown: false }),
    /**
     * `HardBreakExtension` allows us to create a newline inside paragraphs.
     * e.g. in a list item
     */
    new HardBreakExtension(),
  ];
};

/**
 * The editor which is used to create the annotation. Supports formatting.
 */
export const MarkdownEditor = React.forwardRef<
  MarkdownEditorRef,
  React.PropsWithChildren<MarkdownEditorProps>
>(({ placeholder, children, theme, toolbarProps, ...rest }, ref) => {
  const extensions = useCallback(
    () => createExtensions(placeholder),
    [placeholder]
  );

  const remirror = useRemirror({
    extensions,
    stringHandler: "markdown",
  });

  useImperativeHandle(ref, () => {
    return remirror;
  });

  return (
    <Remirror
      manager={remirror.manager}
      classNames={[
        "w-full",
        "h-full",
        "p-3",
        "prose",
        "min-h-[200px]",
        "shadow-md",
        "outline-none",
        "rounded",
        "border",
        "overflow-auto",
      ]}
      autoFocus
      {...rest}
    >
      <EditorToolbar {...toolbarProps} />

      <EditorComponent />
      {children}
    </Remirror>
  );
});

export function MarktionEditor(props: MarkdownEditorProps) {
  const ref = useRef<MarkdownEditorRef>(null);

  return <MarkdownEditor ref={ref} {...props} />;
}
