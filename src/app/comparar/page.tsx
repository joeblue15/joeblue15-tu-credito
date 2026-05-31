import type { Metadata } from "next";

import { ComparePage } from "@/components/compare-page";

export const metadata: Metadata = {
  title: "Comparar tarjetas",
  description: "Compara visualmente hasta 4 tarjetas de crédito de República Dominicana en TuCredito.",
};

export default function CompararPage() {
  return <ComparePage />;
}
