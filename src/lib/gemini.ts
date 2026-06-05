import type { CreditCardWithBank } from "@/lib/types";

export type GeminiAnswer = { answer: string; slugs: string[] };

export async function askGemini(prompt: string, cards: CreditCardWithBank[], apiKey?: string, history?: Array<{ role: string; content: string }>): Promise<GeminiAnswer> {
  const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!key) throw new Error("Missing Gemini API key");

  // Lazy import to avoid bundling unless used
  const mod = await import("@google/generative-ai");
  // @ts-ignore types provided by the package
  const { GoogleGenerativeAI } = mod;
  // Prefer modelo más conversacional
  const modelName = (process.env.NEXT_PUBLIC_GEMINI_MODEL as string) || "gemini-1.5-pro";

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
    approvalLevel: c.details.approvalLevel,
    idealProfile: c.details.idealProfile,
  }));

  const system = `Eres el asesor de tarjetas de TuTarjetaRD en República Dominicana.

INSTRUCCIONES DE RESPUESTA:
- Responde en español neutro, conversacional y natural, como si estuvieras en una red social.
- Usa párrafos separados (doble salto de línea) para cada idea. NO respondas todo en un solo bloque.
- Mantén el contexto de la conversación anterior.
- Si el usuario no da suficiente información, haz preguntas de seguimiento (ej: "¿Qué sueldo tienes?", "¿Prefieres cashback o viajes?").
- Responde con estructura clara: primero entiende la necesidad, luego explica brevemente, y finalmente recomienda.
- Usa buena ortografía y puntuación. Sé amigable pero profesional.
- Sugiere 2-4 tarjetas del JSON provisto cuando tengas suficiente información.
- Prioriza variedad de bancos y "featured" si aplica.
- Devuelve al final una línea JSON exacta: {"slugs":["slug-1","slug-2"]}

EJEMPLO DE RESPUESTA:
"Entiendo que buscas una tarjeta para viajes. Tienes varias opciones excelentes en el mercado dominicano.

Para viajes internacionales, te recomiendo tarjetas con beneficios de lounge y sin comisiones en el extranjero. Aquí te dejo las mejores opciones según tu perfil.

¿Quieres que te explique más sobre alguna de estas opciones?"

FORMATO FINAL:
{"slugs":["slug-1","slug-2"]}`;

  // Construir historial de conversación
  const conversationHistory = history ? history.slice(-10).map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  })) : [];

  const parts = [
    { text: system },
    { text: `Tarjetas disponibles (JSON): ${JSON.stringify(condensed)}` },
    { text: `Formato: Texto conversacional y al final una línea JSON exacta: {"slugs":["..."]}` },
    ...conversationHistory.flatMap(h => h.parts),
    { text: prompt },
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
