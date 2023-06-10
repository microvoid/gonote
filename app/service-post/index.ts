import { nanoid } from "nanoid";
import { Post } from "@prisma/client";
import { prisma } from "../lib-prisma";
import { ApiHandler } from "../lib-auth";

export async function upsertPost(req: Request) {
  const session = await ApiHandler.session();

  if (!session) {
    return createAnonymousPost(req);
  }
}

export const createAnonymousPost = ApiHandler.anonymous(async (req, user) => {
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
      },
    });

    return ApiHandler.success(post);
  }
});
