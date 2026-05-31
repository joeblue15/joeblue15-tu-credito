"use client";

import { AiChat } from "@/components/ai-chat";
import { LoadingGrid } from "@/components/loading-grid";
import { useCatalogData } from "@/hooks/use-catalog-data";

export default function IaPage() {
  const { cardsWithBanks, loading } = useCatalogData();

  return (
    <div className="mx-auto max-w-[1220px] px-5 py-14 sm:px-8 sm:py-16">
      <div className="mb-10">
        <h1 className="text-[42px] font-semibold text-white sm:text-[54px]">Asesor IA</h1>
        <p className="mt-3 max-w-2xl text-[14px] leading-7 text-white/45">
          Pregunta por cashback, viajes, anualidad o perfiles recomendados y obtén respuestas limpias con tarjetas reales del sistema.
        </p>
      </div>
      {loading ? <LoadingGrid /> : <AiChat cards={cardsWithBanks} />}
    </div>
  );
}
