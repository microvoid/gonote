"use client";

import Link from "next/link";
// import { SignUp } from "./signup-client";

export function Nav() {
  return (
    <div className="p-5 mx-auto md:w-[768px] flex h-14 items-center justify-between">
      <Link
        className="bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 bg-clip-text font-display text-xl sm:text-2xl font-extrabold leading-tight text-transparent sm:leading-tight"
        href={"/"}
      >
        MARKTION.IO
      </Link>

      <div className="hidden items-center space-x-6 sm:flex">
        <Link
          href="/dashboard"
          className="rounded-md text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
        >
          dashboard
        </Link>
        {/* <SignUp /> */}
      </div>
    </div>
  );
}
