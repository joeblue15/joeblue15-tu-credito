"use client";

import { Bot, Home, Search, Scale } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/tarjetas", label: "Explorar" },
  { href: "/comparar", label: "Comparar" },
  { href: "/ia", label: "Asesor IA" },
];

const mobileNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tarjetas", label: "Explorar", icon: Search },
  { href: "/comparar", label: "Comparar", icon: Scale },
  { href: "/ia", label: "IA", icon: Bot },
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-4 px-5 py-5 sm:px-8">
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
            <ThemeToggle className="hidden md:flex" />
            <Link href="/admin" className="hidden text-[11px] text-muted-foreground transition hover:text-foreground md:inline-block">
              Admin
            </Link>
            <Link href="/ia" className="ia-cyber text-[10px]">
              <span className="ia-edge ia-edge-top" aria-hidden="true" />
              <span className="ia-edge ia-edge-right" aria-hidden="true" />
              <span className="ia-edge ia-edge-bottom" aria-hidden="true" />
              <span className="ia-edge ia-edge-left" aria-hidden="true" />
              <span className="ia-label">Preguntar a IA</span>
            </Link>
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
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-4 px-5 py-6 text-[10px] text-muted-foreground sm:px-8">
          <p>TuCredito. La plataforma definitiva de comparación financiera en RD.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacidad" className="hover:text-foreground">Privacidad</Link>
            <Link href="/terminos" className="hover:text-foreground">Términos</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
