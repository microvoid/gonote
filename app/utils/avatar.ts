import { User } from "@prisma/client";
import AVATAR from "@/public/avatar.svg";

export const getGuestAvatar = (user: User) => {
  return AVATAR;
};
