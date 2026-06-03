"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-context";
import { saveBank, saveCreditCard } from "@/lib/firestore";
import type { Bank, CreditCard } from "@/lib/types";
import { slugify } from "@/lib/format";

export default function AdminImportPage() {
  const { user, isAuthorizedAdmin, loginWithGoogle } = useAuth();
  const [json, setJson] = useState("");
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center">
        <p className="text-sm text-muted-foreground">Acceso administrativo requerido.</p>
        <Button onClick={() => loginWithGoogle()} className="mt-4">Entrar con Google</Button>
      </div>
    );
  }

  async function handleImportFromUrl(url: string) {
    try {
      setImporting(true);
      setMessage("Descargando dataset curado...");
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("No se pudo descargar el dataset");
      const data = await res.json();
      setJson(JSON.stringify(data));
      await handleImport();
    } catch (e) {
      setMessage("Error al importar desde URL.");
    } finally {
      setImporting(false);
    }
  }

  async function handleImportFromModule() {
    try {
      setImporting(true);
      setMessage("Cargando dataset interno...");
      const mod = await import("@/lib/datasets/popular-bhd");
      const data = (mod as any).default;
      setJson(JSON.stringify(data));
      await handleImport();
    } catch (e) {
      setMessage("Error al importar dataset interno.");
    } finally {
      setImporting(false);
    }
  }

  const search = useSearchParams();
  useEffect(() => {
    const auto = search?.get("auto");
    if (auto === "curated" && isAuthorizedAdmin) {
      // Auto-importa el dataset curado si el admin abre esta URL con ?auto=curated
      handleImportFromUrl("/datasets/curated.json");
    } else if (auto === "internal" && isAuthorizedAdmin) {
      // Auto-importa usando el dataset interno del repo: ?auto=internal
      handleImportFromModule();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, isAuthorizedAdmin]);
  if (!isAuthorizedAdmin) {
    return <div className="mx-auto max-w-2xl p-6 text-center text-sm text-red-500">Tu usuario no tiene permisos de administrador.</div>;
  }

  async function handleImport() {
    setImporting(true);
    setMessage(null);
    try {
      const safeParse = (raw: string) => { try { return JSON.parse(raw); } catch { return null; } };
      const parseLabeledArrays = (raw: string) => {
        const map = {} as Record<string, any[]>;
        const regex = /(^|\n)\s*([A-Za-z0-9_-]{2,})\s*\n\s*(\[([\s\S]*?)\])/g;
        let m: RegExpExecArray | null;
        while ((m = regex.exec(raw)) !== null) {
          const label = m[2].toLowerCase();
          const arrayText = m[3];
          const arr = safeParse(arrayText);
          if (Array.isArray(arr)) map[label] = arr;
        }
        return Object.keys(map).length ? map : null;
      };

      const parsed = safeParse(json);
      let importedBanks: Bank[] = [];
      let importedCards: CreditCard[] = [];

      if (parsed && (parsed.banks || parsed.Banks || parsed.cards || parsed.credit_cards)) {
        importedBanks = (parsed.banks || parsed.Banks || []) as Bank[];
        importedCards = (parsed.cards || parsed.credit_cards || []) as CreditCard[];
      } else {
        const grouped: any = parseLabeledArrays(json) || parsed;
        if (grouped && typeof grouped === "object") {
          const all: any[] = [];
          for (const [key, arr] of Object.entries(grouped)) {
            if (Array.isArray(arr)) {
              for (const item of arr) all.push({ ...item, bankSlug: (item as any).bankSlug || String(key).toLowerCase() });
            }
          }

          const slugs = Array.from(new Set(all.map((c) => String((c as any).bankSlug || "").toLowerCase()).filter(Boolean)));
          const BANK_NAMES: Record<string, string> = {
            popular: "Banco Popular Dominicano",
            bhd: "BHD León",
          };
          importedBanks = slugs.map((slug) => ({
            id: slug,
            name: BANK_NAMES[slug] || slug.toUpperCase(),
            slug,
            logoUrl: "/assets/placeholder.svg",
            description: BANK_NAMES[slug] ? `Entidad bancaria ${BANK_NAMES[slug]}` : `Entidad bancaria ${slug.toUpperCase()}`,
            featured: false,
          }));

          const mapApproval = (v?: string): CreditCard["details"]["approvalLevel"] => {
            const x = (v || "").toLowerCase().replace(/\s|-/g, "");
            if (x.includes("alta") || x === "alto") return "alto";
            if (x.includes("muybaja") || x === "baja") return "bajo";
            if (x.includes("mediabaja") || x.includes("media")) return "medio";
            return "medio";
          };

          const mapCurrency = (v?: string): CreditCard["details"]["currency"] => {
            const x = (v || "").toUpperCase();
            if (x.includes("USD") || x.includes("US$")) return "USD";
            return "DOP";
          };

          const mapCategory = (v?: string): CreditCard["category"] => {
            const x = (v || "").toLowerCase();
            if (x.includes("cash")) return "cashback";
            if (x.includes("viaj")) return "viajes";
            if (x.includes("prem")) return "premium";
            if (x.includes("negoc")) return "negocios";
            return "clásica";
          };

          const ensureArray = (val: any) => Array.isArray(val) ? val.map((it) => (typeof it === "string" ? it : (it?.text ?? ""))).filter((s) => s && typeof s === "string") : [];
          const now = new Date().toISOString();

          importedCards = all.map((item) => {
            const name = (item as any).name ?? "Tarjeta";
            const slug = (item as any).slug || slugify(name);
            const bankSlug = String((item as any).bankSlug || "").toLowerCase();
            const details: CreditCard["details"] = {
              annualFee: String((item as any).annualFee ?? ""),
              minIncome: String((item as any).incomeMin ?? ""),
              currency: mapCurrency((item as any).currency),
              approvalLevel: mapApproval((item as any).approval),
              highlight: (item as any).highlight ?? "",
              idealProfile: (item as any).idealFor ?? "",
              seoDescription: (item as any).seoDescription ?? "",
            };

            const card: CreditCard = {
              id: String((item as any).id || crypto.randomUUID()),
              bankId: bankSlug,
              name,
              slug,
              category: mapCategory((item as any).type),
              imageUrl: String((item as any).logo || "/assets/placeholder.svg"),
              description: (item as any).description || `<p>${(details as any).highlight}</p>`,
              benefits: ensureArray((item as any).benefits),
              requirements: ensureArray((item as any).requirements),
              details,
              featured: Boolean((item as any).featured) || false,
              active: (item as any).active !== false,
              visibility: ((item as any).visibility as any) === "featured" ? "featured" : "active",
              createdAt: now,
              updatedAt: now,
            } as CreditCard;
            return card;
          });
        }
      }

      for (const bank of importedBanks) await saveBank(bank);
      for (const card of importedCards) await saveCreditCard(card);

      setMessage(`Importación completada: ${importedBanks.length} bancos, ${importedCards.length} tarjetas`);
    } catch (e) {
      setMessage("Error: No se pudo importar el JSON. Revisa el formato.");
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Importar dataset (Popular + BHD)</h1>
      <p className="text-sm text-muted-foreground">Pega aquí el JSON (formato con secciones: popular [ ... ] y bhd [ ... ]). Solo administradores.</p>
      <Textarea value={json} onChange={(e) => setJson(e.target.value)} className="min-h-[360px]" />
      <div className="flex items-center gap-3">
        <Button onClick={handleImport} disabled={importing}>{importing ? "Importando..." : "Importar"}</Button>
        <Button variant="outline" onClick={() => handleImportFromUrl("/datasets/curated.json")} disabled={importing}>Usar dataset curado</Button>
        <Button variant="outline" onClick={handleImportFromModule} disabled={importing}>Usar dataset interno</Button>
        {message ? <span className="text-sm text-muted-foreground">{message}</span> : null}
      </div>
    </div>
  );
}
