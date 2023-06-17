import dynamic from "next/dynamic";

import { Hero } from "../ui-home/hero";
import { OSS } from "../ui-home/oss";
import { Nav } from "../ui-home/nav";

const ShareEditor = dynamic(() => import("../ui-home/share-editor"), {
  ssr: false,
});

const initialContent = `# Gonote

Gonote is a Notion-style WYSIWYG editor with AI-powered autocompletions. Built [nextjs.org](//nextjs.org), [openai.com](//openai.com), [remirror.io](//remirror.io)...

## Quick start

1. **press '/' for commands**, or markdown syntax directly.
2. Click the preview link in the toolbar below and share it with your friends🎉🎉🎉.

## Feature

1. Continue writing using OpenAI.
2. Support common Markdown syntax: headings, quotes, lists, code blocks, tables, etc.

## Learn more

1. Star on Github.
2. Deploy your own.`;

export default async function Home() {
  return (
    <>
      <Nav />

      {/* <OSS /> */}

      <ShareEditor initialContent={initialContent} />

      {/* <Hero /> */}
    </>
  );
}
