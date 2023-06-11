import { upsertPost } from "@/app/service-post";

export const POST = async (req: Request) => {
  return upsertPost(req);
};
