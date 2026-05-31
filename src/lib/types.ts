export const CARD_CATEGORIES = [
  "cashback",
  "viajes",
  "negocios",
  "premium",
  "clásica",
  "estudiante",
  "retail",
  "familia",
] as const;

export const CURRENCIES = ["DOP", "USD"] as const;
export const APPROVAL_LEVELS = ["bajo", "medio", "alto"] as const;
export const VISIBILITY_STATES = ["draft", "active", "featured"] as const;

export type CardCategory = (typeof CARD_CATEGORIES)[number];
export type CurrencyCode = (typeof CURRENCIES)[number];
export type ApprovalLevel = (typeof APPROVAL_LEVELS)[number];
export type VisibilityState = (typeof VISIBILITY_STATES)[number];

export type Bank = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  featured: boolean;
};

export type CreditCardDetails = {
  annualFee: string;
  minIncome: string;
  currency: CurrencyCode;
  approvalLevel: ApprovalLevel;
  highlight: string;
  idealProfile: string;
  seoDescription: string;
};

export type CreditCard = {
  id: string;
  bankId: string;
  name: string;
  slug: string;
  category: CardCategory;
  imageUrl: string;
  description: string;
  benefits: string[];
  requirements: string[];
  details: CreditCardDetails;
  featured: boolean;
  active: boolean;
  visibility: VisibilityState;
  createdAt: string;
  updatedAt: string;
  contentBlocks?: Array<{
    title: string;
    body: string;
  }>;
};

export type CreditCardWithBank = CreditCard & {
  bank: Bank;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  cards?: string[];
};

export type RecommendationResult = {
  answer: string;
  suggestedCards: string[];
};
