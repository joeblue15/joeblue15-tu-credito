"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, SendHorizonal, Sparkles, User2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildRecommendation, compareRecommendation } from "@/lib/recommendations";
import { useAuth } from "@/context/auth-context";
import type { ChatMessage, CreditCardWithBank } from "@/lib/types";

const formSchema = z.object({
  message: z.string().min(2, "Cuéntame qué estás buscando").max(300),
});

export function AiChat({ cards }: { cards: CreditCardWithBank[] }) {
  const { user } = useAuth();
  const userName = user?.displayName || user?.email?.split("@")[0];
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: userName 
        ? `¡Hola ${userName}! 👋 Hola, soy tu asesor IA para tu próxima tarjeta de crédito. Dime qué buscas y te recomiendo tarjetas reales para RD.`
        : "Hola, soy tu asesor IA para tu próxima tarjeta de crédito. Dime qué buscas y te recomiendo tarjetas reales para RD.",
    },
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const cardsBySlug = useMemo(() => Object.fromEntries(cards.map((card) => [card.slug, card])), [cards]);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  function TypingDots() {
    return (
      <div className="flex items-center gap-1 py-0.5">
        <motion.span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/70" animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
        <motion.span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/70" animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }} />
        <motion.span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/70" animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
      </div>
    );
  }

  const onSubmit = form.handleSubmit(async (values) => {
    const prompt = values.message.trim();
    if (!prompt) return;

    const userId = `${Date.now()}-user`;
    const typingId = `typing-${Date.now()}`;
    // Muestra inmediatamente el mensaje del usuario y el indicador de escritura
    setMessages((current) => [
      ...current,
      { id: userId, role: "user", content: prompt },
      { id: typingId, role: "assistant", content: "__typing__" },
    ]);
    form.reset();

    // Flujo de IA:
    // 1) Si hay NEXT_PUBLIC_AI_API_URL (Cloudflare Worker), lo usamos primero (OpenRouter proxy seguro y sin Blaze)
    // 2) Si no, y existe NEXT_PUBLIC_GEMINI_API_KEY, usamos Gemini en cliente
    // 3) Si todo falla, heurística local
    try {
      const apiUrl = process.env.NEXT_PUBLIC_AI_API_URL;
      if (apiUrl) {
        const condensed = cards.slice(0, 140).map((c) => ({
          slug: c.slug,
          name: c.name,
          bank: c.bank.name,
          bankSlug: c.bank.slug,
          category: c.category,
          featured: !!c.featured,
          annualFee: c.details.annualFee,
          minIncome: c.details.minIncome,
          approvalLevel: c.details.approvalLevel,
          highlight: c.details.highlight,
          idealProfile: c.details.idealProfile,
        }));
        const history = messages.slice(-6).map((m) => ({ role: m.role, content: m.content }));
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, cards: condensed, history }),
        });
        if (!res.ok) throw new Error("ai failed");
        const data = await res.json();
        const answer: string = data.answer || "";
        const slugs: string[] = Array.isArray(data.slugs) ? data.slugs : [];
        setMessages((current) =>
          current.map((m) => (m.id === typingId ? { id: `${Date.now()}-assistant`, role: "assistant", content: answer, cards: slugs } : m))
        );
      } else {
        throw new Error("no ai configured");
      }
    } catch {
      const comparison = compareRecommendation(prompt, cards);
      const recommendation = comparison ?? buildRecommendation(prompt, cards);
      setMessages((current) =>
        current.map((m) =>
          m.id === typingId ? { id: `${Date.now()}-assistant`, role: "assistant", content: recommendation.answer, cards: recommendation.suggestedCards } : m
        )
      );
    }
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="overflow-hidden border border-border bg-card">
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="border border-border bg-background p-2 text-foreground">
              <Bot className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Asistente IA</h2>
              <p className="text-sm text-muted-foreground">Estilo chat para recomendación y comparación de tarjetas reales.</p>
            </div>
          </div>
        </div>
        <div className="flex h-[68vh] flex-col">
          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
            <AnimatePresence initial={false}>
              {messages.map((message) => {
                const isAssistant = message.role === "assistant";
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[88%] px-4 py-3 text-sm leading-7 sm:max-w-[75%] ${
                        isAssistant ? "border border-border bg-background text-foreground" : "bg-foreground text-background"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {isAssistant ? <Bot className="size-3.5" /> : <User2 className="size-3.5" />}
                        {isAssistant ? "TuTarjetaRD IA" : "Tú"}
                      </div>
                      {message.content === "__typing__" ? <TypingDots /> : <p className="whitespace-pre-line">{message.content}</p>}
                      {message.cards?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {message.cards.map((slug) => {
                            const card = cardsBySlug[slug];
                            if (!card) return null;
                            return (
                              <Link
                                key={slug}
                                href={`/tarjetas/${slug}`}
                                className="border border-border px-3 py-1 text-xs font-medium text-foreground"
                              >
                                {card.name}
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          <form onSubmit={onSubmit} className="border-t border-border bg-background p-4 sm:p-5">
            <div className="flex items-end gap-3 border border-border bg-card p-2 pl-4">
              <Input
                {...form.register("message")}
                placeholder="Ej: quiero una tarjeta para viajar y salas VIP"
                className="h-12 border-0 bg-transparent px-0 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
              />
              <Button type="submit" className="h-12 rounded-none bg-foreground px-5 text-background hover:bg-foreground/90">
                <SendHorizonal className="size-4" />
                Enviar
              </Button>
            </div>
            {form.formState.errors.message ? (
              <p className="mt-2 text-sm text-red-500">{form.formState.errors.message.message}</p>
            ) : null}
          </form>
        </div>
      </section>
      <aside className="space-y-4">
        <div className="surface p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="border border-border bg-background p-2 text-foreground">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Cómo usar la IA</h3>
              <p className="text-sm text-muted-foreground">Haz preguntas naturales y te devuelve tarjetas reales.</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-foreground/75">
            <p>• “Gano 50k RD, ¿qué tarjeta me recomiendas?”</p>
            <p>• “Quiero viajar, ¿qué opciones hay?”</p>
            <p>• “Compárame por ingreso mínimo”</p>
          </div>
        </div>
        <div className="surface p-5">
          <h3 className="mb-4 font-semibold text-foreground">Tarjetas más consultadas</h3>
          <div className="space-y-3">
            {cards.slice(0, 4).map((card) => (
              <Link
                key={card.id}
                href={`/tarjetas/${card.slug}`}
                className="flex items-center justify-between border border-border px-4 py-3 text-sm text-foreground transition hover:border-foreground/30"
              >
                <span>
                  <strong className="block text-foreground">{card.name}</strong>
                  <span className="text-muted-foreground">{card.bank.name}</span>
                </span>
                <span className="border border-border px-3 py-1 text-xs text-foreground">Ver</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
