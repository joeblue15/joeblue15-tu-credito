"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { fetchBanks, fetchCreditCards } from "@/lib/firestore";
import { db } from "@/lib/firebase";
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

export function useCatalogData(options?: { includeDrafts?: boolean }): CatalogState {
  const includeDrafts = Boolean(options?.includeDrafts);
  const [banks, setBanks] = useState<Bank[]>(mockBanks);
  const [cards, setCards] = useState<CreditCard[]>(mockCards);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    // Con listeners en tiempo real, refresh suele ser innecesario, pero mantenemos compatibilidad
    setLoading(true);
    const [nextBanks, nextCards] = await Promise.all([fetchBanks(), fetchCreditCards()]);
    setBanks(nextBanks);
    setCards(nextCards);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const banksRef = collection(db, "banks");
    const cardsRef = collection(db, "credit_cards");
    const listenRef = includeDrafts ? cardsRef : query(cardsRef, where("visibility", "in", ["active", "featured"]));

    const unsubBanks = onSnapshot(
      banksRef,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Bank[];
        setBanks(list.length ? list : mockBanks);
        setLoading(false);
      },
      () => {
        setBanks(mockBanks);
        setLoading(false);
      }
    );

    const unsubCards = onSnapshot(
      listenRef,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as CreditCard[];
        setCards(list.length ? list : mockCards);
      },
      () => {
        setCards(mockCards);
      }
    );

    return () => {
      unsubBanks();
      unsubCards();
    };
  }, [includeDrafts]);

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
