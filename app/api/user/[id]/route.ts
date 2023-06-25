import { ApiHandler } from "@/app/lib-auth";
import { getUserInfoWithStats } from "@/app/service-user";

type Context = {
  params: {
    id: string;
  }
}

export const GET = ApiHandler.auth<Context>(async (req, ctx) => {
  const userStats = await getUserInfoWithStats(ctx.params.id);

  return ApiHandler.success(userStats);
})

