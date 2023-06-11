import { getSession, signIn } from "next-auth/react";

export async function signInWithGuest() {
  const session = await getSession();

  if (!session) {
    return signIn("credentials");
  }

  return null;
}
