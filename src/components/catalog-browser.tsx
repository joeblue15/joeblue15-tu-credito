"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { CreditCardCard } from "@/components/credit-card-card";
import { LoadingGrid } from "@/components/loading-grid";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCatalogData } from "@/hooks/use-catalog-data";
import { categoryLabels } from "@/lib/mock-data";
import { CARD_CATEGORIES } from "@/lib/types";

export function CatalogBrowser() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") ?? "all";
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [sortByBank, setSortByBank] = useState("all");
  const { cardsWithBanks, loading, banks } = useCatalogData();

  const filteredCards = useMemo(() => {
    return cardsWithBanks
      .filter((card) => card.active && card.visibility !== "draft")
      .filter((card) => category === "all" || card.category === category)
      .filter((card) => sortByBank === "all" || card.bankId === sortByBank)
      .filter((card) => {
        const query = search.toLowerCase();
        return card.name.toLowerCase().includes(query) || card.bank.name.toLowerCase().includes(query);
      })
      .sort((a, b) => a.bank.name.localeCompare(b.bank.name));
  }, [banks, cardsWithBanks, category, search, sortByBank]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-primary">Catálogo</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Tarjetas de crédito en República Dominicana</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">Filtra por categoría, busca por nombre y ordena por banco dentro de una galería visual premium con tarjetas comparables.</p>
        <div className="mt-8 grid gap-3 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por tarjeta o banco" className="h-12 rounded-full border-white/10 bg-white/5 pl-11 text-white placeholder:text-slate-500" />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-12 rounded-full border-white/10 bg-white/5 text-white">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#111322] text-white">
              <SelectItem value="all">Todas las categorías</SelectItem>
              {CARD_CATEGORIES.map((item) => <SelectItem key={item} value={item}>{categoryLabels[item]}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sortByBank} onValueChange={setSortByBank}>
            <SelectTrigger className="h-12 rounded-full border-white/10 bg-white/5 text-white">
              <SelectValue placeholder="Banco" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#111322] text-white">
              <SelectItem value="all">Todos los bancos</SelectItem>
              {banks.map((bank) => <SelectItem key={bank.id} value={bank.id}>{bank.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </section>

      {loading ? <LoadingGrid /> : <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{filteredCards.map((card) => <CreditCardCard key={card.id} card={card} />)}</div>}
      {!loading && !filteredCards.length ? (
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-center text-slate-300">No encontramos tarjetas con esos filtros.</div>
      ) : null}
    </div>
  );
}
