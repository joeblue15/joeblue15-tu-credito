import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de uso del sitio TuCredito.",
};

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-[860px] px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-[34px] font-semibold text-foreground">Términos y condiciones</h1>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        Al usar TuCredito aceptas estos términos. El contenido se ofrece con fines informativos; no constituye asesoría financiera.
        Podemos actualizar estos términos sin previo aviso. El uso continuado del sitio implica tu aceptación.
      </p>
    </div>
  );
}
