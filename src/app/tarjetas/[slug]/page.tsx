import type { Metadata } from "next";
import { CardDetailPage } from "@/components/card-detail-page";

export async function generateStaticParams() {
  try {
    const mod = await import("@/lib/datasets/popular-bhd");
    const grouped = (mod as any).default as Record<string, Array<{ slug?: string }>>;
    const all: string[] = [];
    for (const arr of Object.values(grouped)) {
      for (const item of arr) {
        const slug = (item as any).slug as string | undefined;
        if (slug) all.push(slug);
      }
    }
    const unique = Array.from(new Set(all));
    return unique.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Detalle de tarjeta | TuCredito",
  description: "Información detallada de la tarjeta seleccionada en TuCredito.",
};

export const dynamicParams = false;

export default async function TarjetaDetallePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CardDetailPage slug={slug} />;
}
