"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}): React.ReactNode {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}