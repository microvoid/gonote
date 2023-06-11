import { nanoid } from "nanoid";
import { Post } from "@prisma/client";
import { prisma } from "../lib-prisma";
import { ApiHandler } from "../lib-auth";

export const upsertPost = ApiHandler.auth(async (req, session) => {
  const { markdown, slug = nanoid(10), id } = (await req.json()) as Post;

  if (id) {
    const post = await prisma.post.update({
      data: {
        markdown,
      },
      where: {
        id,
      },
    });

    return ApiHandler.success(post);
  } else {
    const post = await prisma.post.create({
      data: {
        slug,
        markdown,
        userId: session.user.id,
      },
    });

    return ApiHandler.success(post);
  }
});
