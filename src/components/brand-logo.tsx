import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function BrandLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3 rounded-full", className)}>
      <Image src="/assets/logo.svg" alt="TuCredito" width={compact ? 36 : 148} height={compact ? 36 : 34} priority={compact} />
      {compact ? <span className="sr-only">TuCredito</span> : null}
    </Link>
  );
}
