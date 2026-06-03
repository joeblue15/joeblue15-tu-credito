import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo recopilamos, usamos y protegemos tus datos en TuCredito.",
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-[860px] px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-[34px] font-semibold text-foreground">Política de privacidad</h1>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        TuCredito respeta tu privacidad. Usamos cookies y servicios de terceros con fines analíticos y para mejorar tu experiencia.
        No vendemos tu información personal. Puedes contactarnos para ejercer tus derechos de acceso y eliminación de datos.
      </p>
      <h2 className="mt-10 text-xl font-semibold text-foreground">Publicidad</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Este sitio utiliza Google AdSense. Google puede usar cookies para publicar anuncios basados en tus visitas previas. Puedes
        inhabilitar la personalización de anuncios desde tu cuenta de Google.
      </p>
    </div>
  );
}
