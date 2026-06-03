import type { CreditCardWithBank } from "@/lib/types";

export type GeminiAnswer = { answer: string; slugs: string[] };

export async function askGemini(prompt: string, cards: CreditCardWithBank[], apiKey?: string): Promise<GeminiAnswer> {
  const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!key) throw new Error("Missing Gemini API key");

  // Lazy import to avoid bundling unless used
  const mod = await import("@google/generative-ai");
  // @ts-ignore types provided by the package
  const { GoogleGenerativeAI } = mod;
  // Prefer modelo económico/rápido
  const modelName = (process.env.NEXT_PUBLIC_GEMINI_MODEL as string) || "gemini-1.5-flash";

  const genAI = new GoogleGenerativeAI(key as string);
  const model = genAI.getGenerativeModel({ model: modelName });

  const condensed = cards.slice(0, 120).map((c) => ({
    slug: c.slug,
    name: c.name,
    bank: c.bank.name,
    category: c.category,
    highlight: c.details.highlight,
    annualFee: c.details.annualFee,
    minIncome: c.details.minIncome,
  }));

  const system = `Eres el asesor de tarjetas de TuCredito en República Dominicana.
- Responde en español neutro, breve y claro (4-6 líneas).
- Sugiere 2-4 tarjetas del JSON provisto.
- Prioriza variedad de bancos y "featured" si aplica.
- Devuelve al final una línea JSON exacta: {"slugs":["slug-1","slug-2"]}`;

  const parts = [
    { text: system },
    { text: `Consulta: ${prompt}` },
    { text: `Tarjetas (JSON): ${JSON.stringify(condensed)}` },
    { text: `Formato: Texto breve y al final una línea JSON exacta: {"slugs":["..."]}` },
  ];

  const result = await model.generateContent({ contents: [{ role: "user", parts }] });
  const text: string = result.response.text();

  let slugs: string[] = [];
  try {
    const match = text.match(/\{\s*\"slugs\"\s*:\s*\[[^\]]*\]\s*\}\s*$/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      slugs = Array.isArray(parsed.slugs) ? parsed.slugs.slice(0, 4) : [];
    }
  } catch {}

  return { answer: text.replace(/\{\s*\"slugs\"[\s\S]*$/, "").trim(), slugs };
}
