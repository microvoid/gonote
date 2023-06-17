import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DownloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { downloadFile } from "../utils/file";
import { siteConstants } from "../constants";
import { Post } from "@prisma/client";

type PostDropmenuProps = React.PropsWithChildren<{
  post: Post;
}>;

export function PostDropmenu({ post, children }: PostDropmenuProps) {
  const menus = [
    {
      key: "download",
      prefix: <DownloadIcon />,
      sufix: null,
      title: "export as markdown",
    },
    {
      key: "delete",
      prefix: <TrashIcon />,
      title: "delete",
    },
  ];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white rounded-md py-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          {menus.map(menu => {
            return (
              <DropdownMenu.Item
                key={menu.key}
                className="group text-[13px] leading-none text-violet11 flex items-center h-[25px] px-3 relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
              >
                <span className="mr-2">{menu.prefix}</span> {menu.title}
                {/* <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⌘+T
            </div> */}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
