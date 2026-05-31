"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, BriefcaseBusiness, CreditCard, Gem, GraduationCap, HandCoins, Home, Plane, ShoppingBag, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CreditCardCard } from "@/components/credit-card-card";
import { LoadingGrid } from "@/components/loading-grid";
import { Button } from "@/components/ui/button";
import { useCatalogData } from "@/hooks/use-catalog-data";
import { getCategoryLabel } from "@/lib/format";

const categoryIcons = {
  cashback: HandCoins,
  viajes: Plane,
  negocios: BriefcaseBusiness,
  premium: Gem,
  clásica: CreditCard,
  estudiante: GraduationCap,
  retail: ShoppingBag,
  familia: Users,
} as const;

export function HomePage() {
  const { cardsWithBanks, loading } = useCatalogData();
  const featuredCards = cardsWithBanks.filter((card) => card.featured && card.active).slice(0, 4);
  const featuredCategories = Array.from(new Set(cardsWithBanks.slice(0, 8).map((card) => card.category)));

  return (
    <div className="mx-auto max-w-7xl space-y-24 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#0D1020] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.32)] sm:p-10">
          <Image src="/assets/hero-bg.png" alt="Fintech premium background" fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.22),transparent_40%)]" />
          <div className="relative z-10 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="size-4" />
              Fintech premium de RD
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Encuentra la tarjeta perfecta para ti en RD
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Explora, compara y decide entre tarjetas de crédito reales de República Dominicana con una experiencia clara, visual y diseñada para profesionales jóvenes.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full bg-primary px-6 text-primary-foreground shadow-[0_0_40px_rgba(124,58,237,0.28)] hover:bg-primary/90">
                <Link href="/tarjetas">Ver tarjetas <ArrowRight className="size-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-white/10 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white">
                <Link href="/comparar">Comparar tarjetas</Link>
              </Button>
            </motion.div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Tarjetas activas", value: `${cardsWithBanks.filter((card) => card.active).length}+` },
                { label: "Bancos curados", value: "4" },
                { label: "Asistente IA", value: "24/7" },
              ].map((item) => (
                <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
            <Image src="/assets/cards-editorial.png" alt="Tarjetas destacadas" width={1200} height={900} className="rounded-[28px] object-cover" priority />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/ia" className="rounded-[30px] border border-primary/20 bg-primary/10 p-5 transition hover:border-primary/40">
              <Bot className="mb-4 size-8 text-primary" />
              <h2 className="text-xl font-semibold text-white">Recomendación IA</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">Chatea y recibe sugerencias reales del catálogo, con comparaciones claras.</p>
            </Link>
            <Link href="/comparar" className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20">
              <CreditCard className="mb-4 size-8 text-primary" />
              <h2 className="text-xl font-semibold text-white">Comparador visual</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">Compara 2 a 4 tarjetas con una vista moderna, móvil y fácil de entender.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary">Featured</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Tarjetas destacadas</h2>
          </div>
          <Button asChild variant="outline" className="hidden rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:inline-flex">
            <Link href="/tarjetas">Ver catálogo completo</Link>
          </Button>
        </div>
        {loading ? <LoadingGrid /> : <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{featuredCards.map((card) => <CreditCardCard key={card.id} card={card} />)}</div>}
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-primary">Categorías</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Explora por perfil financiero</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featuredCategories.map((category) => {
            const Icon = categoryIcons[category];
            return (
              <Link key={category} href={`/tarjetas?categoria=${category}`} className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-primary/30">
                <div className="inline-flex rounded-2xl bg-primary/15 p-3 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{getCategoryLabel(category)}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">Descubre tarjetas pensadas para este uso y compáralas con un par de toques.</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-primary">IA + Catálogo</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Todo el contenido lo controla el admin</h2>
          <p className="mt-4 text-sm leading-8 text-slate-300">El frontend solo consume datos: bancos, tarjetas, featured, estado visible, SEO y descripciones. Así TuCredito puede crecer de forma escalable sin tocar diseño cada vez.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/ia">Hablar con la IA</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link href="/tarjetas">Explorar tarjetas</Link>
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-[#0F1223] p-4 sm:p-5">
          <Image src="/assets/ai-illustration.png" alt="IA TuCredito" width={1200} height={900} className="rounded-[28px] object-cover" />
        </div>
      </section>
    </div>
  );
}
