// app/providers.tsx
"use client";

import { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import * as Toast from "@radix-ui/react-toast";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { signInWithGuest } from "./lib-auth/signIn";

export type ProvidersProps = React.PropsWithChildren<{
  session: Session | null;
}>;

export function Providers({ children, session }: ProvidersProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!session && pathname !== "/register") {
      signInWithGuest();
    }
  }, [pathname, session]);

  return (
    <SessionProvider session={session}>
      <Toast.Provider swipeDirection="right" duration={0}>
        <NextUIProvider>{children}</NextUIProvider>

        <Toast.Viewport className="[--viewport-padding:_25px] fixed top-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </SessionProvider>
  );
}
