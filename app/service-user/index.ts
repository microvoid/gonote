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

export type UserInfoWithState = Awaited<ReturnType<typeof getUserInfoWithStats>>;

export async function getUserInfoWithStats(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id
    }
  });

  if (!user) {
    return null;
  }

  const postCount = await prisma.post.count({
    where: {
      userId: id
    }
  })

  return {
    user,
    stats: {
      postCount
    }
  }
}
