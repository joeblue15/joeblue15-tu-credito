"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileJson, Landmark, LogIn, Plus, ShieldAlert, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { AdminHomeContent } from "@/components/admin-home-content";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-context";
import { useCatalogData } from "@/hooks/use-catalog-data";
import { deleteBank, deleteCreditCard, saveBank, saveCreditCard } from "@/lib/firestore";
import { banks as demoBanks, creditCards as demoCards } from "@/lib/mock-data";
import { slugify } from "@/lib/format";
import { CARD_CATEGORIES } from "@/lib/types";
import type { Bank, CreditCard } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";

const bankSchema = z.object({
  id: z.string().min(2),
  name: z.string().min(2),
  slug: z.string().min(2),
  logoUrl: z.string().url(),
  description: z.string().min(10),
  featured: z.boolean(),
});

const cardSchema = z.object({
  id: z.string().min(2),
  name: z.string().min(2),
  slug: z.string().min(2),
  bankId: z.string().min(1),
  category: z.enum(CARD_CATEGORIES),
  imageUrl: z.string().url(),
  description: z.string().min(20),
  benefits: z.array(z.object({ value: z.string().min(1) })).min(1),
  requirements: z.array(z.object({ value: z.string().min(1) })).min(1),
  annualFee: z.string().min(1),
  minIncome: z.string().min(1),
  currency: z.enum(["DOP", "USD"]),
  approvalLevel: z.enum(["bajo", "medio", "alto"]),
  highlight: z.string().min(10),
  idealProfile: z.string().min(10),
  seoDescription: z.string().min(10),
  featured: z.boolean(),
  active: z.boolean(),
  visibility: z.enum(["draft", "active", "featured"]),
});

type BankFormValues = z.infer<typeof bankSchema>;
type CardFormValues = z.infer<typeof cardSchema>;

function createEmptyBank(): BankFormValues {
  return {
    id: crypto.randomUUID(),
    name: "",
    slug: "",
    logoUrl: "/assets/placeholder.svg",
    description: "",
    featured: false,
  };
}

function createEmptyCard(bankId?: string): CardFormValues {
  return {
    id: crypto.randomUUID(),
    name: "",
    slug: "",
    bankId: bankId ?? "",
    category: "cashback",
    imageUrl: "/assets/placeholder.svg",
    description: "<p>Describe aquí la tarjeta con un tono claro y directo.</p>",
    benefits: [{ value: "" }],
    requirements: [{ value: "" }],
    annualFee: "",
    minIncome: "",
    currency: "DOP",
    approvalLevel: "medio",
    highlight: "",
    idealProfile: "",
    seoDescription: "",
    featured: false,
    active: true,
    visibility: "draft",
  };
}

export function AdminDashboard() {
  const isMobile = useIsMobile();
  const { user, loading, isAuthorizedAdmin, loginWithGoogle, logout } = useAuth();
  const { banks, cards, refresh, setBanks, setCards } = useCatalogData();
  const [bankEditorId, setBankEditorId] = useState<string | null>(null);
  const [cardEditorId, setCardEditorId] = useState<string | null>(null);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [jsonValue, setJsonValue] = useState("");

  const bankForm = useForm<BankFormValues>({
    resolver: zodResolver(bankSchema),
    defaultValues: createEmptyBank(),
  });

  const cardForm = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: createEmptyCard(banks[0]?.id),
  });

  const benefitFields = useFieldArray({ control: cardForm.control, name: "benefits" });
  const requirementFields = useFieldArray({ control: cardForm.control, name: "requirements" });

  const metrics = useMemo(
    () => ({
      active: cards.filter((card) => card.visibility !== "draft" && card.active).length,
      featured: cards.filter((card) => card.featured).length,
      drafts: cards.filter((card) => card.visibility === "draft").length,
    }),
    [cards]
  );

  async function importDemoData() {
    try {
      // Importar bancos
      for (const bank of demoBanks) {
        await saveBank(bank);
      }
      // Importar tarjetas
      for (const card of demoCards) {
        await saveCreditCard(card);
      }
      setBanks(demoBanks);
      setCards(demoCards);
      toast.success("Datos demo importados");
    } catch (e) {
      toast.error("No se pudo importar la data demo");
    }
  }

  useEffect(() => {
    if (!bankEditorId) {
      bankForm.reset(createEmptyBank());
      return;
    }

    const selected = banks.find((item) => item.id === bankEditorId);
    if (selected) {
      bankForm.reset(selected);
    }
  }, [bankEditorId, banks]);

  useEffect(() => {
    if (!cardEditorId) {
      const empty = createEmptyCard(banks[0]?.id);
      cardForm.reset(empty);
      setJsonValue(JSON.stringify(empty, null, 2));
      return;
    }

    const selected = cards.find((item) => item.id === cardEditorId);
    if (selected) {
      const values: CardFormValues = {
        id: selected.id,
        name: selected.name,
        slug: selected.slug,
        bankId: selected.bankId,
        category: selected.category,
        imageUrl: selected.imageUrl,
        description: selected.description,
        benefits: selected.benefits.map((value) => ({ value })),
        requirements: selected.requirements.map((value) => ({ value })),
        annualFee: selected.details.annualFee,
        minIncome: selected.details.minIncome,
        currency: selected.details.currency,
        approvalLevel: selected.details.approvalLevel,
        highlight: selected.details.highlight,
        idealProfile: selected.details.idealProfile,
        seoDescription: selected.details.seoDescription,
        featured: selected.featured,
        active: selected.active,
        visibility: selected.visibility,
      };
      cardForm.reset(values);
      setJsonValue(JSON.stringify(values, null, 2));
    }
  }, [banks, cardEditorId, cards]);

  useEffect(() => {
    const subscription = cardForm.watch((value) => {
      setJsonValue(JSON.stringify(value, null, 2));
    });

    return () => subscription.unsubscribe();
  }, [cardForm]);

  const saveBankHandler = bankForm.handleSubmit(async (values) => {
    const payload: Bank = { ...values, slug: values.slug || slugify(values.name) };
    await saveBank(payload);
    setBanks((current) => {
      const exists = current.some((item) => item.id === payload.id);
      return exists ? current.map((item) => (item.id === payload.id ? payload : item)) : [payload, ...current];
    });
    setBankEditorId(payload.id);
    toast.success("Banco guardado");
  });

  const saveCardHandler = cardForm.handleSubmit(async (values) => {
    const payload: CreditCard = {
      id: values.id,
      bankId: values.bankId,
      name: values.name,
      slug: values.slug || slugify(values.name),
      category: values.category,
      imageUrl: values.imageUrl,
      description: values.description,
      benefits: values.benefits.map((item) => item.value),
      requirements: values.requirements.map((item) => item.value),
      details: {
        annualFee: values.annualFee,
        minIncome: values.minIncome,
        currency: values.currency,
        approvalLevel: values.approvalLevel,
        highlight: values.highlight,
        idealProfile: values.idealProfile,
        seoDescription: values.seoDescription,
      },
      featured: values.featured,
      active: values.active,
      visibility: values.visibility,
      createdAt: cards.find((item) => item.id === values.id)?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveCreditCard(payload);
    setCards((current) => {
      const exists = current.some((item) => item.id === payload.id);
      return exists ? current.map((item) => (item.id === payload.id ? payload : item)) : [payload, ...current];
    });
    setCardEditorId(payload.id);
    toast.success("Tarjeta guardada");
  });

  const applyJsonMode = () => {
    try {
      const parsed = cardSchema.parse(JSON.parse(jsonValue));
      cardForm.reset(parsed);
      toast.success("JSON aplicado al formulario");
    } catch {
      toast.error("El JSON no es válido para la tarjeta");
    }
  };

  if (isMobile) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-center text-slate-300">
        <ShieldAlert className="mx-auto mb-4 size-10 text-primary" />
        <h1 className="text-2xl font-semibold text-white">Admin solo en desktop</h1>
        <p className="mt-3 text-sm leading-7 text-slate-400">El panel administrativo de TuCredito está bloqueado en móviles para mantener una gestión cómoda y segura.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-slate-300">Verificando acceso...</div>;
  }

  if (!user) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-center">
        <LogIn className="mx-auto mb-4 size-10 text-primary" />
        <h1 className="text-3xl font-semibold text-white">Acceso administrativo</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400">Ingresa con Google para administrar bancos, tarjetas, destacados, estados y contenido editorial.</p>
        <Button onClick={() => loginWithGoogle()} className="mt-6 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
          Entrar con Google
        </Button>
      </div>
    );
  }

  if (!isAuthorizedAdmin) {
    return (
      <div className="rounded-[32px] border border-red-500/20 bg-red-500/5 p-8 text-center">
        <ShieldAlert className="mx-auto mb-4 size-10 text-red-300" />
        <h1 className="text-3xl font-semibold text-white">Usuario sin autorización</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-300">Tu cuenta está autenticada pero no pertenece al allowlist de administradores. Agrega tu correo en <code className="rounded bg-white/10 px-2 py-1">ADMIN_ALLOWLIST</code> para habilitar este panel.</p>
        <Button variant="outline" onClick={() => logout()} className="mt-6 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10">
          Cerrar sesión
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-primary">Panel Admin</p>
              <h1 className="text-3xl font-semibold text-white">Control total de TuCredito</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">Gestiona bancos, tarjetas, estado visible, featured, contenido, SEO y estructura avanzada del catálogo.</p>
            </div>
            <Button variant="outline" onClick={() => logout()} className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10">Salir</Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Activas", value: metrics.active },
            { label: "Featured", value: metrics.featured },
            { label: "Draft", value: metrics.drafts },
          ].map((item) => (
            <div key={item.label} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <Tabs defaultValue="cards" className="space-y-6">
        <TabsList className="rounded-full border border-white/10 bg-white/5 p-1">
          <TabsTrigger value="cards" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Tarjetas</TabsTrigger>
          <TabsTrigger value="banks" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Bancos</TabsTrigger>
          <TabsTrigger value="home" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Home</TabsTrigger>
          <TabsTrigger value="overview" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Resumen</TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4 rounded-[32px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Listado de tarjetas</h2>
                <p className="text-sm text-slate-400">CRUD completo, estado visible y acciones rápidas.</p>
              </div>
              <Button onClick={() => setCardEditorId(null)} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="size-4" /> Nueva
              </Button>
            </div>
            <div className="space-y-3">
              {cards.map((card) => (
                <div key={card.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{card.name}</h3>
                      <p className="text-sm text-slate-400">{banks.find((bank) => bank.id === card.bankId)?.name} · {card.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setCardEditorId(card.id)} className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10">Editar</Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          await deleteCreditCard(card.id);
                          setCards((current) => current.filter((item) => item.id !== card.id));
                          toast.success("Tarjeta eliminada");
                        }}
                        className="rounded-full border-red-500/20 bg-red-500/10 text-red-200 hover:bg-red-500/15"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      { label: card.active ? "Activa" : "Inactiva", field: "active", value: !card.active },
                      { label: card.featured ? "Featured" : "No featured", field: "featured", value: !card.featured },
                    ].map((action) => (
                      <button
                        key={action.label}
                        type="button"
                        onClick={async () => {
                          const next = { ...card, [action.field]: action.value, updatedAt: new Date().toISOString() } as CreditCard;
                          await saveCreditCard(next);
                          setCards((current) => current.map((item) => (item.id === card.id ? next : item)));
                          toast.success("Estado actualizado");
                        }}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-medium text-slate-200"
                      >
                        {action.label}
                      </button>
                    ))}
                    <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">{card.visibility}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Editor de tarjeta</h2>
                <p className="text-sm text-slate-400">Formulario premium + modo JSON alternable.</p>
              </div>
              <Button variant="outline" onClick={() => setAdvancedMode((value) => !value)} className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10">
                <FileJson className="size-4" /> {advancedMode ? "Modo formulario" : "Modo JSON"}
              </Button>
            </div>

            {advancedMode ? (
              <div className="space-y-4">
                <Textarea value={jsonValue} onChange={(event) => setJsonValue(event.target.value)} className="min-h-[640px] rounded-[28px] border-white/10 bg-[#0D1020] font-mono text-xs text-slate-200" />
                <Button onClick={applyJsonMode} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">Aplicar JSON</Button>
              </div>
            ) : (
              <form onSubmit={saveCardHandler} className="grid gap-4 xl:grid-cols-2">
                <InputField label="Nombre" value={cardForm.watch("name")} onChange={(value) => { cardForm.setValue("name", value); cardForm.setValue("slug", slugify(value)); }} error={cardForm.formState.errors.name?.message} />
                <InputField label="Slug" value={cardForm.watch("slug")} onChange={(value) => cardForm.setValue("slug", slugify(value))} error={cardForm.formState.errors.slug?.message} />
                <SelectField label="Banco" value={cardForm.watch("bankId")} onChange={(value) => cardForm.setValue("bankId", value)} options={banks.map((bank) => ({ label: bank.name, value: bank.id }))} />
                <SelectField label="Categoría" value={cardForm.watch("category")} onChange={(value) => cardForm.setValue("category", value as CardFormValues["category"])} options={CARD_CATEGORIES.map((item) => ({ label: item, value: item }))} />
                <InputField label="Ingreso mínimo" value={cardForm.watch("minIncome")} onChange={(value) => cardForm.setValue("minIncome", value)} error={cardForm.formState.errors.minIncome?.message} />
                <InputField label="Anualidad" value={cardForm.watch("annualFee")} onChange={(value) => cardForm.setValue("annualFee", value)} error={cardForm.formState.errors.annualFee?.message} />
                <SelectField label="Moneda" value={cardForm.watch("currency")} onChange={(value) => cardForm.setValue("currency", value as CardFormValues["currency"])} options={[{ label: "DOP", value: "DOP" }, { label: "USD", value: "USD" }]} />
                <SelectField label="Aprobación" value={cardForm.watch("approvalLevel")} onChange={(value) => cardForm.setValue("approvalLevel", value as CardFormValues["approvalLevel"])} options={[{ label: "Bajo", value: "bajo" }, { label: "Medio", value: "medio" }, { label: "Alto", value: "alto" }]} />
                <InputField label="Texto destacado" value={cardForm.watch("highlight")} onChange={(value) => cardForm.setValue("highlight", value)} error={cardForm.formState.errors.highlight?.message} className="xl:col-span-2" />
                <InputField label="Logo / imagen URL" value={cardForm.watch("imageUrl")} onChange={(value) => cardForm.setValue("imageUrl", value)} error={cardForm.formState.errors.imageUrl?.message} className="xl:col-span-2" />
                <InputField label="Perfil ideal" value={cardForm.watch("idealProfile")} onChange={(value) => cardForm.setValue("idealProfile", value)} error={cardForm.formState.errors.idealProfile?.message} className="xl:col-span-2" />
                <InputField label="Descripción SEO" value={cardForm.watch("seoDescription")} onChange={(value) => cardForm.setValue("seoDescription", value)} error={cardForm.formState.errors.seoDescription?.message} className="xl:col-span-2" />
                <div className="space-y-2 xl:col-span-2">
                  <label className="text-sm font-medium text-slate-200">Descripción enriquecida</label>
                  <RichTextEditor value={cardForm.watch("description")} onChange={(value) => cardForm.setValue("description", value)} />
                </div>
                <DynamicList label="Beneficios" fields={benefitFields.fields} onAdd={() => benefitFields.append({ value: "" })} onRemove={(index) => benefitFields.remove(index)} render={(field, index) => (
                  <Input value={cardForm.watch(`benefits.${index}.value`)} onChange={(event) => cardForm.setValue(`benefits.${index}.value`, event.target.value)} className="rounded-[20px] border-white/10 bg-white/5 text-white" placeholder="Beneficio" />
                )} />
                <DynamicList label="Requisitos" fields={requirementFields.fields} onAdd={() => requirementFields.append({ value: "" })} onRemove={(index) => requirementFields.remove(index)} render={(field, index) => (
                  <Input value={cardForm.watch(`requirements.${index}.value`)} onChange={(event) => cardForm.setValue(`requirements.${index}.value`, event.target.value)} className="rounded-[20px] border-white/10 bg-white/5 text-white" placeholder="Requisito" />
                )} />
                <SelectField label="Visibilidad" value={cardForm.watch("visibility")} onChange={(value) => cardForm.setValue("visibility", value as CardFormValues["visibility"])} options={[{ label: "Draft", value: "draft" }, { label: "Active", value: "active" }, { label: "Featured", value: "featured" }]} />
                <div className="grid grid-cols-2 gap-3 self-end">
                  <ToggleField label="Activa" pressed={cardForm.watch("active")} onChange={(value) => cardForm.setValue("active", value)} />
                  <ToggleField label="Featured" pressed={cardForm.watch("featured")} onChange={(value) => cardForm.setValue("featured", value)} />
                </div>
                <div className="xl:col-span-2 flex justify-end">
                  <Button type="submit" className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">Guardar tarjeta</Button>
                </div>
              </form>
            )}
          </div>
        </TabsContent>

        <TabsContent value="banks" className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4 rounded-[32px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Bancos</h2>
                <p className="text-sm text-slate-400">Administra entidades y mueve tarjetas entre bancos.</p>
              </div>
              <Button onClick={() => setBankEditorId(null)} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="size-4" /> Nuevo
              </Button>
            </div>
            <div className="space-y-3">
              {banks.map((bank) => (
                <div key={bank.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{bank.name}</h3>
                      <p className="text-sm text-slate-400">{bank.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setBankEditorId(bank.id)} className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10">Editar</Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          await deleteBank(bank.id);
                          setBanks((current) => current.filter((item) => item.id !== bank.id));
                          toast.success("Banco eliminado");
                        }}
                        className="rounded-full border-red-500/20 bg-red-500/10 text-red-200 hover:bg-red-500/15"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-slate-500">{cards.filter((card) => card.bankId === bank.id).length} tarjetas asociadas</div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={saveBankHandler} className="space-y-4 rounded-[32px] border border-white/10 bg-white/[0.04] p-5">
            <div>
              <h2 className="text-xl font-semibold text-white">Editor de banco</h2>
              <p className="text-sm text-slate-400">Nombre, slug, branding y presencia destacada.</p>
            </div>
            <InputField label="Nombre" value={bankForm.watch("name")} onChange={(value) => { bankForm.setValue("name", value); bankForm.setValue("slug", slugify(value)); }} error={bankForm.formState.errors.name?.message} />
            <InputField label="Slug" value={bankForm.watch("slug")} onChange={(value) => bankForm.setValue("slug", slugify(value))} error={bankForm.formState.errors.slug?.message} />
            <InputField label="Logo URL" value={bankForm.watch("logoUrl")} onChange={(value) => bankForm.setValue("logoUrl", value)} error={bankForm.formState.errors.logoUrl?.message} />
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Descripción</label>
              <Textarea value={bankForm.watch("description")} onChange={(event) => bankForm.setValue("description", event.target.value)} className="min-h-32 rounded-[24px] border-white/10 bg-white/5 text-white" />
            </div>
            <ToggleField label="Banco featured" pressed={bankForm.watch("featured")} onChange={(value) => bankForm.setValue("featured", value)} />
            <div className="flex justify-end">
              <Button type="submit" className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">Guardar banco</Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="home">
          <AdminHomeContent />
        </TabsContent>

        <TabsContent value="overview" className="grid gap-6 xl:grid-cols-3">

          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6">
            <Landmark className="mb-4 size-8 text-primary" />
            <h3 className="text-xl font-semibold text-white">{banks.length} bancos</h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">Base estructural del catálogo financiero dominicano.</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6">
            <Sparkles className="mb-4 size-8 text-primary" />
            <h3 className="text-xl font-semibold text-white">{cards.length} tarjetas</h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">Cada tarjeta puede editarse desde formulario visual o JSON completo.</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6">
            <FileJson className="mb-4 size-8 text-primary" />
            <h3 className="text-xl font-semibold text-white">Contenido flexible</h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">Listas dinámicas, rich text, featured, visibilidad y control por banco.</p>
          </div>
          <div className="xl:col-span-3 rounded-[32px] border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">Sincronización</h3>
                <p className="text-sm text-slate-400">Refresca la data remota de Firestore cuando lo necesites.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => refresh()} className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10">Refrescar contenido</Button>
                <Button variant="outline" onClick={importDemoData} className="rounded-full border-primary/20 bg-primary/10 text-primary hover:bg-primary/15">Importar datos demo</Button>
              </div>
            </div>
            <p className="text-sm leading-7 text-slate-300">El frontend consume datos y el panel administra bancos y tarjetas mediante Firestore. Storage queda limitado a URLs externas en los formularios, como pediste.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InputField({ label, value, onChange, error, className }: { label: string; value: string; onChange: (value: string) => void; error?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-slate-200">{label}</label>
      <Input value={value} onChange={(event) => onChange(event.target.value)} className="rounded-[20px] border-white/10 bg-white/5 text-white placeholder:text-slate-500" />
      {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<{ label: string; value: string }> }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-200">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="rounded-[20px] border-white/10 bg-white/5 text-white">
          <SelectValue placeholder="Selecciona" />
        </SelectTrigger>
        <SelectContent className="border-white/10 bg-[#111322] text-white">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function ToggleField({ label, pressed, onChange }: { label: string; pressed: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!pressed)}
      className={`rounded-[20px] border px-4 py-3 text-sm font-medium transition ${pressed ? "border-primary/30 bg-primary/15 text-primary" : "border-white/10 bg-white/5 text-slate-200"}`}
    >
      {label}: {pressed ? "Sí" : "No"}
    </button>
  );
}

function DynamicList({ label, fields, onAdd, onRemove, render }: { label: string; fields: Array<{ id: string }>; onAdd: () => void; onRemove: (index: number) => void; render: (field: { id: string }, index: number) => React.ReactNode; }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-200">{label}</label>
        <Button type="button" variant="outline" size="sm" onClick={onAdd} className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10">
          <Plus className="size-4" />
          Agregar
        </Button>
      </div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <div className="flex-1">{render(field, index)}</div>
            {fields.length > 1 ? (
              <Button type="button" variant="outline" size="icon" onClick={() => onRemove(index)} className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10">
                <Trash2 className="size-4" />
              </Button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
