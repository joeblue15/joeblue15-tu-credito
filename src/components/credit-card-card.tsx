"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCompare } from "@/context/compare-context";
import { getCategoryLabel } from "@/lib/format";
import type { CreditCardWithBank } from "@/lib/types";

export function CreditCardCard({ card }: { card: CreditCardWithBank }) {
  const { isSelected, toggleCard } = useCompare();

  return (
    <article className="border border-white/8 bg-[#080808] p-4 md:p-5">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="text-[9px] uppercase tracking-[0.18em] text-white/35">{card.bank.name.includes("Popular") ? "BAN" : card.bank.name.includes("BHD") ? "BHD" : "BAN"}</div>
        <span className="border border-white/8 px-2 py-1 text-[9px] text-white/55">{getCategoryLabel(card.category)}</span>
      </div>
      <h3 className="text-[18px] font-semibold text-white">{card.name}</h3>
      <p className="mt-3 text-[12px] leading-6 text-white/50">{card.details.highlight}</p>
      <div className="mt-5">
        <p className="text-[10px] uppercase tracking-[0.14em] text-white/35">Beneficios Clave</p>
        <ul className="mt-3 space-y-2 text-[11px] text-white/62">
          {card.benefits.slice(0, 2).map((benefit) => (
            <li key={benefit}>• {benefit}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <Button asChild className="h-9 rounded-none bg-white text-[11px] font-medium text-black hover:bg-white/90">
          <Link href={`/tarjetas/${card.slug}`}>Detalles</Link>
        </Button>
        <Button
          variant="outline"
          className="h-9 rounded-none border-white/30 bg-transparent text-[11px] font-medium text-white hover:bg-transparent hover:text-white"
          onClick={() => toggleCard(card.slug)}
        >
          {isSelected(card.slug) ? "Quitar" : "Comparar"}
        </Button>
      </div>
    </article>
  );
}
