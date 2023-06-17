"use client";

import { useState } from "react";
import { Post } from "@prisma/client";

export type PostsProps = {
  defaultPosts: Post[];
};

export function PostCards({ defaultPosts }: PostsProps) {
  const [posts, setPosts] = useState(defaultPosts);

  return <div></div>;
}
