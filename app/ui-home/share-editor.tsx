"use client";

import fetch from "axios";
import * as Toolbar from "@radix-ui/react-toolbar";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { Post } from "@prisma/client";
import { DownloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import { MarkdownEditorProps, MarktionEditor } from "../ui-editor";
import { downloadFile } from "../utils/file";
import { siteConstants } from "../constants";

export function ShareEditor(props: MarkdownEditorProps) {
  const [postId, setPostId] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState<string | null>(null);

  const isPostEditing = Boolean(postId);

  const onUpdateOrCreatePost = useMemo(
    () =>
      debounce(async (markdown: string, title: Post["title"]) => {
        setIsSaving(true);

        try {
          const res = await fetch({
            url: "/api/post",
            method: "post",
            data: {
              title,
              id: postId,
              markdown,
            },
          });

          const post: Post = res.data.data;

          if (!postId) {
            setPostId(post.id);
            setSlug(post.slug);
            setTitle(post.title);
          }

          setIsSaving(false);
        } catch (err) {
          setIsSaving(false);
        }
      }, 1000),
    [postId]
  );

  const onExportMarkdown = () => {
    downloadFile(`${title || siteConstants.brand}.md`, draft);
  };

  const postUrl = `${location.origin}/m/${slug}`;

  const toolbarSuffixNode = (
    <>
      <div className="flex items-center">
        {(isSaving || isPostEditing) && (
          <Toolbar.Separator className="w-[1px] h-full bg-mauve6 mx-[10px]" />
        )}

        {isPostEditing && (
          <>
            <Toolbar.Link
              className="bg-transparent text-mauve11 inline-flex justify-center items-center hover:bg-transparent hover:cursor-pointer flex-shrink-0 flex-grow-0 basis-auto h-[25px] px-[5px] rounded text-[13px] leading-none  ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-secondary data-[state=on]:text-secondary-content"
              href={postUrl}
              target="_blank"
            >
              {postUrl}
            </Toolbar.Link>
          </>
        )}

        {isSaving && <UpdateIcon className="animate-spin" />}
      </div>

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
    <div className="p-5 mx-auto w-full md:w-[768px]">
      <MarktionEditor
        placeholder="Enter with your markdown text..."
        {...props}
        onChange={({ tr, helpers }) => {
          if (tr?.docChanged) {
            const markdown = helpers.getMarkdown();
            const title = getMarktionTitle(markdown) || null;

            setDraft(markdown);
            onUpdateOrCreatePost(markdown, title);
          }
        }}
        toolbarProps={{
          suffix: toolbarSuffixNode,
        }}
      />
    </div>
  );
}

function getMarktionTitle(markdown: string) {
  const paragraphs = markdown.split("\n");
  const heading = paragraphs.find(item => item.startsWith("#")) || "";

  return heading.replace(/#+\s/, "");
}

export default ShareEditor;
