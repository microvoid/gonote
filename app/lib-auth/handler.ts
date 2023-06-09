import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { Session } from "../types/session";
import { getServerSession } from "next-auth";
import { options } from "./options";
import { getAnonymousUser } from "../model-user";

type Authhandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => any;

type Anonymoushandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => any;

export const session = (req: NextApiRequest, res: NextApiResponse) => {
  return getServerSession(req, res, options) as Promise<Session | null>;
};

export const auth =
  (handler: Authhandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const userSession = await session(req, res);

    if (!userSession) {
      res.status(401).end("Unauthorized: Login required.");
    }

    return handler(req, res, userSession!);
  };

export const anonymous =
  (handler: Anonymoushandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await getAnonymousUser();

    return handler(req, res, user);
  };

export const success = (res: NextApiResponse, data: any) => {
  res.status(200).json({
    status: 0,
    data,
  });
};
