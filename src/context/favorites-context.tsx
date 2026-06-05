"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const LOCAL_STORAGE_KEY = "tutarjetard-favorites";

type FavoritesContextType = {
  favorites: Set<string>;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const isMountedRef = useRef(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (isMountedRef.current) {
          setFavorites(new Set(parsed));
        }
      }
    } catch (e) {
      console.error("Failed to load favorites:", e);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(next)));
      } catch (e) {
        console.error("Failed to save favorites:", e);
      }
      return next;
    });
  };

  const isFavorite = (slug: string) => favorites.has(slug);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
