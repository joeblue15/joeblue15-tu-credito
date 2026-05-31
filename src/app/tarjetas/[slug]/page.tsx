import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CardDetailPage } from "@/components/card-detail-page";
import { banks, creditCards } from "@/lib/mock-data";

export async function generateStaticParams() {
  return creditCards.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = creditCards.find((item) => item.slug === slug);
  const bank = banks.find((item) => item.id === card?.bankId);

  if (!card || !bank) {
    return {
      title: "Tarjeta no encontrada",
    };
  }

  return {
    title: card.name,
    description: card.details.seoDescription,
    openGraph: {
      title: `${card.name} | ${bank.name}`,
      description: card.details.seoDescription,
      images: [{ url: "/assets/placeholder.svg", alt: "placeholder" }],
    },
  };
}

export default async function TarjetaDetallePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = creditCards.find((item) => item.slug === slug);

  if (!card || (!card.active && card.visibility === "draft")) {
    notFound();
  }

  return <CardDetailPage slug={slug} />;
}
