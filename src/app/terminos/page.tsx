import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de uso del sitio TuTarjetaRD.",
};

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-[860px] px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-[34px] font-semibold text-foreground">Términos y condiciones</h1>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        Última actualización: Junio 2026
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">1. Aceptación de términos</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Al acceder y usar TuTarjetaRD, aceptas estos términos y condiciones. Si no estás de acuerdo con estos términos, por favor no uses este sitio web.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">2. Uso del sitio</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Este sitio se proporciona con fines informativos y educativos. El contenido sobre tarjetas de crédito, débito y productos financieros:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li>No constituye asesoría financiera profesional</li>
        <li>Debe ser verificado directamente con las instituciones financieras</li>
        <li>Puede estar desactualizado sin previo aviso</li>
        <li>No garantiza aprobación de ningún producto financiero</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-foreground">3. Exactitud de la información</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Nos esforzamos por mantener la información actualizada y precisa. Sin embargo:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li>No garantizamos la exactitud, integridad o actualidad de la información</li>
        <li>Las tasas, anualidades y beneficios pueden cambiar sin previo aviso</li>
        <li>Recomendamos verificar directamente con los bancos antes de tomar decisiones</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-foreground">4. Propiedad intelectual</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Todo el contenido de TuTarjetaRD, incluyendo pero no limitado a:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li>Textos, imágenes, logotipos y diseños</li>
        <li>Código fuente y software</li>
        <li>Base de datos de tarjetas y bancos</li>
      </ul>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Está protegido por derechos de autor y otras leyes de propiedad intelectual. No puedes reproducir, modificar o distribuir el contenido sin permiso expreso.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">5. Publicidad</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Este sitio puede mostrar anuncios a través de Google AdSense. Al usar el sitio, aceptas:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li>El uso de cookies para publicidad personalizada</li>
        <li>Que Google pueda recopilar datos sobre tu navegación</li>
        <li>Ver los términos de servicio de Google AdSense</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-foreground">6. Limitación de responsabilidad</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        TuTarjetaRD no será responsable por:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li>Daños directos o indirectos resultantes del uso del sitio</li>
        <li>Decisiones financieras tomadas basadas en la información del sitio</li>
        <li>Interrupciones del servicio o errores técnicos</li>
        <li>Contenido de sitios enlazados (enlaces externos)</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-foreground">7. Enlaces a terceros</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Este sitio puede contener enlaces a sitios web de bancos y otras instituciones financieras. No controlamos estos sitios y no somos responsables de su contenido o prácticas de privacidad.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">8. Modificaciones</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">9. Ley aplicable</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Estos términos se rigen por las leyes de la República Dominicana. Cualquier disputa se resolverá en los tribunales competentes de República Dominicana.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">10. Contacto</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Para preguntas sobre estos términos, contáctanos a: <a href="mailto:contacto@tutarjetard.com" className="text-primary hover:underline">contacto@tutarjetard.com</a>
      </p>
    </div>
  );
}
