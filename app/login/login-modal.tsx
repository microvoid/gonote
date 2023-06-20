"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui-button";
import { siteConstants } from "../constants";

export function LoginModal() {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const callback = params.get("callback") || "/dashboard";

  return (
    <div className="z-10 mt-[calc(30vh)] h-fit w-full max-w-md overflow-hidden border border-gray-100 sm:rounded-2xl sm:shadow-xl">
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
        <a
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
              ? siteConstants.domain
              : "http://localhost:3000"
          }
        ></a>
        <h3 className="text-xl font-semibold">Login Gonote</h3>
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
              callbackUrl: callback,
            });
          }}
          loading={loading}
          icon={<GitHubLogoIcon className="h-4 w-4" />}
        />
      </div>
    </div>
  );
}
