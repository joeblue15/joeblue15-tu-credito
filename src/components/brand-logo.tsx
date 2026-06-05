import Link from "next/link";

import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <span className="sr-only">TuTarjetaRD</span>
      {/* Light mode logo */}
      <img
        src="/brand/Logo blanco.png"
        alt="TuTarjetaRD"
        className="block h-[60px] w-auto dark:hidden"
        height={60}
      />
      {/* Dark mode logo */}
      <img
        src="/brand/logo oscuro.png"
        alt="TuTarjetaRD"
        className="hidden h-[60px] w-auto dark:block"
        height={60}
      />
    </Link>
  );
}
