"use client";

import * as Avatar from "@radix-ui/react-avatar";
import * as HoverCard from "@radix-ui/react-hover-card";
import { AvatarIcon, HomeIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import LOGO_URL from "@/public/logo.png";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSessionUser } from "../ui-hooks/useSessionUser";
import { siteConstants } from "../constants";
import { useUserInfo } from "../ui-hooks/useUserInfo";

const brand = siteConstants.brand.toUpperCase();

export function Nav() {
  const loginUser = useSessionUser();

  const loginLinkIcon = (!loginUser || loginUser?.anonymous) && (
    <Link
      href="/login"
      className="inline-flex items-center rounded-md cursor-pointer text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
    >
      <AvatarIcon className="mr-1" />
      {loginUser?.name}
    </Link>
  );

  const loginUserDropDown = !loginUser?.anonymous && (
    <LoginUserHoverCard>
      <div className="inline-flex items-center rounded-md cursor-pointer text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black">
        <Avatar.Root className="mr-1 inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Image
            className="h-[20px] w-[20px] rounded-[inherit] object-cover"
            src={loginUser?.image || ""}
            alt="Colm Tuite"
          />
          <Avatar.Fallback
            className="text-violet11 leading-1 flex h-[20px] w-[20px] items-center justify-center bg-white text-[15px] font-medium"
            delayMs={600}
          >
            <AvatarIcon className="mr-1" />
          </Avatar.Fallback>
        </Avatar.Root>
        {loginUser?.name}
      </div>
    </LoginUserHoverCard>
  );

  return (
    <div className="p-5 mx-auto md:w-[768px] flex items-center justify-between">
      <Link
        className="bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 bg-clip-text font-display text-xl sm:text-2xl font-extrabold leading-tight text-transparent sm:leading-tight"
        href={"/"}
      >
        <Image width={96} height={96} src={LOGO_URL} alt={brand} />
      </Link>

      <div className="items-center space-x-4 sm:flex">
        <Link
          href="/dashboard"
          className="inline-flex items-center rounded-md text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
          title="dashboard"
        >
          <HomeIcon />
        </Link>

        {loginLinkIcon}
        {loginUserDropDown}
      </div>
    </div>
  );
}

type LoginUserHoverCardProps = React.PropsWithChildren;

export function LoginUserHoverCard({ children }: LoginUserHoverCardProps) {
  const loginUser = useSessionUser()!;
  const { data: userInfo } = useUserInfo(loginUser.id);

  if (!loginUser) {
    return null;
  }

  const onSignOut = () => {
    signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <HoverCard.Root openDelay={0}>
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
          sideOffset={5}
          align="end"
        >
          <div className="flex flex-col gap-[7px]">
            <div className="flex justify-between">
              <img
                className="block h-[60px] w-[60px] rounded-full"
                src={loginUser.image || ""}
                alt="Radix UI"
              />
              <div
                onClick={onSignOut}
                className="cursor-pointer flex-shrink-0 flex-grow-0 basis-auto text-mauve11 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center  ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-secondary data-[state=on]:text-secondary-content"
              >
                <LogOutIcon className="w-[14px] h-[14px]" />
              </div>
            </div>
            <div className="flex flex-col gap-[15px]">
              <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">
                {loginUser.name}
              </div>
              {/* <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">
                  @radix_ui
                </div> */}
              {/* <div className="text-mauve12 m-0 text-[15px] leading-[1.5]">
                Components, icons, colors, and templates for building
                high-quality, accessible UI. Free and open-source.
              </div> */}
              <div className="flex gap-[15px]">
                <div className="flex gap-[5px]">
                  <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">
                    {userInfo?.stats.postCount || 0}
                  </div>{" "}
                  <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">
                    Posts
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
