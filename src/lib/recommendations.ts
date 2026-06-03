import { getCategoryLabel } from "@/lib/format";
import type { CreditCardWithBank, RecommendationResult } from "@/lib/types";

const keywordMap: Record<string, Array<CreditCardWithBank["category"]>> = {
  viaje: ["viajes", "premium"],
  viajar: ["viajes", "premium"],
  millas: ["viajes", "premium"],
  aeropuerto: ["viajes", "premium"],
  lounge: ["viajes", "premium"],
  vip: ["viajes", "premium"],
  premium: ["premium"],
  negocio: ["negocios"],
  negocios: ["negocios"],
  empresa: ["negocios"],
  emprendedor: ["negocios"],
  cashback: ["cashback"],
  devolucion: ["cashback"],
  devolución: ["cashback"],
  supermercado: ["cashback"],
  familia: ["familia"],
  estudiante: ["estudiante"],
  retail: ["retail"],
};

export function buildRecommendation(query: string, cards: CreditCardWithBank[]): RecommendationResult {
  const normalized = query.toLowerCase();
  const desiredCategories = new Set<CreditCardWithBank["category"]>();

  const wantNoAnnual = /(sin\s+anualidad|anualidad\s*0|sin\s+cuota)/i.test(normalized);
  const approvalLow = /(facil|fácil|rapida|rápida|express|sin\s+buro|sin\s+buró)/i.test(normalized);
  const approvalHigh = /(exigente|estricta|dificil|difícil|selectiva)/i.test(normalized);
  const bankWant: string[] = [];
  if (/(popular)/i.test(normalized)) bankWant.push("popular");
  if (/(bhd|leon|león)/i.test(normalized)) bankWant.push("bhd");
  if (/(reservas)/i.test(normalized)) bankWant.push("reservas");

  let income: number | null = null;
  const incomeMatch = normalized.match(/(\d{1,3}(?:[\.,]\d{3})+|\d+)(\s*k|\s*mil)?/i);
  if (incomeMatch) {
    const raw = incomeMatch[1].replace(/[\.,]/g, "");
    let val = parseInt(raw, 10);
    if (isFinite(val)) {
      if (incomeMatch[2] && /k|mil/i.test(incomeMatch[2])) val *= 1000;
      if (val > 0) income = val;
    }
  }

  Object.entries(keywordMap).forEach(([keyword, values]) => {
    if (normalized.includes(keyword)) {
      values.forEach((value) => desiredCategories.add(value));
    }
  });

  const pool = cards
    .filter((card) => card.active)
    .filter((card) => desiredCategories.size === 0 || desiredCategories.has(card.category))
    .filter((card) => {
      if (!bankWant.length) return true;
      const b = card.bank.slug.toLowerCase() + " " + card.bank.name.toLowerCase();
      return bankWant.some((w) => b.includes(w));
    })
    .filter((card) => {
      if (!wantNoAnnual) return true;
      const fee = (card.details.annualFee || "").toLowerCase();
      return fee.includes("0") || fee.includes("sin");
    })
    .filter((card) => {
      if (!income) return true;
      const mi = parseInt((card.details.minIncome || "0").replace(/[^0-9]/g, ""), 10) || 0;
      return mi === 0 || mi <= (income as number);
    })
    .filter((card) => {
      if (!approvalLow && !approvalHigh) return true;
      if (approvalLow) return card.details.approvalLevel === "bajo" || card.details.approvalLevel === "medio";
      return card.details.approvalLevel === "alto";
    });

  const interestWords = [
    "supermerc",
    "gasolin",
    "combust",
    "restaur",
    "farmac",
    "millas",
    "viaje",
    "aeropu",
    "lounge",
    "vip",
    "apps",
  ];

  const scored = pool
    .map((card) => {
      let score = 0;
      if (card.featured) score += 2;
      const h = (card.details.highlight || "").toLowerCase() + " " + (card.description || "").toLowerCase();
      for (const w of interestWords) if (normalized.includes(w)) score += h.includes(w) ? 2 : 0;
      if (desiredCategories.size && desiredCategories.has(card.category)) score += 1;
      if (wantNoAnnual) {
        const fee = (card.details.annualFee || "").toLowerCase();
        if (fee.includes("0") || fee.includes("sin")) score += 2;
      }
      if (income) {
        const mi = parseInt((card.details.minIncome || "0").replace(/[^0-9]/g, ""), 10) || 0;
        if (mi && mi <= (income as number)) score += 1;
      }
      return { card, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((x) => x.card);

  const matches = scored
    // prioriza featured y variedad de bancos
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 8);

  // fuerza diversidad de bancos en las primeras posiciones
  const seenBanks = new Set<string>();
  const diversified: typeof matches = [];
  for (const c of matches) {
    if (!seenBanks.has(c.bank.id) || diversified.length < 3) {
      diversified.push(c);
      seenBanks.add(c.bank.id);
    }
    if (diversified.length >= 4) break;
  }
  const top = diversified.length ? diversified : matches.slice(0, 4);

  if (!top.length) {
    const fallback = cards.filter((card) => card.active).slice(0, 3);
    return {
      answer: `No encontré una intención totalmente específica, así que te dejo tres opciones versátiles del catálogo: ${fallback
        .map((card) => `${card.name} (${getCategoryLabel(card.category)})`)
        .join(", ")}. Si me dices si priorizas viajes, cashback, negocio o aprobación más accesible, afino mejor la recomendación.`,
      suggestedCards: fallback.map((card) => card.slug),
    };
  }

  const filters: string[] = [];
  if (bankWant.length) filters.push(`bancos: ${bankWant.join(", ")}`);
  if (wantNoAnnual) filters.push("sin anualidad");
  if (income) filters.push(`ingreso ≥ ${income}`);
  if (approvalLow) filters.push("aprobación accesible");
  if (approvalHigh) filters.push("aprobación exigente");

  const note = filters.length ? ` (filtros: ${filters.join(" · ")})` : "";
  const answer = `Según tu consulta${note}, te convienen: ${top
    .map(
      (card) => `${card.name} de ${card.bank.name} — ${getCategoryLabel(card.category)}; ${card.details.highlight}`
    )
    .join("; ")}. ¿Quieres que compare por anualidad, ingreso mínimo o beneficios?`;

  return {
    answer,
    suggestedCards: top.map((card) => card.slug),
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
