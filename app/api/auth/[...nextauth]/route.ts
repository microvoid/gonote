import NextAuth from "next-auth";
import { options } from "@/app/lib-auth";

const handler = NextAuth(options);

export const GET = handler;
export const POST = handler;
