import type { Metadata } from "next";
import { Suspense } from "react";

import { CatalogBrowser } from "@/components/catalog-browser";

export const metadata: Metadata = {
  title: "Tarjetas",
  description: "Explora tarjetas de crédito de RD por categoría, banco y perfil ideal en TuTarjetaRD.",
};

export default function TarjetasPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1220px] px-5 py-14 sm:px-8 sm:py-16 text-muted-foreground">Cargando tarjetas...</div>}>
      <CatalogBrowser />
    </Suspense>
  );
}
