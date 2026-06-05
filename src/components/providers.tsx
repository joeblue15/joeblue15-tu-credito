"use client";

import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";
import { CompareProvider } from "@/context/compare-context";
import { FavoritesProvider } from "@/context/favorites-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AuthProvider>
        <CompareProvider>
          <FavoritesProvider>
            {children}
            <Toaster richColors position="top-right" />
          </FavoritesProvider>
        </CompareProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
