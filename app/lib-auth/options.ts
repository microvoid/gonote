import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/app/model";
import { sendRegisterEmail } from "@/app/email";
import { createGuest } from "../model-user";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const options: NextAuthOptions = {
  debug: true,
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
    async signIn({ user, account, profile }) {
      console.log("auth", user, account, profile);

      if (account?.provider === "github") {
        const userExists = await prisma.user.findUnique({
          where: { email: user.email },
          select: { name: true },
        });

        if (userExists && !userExists.name && profile) {
          await prisma.user.update({
            where: { email: user.email },
            data: {
              name: profile.name,
              // @ts-ignore
              image: profile["avatar_url"],
            },
          });
        }
      }

      return true;
    },

    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.user = user;
      }

      if (trigger === "update") {
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
      session.user = {
        // @ts-ignore
        id: token.sub,
        ...session.user,
      };
      return session;
    },
  },
};
