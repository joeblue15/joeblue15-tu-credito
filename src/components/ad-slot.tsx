"use client";

import { useEffect, useRef } from "react";

export function AdSlot({
  slotId = "homepage-top",
  adFormat = "auto",
  fullWidth = true,
}: {
  slotId?: string;
  adFormat?: string;
  fullWidth?: boolean;
}) {
  const ref = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div className={fullWidth ? "mx-auto max-w-[1220px] px-5 sm:px-8" : undefined}>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client="ca-pub-4715458477118973"
        data-ad-slot={slotId}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
        ref={(el) => {
          ref.current = el as HTMLModElement | null;
        }}
      />
    </div>
  );
}
