"use client";
import useAuthenticated from "@/hooks/useAuthenticated";
import { ReactNode } from "react";

export default function SessionGuard({ children }: { children: ReactNode }) {
  const data = useAuthenticated();
  if(!data?.accessToken) return null;

  return <>{children}</>;
}