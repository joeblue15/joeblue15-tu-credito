"use client";

import { X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCompare } from "@/context/compare-context";
import { useIsMobile } from "@/hooks/use-mobile";

export function CompareBar() {
  const { selectedSlugs, clearCompare } = useCompare();
  const isMobile = useIsMobile();

  if (selectedSlugs.length < 2) return null;

  if (isMobile) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <Link href="/comparar">
          <Button className="rounded-full bg-foreground px-4 py-2 text-background shadow-lg">
            <span className="mr-2">{selectedSlugs.length}</span>
            Comparar
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background px-5 py-3 sm:px-8">
      <div className="mx-auto flex max-w-[1220px] items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {selectedSlugs.length} tarjeta{selectedSlugs.length !== 1 ? "s" : ""} seleccionada{selectedSlugs.length !== 1 ? "s" : ""}
          </span>
          <Link href="/comparar">
            <Button className="rounded-none bg-foreground px-5 text-background hover:bg-foreground/90">
              Empezar a comparar
            </Button>
          </Link>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={clearCompare}
          className="rounded-full text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
}
