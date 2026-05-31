"use client";

import { sanitizeRichText } from "@/lib/format";

export function RichTextContent({ html }: { html: string }) {
  return (
    <div
      className="space-y-4 text-sm leading-7 text-slate-300 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-white [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_li]:ml-5 [&_li]:list-disc [&_ol>li]:list-decimal [&_p]:text-slate-300"
      dangerouslySetInnerHTML={{ __html: sanitizeRichText(html) }}
    />
  );
}
