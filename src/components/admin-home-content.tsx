"use client";

import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useHomeContent } from "@/hooks/use-home-content";
import { saveHomeContent } from "@/lib/firestore";
import type { HomeContent } from "@/lib/types";

export function AdminHomeContent() {
  const { content, setContent, loading } = useHomeContent();
  const [draft, setDraft] = useState<HomeContent>(content);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  const updateSection = (index: number, field: keyof HomeContent["sections"][number], value: string) => {
    setDraft((current) => ({
      ...current,
      sections: current.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [field]: value } : section
      ),
    }));
  };

  const handleSave = async () => {
    await saveHomeContent(draft);
    setContent(draft);
    toast.success("Secciones del Home guardadas");
  };

  if (loading) {
    return <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 text-slate-300">Cargando contenido del Home...</div>;
  }

  return (
    <div className="space-y-6 rounded-[32px] border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Contenido del Home</h2>
          <p className="text-sm text-slate-400">Aquí puedes editar las dos secciones nuevas que aparecen debajo del bloque destacado.</p>
        </div>
        <Button onClick={handleSave} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="size-4" />
          Guardar secciones
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {draft.sections.map((section, index) => (
          <div key={section.id} className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary">Sección {index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Editable desde admin</h3>
            </div>
            <Field label="Eyebrow">
              <Input value={section.eyebrow} onChange={(event) => updateSection(index, "eyebrow", event.target.value)} className="rounded-[18px] border-white/10 bg-white/5 text-white" />
            </Field>
            <Field label="Título">
              <Input value={section.title} onChange={(event) => updateSection(index, "title", event.target.value)} className="rounded-[18px] border-white/10 bg-white/5 text-white" />
            </Field>
            <Field label="Descripción">
              <Textarea value={section.description} onChange={(event) => updateSection(index, "description", event.target.value)} className="min-h-32 rounded-[22px] border-white/10 bg-white/5 text-white" />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Texto del botón">
                <Input value={section.ctaLabel} onChange={(event) => updateSection(index, "ctaLabel", event.target.value)} className="rounded-[18px] border-white/10 bg-white/5 text-white" />
              </Field>
              <Field label="URL del botón">
                <Input value={section.ctaHref} onChange={(event) => updateSection(index, "ctaHref", event.target.value)} className="rounded-[18px] border-white/10 bg-white/5 text-white" />
              </Field>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      {children}
    </label>
  );
}
