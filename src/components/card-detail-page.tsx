"use client";

import { BadgeDollarSign, CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { RichTextContent } from "@/components/rich-text-content";
import { Button } from "@/components/ui/button";
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
    };
  }, [card]);

  if (loading && !card) {
    return <div className="mx-auto max-w-7xl px-4 py-12 text-slate-300">Cargando tarjeta...</div>;
  }

  if (!card) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-3xl font-semibold text-white">Tarjeta no encontrada</h1>
        <p className="mt-3 text-slate-400">La tarjeta que buscas no existe o no está activa.</p>
        <Button asChild className="mt-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/tarjetas">Volver al catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> : null}
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-4">
          <Image src={card.imageUrl} alt={card.name} width={1200} height={1400} className="aspect-[4/5] w-full rounded-[30px] object-cover" priority />
        </div>
        <div className="space-y-5 rounded-[36px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary">{getCategoryLabel(card.category)} · {card.bank.name}</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">{card.name}</h1>
            <p className="mt-4 text-base leading-8 text-slate-300">{card.details.highlight}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <DetailMetric icon={BadgeDollarSign} label="Anualidad" value={card.details.annualFee} />
            <DetailMetric icon={ShieldCheck} label="Ingreso mínimo" value={card.details.minIncome} />
            <DetailMetric icon={CreditCard} label="Moneda" value={card.details.currency} />
            <DetailMetric icon={Sparkles} label="Nivel de aprobación" value={card.details.approvalLevel} />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => toggleCard(card.slug)} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              {isSelected(card.slug) ? "Quitar de comparar" : "Agregar a comparar"}
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link href="/comparar">Ir al comparador</Link>
            </Button>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-medium text-white">Perfil ideal</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{card.details.idealProfile}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-[36px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div>
            <h2 className="text-2xl font-semibold text-white">Descripción completa</h2>
            <div className="mt-4">
              <RichTextContent html={card.description} />
            </div>
          </div>
          {card.contentBlocks?.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {card.contentBlocks.map((block) => (
                <div key={block.title} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg font-semibold text-white">{block.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{block.body}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="space-y-6">
          <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold text-white">Beneficios</h2>
            <div className="mt-5 space-y-3">
              {card.benefits.map((benefit) => (
                <div key={benefit} className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">{benefit}</div>
              ))}
            </div>
          </div>
          <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold text-white">Requisitos</h2>
            <div className="mt-5 space-y-3">
              {card.requirements.map((requirement) => (
                <div key={requirement} className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">{requirement}</div>
              ))}
            </div>
          </div>
          <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-semibold text-white">SEO description</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{card.details.seoDescription}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function DetailMetric({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/5 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
        <Icon className="size-4 text-primary" />
        {label}
      </div>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
