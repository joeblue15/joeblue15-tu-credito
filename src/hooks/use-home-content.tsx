"use client";

import { useEffect, useState } from "react";

import { fetchHomeContent } from "@/lib/firestore";
import { defaultHomeContent } from "@/lib/mock-data";
import type { HomeContent } from "@/lib/types";

export function useHomeContent() {
  const [content, setContent] = useState<HomeContent>(defaultHomeContent);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const nextContent = await fetchHomeContent();
    setContent(nextContent);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    content,
    setContent,
    loading,
    refresh,
  };
}
