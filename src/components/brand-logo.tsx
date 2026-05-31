import Link from "next/link";

import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("text-sm font-semibold tracking-tight text-white", className)}>
      TuCredito
    </Link>
  );
}
