// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useEffect } from "react";
import { signInWithGuest } from "./lib-auth/signIn";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    signInWithGuest();
  }, []);

  return <NextUIProvider>{children}</NextUIProvider>;
}
