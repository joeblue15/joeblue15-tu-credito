"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCompare } from "@/context/compare-context";
import { useCatalogData } from "@/hooks/use-catalog-data";

export function ComparePage() {
  const { selectedSlugs, clearCompare, toggleCard } = useCompare();
  const { cardsWithBanks } = useCatalogData();
  const selectedCards = cardsWithBanks.filter((card) => selectedSlugs.includes(card.slug)).slice(0, 4);
  const availableCards = cardsWithBanks.filter((card) => card.active && !selectedSlugs.includes(card.slug));

  return (
    <div className="mx-auto max-w-[1220px] px-5 py-14 sm:px-8 sm:py-16">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[42px] font-semibold text-white sm:text-[54px]">Comparar</h1>
          <p className="mt-3 max-w-2xl text-[14px] leading-7 text-white/45">
            Contrasta hasta cuatro tarjetas de forma limpia y visual, sin tablas pesadas.
          </p>
        </div>
        {selectedCards.length ? (
          <Button variant="outline" onClick={clearCompare} className="rounded-none border-white/20 bg-transparent text-[12px] text-white hover:bg-transparent hover:text-white">
            Limpiar
          </Button>
        ) : null}
      </div>

      {selectedCards.length >= 2 ? (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {selectedCards.map((card) => (
            <article key={card.id} className="border border-white/8 bg-[#080808] p-5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">{card.bank.name}</p>
              <h2 className="mt-4 text-[22px] font-semibold text-white">{card.name}</h2>
              <p className="mt-3 text-[12px] leading-6 text-white/50">{card.details.highlight}</p>
              <div className="mt-5 space-y-3 border-t border-white/8 pt-5 text-[12px] text-white/70">
                <div><span className="text-white/35">Anualidad:</span> {card.details.annualFee}</div>
                <div><span className="text-white/35">Ingreso mínimo:</span> {card.details.minIncome}</div>
                <div><span className="text-white/35">Moneda:</span> {card.details.currency}</div>
                <div><span className="text-white/35">Aprobación:</span> {card.details.approvalLevel}</div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <Button asChild className="h-9 rounded-none bg-white text-[11px] text-black hover:bg-white/90">
                  <Link href={`/tarjetas/${card.slug}`}>Detalles</Link>
                </Button>
                <Button variant="outline" onClick={() => toggleCard(card.slug)} className="h-9 rounded-none border-white/20 bg-transparent text-[11px] text-white hover:bg-transparent hover:text-white">
                  Quitar
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border border-white/8 bg-[#080808] p-8 text-sm text-white/45">
          Selecciona al menos 2 tarjetas desde el catálogo para activar la comparación.
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-[28px] font-semibold text-white">Añadir tarjetas</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {availableCards.slice(0, 6).map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => toggleCard(card.slug)}
              className="border border-white/8 bg-[#080808] p-5 text-left transition hover:border-white/20"
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">{card.bank.name}</p>
              <h3 className="mt-3 text-[19px] font-semibold text-white">{card.name}</h3>
              <p className="mt-3 text-[12px] leading-6 text-white/50">{card.details.highlight}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
