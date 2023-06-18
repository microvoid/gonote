// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import { signInWithGuest } from "./lib-auth/signIn";
import { ToastProvier, ToastViewport } from "./ui-toast";
import { AnonymouseWarningToast } from "./ui-toast/anonymous-warning-toast";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export type ProvidersProps = React.PropsWithChildren<{
  session: Session | null;
}>;

export function Providers({ children, session }: ProvidersProps) {
  useEffect(() => {
    signInWithGuest();
  }, []);

  return (
    <SessionProvider session={session}>
      <ToastProvier swipeDirection="right">
        <NextUIProvider>{children}</NextUIProvider>

        <AnonymouseWarningToast />
        <ToastViewport className="fixed top-0 right-0 flex flex-col pt-[60px] px-[20px] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </ToastProvier>
    </SessionProvider>
  );
}
