import { nanoid } from "nanoid";
import { Post } from "@prisma/client";
import { prisma } from "../lib-prisma";
import { ApiHandler } from "../lib-auth";
import { PostModel } from "../model";

export const upsertPost = ApiHandler.auth(async (req, ctx, session) => {
  const { markdown, slug = nanoid(10), id, title } = (await req.json()) as Post;

  if (id) {
    const post = await prisma.post.update({
      data: {
        title,
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
        title,
        markdown,
        userId: session.user.id,
      },
    });

    return ApiHandler.success(post);
  }
});

export const getUserPosts = ApiHandler.auth(async (req, ctx, session) => {
  const res = await PostModel.getUserPosts(session.user.id);

  return ApiHandler.success(res);
});

export const delPost = ApiHandler.auth(
  async (req, ctx: { params: { id: string } }, session) => {
    const post = await prisma.post.findUnique({
      where: {
        id: ctx.params.id,
      },
    });

    if (!post) {
      return ApiHandler.error("not found");
    }

    if (post.userId !== session.user.id) {
      return ApiHandler.unauthorized();
    }

    const res = await prisma.post.delete({
      where: {
        id: ctx.params.id,
      },
    });

    return ApiHandler.success(res);
  }
);
