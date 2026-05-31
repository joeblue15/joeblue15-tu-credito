"use client";

import { useEffect, useMemo, useState } from "react";

import { fetchBanks, fetchCreditCards } from "@/lib/firestore";
import { banks as mockBanks, creditCards as mockCards } from "@/lib/mock-data";
import { attachBank } from "@/lib/format";
import type { Bank, CreditCard, CreditCardWithBank } from "@/lib/types";

type CatalogState = {
  banks: Bank[];
  cards: CreditCard[];
  cardsWithBanks: CreditCardWithBank[];
  loading: boolean;
  refresh: () => Promise<void>;
  setBanks: React.Dispatch<React.SetStateAction<Bank[]>>;
  setCards: React.Dispatch<React.SetStateAction<CreditCard[]>>;
};

export function useCatalogData(): CatalogState {
  const [banks, setBanks] = useState<Bank[]>(mockBanks);
  const [cards, setCards] = useState<CreditCard[]>(mockCards);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const [nextBanks, nextCards] = await Promise.all([fetchBanks(), fetchCreditCards()]);
    setBanks(nextBanks);
    setCards(nextCards);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const cardsWithBanks = useMemo(() => attachBank(cards, banks), [banks, cards]);

  return {
    banks,
    cards,
    cardsWithBanks,
    loading,
    refresh,
    setBanks,
    setCards,
  };
}
