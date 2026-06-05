import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/tarjetas", "/comparar", "/favoritos", "/ia", "/privacidad", "/terminos", "/cookies"],
      disallow: ["/admin"],
    },
    sitemap: [
      "https://tutarjetard.com/sitemap.xml",
      // Live sitemap served by Cloudflare Worker (fetches Firestore via REST)
      "https://tucredito-ai.ramirezquezadajoe.workers.dev/sitemap.xml",
    ],
  };
}
