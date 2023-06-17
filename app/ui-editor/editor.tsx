"use client";

import type {
  RemirrorProps,
  UseRemirrorReturn,
  UseThemeProps,
} from "@remirror/react";
import classnames from "classnames";
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
>(
  (
    {
      placeholder,
      children,
      theme,
      toolbarProps,
      editable = true,
      classNames = [],
      ...rest
    },
    ref
  ) => {
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
      <div
        className={classnames(
          "marktion-editor",
          {
            "marktion-editor-editable": editable,
          },
          "shadow-md rounded-md border relative"
        )}
      >
        <Remirror
          manager={remirror.manager}
          classNames={[
            "w-full",
            "h-full",
            "min-h-[200px]",
            "max-h-[600px]",
            "p-3",
            "overflow-auto",
            "outline-none",
            "prose",
            ...classNames,
          ]}
          autoFocus
          {...rest}
          editable={editable}
        >
          <EditorComponent />

          {editable && <SlashToolbar />}
          {editable && <BubbleToolbar />}
          {editable && <EditorToolbar {...toolbarProps} />}
          {children}
        </Remirror>
      </div>
    );
  }
);

RemirrorEditor.displayName = "RemirrorEditor";

export function MarktionEditor(props: MarkdownEditorProps) {
  const ref = useRef<MarkdownEditorRef>(null);

  return <RemirrorEditor ref={ref} {...props} />;
}
