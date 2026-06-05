import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo recopilamos, usamos y protegemos tus datos en TuTarjetaRD.",
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-[860px] px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-[34px] font-semibold text-foreground">Política de privacidad</h1>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        Última actualización: Junio 2026
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">1. Información que recopilamos</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        TuTarjetaRD recopila información limitada para mejorar tu experiencia. Esto puede incluir:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li>Datos de navegación anónimos a través de Google Analytics</li>
        <li>Preferencias de tema (claro/oscuro) almacenadas localmente</li>
        <li>Tarjetas guardadas en favoritos (almacenadas localmente)</li>
        <li>Tarjetas seleccionadas para comparación (almacenadas localmente)</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-foreground">2. Cookies</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Utilizamos cookies y tecnologías similares para:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li>Analizar el tráfico del sitio con Google Analytics</li>
        <li>Mostrar anuncios relevantes a través de Google AdSense</li>
        <li>Recordar tus preferencias de tema</li>
        <li>Mantener tu selección de tarjetas en favoritos y comparación</li>
      </ul>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Puedes gestionar tus preferencias de cookies desde la configuración de tu navegador.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">3. Publicidad (Google AdSense)</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Este sitio utiliza Google AdSense para mostrar anuncios. Google puede usar cookies para publicar anuncios basados en tus visitas previas a este sitio web u otros sitios web.
      </p>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Puedes inhabilitar la personalización de anuncios visitando la <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">configuración de anuncios de Google</a>.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">4. Terceros</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Compartimos información con los siguientes terceros de servicio:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li><strong>Google Analytics:</strong> Para análisis de tráfico del sitio</li>
        <li><strong>Google AdSense:</strong> Para mostrar anuncios personalizados</li>
        <li><strong>Google Firebase:</strong> Para autenticación de usuarios (opcional)</li>
      </ul>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Estos servicios tienen sus propias políticas de privacidad que recomendamos revisar:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Política de privacidad de Google</a></li>
        <li><a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Política de privacidad de Firebase</a></li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-foreground">5. Tus derechos</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Tienes derecho a:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li>Acceder a tus datos personales que recopilamos</li>
        <li>Solicitar la eliminación de tus datos</li>
        <li>Optar por no recibir cookies (desde tu navegador)</li>
        <li>Desactivar la personalización de anuncios de Google</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-foreground">6. Seguridad</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Implementamos medidas de seguridad razonables para proteger tu información. Sin embargo, ninguna transmisión por Internet es 100% segura.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">7. Cambios a esta política</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Podemos actualizar esta política de privacidad periódicamente. Te notificaremos de cambios significativos publicando la nueva política en este sitio.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">8. Contacto</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Para preguntas sobre esta política de privacidad o para ejercer tus derechos, contáctanos a través de: <a href="mailto:contacto@tutarjetard.com" className="text-primary hover:underline">contacto@tutarjetard.com</a>
      </p>
    </div>
  );
}
