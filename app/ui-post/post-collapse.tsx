"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Post, User } from "@prisma/client";
import { renderTitle, renderTitleDesc } from "./segments";
import { MarktionSSR } from "../ui-editor";

const ShareEditor = dynamic(() => import("./share-editor"), {
  ssr: false,
});

export function PostCollapse({ post, user }: { post: Post; user: User }) {
  return (
    <>
      <div className="py-6">
        {renderTitle(post)}
        {renderTitleDesc(post, user)}
      </div>

      <Editor post={post} />
    </>
  );
}

export default function Editor({ post }: { post: Post }) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div onClick={() => setIsEdit(true)}>
      {isEdit ? (
        <ShareEditor
          initialContent={post.markdown}
          onBlur={() => setIsEdit(false)}
        />
      ) : (
        <MarktionSSR initialContent={post.markdown} />
      )}
    </div>
  );
}
