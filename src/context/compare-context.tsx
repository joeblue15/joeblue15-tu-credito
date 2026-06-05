"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CompareContextValue = {
  selectedSlugs: string[];
  toggleCard: (slug: string) => void;
  clearCompare: () => void;
  isSelected: (slug: string) => boolean;
};

const CompareContext = createContext<CompareContextValue | null>(null);
const STORAGE_KEY = "tutarjetard-compare";

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSelectedSlugs(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSlugs));
  }, [selectedSlugs]);

  const value = useMemo<CompareContextValue>(
    () => ({
      selectedSlugs,
      toggleCard: (slug) => {
        setSelectedSlugs((current) => {
          if (current.includes(slug)) {
            return current.filter((item) => item !== slug);
          }

          if (current.length >= 4) {
            return current;
          }

          return [...current, slug];
        });
      },
      clearCompare: () => setSelectedSlugs([]),
      isSelected: (slug) => selectedSlugs.includes(slug),
    }),
    [selectedSlugs]
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error("useCompare must be used inside CompareProvider");
  }

  return context;
}
