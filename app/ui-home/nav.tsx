"use client";

import { AvatarIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { siteConstants } from "../constants";
// import { SignUp } from "./signup-client";

const brand = siteConstants.brand.toUpperCase();

export function Nav() {
  return (
    <div className="p-5 mx-auto md:w-[768px] flex h-14 items-center justify-between">
      <Link
        className="bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 bg-clip-text font-display text-xl sm:text-2xl font-extrabold leading-tight text-transparent sm:leading-tight"
        href={"/"}
      >
        {brand}
      </Link>

      <div className="hidden items-center space-x-4 sm:flex">
        <Link
          href="/home"
          className="rounded-md text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
        >
          <HomeIcon />
        </Link>

        <Link
          href="/dashboard"
          className="rounded-md text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
        >
          <AvatarIcon />
        </Link>

        {/* <SignUp /> */}
      </div>
    </div>
  );
}
