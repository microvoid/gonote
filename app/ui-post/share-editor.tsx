"use client";

import fetch from "axios";
import * as Toolbar from "@radix-ui/react-toolbar";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";
import { Post } from "@prisma/client";
import {
  UpdateIcon,
  ClockIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { MarkdownEditorProps, MarktionEditor } from "../ui-editor";

import { ToolbarBtn } from "../ui-editor-toolbar";
import { fromNow } from "../utils/time";
import { PostDropmenu, PostDropmenuProps } from "./post-dropmenu";

export type ShareEditorProps = MarkdownEditorProps & {
  defaultPost?: Post;
  onSelectMenu?: PostDropmenuProps["onSelectMenu"];
};

export function ShareEditor({
  defaultPost,
  initialContent,
  onSelectMenu,
  ...editorProps
}: ShareEditorProps) {
  const [isFocus, setFocus] = useState(false);
  const [post, setPost] = useState(defaultPost);
  const [isSaving, setIsSaving] = useState(false);

  const postId = post?.id;

  initialContent = post?.markdown || initialContent;

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
            setPost(post);
          }

          setIsSaving(false);
        } catch (err) {
          setIsSaving(false);
        }
      }, 1000),
    [postId]
  );

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  return (
    <MarktionEditor
      placeholder="Enter with your markdown text..."
      {...editorProps}
      onFocus={onFocus}
      onBlur={onBlur}
      initialContent={initialContent}
      onChange={({ tr, helpers }) => {
        if (tr?.docChanged) {
          const markdown = helpers.getMarkdown();
          const title = getMarktionTitle(markdown) || null;

          onUpdateOrCreatePost(markdown, title);
        }
      }}
    >
      <EditorToolbar
        post={post}
        isSaving={isSaving}
        isFocus={isFocus}
        onSelectMenu={onSelectMenu}
      />
    </MarktionEditor>
  );
}

function EditorToolbar({
  post,
  isSaving,
  isFocus,
  onSelectMenu,
}: {
  post?: Post;
  isSaving: boolean;
  isFocus: boolean;
  onSelectMenu?: ShareEditorProps["onSelectMenu"];
}) {
  const postUrl = post ? `${location.origin}/m/${post.slug}` : null;

  const toolbarSuffixNode = (
    <>
      <div className="flex items-center">
        {(isSaving || postUrl) && (
          <Toolbar.Separator className="w-[1px] h-full bg-mauve6 mx-[10px]" />
        )}

        {postUrl && (
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

      {post && (
        <PostDropmenu post={post} onSelectMenu={onSelectMenu}>
          <Toolbar.Button
            className="bg-transparent text-mauve11 inline-flex justify-center items-center hover:bg-transparent hover:cursor-pointer flex-shrink-0 flex-grow-0 basis-auto h-[25px] px-[5px] rounded text-[13px] leading-none  ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-secondary data-[state=on]:text-secondary-content"
            style={{ marginLeft: "auto" }}
            title="export as markdown file"
          >
            <DotsHorizontalIcon />
          </Toolbar.Button>
        </PostDropmenu>
      )}
    </>
  );

  return (
    <Toolbar.Root
      className="flex p-[10px] w-full min-w-max absolute bottom-0"
      aria-label="Formatting options"
    >
      {(isFocus || !post) && <ToolbarBtn />}
      {!isFocus && post && <PostMeta post={post} />}
      {toolbarSuffixNode}
    </Toolbar.Root>
  );
}

function PostMeta({ post }: { post: Post }) {
  return (
    <div className="text-mauve11 h-[26px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none first:ml-0">
      <ClockIcon className="mr-1 inline" /> {fromNow(post.updatedAt)}
    </div>
  );
}

function getMarktionTitle(markdown: string) {
  const paragraphs = markdown.split("\n");
  const heading = paragraphs.find(item => item.startsWith("#")) || "";

  return heading.replace(/#+\s/, "");
}

export default ShareEditor;
