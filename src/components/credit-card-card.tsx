"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BadgeDollarSign, Check, Landmark, Scale, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useCompare } from "@/context/compare-context";
import { getCategoryLabel } from "@/lib/format";
import type { CreditCardWithBank } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CreditCardCard({ card }: { card: CreditCardWithBank }) {
  const { isSelected, toggleCard } = useCompare();
  const selected = isSelected(card.slug);

  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="group h-full overflow-hidden rounded-[30px] border-white/10 bg-white/[0.045] shadow-[0_16px_60px_rgba(15,23,42,0.28)] transition-transform duration-300 hover:-translate-y-1 hover:border-primary/30">
        <CardHeader className="gap-4 p-4 sm:p-5">
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
            <Image
              src={card.imageUrl}
              alt={card.name}
              width={600}
              height={760}
              className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-3">
              <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200">
                {getCategoryLabel(card.category)}
              </span>
              {card.featured ? (
                <span className="rounded-full bg-primary/25 px-3 py-1 text-[11px] font-semibold text-primary">
                  Featured
                </span>
              ) : null}
            </div>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-white">{card.name}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Landmark className="size-4" />
                {card.bank.name}
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-300">{card.details.highlight}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 p-4 pt-0 sm:p-5 sm:pt-0">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-[22px] border border-white/10 bg-white/5 p-3">
              <div className="mb-1 flex items-center gap-2 text-slate-400">
                <BadgeDollarSign className="size-4" />
                Anualidad
              </div>
              <p className="font-semibold text-white">{card.details.annualFee}</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/5 p-3">
              <div className="mb-1 flex items-center gap-2 text-slate-400">
                <ShieldCheck className="size-4" />
                Ingreso mínimo
              </div>
              <p className="font-semibold text-white">{card.details.minIncome}</p>
            </div>
          </div>
          <div className="space-y-2">
            {card.benefits.slice(0, 3).map((benefit) => (
              <div key={benefit} className="flex items-start gap-2 text-sm text-slate-300">
                <Check className="mt-0.5 size-4 text-primary" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-3 p-4 pt-0 sm:p-5 sm:pt-0">
          <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href={`/tarjetas/${card.slug}`}>
              Ver detalles
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className={cn(
              "rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white",
              selected && "border-primary/40 bg-primary/15 text-primary"
            )}
            onClick={() => toggleCard(card.slug)}
          >
            <Scale className="size-4" />
            {selected ? "Agregada" : "Comparar"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
