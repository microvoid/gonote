import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

export function useLoginUser() {
  const session = useSession();

  if (session.status === 'authenticated') {
    return session.data.user as User;
  }

  return null;
}
