"use client";

import { useMemo } from "react";

import { CreditCardCard } from "@/components/credit-card-card";
import { LoadingGrid } from "@/components/loading-grid";
import { useCatalogData } from "@/hooks/use-catalog-data";
import { useFavorites } from "@/context/favorites-context";

export default function FavoritesPage() {
  const { cardsWithBanks, loading } = useCatalogData();
  const { favorites } = useFavorites();

  const favoriteCards = useMemo(() => {
    return cardsWithBanks.filter((card) => favorites.has(card.slug));
  }, [cardsWithBanks, favorites]);

  return (
    <div className="mx-auto max-w-[1220px] px-5 py-12 sm:px-8 sm:py-16">
      <h1 className="text-[42px] font-semibold text-foreground sm:text-[54px]">Mis Favoritos</h1>
      <p className="mt-4 text-[15px] text-muted-foreground">Tarjetas que has guardado para comparar más tarde.</p>
      <div className="mt-8">
        {loading ? (
          <LoadingGrid />
        ) : favoriteCards.length === 0 ? (
          <p className="text-center text-muted-foreground">No tienes tarjetas guardadas aún.</p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {favoriteCards.map((card) => (
              <CreditCardCard key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
