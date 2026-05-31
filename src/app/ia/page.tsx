"use client";

import { AiChat } from "@/components/ai-chat";
import { LoadingGrid } from "@/components/loading-grid";
import { useCatalogData } from "@/hooks/use-catalog-data";

export default function IaPage() {
  const { cardsWithBanks, loading } = useCatalogData();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-primary">IA</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Recomendaciones inteligentes de tarjetas</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">Haz preguntas como si chatearas por WhatsApp y recibe sugerencias reales del sistema con diferencias claras entre opciones.</p>
      </section>
      {loading ? <LoadingGrid /> : <AiChat cards={cardsWithBanks} />}
    </div>
  );
}
