"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCompare } from "@/context/compare-context";
import { getCategoryLabel } from "@/lib/format";
import type { CreditCardWithBank } from "@/lib/types";

export function CreditCardCard({ card }: { card: CreditCardWithBank }) {
  const { isSelected, toggleCard } = useCompare();

  return (
    <article className="surface p-4 md:p-5">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{card.bank.name.includes("Popular") ? "BAN" : card.bank.name.includes("BHD") ? "BHD" : "BAN"}</div>
        <span className="border border-border px-2 py-1 text-[9px] text-muted-foreground">{getCategoryLabel(card.category)}</span>
      </div>
      <h3 className="text-[18px] font-semibold text-foreground">{card.name}</h3>
      <p className="mt-3 text-[12px] leading-6 text-muted-foreground">{card.details.highlight}</p>
      <div className="mt-5">
        <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Beneficios Clave</p>
        <ul className="mt-3 space-y-2 text-[11px] text-foreground/72">
          {card.benefits.slice(0, 2).map((benefit) => (
            <li key={benefit}>• {benefit}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <Button asChild className="h-9 rounded-none bg-foreground text-[11px] font-medium text-background hover:bg-foreground/90">
          <Link href={`/tarjetas/${card.slug}`}>Detalles</Link>
        </Button>
        <Button
          variant="outline"
          className="h-9 rounded-none border-border bg-transparent text-[11px] font-medium text-foreground hover:bg-transparent hover:text-foreground"
          onClick={() => toggleCard(card.slug)}
        >
          {isSelected(card.slug) ? "Quitar" : "Comparar"}
        </Button>
      </div>
    </article>
  );
}
