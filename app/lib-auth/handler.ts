import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// import { Auth } from "@auth/core";
// import Credentials from "@auth/core/providers/credentials";
import { options } from "./options";

type Authhandler = (req: Request, ctx: any, session: Session) => any;

export const session = () => {
  return getServerSession(options);
};

// export const authWithGuestUser = (req: Request) => {
//   return Auth(req, {
//     providers: [Credentials({})],
//   });
// };

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
