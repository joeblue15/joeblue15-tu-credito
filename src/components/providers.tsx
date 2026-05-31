"use client";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";
import { CompareProvider } from "@/context/compare-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CompareProvider>
        {children}
        <Toaster richColors position="top-right" />
      </CompareProvider>
    </AuthProvider>
  );
}
