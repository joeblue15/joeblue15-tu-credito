import type { MetadataRoute } from "next";

import { creditCards } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tucredito.vercel.app";
  const staticRoutes = ["", "/tarjetas", "/comparar", "/ia"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...creditCards.map((card) => ({
      url: `${baseUrl}/tarjetas/${card.slug}`,
      lastModified: new Date(card.updatedAt),
      changeFrequency: "weekly" as const,
      priority: card.featured ? 0.9 : 0.7,
    })),
  ];
}
