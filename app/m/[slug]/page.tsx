import { MarktionSSR } from "../../ui-editor";
import { PostModel } from "@/app/model";
import { Post } from "@prisma/client";
import { renderTitleDesc } from "@/app/ui-post/post-collapse";

export default async function MarkdownPreviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await PostModel.getPostBySlug(slug);

  const markdownContent = post && (
    <>
      <div className="py-6">
        {renderTitle(post)}
        {renderTitleDesc(post, post.user!)}
      </div>

      <MarktionSSR initialContent={post?.markdown} />
    </>
  );

  const empty = !post && <div>not found</div>;

  return (
    <div className="w-full px-5 md:w-[720px] md:p-0 m-auto mb-10">
      {markdownContent}
      {empty}
    </div>
  );
}

const renderTitle = (post: Post) => {
  return <h1 className="text-4xl mb-2 font-extrabold">{post.title}</h1>;
};
