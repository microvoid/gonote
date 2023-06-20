import { NextAuthOptions } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/app/model";
import { User } from "@prisma/client";
import { createGuest } from "../model-user";
import { linkAnonymouseUser } from "../service-user";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const options: NextAuthOptions = {
  // debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const user = await createGuest();

        return user;
      },
    }),
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
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_DOMAIN?.replace(
              /^(http|https):\/\//,
              ""
            )}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  pages: {
    error: "/login",
  },
  callbacks: {
    async signIn(params) {
      const { user, account } = params;

      if (account?.provider === "github" && user.email) {
        const profile = params.profile as GithubProfile;
        const userExists = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (userExists && profile) {
          await prisma.user.update({
            where: { email: user.email! },
            data: {
              name: profile.name,
              image: profile["avatar_url"],
            },
          });
        }
      }

      return true;
    },

    jwt: async params => {
      const { token, account, trigger } = params;
      const user = params.user as User;

      if (user) {
        token.user = user;
      }

      const isUpdateIn = trigger === "update";
      /**
       * When an anonymouse user login, update token.
       */
      const isLinkAnonymouseSignIn =
        trigger === "signIn" &&
        account?.provider === "github" &&
        user.anonymous;

      if (isUpdateIn || isLinkAnonymouseSignIn) {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });

        token.user = refreshedUser;
        token.name = refreshedUser?.name;
        token.email = refreshedUser?.email;
        token.image = refreshedUser?.image;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token["user"] as User;
      
      return session;
    },
  },

  events: {
    async linkAccount(message) {
      const user = message.user as User;
      const profile = message.profile as User;

      if (user.anonymous) {
        await linkAnonymouseUser(user, profile);
      }
    },
  },
};
