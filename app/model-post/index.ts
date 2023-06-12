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

export const getUserPosts = async (userId: string) => {
  return prisma.post.findMany({
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
