"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { CreditCardCard } from "@/components/credit-card-card";
import { LoadingGrid } from "@/components/loading-grid";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCatalogData } from "@/hooks/use-catalog-data";
import { categoryLabels } from "@/lib/mock-data";
import { CARD_CATEGORIES, CARD_TYPES } from "@/lib/types";

export function CatalogBrowser() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") ?? "all";
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [bankFilter, setBankFilter] = useState("all");
  const [cardTypeFilter, setCardTypeFilter] = useState("all");
  const { cardsWithBanks, loading, banks } = useCatalogData();

  const filteredCards = useMemo(() => {
    return cardsWithBanks
      .filter((card) => card.active && card.visibility !== "draft")
      .filter((card) => cardTypeFilter === "all" || (card as any).cardType === cardTypeFilter)
      .filter((card) => category === "all" || card.category === category)
      .filter((card) => bankFilter === "all" || card.bankId === bankFilter)
      .filter((card) => {
        const query = search.toLowerCase().trim();
        return !query || card.name.toLowerCase().includes(query) || card.bank.name.toLowerCase().includes(query);
      });
  }, [bankFilter, cardsWithBanks, category, search, cardTypeFilter]);

  return (
    <div className="mx-auto max-w-[1220px] px-5 py-14 sm:px-8 sm:py-16">
      <div className="mb-10">
        <h1 className="text-[42px] font-semibold text-foreground sm:text-[54px]">Explorar Tarjetas</h1>
        <p className="mt-3 max-w-2xl text-[14px] leading-7 text-muted-foreground">
          Filtra por categoría, banco o nombre dentro de un catálogo limpio y directo, inspirado en la referencia que compartiste.
        </p>
      </div>

      <div className="mb-8 grid gap-3 md:grid-cols-4">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por tarjeta o banco"
          className="h-11 rounded-none border-border bg-card text-sm text-foreground placeholder:text-muted-foreground"
        />
        <Select value={cardTypeFilter} onValueChange={setCardTypeFilter}>
          <SelectTrigger className="h-11 rounded-none border-border bg-card text-sm text-foreground">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-border bg-card text-foreground">
            <SelectItem value="all">Todos los tipos</SelectItem>
            {CARD_TYPES.map((item) => (
              <SelectItem key={item} value={item}>
                {item === "credit" ? "Crédito" : "Débito"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-11 rounded-none border-border bg-card text-sm text-foreground">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-border bg-card text-foreground">
            <SelectItem value="all">Todas las categorías</SelectItem>
            {CARD_CATEGORIES.map((item) => (
              <SelectItem key={item} value={item}>
                {categoryLabels[item]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={bankFilter} onValueChange={setBankFilter}>
          <SelectTrigger className="h-11 rounded-none border-border bg-card text-sm text-foreground">
            <SelectValue placeholder="Banco" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-border bg-card text-foreground">
            <SelectItem value="all">Todos los bancos</SelectItem>
            {banks.map((bank) => (
              <SelectItem key={bank.id} value={bank.id}>
                {bank.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? <LoadingGrid /> : <div className="grid gap-4 lg:grid-cols-3">{filteredCards.map((card) => <CreditCardCard key={card.id} card={card} />)}</div>}
      {!loading && !filteredCards.length ? (
        <div className="surface p-8 text-sm text-muted-foreground">No encontramos tarjetas con esos filtros.</div>
      ) : null}
    </div>
  );
}
