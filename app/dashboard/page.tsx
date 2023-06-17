import { redirect } from "next/navigation";
import { ApiHandler } from "../lib-auth";
import { PostModel } from "../model";
import { PostDashboard } from "../ui-post/post-dashboard";

export default async function Dashboard() {
  const session = await ApiHandler.session();

  if (!session) {
    return redirect("/home");
  }

  const posts = await PostModel.getUserPosts(session!.user.id);

  return <PostDashboard defaultPosts={posts} />;
}
