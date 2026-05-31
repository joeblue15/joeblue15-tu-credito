import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { Providers } from "@/components/providers";
import { SiteChrome } from "@/components/site-chrome";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tucredito.vercel.app"),
  title: {
    default: "TuCredito | Tarjetas de crédito en República Dominicana",
    template: "%s | TuCredito",
  },
  description: "Explora, compara y recibe recomendaciones de tarjetas de crédito en República Dominicana con una experiencia fintech premium.",
  openGraph: {
    title: "TuCredito",
    description: "Plataforma premium para explorar y comparar tarjetas de crédito de República Dominicana.",
    type: "website",
    url: "https://tucredito.vercel.app",
    siteName: "TuCredito",
    images: [{ url: "/assets/cards-editorial.png", width: 1200, height: 900, alt: "TuCredito" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TuCredito",
    description: "Compara tarjetas de crédito en RD con diseño premium, IA y panel admin.",
    images: ["/assets/cards-editorial.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-background font-sans text-foreground antialiased`}>
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
