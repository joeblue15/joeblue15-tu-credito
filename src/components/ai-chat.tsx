"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, SendHorizonal, Sparkles, User2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildRecommendation, compareRecommendation } from "@/lib/recommendations";
import type { ChatMessage, CreditCardWithBank } from "@/lib/types";

const formSchema = z.object({
  message: z.string().min(2, "Cuéntame qué estás buscando").max(300),
});

export function AiChat({ cards }: { cards: CreditCardWithBank[] }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hola, soy la IA de TuCredito. Puedo recomendarte tarjetas reales del catálogo de RD, comparar opciones y explicarte diferencias por anualidad, ingresos o perfil ideal.",
    },
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const cardsBySlug = useMemo(() => Object.fromEntries(cards.map((card) => [card.slug, card])), [cards]);

  const onSubmit = form.handleSubmit((values) => {
    const prompt = values.message.trim();
    const comparison = compareRecommendation(prompt, cards);
    const recommendation = comparison ?? buildRecommendation(prompt, cards);

    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-user`, role: "user", content: prompt },
      {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: recommendation.answer,
        cards: recommendation.suggestedCards,
      },
    ]);

    form.reset();
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.28)]">
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/20 p-2 text-primary">
              <Bot className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Asistente IA</h2>
              <p className="text-sm text-slate-400">Estilo chat para recomendación y comparación de tarjetas reales.</p>
            </div>
          </div>
        </div>
        <div className="flex h-[68vh] flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
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
                      className={`max-w-[88%] rounded-[26px] px-4 py-3 text-sm leading-7 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:max-w-[75%] ${
                        isAssistant ? "border border-white/10 bg-[#141525] text-slate-100" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                        {isAssistant ? <Bot className="size-3.5" /> : <User2 className="size-3.5" />}
                        {isAssistant ? "TuCredito IA" : "Tú"}
                      </div>
                      <p>{message.content}</p>
                      {message.cards?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {message.cards.map((slug) => {
                            const card = cardsBySlug[slug];
                            if (!card) return null;
                            return (
                              <Link
                                key={slug}
                                href={`/tarjetas/${slug}`}
                                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
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
          <form onSubmit={onSubmit} className="border-t border-white/10 bg-black/10 p-4 sm:p-5">
            <div className="flex items-end gap-3 rounded-[26px] border border-white/10 bg-white/5 p-2 pl-4">
              <Input
                {...form.register("message")}
                placeholder="Ej: quiero una tarjeta para viajar y salas VIP"
                className="h-12 border-0 bg-transparent px-0 text-base text-white placeholder:text-slate-500 focus-visible:ring-0"
              />
              <Button type="submit" className="h-12 rounded-[20px] bg-primary px-5 text-primary-foreground hover:bg-primary/90">
                <SendHorizonal className="size-4" />
                Enviar
              </Button>
            </div>
            {form.formState.errors.message ? (
              <p className="mt-2 text-sm text-red-300">{form.formState.errors.message.message}</p>
            ) : null}
          </form>
        </div>
      </section>
      <aside className="space-y-4">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-primary/20 p-2 text-primary">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Cómo usar la IA</h3>
              <p className="text-sm text-slate-400">Haz preguntas naturales y te devuelve tarjetas reales.</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p>• “Quiero cashback para gasto diario”.</p>
            <p>• “Compárame BHD Infinite Rewards con Popular Black Cashback”.</p>
            <p>• “Busco algo con aprobación más accesible”.</p>
          </div>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5">
          <h3 className="mb-4 font-semibold text-white">Tarjetas más consultadas</h3>
          <div className="space-y-3">
            {cards.slice(0, 4).map((card) => (
              <Link
                key={card.id}
                href={`/tarjetas/${card.slug}`}
                className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-primary/30"
              >
                <span>
                  <strong className="block text-white">{card.name}</strong>
                  <span className="text-slate-400">{card.bank.name}</span>
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Ver</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
