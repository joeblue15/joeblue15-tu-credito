"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "tutarjetard-cookie-consent";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    // Solo ocultar si aceptó. Si rechazó o no ha decidido, mostrar banner
    if (consent !== "accepted") {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setShowBanner(false);
    // Recargar página para cargar scripts de terceros
    window.location.reload();
  };

  const handleReject = () => {
    // No guardar rechazo permanente, solo temporal para esta sesión
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    setShowBanner(false);
    // No recargar, scripts de terceros no se cargarán
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background px-4 py-4 shadow-2xl sm:px-6">
      <div className="mx-auto flex max-w-[1220px] flex-col items-stretch gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-[70%]">
          TuTarjetaRD usa cookies para mejorar tu experiencia. Al aceptar, permites el uso de Google Analytics y Google AdSense. Si rechazas, el sitio funcionará sin cookies de terceros.
        </p>
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center justify-center gap-3 sm:justify-end">
            <Link href="/privacidad" className="text-xs text-muted-foreground hover:text-foreground">
              Privacidad
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground">
              Cookies
            </Link>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={handleReject}
              className="h-9 w-full rounded-none border-border bg-transparent text-foreground hover:bg-transparent hover:text-foreground sm:w-auto"
            >
              Rechazar
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="h-9 w-full rounded-none bg-foreground px-4 text-background hover:bg-foreground/90 sm:w-auto"
            >
              Aceptar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
