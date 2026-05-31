"use client";

import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";
import { CompareProvider } from "@/context/compare-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <CompareProvider>
          {children}
          <Toaster richColors position="top-right" />
        </CompareProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
