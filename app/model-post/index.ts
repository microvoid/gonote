import { prisma } from "../lib-prisma";

export const getPostBySlug = async (slug: string) => {
  await prisma.post.update({
    where: {
      slug,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  const post = await prisma.post.findFirst({
    where: {
      slug,
    },
    include: {
      user: true,
    },
  });

  return post;
};

export const getUserPosts = async (
  userId: string,
  cursorId?: string,
  take = 15
) => {
  return prisma.post.findMany({
    cursor: cursorId
      ? {
          id: cursorId,
        }
      : undefined,
    take,
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
};
