"use client";

import { sanitizeRichText } from "@/lib/format";

export function RichTextContent({ html }: { html: string }) {
  return (
    <div
      className="space-y-4 text-sm leading-7 text-muted-foreground [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_ol>li]:list-decimal [&_p]:text-muted-foreground"
      dangerouslySetInnerHTML={{ __html: sanitizeRichText(html) }}
    />
  );
}
