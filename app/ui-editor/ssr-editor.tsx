"use client";

import { createReactManager } from "@remirror/react";
import { RemirrorSSR, RemirrorSSRProps } from "@remirror/react-ssr";
import { createExtensions } from "../ui-editor-extensions/extensions";
import { SSRExtension } from "../ui-editor-extensions/extension-marktion-ssr";

export type MarktionSSRProps = Partial<
  RemirrorSSRProps<ReturnType<typeof createExtensionsWithSSR>[number]>
> & {
  initialContent?: string;
};

const createExtensionsWithSSR = () => {
  return [...createExtensions(), new SSRExtension()];
};

export function MarktionSSR({
  editable = false,
  attributes = {},
  initialContent,
  ...rest
}: MarktionSSRProps) {
  const extensions = createExtensionsWithSSR();
  const manager = createReactManager(extensions, {
    stringHandler: "markdown",
  });
  const state = manager.createState({
    content: initialContent,
  });

  const className =
    "ProseMirror remirror-editor remirror-a11y-dark w-full h-full p-3 prose min-h-[200px] shadow-md outline-none rounded border overflow-auto";

  return (
    <div className="remirror-editor-wrapper">
      <RemirrorSSR
        {...rest}
        editable={editable}
        attributes={{
          ...attributes,
          className,
        }}
        manager={manager}
        state={state}
      />
    </div>
  );
}
