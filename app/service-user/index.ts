import { User } from "@prisma/client";
import { prisma } from "../lib-prisma";

export async function linkAnonymouseUser(user: User, profile: User) {
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      anonymous: false,
      name: profile.name,
      email: profile.email!,
      emailVerified: new Date(),
      image: profile.image,
    },
  });
}
