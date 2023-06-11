import dayjs from "dayjs";
import Image from "next/image";
import { TimerIcon, StarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import relativeTime from "dayjs/plugin/relativeTime";
import { MarktionSSR } from "../../ui-editor";
import { PostModel } from "@/app/model";
import { Post, User } from "@prisma/client";

dayjs.extend(relativeTime);

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

const renderTitleDesc = (post: Post, user: User) => {
  const isStar = false;

  return (
    <div className="flex justify-between text-slate-500">
      <div className="flex items-center">
        <Image
          className="w-[32px] h-[32px] rounded-full mr-2"
          src={`https://avatar.marktion.cn/api/avatar/${user.id}?t=window&s=128`}
          alt={user.name!}
          width={128}
          height={128}
        />
        <div>
          <div className=" text-slate-800">{user.name}</div>
          <div className="text-sm">
            <TimerIcon className="mr-1 inline" />
            {dayjs(post.createdAt).fromNow()}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {isStar ? <StarFilledIcon /> : <StarIcon />}
      </div>
    </div>
  );
};
