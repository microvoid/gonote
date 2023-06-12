import { PostModel } from "@/app/model";
import { PostDetail } from "@/app/ui-post/post-detail";

export default async function MarkdownPreviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await PostModel.getPostBySlug(slug);

  return (
    <div className="w-full px-5 md:w-[720px] md:p-0 m-auto mb-10">
      {post && <PostDetail post={post} user={post.user!} />}
      {!post && <div>not found</div>}
    </div>
  );
}
