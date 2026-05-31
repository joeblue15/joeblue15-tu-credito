"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/tarjetas", label: "Explorar" },
  { href: "/comparar", label: "Comparar" },
  { href: "/ia", label: "Asesor IA" },
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/6">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div className="flex items-center gap-8 lg:gap-10">
            <BrandLogo />
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[12px] text-white/70 transition hover:text-white",
                    pathname === item.href && "text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="hidden text-[11px] text-white/55 transition hover:text-white md:inline-block">
              Admin
            </Link>
            <Button asChild className="h-8 rounded-none border border-white bg-white px-3 text-[11px] font-medium text-black hover:bg-white/90">
              <Link href="/ia">Preguntar a IA</Link>
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-white/6">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-4 px-5 py-6 text-[10px] text-white/35 sm:px-8">
          <p>TuCredito. La plataforma definitiva de comparación financiera en RD.</p>
          <span className="text-white/55">Powered by TuCredito →</span>
        </div>
      </footer>
    </div>
  );
}
