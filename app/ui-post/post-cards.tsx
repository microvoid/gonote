"use client";

import fetch from "axios";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { Post } from "@prisma/client";
import { HandlerKey, handler } from "./post-handler";

export type PostsProps = {
  defaultPosts?: Post[];
};

const ShareEditor = dynamic(() => import("../ui-post/share-editor"), {
  ssr: false,
});

export function PostCards({ defaultPosts = [] }: PostsProps) {
  const [posts, setPosts] = useState(defaultPosts);

  const onSelectMenu: typeof handler = useCallback(async (key, menu) => {
    await handler(key, menu);

    if (key === HandlerKey.delete) {
      await onRefreshPosts();
    }
  }, []);

  const onRefreshPosts = async () => {
    try {
      const res = await fetch({
        url: "/api/post",
        method: "get",
      });

      const posts: Post[] = res.data.data || [];

      setPosts(posts);
    } catch (err) {
      setPosts([]);
    }
  };

  return posts.map(post => {
    return (
      <section className="mb-4" key={post.id}>
        <ShareEditor defaultPost={post} onSelectMenu={onSelectMenu} />
      </section>
    );
  });
}
