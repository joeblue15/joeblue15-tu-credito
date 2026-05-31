import type { Metadata } from "next";

import { CatalogBrowser } from "@/components/catalog-browser";

export const metadata: Metadata = {
  title: "Tarjetas",
  description: "Explora tarjetas de crédito de RD por categoría, banco y perfil ideal en TuCredito.",
};

export default function TarjetasPage() {
  return <CatalogBrowser />;
}
