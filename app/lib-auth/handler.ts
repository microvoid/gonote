import { Session } from "../types/session";
import { getServerSession } from "next-auth";
import { options } from "./options";
import { NextResponse } from "next/server";

type Authhandler = (req: Request, ctx: any, session: Session) => any;

export const session = () => {
  return getServerSession(options) as Promise<Session | null>;
};

export const auth =
  (handler: Authhandler) => async (req: Request, ctx: any) => {
    const userSession = await session();

    if (!userSession) {
      return unauthorized();
    }

    return handler(req, ctx, userSession!);
  };

export const success = (data: any) => {
  return NextResponse.json({
    data,
    status: 0,
  });
};

export const error = (message: string, code = -1) => {
  return NextResponse.json({
    message,
    status: code,
  });
};

export const unauthorized = () => {
  return new NextResponse("Unauthorized: Login required.", {
    status: 401,
  });
};
