import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/tarjetas", "/comparar", "/ia"],
      disallow: ["/admin"],
    },
    sitemap: "https://tucredito.vercel.app/sitemap.xml",
  };
}
