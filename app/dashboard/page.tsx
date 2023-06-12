import { ApiHandler } from "../lib-auth";
import { PostModel } from "../model";
import { PostCollapse } from "../ui-post/post-collapse";

export default async function Dashboard() {
  const session = await ApiHandler.session();
  const posts = await PostModel.getUserPosts(session!.user.id);

  return (
    <div className="p-5 mx-auto md:w-[768px]">
      {posts.map(item => {
        return <PostCollapse post={item} user={item.user!} />;
      })}
    </div>
  );
}
