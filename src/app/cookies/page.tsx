import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Información sobre el uso de cookies en TuTarjetaRD.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-[860px] px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-[34px] font-semibold text-foreground">Política de cookies</h1>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        Última actualización: Junio 2026
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">1. ¿Qué son las cookies?</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan para recordar tus preferencias y mejorar tu experiencia de navegación.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">2. Cookies que utilizamos</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        TuTarjetaRD utiliza los siguientes tipos de cookies:
      </p>

      <h3 className="mt-6 text-lg font-semibold text-foreground">Cookies esenciales</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        Estas cookies son necesarias para el funcionamiento básico del sitio:
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li>Preferencias de tema (claro/oscuro)</li>
        <li>Tarjetas guardadas en favoritos</li>
        <li>Tarjetas seleccionadas para comparación</li>
        <li>Consentimiento de cookies</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold text-foreground">Cookies analíticas</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        Utilizamos Google Analytics para entender cómo usas el sitio:
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li>Número de visitantes</li>
        <li>Páginas más visitadas</li>
        <li>Tiempo en el sitio</li>
        <li>Dispositivos utilizados</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold text-foreground">Cookies de publicidad</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        Utilizamos Google AdSense para mostrar anuncios relevantes:
      </p>
      <ul className="mt-2 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li>Anuncios personalizados basados en tus intereses</li>
        <li>Medición de efectividad de anuncios</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-foreground">3. Terceros que utilizan cookies</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Compartimos información con los siguientes servicios que pueden utilizar cookies:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li><strong>Google Analytics:</strong> Para análisis de tráfico</li>
        <li><strong>Google AdSense:</strong> Para publicidad personalizada</li>
        <li><strong>Google Firebase:</strong> Para autenticación (opcional)</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-foreground">4. Gestión de cookies</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Puedes gestionar tus preferencias de cookies de las siguientes maneras:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li>A través del banner de cookies al visitar el sitio por primera vez</li>
        <li>Desde la configuración de tu navegador</li>
        <li>Desactivando la personalización de anuncios de Google</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold text-foreground">Cómo desactivar cookies en tu navegador</h3>
      <ul className="mt-2 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
        <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos de sitios</li>
        <li><strong>Safari:</strong> Preferencias → Privacidad → Bloquear cookies</li>
        <li><strong>Edge:</strong> Configuración → Cookies y permisos de sitio</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-foreground">5. Desactivar personalización de anuncios de Google</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Para desactivar la personalización de anuncios de Google, visita:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Configuración de anuncios de Google</a></li>
        <li><a href="https://www.google.com/ads/preferences" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Preferencias de anuncios de Google</a></li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-foreground">6. Duración de las cookies</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Las cookies de TuTarjetaRD tienen las siguientes duraciones:
      </p>
      <ul className="mt-3 ml-6 list-disc space-y-2 text-sm leading-7 text-muted-foreground">
        <li>Cookies de sesión: Se eliminan al cerrar el navegador</li>
        <li>Cookies persistentes: Permanecen hasta 2 años</li>
        <li>Cookies de consentimiento: Permanecen hasta 1 año</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold text-foreground">7. Actualizaciones a esta política</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Podemos actualizar esta política de cookies periódicamente. Te notificaremos de cambios significativos publicando la nueva política en este sitio y actualizando la fecha de "Última actualización".
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">8. Contacto</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Para preguntas sobre esta política de cookies, contáctanos a: <a href="mailto:contacto@tutarjetard.com" className="text-primary hover:underline">contacto@tutarjetard.com</a>
      </p>
    </div>
  );
}
