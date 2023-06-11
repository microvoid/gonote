"use client";

import { toast } from "sonner";

export function SignUp() {
  const onShowNotReadyTooltip = () => {
    toast("Copied URL to clipboard!");
  };

  return (
    <a
      // href="https://marktion.io/register"
      className="rounded-full cursor-pointer select-none border border-primary bg-primary px-5 py-2 text-sm text-primary-content shadow-lg transition-all hover:bg-white hover:text-primary"
      onClick={onShowNotReadyTooltip}
    >
      Sign Up
    </a>
  );
}
