"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { RichTextContent } from "@/components/rich-text-content";
import { useCompare } from "@/context/compare-context";
import { useCatalogData } from "@/hooks/use-catalog-data";
import { getCategoryLabel, stripHtml } from "@/lib/format";

export function CardDetailPage({ slug }: { slug: string }) {
  const { cardsWithBanks, loading } = useCatalogData();
  const { toggleCard, isSelected } = useCompare();
  const card = cardsWithBanks.find((item) => item.slug === slug);

  const jsonLd = useMemo(() => {
    if (!card) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: card.name,
      description: stripHtml(card.description),
      brand: card.bank.name,
      category: card.category,
      image: "/assets/placeholder.svg",
    };
  }, [card]);

  if (loading && !card) {
    return <div className="mx-auto max-w-[1220px] px-5 py-16 text-sm text-muted-foreground sm:px-8">Cargando tarjeta...</div>;
  }

  if (!card) {
    return (
      <div className="mx-auto max-w-[760px] px-5 py-16 text-center sm:px-8">
        <h1 className="text-[42px] font-semibold text-foreground">Tarjeta no encontrada</h1>
        <p className="mt-4 text-sm text-muted-foreground">La tarjeta que buscas no está disponible.</p>
        <Button asChild className="mt-8 rounded-none bg-foreground text-background hover:bg-foreground/90">
          <Link href="/tarjetas">Volver al catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1220px] px-5 py-14 sm:px-8 sm:py-16">
      {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> : null}
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface p-5">
          <Image src="/assets/placeholder.svg" alt="placeholder" width={400} height={300} className="h-auto w-full border border-border" priority />
        </div>
        <div className="surface p-6">
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{card.bank.name}</p>
          <h1 className="mt-4 text-[42px] font-semibold leading-none text-foreground">{card.name}</h1>
          <p className="mt-4 text-sm text-muted-foreground">{getCategoryLabel(card.category)}</p>
          <p className="mt-6 text-[14px] leading-8 text-muted-foreground">{card.details.highlight}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <DetailRow label="Anualidad" value={card.details.annualFee} />
            <DetailRow label="Ingreso mínimo" value={card.details.minIncome} />
            <DetailRow label="Moneda" value={card.details.currency} />
            <DetailRow label="Aprobación" value={card.details.approvalLevel} />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => toggleCard(card.slug)} className="rounded-none bg-foreground text-background hover:bg-foreground/90">
              {isSelected(card.slug) ? "Quitar de comparar" : "Agregar a comparar"}
            </Button>
            <Button asChild variant="outline" className="rounded-none border-border bg-transparent text-foreground hover:bg-transparent hover:text-foreground">
              <Link href="/comparar">Ir a comparar</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="surface p-6">
          <h2 className="text-[28px] font-semibold text-foreground">Descripción</h2>
          <div className="mt-5">
            <RichTextContent html={card.description} />
          </div>
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="text-[20px] font-semibold text-foreground">Perfil ideal</h3>
            <p className="mt-3 text-[14px] leading-8 text-muted-foreground">{card.details.idealProfile}</p>
          </div>
        </section>
        <div className="space-y-6">
          <section className="surface p-6">
            <h2 className="text-[24px] font-semibold text-foreground">Beneficios</h2>
            <ul className="mt-5 space-y-3 text-[13px] leading-7 text-foreground/75">
              {card.benefits.map((benefit) => (
                <li key={benefit}>• {benefit}</li>
              ))}
            </ul>
          </section>
          <section className="surface p-6">
            <h2 className="text-[24px] font-semibold text-foreground">Requisitos</h2>
            <ul className="mt-5 space-y-3 text-[13px] leading-7 text-foreground/75">
              {card.requirements.map((requirement) => (
                <li key={requirement}>• {requirement}</li>
              ))}
            </ul>
          </section>
          <section className="surface p-6">
            <h2 className="text-[24px] font-semibold text-foreground">SEO description</h2>
            <p className="mt-4 text-[13px] leading-7 text-muted-foreground">{card.details.seoDescription}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-[15px] text-foreground">{value}</p>
    </div>
  );
}
