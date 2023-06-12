import { Post, User } from "@prisma/client";
import { TimerIcon, StarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { UserAvatar } from "./avatar";
import { fromNow } from "../utils/time";

export const renderTitle = (post: Post) => {
  return <h1 className="text-2xl mb-2 font-extrabold">{post.title}</h1>;
};

export const renderTitleDesc = (post: Post, user: User) => {
  const isStar = false;

  return (
    <div className="flex justify-between text-slate-500">
      <div className="flex items-center">
        <UserAvatar user={user} />

        <div>
          <div className=" text-slate-800 font-semibold">{user.name}</div>
          <div className="text-xs flex">
            <TimerIcon className="mr-1 inline" />
            {fromNow(post.createdAt)}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {isStar ? <StarFilledIcon /> : <StarIcon />}
      </div>
    </div>
  );
};
