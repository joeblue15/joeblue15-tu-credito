import { getCategoryLabel } from "@/lib/format";
import type { CreditCardWithBank, RecommendationResult } from "@/lib/types";

const keywordMap: Record<string, Array<CreditCardWithBank["category"]>> = {
  viaje: ["viajes", "premium"],
  viajar: ["viajes", "premium"],
  millas: ["viajes", "premium"],
  premium: ["premium"],
  negocio: ["negocios"],
  empresa: ["negocios"],
  cashback: ["cashback"],
  familia: ["familia"],
  estudiante: ["estudiante"],
  retail: ["retail"],
};

export function buildRecommendation(query: string, cards: CreditCardWithBank[]): RecommendationResult {
  const normalized = query.toLowerCase();
  const desiredCategories = new Set<CreditCardWithBank["category"]>();

  Object.entries(keywordMap).forEach(([keyword, values]) => {
    if (normalized.includes(keyword)) {
      values.forEach((value) => desiredCategories.add(value));
    }
  });

  const matches = cards
    .filter((card) => card.active)
    .filter((card) => desiredCategories.size === 0 || desiredCategories.has(card.category))
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 3);

  if (!matches.length) {
    const fallback = cards.filter((card) => card.active).slice(0, 3);
    return {
      answer: `No encontré una intención totalmente específica, así que te dejo tres opciones versátiles del catálogo: ${fallback
        .map((card) => `${card.name} (${getCategoryLabel(card.category)})`)
        .join(", ")}. Si me dices si priorizas viajes, cashback, negocio o aprobación más accesible, afino mejor la recomendación.`,
      suggestedCards: fallback.map((card) => card.slug),
    };
  }

  const answer = `Por lo que me cuentas, te convienen estas opciones: ${matches
    .map(
      (card) => `${card.name} de ${card.bank.name}, ideal para ${getCategoryLabel(card.category).toLowerCase()} porque ${card.details.highlight.toLowerCase()}`
    )
    .join("; ")}. Si quieres, también te las comparo por anualidad, ingreso mínimo o perfil ideal.`;

  return {
    answer,
    suggestedCards: matches.map((card) => card.slug),
  };
}

export function compareRecommendation(query: string, cards: CreditCardWithBank[]): RecommendationResult | null {
  const normalized = query.toLowerCase();
  const mentioned = cards.filter((card) => normalized.includes(card.slug.replaceAll("-", " ")) || normalized.includes(card.name.toLowerCase()));

  if (mentioned.length < 2) {
    return null;
  }

  const [first, second] = mentioned;
  return {
    answer: `${first.name} vs ${second.name}: ${first.name} destaca por ${first.details.highlight.toLowerCase()}, mientras ${second.name} resalta porque ${second.details.highlight.toLowerCase()}. En costo, ${first.name} tiene anualidad ${first.details.annualFee} y ${second.name} ${second.details.annualFee}. En perfil ideal, la primera se orienta a ${first.details.idealProfile.toLowerCase()} y la segunda a ${second.details.idealProfile.toLowerCase()}.`,
    suggestedCards: [first.slug, second.slug],
  };
}
