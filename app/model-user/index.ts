import { prisma } from "../lib-prisma";

export const isUserExists = (email: string) =>
  prisma.user.findUnique({
    where: {
      email: email,
    },
  });
