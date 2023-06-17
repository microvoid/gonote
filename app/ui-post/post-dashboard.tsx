"use client";

import fetch from "axios";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { Post } from "@prisma/client";
import { HandlerKey, handler } from "./post-handler";

export type PostsProps = {
  defaultPosts?: Post[];
};

const ShareEditor = dynamic(() => import("./share-editor"), {
  ssr: false,
});

export function PostDashboard({ defaultPosts = [] }: PostsProps) {
  const [posts, setPosts] = useState(defaultPosts);

  const onSelectMenu: typeof handler = useCallback(async (key, menu) => {
    await handler(key, menu);

    if ([HandlerKey.delete, HandlerKey.commit].includes(key)) {
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

  return (
    <div className="p-5 mx-auto md:w-[768px]">
      <div className="mb-6">
        <ShareEditor
          classNames={["min-h-[130px]"]}
          toolbarProps={{
            onSelectMenu,
            isCommitBtnShow: true,
          }}
        />
      </div>

      {posts.map(post => {
        return (
          <section className="mb-4" key={post.id}>
            <ShareEditor
              defaultPost={post}
              toolbarProps={{
                onSelectMenu,
              }}
            />
          </section>
        );
      })}
    </div>
  );
}
