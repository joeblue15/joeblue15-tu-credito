import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

import { Providers } from "@/components/providers";
import { SiteChrome } from "@/components/site-chrome";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tucredito.me"),
  title: {
    default: "TuCredito | Compara tarjetas en República Dominicana",
    template: "%s | TuCredito",
  },
  description: "Decisiones financieras inteligentes sin el ruido. Compara beneficios, tasas y requisitos de las mejores tarjetas del mercado dominicano.",
  openGraph: {
    title: "TuCredito",
    description: "Explora y compara tarjetas de crédito en República Dominicana.",
    type: "website",
    url: "https://tucredito.me",
    siteName: "TuCredito",
    images: [{ url: "/brand/general-profile-picture.png", width: 512, height: 512, alt: "TuCredito" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TuCredito",
    description: "Explora y compara tarjetas de crédito en República Dominicana.",
    images: ["/brand/general-profile-picture.png"],
  },
  icons: {
    icon: [{ url: "/brand/general-profile-picture.png" }],
    apple: [{ url: "/brand/general-profile-picture.png" }],
    shortcut: [{ url: "/brand/general-profile-picture.png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/brand/general-profile-picture.png" type="image/png" />
        <link rel="apple-touch-icon" href="/brand/general-profile-picture.png" />
        <meta name="google-adsense-account" content="ca-pub-4715458477118973" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4715458477118973"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.variable} min-h-screen bg-background text-foreground antialiased`}>
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
