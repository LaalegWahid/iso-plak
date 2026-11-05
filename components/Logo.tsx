"use client";
import { useState } from "react";
import { site } from "@/lib/site";

// Shows the "ISO PLAK" wordmark (for dark backgrounds), otherwise a text fallback.
export default function Logo({ className = "" }: { className?: string }) {
  const [missing, setMissing] = useState(false);
  if (missing) {
    return <span className={`font-display text-xl font-extrabold tracking-tight ${className}`}>{site.name}</span>;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo-wordmark.png" alt={site.name} className={`h-9 w-auto ${className}`} onError={() => setMissing(true)} />;
}
