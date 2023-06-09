import { nanoid } from "nanoid";
import { prisma } from "../lib-prisma";

export const isUserExists = (email: string) =>
  prisma.user.findUnique({
    where: {
      email: email,
    },
  });

export const getAnonymousUser = async () => {
  let user = await prisma.user.findFirst({
    where: {
      anonymous: true,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: nanoid(),
        name: "anonymous",
        anonymous: true,
      },
    });
  }

  return user;
};
