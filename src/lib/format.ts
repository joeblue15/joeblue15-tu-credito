import { banks, categoryLabels } from "@/lib/mock-data";
import type { Bank, CardCategory, CreditCard, CreditCardWithBank } from "@/lib/types";

export function formatCurrencyLabel(value: string) {
  return value?.trim() ? value : "No especificado";
}

export function getCategoryLabel(category?: CardCategory) {
  if (!category) return null;
  return categoryLabels[category];
}

export function attachBank(cards: CreditCard[], sourceBanks: Bank[] = banks): CreditCardWithBank[] {
  return cards
    .map((card) => {
      const bank = sourceBanks.find((item) => item.id === card.bankId);
      if (!bank) return null;
      return { ...card, bank };
    })
    .filter(Boolean) as CreditCardWithBank[];
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function sanitizeRichText(value: string) {
  const allowed = value
    .replace(/<(?!\/?(p|br|strong|em|ul|ol|li|h1|h2|h3|h4)\b)[^>]*>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "");

  return allowed;
}
