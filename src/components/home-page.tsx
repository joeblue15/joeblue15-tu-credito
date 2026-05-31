"use client";

import Link from "next/link";

import { CreditCardCard } from "@/components/credit-card-card";
import { LoadingGrid } from "@/components/loading-grid";
import { Button } from "@/components/ui/button";
import { useCatalogData } from "@/hooks/use-catalog-data";
import { useHomeContent } from "@/hooks/use-home-content";

export function HomePage() {
  const { cardsWithBanks, loading } = useCatalogData();
  const { content } = useHomeContent();
  const featuredCards = cardsWithBanks.filter((card) => card.featured && card.active).slice(0, 3);

  return (
    <div>
      <section className="mx-auto flex max-w-[860px] flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-36">
        <h1 className="max-w-[660px] text-[46px] font-semibold leading-[0.95] text-foreground sm:text-[72px]">
          Encuentra la tarjeta perfecta para ti en República Dominicana
        </h1>
        <p className="mt-8 max-w-[560px] text-[15px] leading-8 text-muted-foreground">
          Decisiones financieras inteligentes sin el ruido. Compara beneficios, tasas y requisitos de las mejores tarjetas del mercado dominicano.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="h-10 rounded-none bg-foreground px-5 text-[12px] font-medium text-background hover:bg-foreground/90">
            <Link href="/tarjetas">Explorar Tarjetas</Link>
          </Button>
          <Button asChild variant="outline" className="h-10 rounded-none border-border bg-transparent px-5 text-[12px] font-medium text-foreground hover:bg-transparent hover:text-foreground">
            <Link href="/ia">Asesor Inteligente</Link>
          </Button>
        </div>
      </section>

      <section className="border-y border-border py-14 sm:py-16">
        <div className="mx-auto max-w-[1220px] px-5 sm:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[34px] font-semibold text-foreground">Selección Destacada</h2>
              <p className="mt-2 text-[13px] text-muted-foreground">Las opciones más competitivas del mercado actual.</p>
            </div>
            <Link href="/tarjetas" className="text-[11px] text-muted-foreground hover:text-foreground">
              Ver todas
            </Link>
          </div>
          {loading ? (
            <LoadingGrid />
          ) : (
            <div className="grid gap-4 lg:grid-cols-3">
              {featuredCards.map((card) => (
                <CreditCardCard key={card.id} card={card} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1220px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-4 lg:grid-cols-2">
          {content.sections.slice(0, 2).map((section) => (
            <article key={section.id} className="surface p-7">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{section.eyebrow}</p>
              <h2 className="mt-4 text-[34px] font-semibold leading-none text-foreground">{section.title}</h2>
              <p className="mt-5 max-w-xl text-[14px] leading-8 text-muted-foreground">{section.description}</p>
              <Button asChild className="mt-8 h-10 rounded-none bg-foreground px-5 text-[12px] text-background hover:bg-foreground/90">
                <Link href={section.ctaHref}>{section.ctaLabel}</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-5 py-16 text-center sm:px-8 sm:py-20">
        <h2 className="text-[33px] font-semibold text-foreground">Respaldado por las mejores instituciones</h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-6 text-[18px] text-muted-foreground sm:flex-row sm:gap-16">
          <span>Banco Popular Dominicano</span>
          <span>BHD León</span>
        </div>
      </section>
    </div>
  );
}
