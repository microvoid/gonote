import { User } from "@prisma/client";

export const getGuestAvatar = (user: User) => {
  return `https://avatar.marktion.cn/api/avatar/${user.id}?t=window&s=128`;
};
