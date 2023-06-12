import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { TimerIcon, StarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Post, User } from "@prisma/client";
import { getGuestAvatar } from "@/app/utils/avatar";
import { MarktionSSR } from "../ui-editor";

dayjs.extend(relativeTime);

export function PostCollapse({ post, user }: { post: Post; user: User }) {
  return (
    <>
      <div className="py-6">
        {renderTitle(post)}
        {renderTitleDesc(post, user)}
      </div>

      <MarktionSSR initialContent={post?.markdown} />
    </>
  );
}

export const renderTitle = (post: Post) => {
  return <h1 className="text-2xl mb-2 font-extrabold">{post.title}</h1>;
};

export const renderTitleDesc = (post: Post, user: User) => {
  const isStar = false;

  return (
    <div className="flex justify-between text-slate-500">
      <div className="flex items-center">
        <Image
          className="w-[32px] h-[32px] rounded-full mr-2"
          src={getGuestAvatar(user)}
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
