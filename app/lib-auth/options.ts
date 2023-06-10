import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/app/model";
import { sendRegisterEmail } from "@/app/email";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // EmailProvider({
    //   sendVerificationRequest({ identifier, url }) {
    //     sendRegisterEmail({
    //       to: identifier,
    //       url,
    //     });
    //   },
    // }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT ? ".dub.sh" : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  pages: {
    error: "/login",
  },
  callbacks: {
    signIn({ user, account, profile }) {
      if (account?.provider === "google") {
      }

      return true;
    },
  },
};
