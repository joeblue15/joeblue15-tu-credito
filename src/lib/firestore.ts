import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { banks as mockBanks, creditCards as mockCards } from "@/lib/mock-data";
import type { Bank, CreditCard } from "@/lib/types";

const banksCollection = collection(db, "banks");
const cardsCollection = collection(db, "credit_cards");

export async function fetchBanks(): Promise<Bank[]> {
  try {
    const snapshot = await getDocs(banksCollection);
    if (snapshot.empty) {
      return mockBanks;
    }

    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as Bank[];
  } catch {
    return mockBanks;
  }
}

export async function fetchCreditCards(): Promise<CreditCard[]> {
  try {
    const snapshot = await getDocs(cardsCollection);
    if (snapshot.empty) {
      return mockCards;
    }

    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as CreditCard[];
  } catch {
    return mockCards;
  }
}

export async function saveBank(bank: Bank) {
  await setDoc(doc(db, "banks", bank.id), bank, { merge: true });
}

export async function deleteBank(id: string) {
  await deleteDoc(doc(db, "banks", id));
}

export async function saveCreditCard(card: CreditCard) {
  await setDoc(doc(db, "credit_cards", card.id), card, { merge: true });
}

export async function deleteCreditCard(id: string) {
  await deleteDoc(doc(db, "credit_cards", id));
}
