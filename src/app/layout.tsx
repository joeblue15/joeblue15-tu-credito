import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/components/providers";
import { SiteChrome } from "@/components/site-chrome";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tucredito.vercel.app"),
  title: {
    default: "TuCredito | Compara tarjetas en República Dominicana",
    template: "%s | TuCredito",
  },
  description: "Decisiones financieras inteligentes sin el ruido. Compara beneficios, tasas y requisitos de las mejores tarjetas del mercado dominicano.",
  openGraph: {
    title: "TuCredito",
    description: "Explora y compara tarjetas de crédito en República Dominicana.",
    type: "website",
    url: "https://tucredito.vercel.app",
    siteName: "TuCredito",
    images: [{ url: "/assets/placeholder.svg", width: 400, height: 300, alt: "placeholder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TuCredito",
    description: "Explora y compara tarjetas de crédito en República Dominicana.",
    images: ["/assets/placeholder.svg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background text-foreground antialiased`}>
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
