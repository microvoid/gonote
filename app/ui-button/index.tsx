"use client";

import { UpdateIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { ReactNode } from "react";

export function Button({
  text,
  variant = "primary",
  onClick,
  disabled,
  loading,
  icon,
}: {
  text: string;
  variant?: "primary" | "secondary" | "danger";
  onClick?: any;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}) {
  return (
    <button
      // if onClick is passed, it's a "button" type, otherwise it's being used in a form, hence "submit"
      type={onClick ? "button" : "submit"}
      className={clsx(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        disabled || loading
          ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
          : {
              "border-black bg-black text-white hover:bg-white hover:text-black":
                variant === "primary",
              "border-gray-200 bg-white text-gray-500 hover:border-black hover:text-black":
                variant === "secondary",
              "border-red-500 bg-red-500 text-white hover:bg-white hover:text-red-500":
                variant === "danger",
            }
      )}
      {...(onClick ? { onClick } : {})}
      disabled={disabled || loading}
    >
      {loading ? (
        <UpdateIcon className="animate-spin" color="#808080" />
      ) : (
        <>
          {icon}
          <p>{text}</p>
        </>
      )}
    </button>
  );
}
