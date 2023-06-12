import { ApiHandler } from "../lib-auth";
import { PostModel } from "../model";
import { Posts } from "../ui-post/post-list";

export default async function Dashboard() {
  const session = await ApiHandler.session();
  const posts = await PostModel.getUserPosts(session!.user.id);

  return (
    <div className="p-5 mx-auto md:w-[768px]">
      <Posts posts={posts} />
    </div>
  );
}
