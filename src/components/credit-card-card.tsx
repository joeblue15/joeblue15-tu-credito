"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCompare } from "@/context/compare-context";
import { getCategoryLabel } from "@/lib/format";
import type { CreditCardWithBank } from "@/lib/types";

export function CreditCardCard({ card }: { card: CreditCardWithBank }) {
  const { isSelected, toggleCard } = useCompare();
  const bankMark = card.bank.name.includes("Popular")
    ? "BAN"
    : card.bank.name.includes("BHD")
      ? "BHD"
      : "BAN";
  const hasRealPreview = card.imageUrl && card.imageUrl !== "/assets/placeholder.svg";

  return (
    <article className="surface p-4 md:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{bankMark}</div>
        <span className="border border-border px-2 py-1 text-[9px] text-muted-foreground">
          {getCategoryLabel(card.category)}
        </span>
      </div>

      <div className="mb-5 border border-border bg-background p-2.5">
        {hasRealPreview ? (
          <img
            src={card.imageUrl}
            alt={card.name}
            className="aspect-[1.7/1] w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="aspect-[1.7/1] border border-border bg-foreground px-3 py-2 text-background">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.22em] text-background/70">{bankMark}</p>
                  <p className="mt-2 line-clamp-2 text-[12px] font-semibold leading-tight">{card.name}</p>
                </div>
                <div className="h-6 w-9 border border-background/20 bg-background/10" />
              </div>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.18em] text-background/50">Banco</p>
                  <p className="mt-1 line-clamp-1 text-[10px] text-background/78">{card.bank.name}</p>
                </div>
                <span className="text-[8px] uppercase tracking-[0.18em] text-background/55">
                  {getCategoryLabel(card.category)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <h3 className="text-[18px] font-semibold text-foreground">{card.name}</h3>
      <p className="mt-3 text-[12px] leading-6 text-muted-foreground">{card.details.highlight}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
        <div className="border border-border p-3">
          <p className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Anualidad</p>
          <p className="mt-2 text-foreground">{card.details.annualFee}</p>
        </div>
        <div className="border border-border p-3">
          <p className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Ingreso mínimo</p>
          <p className="mt-2 text-foreground">{card.details.minIncome}</p>
        </div>
      </div>

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
