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
  metadataBase: new URL("https://tutarjetard.com"),
  title: {
    default: "TuTarjetaRD | Compara tarjetas en República Dominicana",
    template: "%s | TuTarjetaRD",
  },
  description: "TuTarjetaRD: compara beneficios, tasas y requisitos de las mejores tarjetas de crédito y débito del mercado dominicano. Encuentra la tarjeta ideal para ti.",
  keywords: ["tarjetas de crédito", "tarjetas de débito", "comparar tarjetas", "República Dominicana", "bancos RD", "tarjetas populares", "tarjetas BHD", "tarjetas Popular"],
  authors: [{ name: "TuTarjetaRD" }],
  creator: "TuTarjetaRD",
  publisher: "TuTarjetaRD",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "TuTarjetaRD",
    description: "Explora y compara tarjetas de crédito y débito en República Dominicana.",
    type: "website",
    url: "https://tutarjetard.com",
    siteName: "TuTarjetaRD",
    locale: "es_DO",
    images: [{ url: "/brand/general-profile-picture.png", width: 512, height: 512, alt: "TuTarjetaRD" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TuTarjetaRD",
    description: "Explora y compara tarjetas de crédito y débito en República Dominicana.",
    images: ["/brand/general-profile-picture.png"],
  },
  icons: {
    icon: [{ url: "/brand/general-profile-picture.png" }],
    apple: [{ url: "/brand/general-profile-picture.png" }],
    shortcut: [{ url: "/brand/general-profile-picture.png" }],
  },
  verification: {
    google: "ca-pub-4715458477118973",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/brand/general-profile-picture.png" type="image/png" />
        <link rel="apple-touch-icon" href="/brand/general-profile-picture.png" />
        <meta name="google-adsense-account" content="ca-pub-4715458477118973" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "TuTarjetaRD",
              url: "https://tutarjetard.com",
              description: "Compara tarjetas de crédito y débito en República Dominicana",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://tutarjetard.com/tarjetas?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TuTarjetaRD",
              url: "https://tutarjetard.com",
              logo: "https://tutarjetard.com/brand/general-profile-picture.png",
              description: "Plataforma de comparación de tarjetas de crédito y débito en República Dominicana",
              contactPoint: {
                "@type": "ContactPoint",
                email: "contacto@tutarjetard.com",
                contactType: "customer service",
                availableLanguage: "Spanish",
              },
              sameAs: [],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const consent = localStorage.getItem('tutarjetard-cookie-consent');
                if (consent === 'accepted') {
                  // Cargar Google AdSense
                  const adsenseScript = document.createElement('script');
                  adsenseScript.async = true;
                  adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4715458477118973';
                  adsenseScript.crossOrigin = 'anonymous';
                  document.head.appendChild(adsenseScript);
                  
                  // Cargar Google Analytics
                  const analyticsScript = document.createElement('script');
                  analyticsScript.async = true;
                  analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
                  document.head.appendChild(analyticsScript);
                  
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-XXXXXXXXXX');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} min-h-screen bg-background text-foreground antialiased`}>
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
