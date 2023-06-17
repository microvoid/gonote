"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Post } from "@prisma/client";
export type PostsProps = {
  defaultPosts?: Post[];
};

const ShareEditor = dynamic(() => import("../ui-post/share-editor"), {
  ssr: false,
});

export function PostCards({ defaultPosts = [] }: PostsProps) {
  const [posts, setPosts] = useState(defaultPosts);

  return posts.map(post => {
    return <PostCard post={post} />;
  });
}

function PostCard({ post }: { post: Post }) {
  return (
    <section className="mb-4">
      <ShareEditor defaultPost={post} />
    </section>
  );
}
