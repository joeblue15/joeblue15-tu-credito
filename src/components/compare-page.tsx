"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCompare } from "@/context/compare-context";
import { useCatalogData } from "@/hooks/use-catalog-data";
import { getCategoryLabel } from "@/lib/format";

export function ComparePage() {
  const { selectedSlugs, clearCompare, toggleCard } = useCompare();
  const { cardsWithBanks } = useCatalogData();
  const selectedCards = cardsWithBanks.filter((card) => selectedSlugs.includes(card.slug)).slice(0, 4);
  const availableCards = cardsWithBanks.filter((card) => card.active && !selectedSlugs.includes(card.slug)).slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-primary">Comparador</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Comparar 2 a 4 tarjetas</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">Vista visual moderna para evaluar anualidad, ingreso mínimo, perfil ideal y beneficios sin usar tablas antiguas.</p>
      </section>

      {selectedCards.length >= 2 ? (
        <>
          <div className="grid gap-5 xl:grid-cols-4">
            {selectedCards.map((card) => (
              <article key={card.id} className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-primary">{getCategoryLabel(card.category)}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{card.name}</h2>
                  <p className="mt-2 text-sm text-slate-400">{card.bank.name}</p>
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <CompareMetric label="Anualidad" value={card.details.annualFee} />
                  <CompareMetric label="Ingreso mínimo" value={card.details.minIncome} />
                  <CompareMetric label="Moneda" value={card.details.currency} />
                  <CompareMetric label="Aprobación" value={card.details.approvalLevel} />
                </div>
                <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-slate-300">
                  <p className="font-medium text-white">Perfil ideal</p>
                  <p className="mt-2">{card.details.idealProfile}</p>
                </div>
                <div className="mt-4 space-y-2">
                  {card.benefits.slice(0, 3).map((benefit) => (
                    <div key={benefit} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">{benefit}</div>
                  ))}
                </div>
                <div className="mt-5 flex gap-3">
                  <Button asChild className="flex-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href={`/tarjetas/${card.slug}`}>Detalles</Link>
                  </Button>
                  <Button variant="outline" onClick={() => toggleCard(card.slug)} className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">Quitar</Button>
                </div>
              </article>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={clearCompare} className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">Limpiar comparación</Button>
          </div>
        </>
      ) : (
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-center text-slate-300">
          Agrega al menos 2 tarjetas desde el catálogo o desde Home para activar la comparación visual.
        </div>
      )}

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Añadir más tarjetas</h2>
          <p className="text-sm text-slate-400">Puedes comparar hasta 4 opciones al mismo tiempo.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {availableCards.map((card) => (
            <button key={card.id} type="button" onClick={() => toggleCard(card.slug)} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-primary/30">
              <p className="text-xs uppercase tracking-[0.18em] text-primary">{card.bank.name}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{card.name}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{card.details.highlight}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function CompareMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-3">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
