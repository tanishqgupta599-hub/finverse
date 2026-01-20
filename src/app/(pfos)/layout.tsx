"use client";

import { AppShell } from "@/components/app-shell/AppShell";

export default function FinvxLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
