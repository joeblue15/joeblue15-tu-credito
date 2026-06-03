"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRecommend = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
// Secure model id for OpenRouter
const MODEL_ID = "openai/gpt-4o-mini";
exports.aiRecommend = functions
    .runWith({
    memory: "256MB",
    timeoutSeconds: 20,
    secrets: ["OPENROUTER_API_KEY"],
})
    .https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.status(204).send("");
        return;
    }
    try {
        const { prompt } = req.body || {};
        if (!prompt || typeof prompt !== "string") {
            res.status(400).json({ error: "Missing prompt" });
            return;
        }
        // Load active/featured cards as context
        const cardsSnap = await db
            .collection("credit_cards")
            .where("visibility", "in", ["active", "featured"]) // @ts-ignore
            .get();
        const banksSnap = await db.collection("banks").get();
        const banks = {};
        banksSnap.forEach((d) => (banks[d.id] = d.data()));
        const cards = cardsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        const condensed = cards.slice(0, 120).map((c) => ({
            slug: c.slug,
            name: c.name,
            bank: banks[c.bankId]?.name || c.bankId,
            category: c.category,
            highlight: c.details?.highlight,
            annualFee: c.details?.annualFee,
            minIncome: c.details?.minIncome,
        }));
        const system = `Eres el asesor de tarjetas de TuCredito en RD. Sugiere 2-4 tarjetas REALES del JSON dado, responde en español neutro breve y devuelve además un array de slugs en JSON."`;
        const user = `Consulta: ${prompt}\n\nTarjetas (JSON): ${JSON.stringify(condensed)}`;
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            res.status(500).json({ error: "Missing OPENROUTER_API_KEY" });
            return;
        }
        const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: MODEL_ID,
                max_tokens: 350,
                temperature: 0.4,
                messages: [
                    { role: "system", content: system },
                    {
                        role: "user",
                        content: user +
                            "\n\nFormato de salida: Texto breve y al final una línea JSON: {\"slugs\":[\"slug-1\",\"slug-2\"]} sin explicaciones extra.",
                    },
                ],
            }),
        });
        const data = await orRes.json();
        const text = data?.choices?.[0]?.message?.content || "No tengo respuesta";
        // Parse trailing JSON line for slugs
        let slugs = [];
        try {
            const match = text.match(/\{\s*\"slugs\"\s*:\s*\[[^\]]*\]\s*\}\s*$/);
            if (match) {
                const parsed = JSON.parse(match[0]);
                slugs = Array.isArray(parsed.slugs) ? parsed.slugs.slice(0, 4) : [];
            }
        }
        catch { }
        res.json({ answer: text.replace(/\{\s*\"slugs\"[\s\S]*$/, "").trim(), slugs });
        return;
    }
    catch (e) {
        res.status(500).json({ error: e?.message || "AI error" });
        return;
    }
});
//# sourceMappingURL=index.js.map