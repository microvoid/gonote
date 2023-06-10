import { User } from "@prisma/client";
import { Session } from "../types/session";
import { getServerSession } from "next-auth";
import { options } from "./options";
import { getAnonymousUser } from "../model-user";
import { NextResponse } from "next/server";

type Authhandler = (req: Request, session: Session) => any;
type Anonymoushandler = (req: Request, user: User) => any;

export const session = () => {
  return getServerSession(options) as Promise<Session | null>;
};

export const auth = (handler: Authhandler) => async (req: Request) => {
  const userSession = await session();

  if (!userSession) {
    return unauthorized();
  }

  return handler(req, userSession!);
};

export const anonymous =
  (handler: Anonymoushandler) => async (req: Request) => {
    const user = await getAnonymousUser();

    return handler(req, user);
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
