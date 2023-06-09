import { nanoid } from "nanoid";
import { Post } from "@prisma/client";
import { prisma } from "../lib-prisma";
import { ApiHandler } from "../lib-auth";

export const postAnonymousPost = ApiHandler.anonymous(
  async (req, res, user) => {
    const { markdown, slug = nanoid() } = req.body as Post;

    const post = await prisma.post.create({
      data: {
        markdown,
        slug,
        userId: user.id,
      },
    });

    return ApiHandler.success(res, post);
  }
);
