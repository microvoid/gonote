"use client";

import type {
  ReactExtensions,
  RemirrorProps,
  UseRemirrorReturn,
  UseThemeProps,
} from "@remirror/react";
import React, { useCallback, useImperativeHandle, useRef } from "react";
import { EditorComponent, Remirror, useRemirror } from "@remirror/react";

import { EditorToolbar, EditorToolbarProps } from "../ui-editor-toolbar";
import { createExtensions } from "./extensions";

export type MarkdownEditorProps = {
  placeholder?: string;
  toolbarProps?: EditorToolbarProps;
  theme?: UseThemeProps["theme"];
} & Omit<RemirrorProps<MarktionExtensions[number]>, "manager">;

export type MarkdownEditorRef = UseRemirrorReturn<ReactExtensions<any>>;
export type MarktionExtensions = ReturnType<typeof createExtensions>;

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

  return <RemirrorEditor ref={ref} {...props} />;
}
