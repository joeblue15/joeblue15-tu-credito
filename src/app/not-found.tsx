import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-primary">404</p>
      <h1 className="mt-4 text-5xl font-semibold text-foreground">Página no encontrada</h1>
      <p className="mt-4 text-sm leading-8 text-muted-foreground">La ruta que buscas no está disponible dentro del ecosistema de TuTarjetaRD.</p>
      <Button asChild className="mt-8 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
