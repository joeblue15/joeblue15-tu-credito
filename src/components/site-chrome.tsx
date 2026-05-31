"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, CreditCard, Home, LayoutDashboard, Scale, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useCompare } from "@/context/compare-context";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tarjetas", label: "Tarjetas", icon: CreditCard },
  { href: "/comparar", label: "Comparar", icon: Scale },
  { href: "/ia", label: "IA", icon: Bot },
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { selectedSlugs } = useCompare();
  const { isAuthorizedAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(7,8,18,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <BrandLogo />
            <nav className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active ? "bg-white/10 text-white" : "text-slate-300 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {isAuthorizedAdmin ? (
                <Link
                  href="/admin"
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    pathname === "/admin" ? "bg-primary/20 text-primary" : "text-slate-300 hover:text-white"
                  )}
                >
                  Admin
                </Link>
              ) : null}
            </nav>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="outline" className="rounded-full border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 hover:text-white">
              <Link href="/comparar">Comparar {selectedSlugs.length ? `(${selectedSlugs.length})` : ""}</Link>
            </Button>
            <Button asChild className="rounded-full bg-primary px-5 text-primary-foreground shadow-[0_0_30px_rgba(124,58,237,0.35)] hover:bg-primary/90">
              <Link href="/ia">
                <Sparkles className="size-4" />
                Recomendación IA
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="pb-28 lg:pb-12">{children}</main>
      <AnimatePresence>
        <motion.nav
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          className="fixed inset-x-3 bottom-3 z-50 rounded-[28px] border border-white/10 bg-[rgba(10,10,22,0.9)] p-2 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:hidden"
        >
          <div className="grid grid-cols-4 gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-[22px] px-2 py-3 text-[11px] font-medium transition-colors",
                    active ? "bg-primary/20 text-white" : "text-slate-400"
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </motion.nav>
      </AnimatePresence>
      {isAuthorizedAdmin ? (
        <Link
          href="/admin"
          className="fixed bottom-24 right-4 z-40 hidden rounded-full border border-primary/30 bg-primary/20 px-4 py-3 text-sm font-semibold text-primary shadow-[0_14px_30px_rgba(124,58,237,0.2)] md:inline-flex lg:hidden"
        >
          <LayoutDashboard className="mr-2 size-4" />
          Admin
        </Link>
      ) : null}
    </div>
  );
}
