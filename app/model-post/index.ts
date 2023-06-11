import { prisma } from "../lib-prisma";

export const getPostBySlug = async (slug: string) => {
  return prisma.post.findFirst({
    where: {
      slug,
    },
  });
};
