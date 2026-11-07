"use client";

import { MicIcon } from "./icons";

const OPEN_DEMO_EVENT = "dialpilot:open-demo";

export default function OpenDemoButton({
  children,
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  const sizing = size === "lg" ? "px-8 py-4 text-base gap-3" : "px-6 py-3.5 text-sm gap-2.5";
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_DEMO_EVENT))}
      className={`group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-champagne via-[#ead6b0] to-gold font-semibold text-ink shadow-[0_12px_40px_-12px_rgba(227,201,156,0.6)] transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne ${sizing} ${className}`}
    >
      <MicIcon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
      {children}
    </button>
  );
}
