"use client";

import { SsrTransformer } from "@remirror/extension-react-ssr";
import { PlainExtension, extension } from "@remirror/core";

interface SSRExtensionOptions {}

@extension<SSRExtensionOptions>({})
export class SSRExtension extends PlainExtension<SSRExtensionOptions> {
  get name() {
    return "ssr-extesion" as const;
  }

  onCreate() {
    this.store.setStoreKey("ssrTransformer", this.createSSRTransformer());
  }

  createSSRTransformer(): SsrTransformer {
    return element => element;
  }
}
