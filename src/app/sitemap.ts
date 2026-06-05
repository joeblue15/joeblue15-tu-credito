import type { MetadataRoute } from "next";

import { creditCards } from "@/lib/mock-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tutarjetard.com";
  const staticRoutes = [
    { route: "", priority: 1, changeFreq: "daily" as const },
    { route: "/tarjetas", priority: 0.9, changeFreq: "daily" as const },
    { route: "/comparar", priority: 0.7, changeFreq: "weekly" as const },
    { route: "/favoritos", priority: 0.5, changeFreq: "monthly" as const },
    { route: "/ia", priority: 0.8, changeFreq: "weekly" as const },
    { route: "/privacidad", priority: 0.3, changeFreq: "monthly" as const },
    { route: "/terminos", priority: 0.3, changeFreq: "monthly" as const },
    { route: "/cookies", priority: 0.3, changeFreq: "monthly" as const },
  ];

  return [
    ...staticRoutes.map(({ route, priority, changeFreq }) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: changeFreq,
      priority,
    })),
    ...creditCards.map((card) => ({
      url: `${baseUrl}/tarjetas/${card.slug}`,
      lastModified: new Date(card.updatedAt),
      changeFrequency: "weekly" as const,
      priority: card.featured ? 0.9 : 0.7,
    })),
  ];
}
