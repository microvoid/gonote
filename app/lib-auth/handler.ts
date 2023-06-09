import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "../types/session";
import { getServerSession } from "next-auth";
import { options } from "./options";

type AuthApihandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => any;

export const getSession = (req: NextApiRequest, res: NextApiResponse) => {
  return getServerSession(req, res, options) as Promise<Session | null>;
};

export const createAuthApi =
  (handler: AuthApihandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession(req, res);

    if (session?.user.id) {
      res.status(401).end("Unauthorized: Login required.");
    }
  };
