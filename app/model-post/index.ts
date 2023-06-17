import { prisma } from "../lib-prisma";

export const getPostBySlug = async (slug: string) => {
  return prisma.post.findFirst({
    where: {
      slug,
    },
    include: {
      user: true,
    },
  });
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
