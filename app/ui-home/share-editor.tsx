"use client";

import fetch from "axios";
import * as Toolbar from "@radix-ui/react-toolbar";
import { MarktionEditor } from "../ui-editor";
import { useState } from "react";

export function ShareEditor(props: { initialContent?: string }) {
  const [postId, setPostId] = useState<string | null>(null);

  const isDraftEditor = Boolean(postId);

  const toolbarSuffixNode = (
    <>
      {isDraftEditor && (
        <Toolbar.Link
          className="bg-transparent text-mauve11 inline-flex justify-center items-center hover:bg-transparent hover:cursor-pointer flex-shrink-0 flex-grow-0 basis-auto h-[25px] px-[5px] rounded text-[13px] leading-none  ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-secondary data-[state=on]:text-secondary-content"
          href="#"
          target="_blank"
          style={{ marginRight: 10 }}
        >
          https://{location.host}/post/{postId}
        </Toolbar.Link>
      )}

      <Toolbar.Button
        className="px-[10px] text-primary-content bg-primary flex-shrink-0 flex-grow-0 basis-auto h-[25px] rounded inline-flex text-[13px] leading-none items-center justify-center outline-none hover:bg-violet10 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7"
        style={{ marginLeft: "auto" }}
      >
        Share Link
      </Toolbar.Button>
    </>
  );

  return (
    <div className="p-5 mx-auto md:w-[768px] sm:w-3/4">
      <MarktionEditor
        placeholder="Edit markdown..."
        onChange={({ tr, helpers }) => {
          if (tr?.docChanged) {
            console.log("changed", helpers, helpers.getMarkdown());
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
