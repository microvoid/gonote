import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { ApiHandler } from "../lib-auth";
import { PostModel } from "../model";
import { PostCards } from "../ui-post/post-cards";

const ShareEditor = dynamic(() => import("../ui-post/share-editor"), {
  ssr: false,
});

export default async function Dashboard() {
  const session = await ApiHandler.session();

  if (!session) {
    return redirect("/home");
  }

  const posts = await PostModel.getUserPosts(session!.user.id);

  return (
    <div className="p-5 mx-auto md:w-[768px]">
      <div className="mb-6">
        <ShareEditor classNames={["min-h-[130px]"]} />
      </div>

      <PostCards defaultPosts={posts} />
    </div>
  );
}
