type KVNamespace = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
};

export interface Env {
  OPENROUTER_API_KEY: string;
  OPENROUTER_MODEL?: string;
  QUESTIONS_KV: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      const origin = request.headers.get("Origin") || "*";
      return new Response(null, { status: 204, headers: cors(origin) });
    }

    // Live sitemap endpoint (no auth required)
    if (request.method === "GET" && url.pathname === "/sitemap.xml") {
      try {
        const xml = await buildSitemapXml();
        return new Response(xml, {
          status: 200,
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      } catch (e: any) {
        return new Response("<error/>", { status: 500, headers: { "content-type": "application/xml" } });
      }
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: cors() });
    }

    const origin = request.headers.get("Origin") || "";
    // Allow production and local development origins
    const allowed = [
      "https://tucredito.me",
      "https://www.tucredito.me",
      "https://tutarjetard.com",
      "https://www.tutarjetard.com",
      "https://tu-credito-rd.web.app",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ];
    if (origin && !allowed.includes(origin)) {
      return new Response("Forbidden", { status: 403, headers: cors(origin) });
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: cors(origin) });
    }

    // Rate limiting: max 10 questions per IP per day
    const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const rateLimitKey = `questions:${clientIp}:${today}`;
    const currentCount = await env.QUESTIONS_KV.get(rateLimitKey);
    const count = currentCount ? parseInt(currentCount, 10) : 0;

    if (count >= 10) {
      return new Response(
        JSON.stringify({ error: "Límite de preguntas alcanzado. Has hecho 10 preguntas hoy. Intenta mañana." }),
        { status: 429, headers: cors(origin) }
      );
    }

    // Increment question count
    await env.QUESTIONS_KV.put(rateLimitKey, String(count + 1), { expirationTtl: 86400 }); // 24 hours

    const prompt: string = (body?.prompt || "").toString().slice(0, 800);

    const cards: any[] = Array.isArray(body?.cards) ? body.cards.slice(0, 160) : [];
    const history: Array<{ role: "user" | "assistant"; content: string }> = Array.isArray(body?.history)
      ? body.history.map((m: any) => ({ role: m.role === "assistant" ? "assistant" : "user", content: String(m.content || "").slice(0, 600) }))
      : [];

    const system = `Eres un asesor amable y accesible de TuCredito (República Dominicana), no un bot formal.
- Habla como alguien que entiende de tarjetas y quiere ayudar, de verdad.
- Usa buena ortografía y deja espacios claros entre ideas.
- Responde con un texto bien estructurado y fácil de leer.
- Sugiere exactamente 2-4 tarjetas que encajen con la consulta.
- Cada tarjeta debe ir en una línea separada con este formato:
  Nombre de tarjeta de Banco — Categoría; beneficio breve.
- No pongas todas las tarjetas juntas en un solo párrafo sin separación.
- Termina con una pregunta de seguimiento sencilla, por ejemplo: ¿Quieres que compare por anualidad, ingreso mínimo o beneficios?
- La última línea de la salida debe contener únicamente el JSON exacto con los slugs recomendados, por ejemplo:
  {"slugs":["slug1","slug2"]}
- No agregues texto después de ese JSON, ni explicaciones adicionales.`;

    const content = [
      { role: "system", content: system },
      ...history,
      { role: "user", content: `Contexto de catálogo (JSON): ${JSON.stringify(cards)}` },
      { role: "user", content: `Consulta actual: ${prompt}` },
      { role: "user", content: `Importante: usa líneas separadas para cada tarjeta y termina con una única línea JSON exacta con los slugs recomendados: {"slugs":["..."]}` },
    ];

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://tucredito.me",
        "X-Title": "TuCredito IA",
      },
      body: JSON.stringify({
        model: env.OPENROUTER_MODEL || "deepseek/deepseek-chat-v3.1",
        messages: content,
        temperature: 0.6,
        top_p: 0.9,
        presence_penalty: 0.2,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new Response(JSON.stringify({ error: "upstream_error", detail: text }), { status: 500, headers: cors(origin) });
    }

    const data = (await resp.json()) as any;
    const text: string = data?.choices?.[0]?.message?.content || "";

    let slugs: string[] = [];
    try {
      const match = text.match(/\{\s*\"slugs\"\s*:\s*\[[^\]]*\]\s*\}\s*$/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        slugs = Array.isArray(parsed.slugs) ? parsed.slugs.slice(0, 4) : [];
      }
    } catch {}

    const answer = text.replace(/\{\s*\"slugs\"[\s\S]*$/, "").trim();
    return new Response(JSON.stringify({ answer, slugs }), { status: 200, headers: cors(origin) });
  },
};

function cors(origin?: string) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  } as Record<string, string>;
}

async function buildSitemapXml(): Promise<string> {
  const base = "https://tucredito.me";
  const staticUrls = ["/", "/tarjetas", "/comparar", "/ia"]; 

  type Doc = {
    name: string;
    fields?: Record<string, any>;
    updateTime?: string;
  };

  const cards: Array<{ slug: string; updatedAt: string; featured: boolean }> = [];
  const endpoint = "https://firestore.googleapis.com/v1/projects/tu-credito-rd/databases/(default)/documents/credit_cards?pageSize=300";
  const resp = await fetch(endpoint, { headers: { accept: "application/json" } });
  if (resp.ok) {
    const data = (await resp.json()) as { documents?: Doc[] };
    for (const d of data.documents || []) {
      const f = d.fields || {};
      const visibility = f.visibility?.stringValue as string | undefined;
      const active = f.active?.booleanValue as boolean | undefined;
      const slug = f.slug?.stringValue as string | undefined;
      const featured = Boolean(f.featured?.booleanValue);
      const updatedAt = (f.updatedAt?.stringValue as string | undefined) || d.updateTime || new Date().toISOString();
      if (!slug) continue;
      if (visibility === "active" || visibility === "featured") {
        if (active !== false) {
          cards.push({ slug, updatedAt, featured });
        }
      }
    }
  }

  const urls: string[] = [];
  for (const u of staticUrls) {
    urls.push(`<url><loc>${base}${u}</loc><changefreq>weekly</changefreq><priority>${u === "/" ? "1.0" : "0.8"}</priority></url>`);
  }
  for (const c of cards) {
    const lastmod = new Date(c.updatedAt).toISOString();
    const priority = c.featured ? "0.9" : "0.7";
    urls.push(`<url><loc>${base}/tarjetas/${escapeXml(c.slug)}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
}

function escapeXml(input: string): string {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
