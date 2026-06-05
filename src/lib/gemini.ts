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

  const system = `Eres el asesor de tarjetas de TuTarjetaRD en República Dominicana. Tu estilo es conversacional, amigable y profesional, como si estuvieras en Instagram o WhatsApp.

REGLAS DE RESPUESTA:
1. ESTRUCTURA: Usa párrafos separados (doble salto de línea). NUNCA respondas todo en un solo bloque de texto.
2. TONO: Amigable, cercano, pero profesional. Usa "tú" en lugar de "usted".
3. ORTOGRAFÍA: Perfecta puntuación, acentos y gramática. Evita errores comunes.
4. ORGANIZACIÓN: Primero entiende la necesidad del usuario, luego explica brevemente, y finalmente recomienda.
5. SEGUIMIENTO: Si falta información, haz preguntas naturales (ej: "¿Cuánto ganas al mes?", "¿Prefieres viajes o cashback?").
6. BREVEDAD: Sé conciso pero completo. No alargues innecesariamente.
7. EMOJIS: Usa moderadamente (1-2 por respuesta máximo) para dar calidez.
8. VARIACIÓN: Si recomiendas tarjetas, varía los bancos y prioriza las "featured".

EJEMPLO DE RESPUESTA:
"¡Entiendo! Buscas una tarjeta para viajes con tu ingreso de 100k. Tienes excelentes opciones en el mercado dominicano.

Para viajes internacionales, te convienen tarjetas con acceso a salas VIP y sin comisiones en el extranjero. Te dejo las mejores opciones según tu perfil.

¿Quieres que te compare por anualidad o por beneficios específicos?"

FORMATO FINAL (JSON exacto al final):
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
