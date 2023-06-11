"use client";

import fetch from "axios";
import * as Toolbar from "@radix-ui/react-toolbar";
import { MarktionEditor } from "../ui-editor";
import { useMemo, useState } from "react";
import { debounce } from "lodash";
import { Post } from "@prisma/client";
import { DownloadIcon } from "@radix-ui/react-icons";
import { downloadFile } from "../utils/file";

export function ShareEditor(props: { initialContent?: string }) {
  const [postId, setPostId] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const isDraftEditor = Boolean(postId);

  const onUpdateOrCreatePost = useMemo(
    () =>
      debounce(async (markdown: string) => {
        const res = await fetch({
          url: "/api/post",
          method: "post",
          data: {
            id: postId,
            markdown,
          },
        });

        const post: Post = res.data.data;

        if (!postId) {
          setPostId(post.id);
          setSlug(post.slug);
        }
      }, 1000),
    [postId]
  );

  const onExportMarkdown = () => {
    downloadFile(`${slug || "marktion"}.md`, draft);
  };

  const postUrl = `${location.origin}/m/${slug}`;

  const toolbarSuffixNode = (
    <>
      {isDraftEditor && (
        <Toolbar.Link
          className="bg-transparent text-mauve11 inline-flex justify-center items-center hover:bg-transparent hover:cursor-pointer flex-shrink-0 flex-grow-0 basis-auto h-[25px] px-[5px] rounded text-[13px] leading-none  ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-secondary data-[state=on]:text-secondary-content"
          href={postUrl}
          target="_blank"
          style={{ marginRight: 10 }}
        >
          {postUrl}
        </Toolbar.Link>
      )}

      <Toolbar.Button
        className="px-[10px] text-primary-content bg-primary flex-shrink-0 flex-grow-0 basis-auto h-[25px] rounded inline-flex text-[13px] leading-none items-center justify-center outline-none hover:bg-violet10 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7"
        style={{ marginLeft: "auto" }}
        title="export as markdown file"
        onClick={onExportMarkdown}
      >
        <DownloadIcon />
      </Toolbar.Button>
    </>
  );

  return (
    <div className="p-5 mx-auto md:w-[768px] sm:w-3/4">
      <MarktionEditor
        placeholder="Edit markdown..."
        onChange={({ tr, helpers }) => {
          if (tr?.docChanged) {
            const markdown = helpers.getMarkdown();

            setDraft(markdown);
            onUpdateOrCreatePost(markdown);
          }
        }}
        toolbarProps={{
          suffix: toolbarSuffixNode,
        }}
      />
    </div>
  );
}

export default ShareEditor;
