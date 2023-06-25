import fetch from "axios";
import { Post } from "@prisma/client";
import { downloadFile } from "../utils/file";
import { siteConstants } from "../constants";

export enum HandlerKey {
  download,
  delete,
  commit,
  public,
}

export async function handler(key: HandlerKey, post: Post) {
  switch (key) {
    case HandlerKey.download:
      return download(post);
    case HandlerKey.delete:
      return delPost(post.id);
    case HandlerKey.public:
      return setPublic(post.id);
  }
}

export function download(post?: Post) {
  downloadFile(
    `${post?.title || siteConstants.brand}.md`,
    post?.markdown || ""
  );
}

export async function delPost(id: string) {
  return await fetch({
    url: `/api/post/${id}`,
    method: "delete",
    data: {
      id,
    },
  });
}

async function setPublic(id: string) {
  await fetch({
    url: "/api/post",
    method: "post",
    data: {
      id,
      publicStats: "public",
    },
  });
}
