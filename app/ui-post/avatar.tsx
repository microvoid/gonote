import Image from "next/image";
import { getGuestAvatar } from "@/app/utils/avatar";
import { User } from "@prisma/client";

export const UserAvatar = ({ user }: { user: User }) => {
  return (
    <Image
      className="w-[32px] h-[32px] rounded-full mr-2"
      src={getGuestAvatar(user)}
      alt={user.name!}
      width={32}
      height={32}
    />
  );
};
