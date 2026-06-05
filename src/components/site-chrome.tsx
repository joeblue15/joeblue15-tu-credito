"use client";

import { Heart, Home, Search, Scale, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/brand-logo";
import { CompareBar } from "@/components/compare-bar";
import { CookieBanner } from "@/components/cookie-banner";
import { GoogleLoginButton } from "@/components/google-login-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/tarjetas", label: "Tarjetas" },
  { href: "/comparar", label: "Comparar" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/ia", label: "Asesor IA" },
];

const mobileNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tarjetas", label: "Tarjetas", icon: Search },
  { href: "/comparar", label: "Comparar", icon: Scale },
  { href: "/ia", label: "Asesor IA", icon: Sparkles },
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground",
        pathname === "/" && "pb-[120px] md:pb-0"
      )}
    >
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-8 lg:gap-10">
            <BrandLogo />
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[12px] text-muted-foreground transition hover:text-foreground",
                    pathname === item.href && "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <GoogleLoginButton />
          </div>
        </div>
      </header>
      <main className="pb-24 md:pb-0">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background md:hidden">
        <div className="grid grid-cols-4">
          {mobileNavItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-2 py-3 text-[10px] text-muted-foreground transition",
                  active && "text-foreground"
                )}
              >
                <item.icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <CompareBar />
      <CookieBanner />
      {pathname === "/" && (
        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-4 px-5 py-6 text-[10px] text-muted-foreground sm:px-8">
            <p>TuTarjetaRD. La plataforma definitiva de comparación financiera en RD.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacidad" className="hover:text-foreground">Privacidad</Link>
              <Link href="/terminos" className="hover:text-foreground">Términos</Link>
              <Link href="/cookies" className="hover:text-foreground">Cookies</Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
