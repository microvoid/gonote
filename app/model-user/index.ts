import { nanoid } from "nanoid";
import { prisma } from "../lib-prisma";

export const isUserExists = (email: string) =>
  prisma.user.findUnique({
    where: {
      email: email,
    },
  });

export const createGuest = () => {
  return prisma.user.create({
    data: {
      id: nanoid(),
      name: "anonymous",
      anonymous: true,
    },
  });
};
