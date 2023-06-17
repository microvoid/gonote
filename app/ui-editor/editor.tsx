"use client";

import type {
  RemirrorProps,
  UseRemirrorReturn,
  UseThemeProps,
} from "@remirror/react";
import React, { useCallback, useImperativeHandle, useRef } from "react";
import { EditorComponent, Remirror, useRemirror } from "@remirror/react";

import {
  BubbleToolbar,
  EditorToolbar,
  EditorToolbarProps,
  SlashToolbar,
} from "../ui-editor-toolbar";
import {
  MarktionExtension,
  createExtensions,
} from "../ui-editor-extensions/extensions";

export type MarkdownEditorProps = {
  placeholder?: string;
  toolbarProps?: EditorToolbarProps;
  theme?: UseThemeProps["theme"];
} & Omit<RemirrorProps<MarktionExtension>, "manager">;

export type MarkdownEditorRef = UseRemirrorReturn<MarktionExtension>;

/**
 * The editor which is used to create the annotation. Supports formatting.
 */
export const RemirrorEditor = React.forwardRef<
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
    return remirror as MarkdownEditorRef;
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
        "rounded-md",
        "border",
        "overflow-auto",
      ]}
      autoFocus
      {...rest}
    >
      <EditorToolbar {...toolbarProps} />
      <BubbleToolbar />
      <SlashToolbar />

      <EditorComponent />
      {children}
    </Remirror>
  );
});

RemirrorEditor.displayName = "RemirrorEditor";

export function MarktionEditor(props: MarkdownEditorProps) {
  const ref = useRef<MarkdownEditorRef>(null);

  return <RemirrorEditor ref={ref} {...props} />;
}
