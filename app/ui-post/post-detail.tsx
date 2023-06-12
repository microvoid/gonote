import { Post, User } from "@prisma/client";
import { renderTitleDesc } from "./segments";
import { MarktionSSR } from "../ui-editor";

export function PostDetail({ post, user }: { post: Post; user: User }) {
  return (
    <>
      <div className="py-6">{renderTitleDesc(post, user)}</div>

      <MarktionSSR initialContent={post?.markdown} />
    </>
  );
}
