"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import BlurImage from "./blur-image";
import { Button } from "../ui-button";
import { siteConstants } from "../constants";

export function RegisterModal() {
  const { next } = useSearchParams() as { next?: string };
  const [loading, setLoading] = useState(false);

  return (
    <div className="z-10 mt-[calc(30vh)] h-fit w-full max-w-md overflow-hidden border border-gray-100 sm:rounded-2xl sm:shadow-xl">
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
              ? siteConstants.domain
              : "http://localhost:3000"
          }
        >
          {/* <BlurImage
            src="/_static/logo.png"
            alt="Dub.sh logo"
            className="h-10 w-10 rounded-full"
            width={20}
            height={20}
          /> */}
        </a>
        <h3 className="text-xl font-semibold">Create your Gonote account</h3>
        <p className="text-sm text-gray-500">
          Get started for free. No credit card required.
        </p>
      </div>

      <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
        <Button
          text="Continue with Github"
          onClick={() => {
            setLoading(true);
            signIn("github", {
              ...(next && next.length > 0 ? { callbackUrl: next } : {}),
            });
          }}
          loading={loading}
          icon={<GitHubLogoIcon className="h-4 w-4" />}
        />
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-gray-500 transition-colors hover:text-black"
          >
            Sign in
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
