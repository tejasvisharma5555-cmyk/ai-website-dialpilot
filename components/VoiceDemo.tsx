"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site, whatsappLink, WA_DEFAULT } from "@/lib/site";
import { CloseIcon, MicIcon, WhatsAppIcon } from "./icons";

export const OPEN_DEMO_EVENT = "dialpilot:open-demo";

// Retell PUBLIC key (safe in the browser, restricted by allowed domains) + demo agent. Env vars override.
const PUBLIC_KEY = process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY || "public_key_150e4202af503c800126e";
const AGENT_ID = process.env.NEXT_PUBLIC_RETELL_AGENT_ID || "agent_7dd2e9e07fd10fc34d66dd5efb";
// Official Retell embedded widget (docs.retellai.com/deploy/chat-widget → "Embed the widget in a page section")
const EMBED_SRC = "https://dashboard.retellai.com/retell-widget-embed.js";

const BUBBLES = [
  "Want to hear our salon AI book a haircut?",
  "Try it — ask about prices or book a slot",
  "See what your clients would hear",
];
const BUBBLE_KEY = "dp-bubble-stopped";

type Status = "idle" | "checking" | "ready" | "error";
type ErrorKind = "notfound" | "denied" | "unsupported" | "load";

function readStopped(): boolean {
  try {
    return window.localStorage.getItem(BUBBLE_KEY) === "1";
  } catch {
    return false;
  }
}
function writeStopped() {
  try {
    window.localStorage.setItem(BUBBLE_KEY, "1");
  } catch {
    /* storage unavailable — the in-memory flag still stops the cycle */
  }
}

export default function VoiceDemo() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<ErrorKind | null>(null);
  const [widgetRequested, setWidgetRequested] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);

  const hostRef = useRef<HTMLDivElement>(null);
  const scriptState = useRef<"none" | "loading" | "loaded">("none");
  const stoppedRef = useRef(false);
  const timers = useRef<number[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const stopBubbles = useCallback(() => {
    stoppedRef.current = true;
    clearTimers();
    setBubble(null);
    writeStopped();
  }, []);

  // Rotating speech bubble: first after 5s, each shows 5s, hides 5s, then the next.
  useEffect(() => {
    if (readStopped()) {
      stoppedRef.current = true;
      return;
    }
    let i = 0;
    const show = () => {
      if (stoppedRef.current) return;
      setBubble(BUBBLES[i % BUBBLES.length]);
      timers.current.push(
        window.setTimeout(() => {
          if (stoppedRef.current) return;
          setBubble(null);
          i += 1;
          timers.current.push(window.setTimeout(show, 5000));
        }, 5000)
      );
    };
    timers.current.push(window.setTimeout(show, 5000));
    return clearTimers;
  }, []);

  // Keep third-party widget errors from surfacing as page runtime errors.
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      if (e.filename && e.filename.includes("retellai.com")) {
        e.preventDefault();
        console.warn("[demo] Retell widget error suppressed:", e.message);
      }
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const stack = String((e.reason && (e.reason.stack || e.reason.message)) || e.reason || "");
      if (stack.includes("retellai.com") || stack.toLowerCase().includes("retell")) {
        e.preventDefault();
        console.warn("[demo] Retell widget rejection suppressed:", stack.slice(0, 200));
      }
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  const fail = (kind: ErrorKind) => {
    setErrorKind(kind);
    setStatus("error");
  };

  const startDemo = useCallback(async () => {
    stopBubbles();
    setOpen(true);
    setErrorKind(null);

    if (!PUBLIC_KEY || !AGENT_ID) {
      fail("load");
      return;
    }
    setStatus("checking");
    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        fail("unsupported");
        return;
      }
      // Ask for the mic first so we can show a friendly message instead of a widget error.
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      setStatus("ready");
      setWidgetRequested(true);
    } catch (err) {
      const name = (err as { name?: string })?.name ?? "";
      if (name === "NotAllowedError" || name === "SecurityError" || name === "PermissionDeniedError") fail("denied");
      else fail("notfound");
    }
  }, [stopBubbles]);

  // Load the Retell embed script once the host container is in the DOM.
  useEffect(() => {
    if (!widgetRequested || scriptState.current !== "none" || !hostRef.current) return;
    scriptState.current = "loading";
    try {
      const s = document.createElement("script");
      s.src = EMBED_SRC;
      s.async = true;
      s.onload = () => {
        scriptState.current = "loaded";
        window.setTimeout(() => {
          if (!hostRef.current?.hasAttribute("data-retell-widget-mounted")) fail("load");
        }, 1500);
      };
      s.onerror = () => {
        scriptState.current = "none";
        s.remove();
        fail("load");
      };
      document.body.appendChild(s);
    } catch {
      scriptState.current = "none";
      fail("load");
    }
  }, [widgetRequested]);

  // Open from any "Talk to the demo" / "Start talking" button on the page.
  useEffect(() => {
    const handler = () => void startDemo();
    window.addEventListener(OPEN_DEMO_EVENT, handler);
    return () => window.removeEventListener(OPEN_DEMO_EVENT, handler);
  }, [startDemo]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const errorCopy: Record<ErrorKind, { title: string; body: string }> = {
    notfound: {
      title: "Mic not found",
      body: "Check your microphone and try again, or WhatsApp us and we'll call you with the demo.",
    },
    denied: {
      title: "Microphone is blocked",
      body: "Allow microphone access in your browser's address bar, then try again. Or WhatsApp us and we'll call you with the demo.",
    },
    unsupported: {
      title: "Mic not available here",
      body: "This browser can't use your microphone on this page. Try Chrome or Safari, or WhatsApp us for a phone demo.",
    },
    load: {
      title: "The demo is taking a break",
      body: "We couldn't connect to the demo receptionist just now. Please try again, or WhatsApp us for a live demo.",
    },
  };

  return (
    <>
      {/* Floating launcher + rotating speech bubble */}
      <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
        {bubble && !open && (
          <div
            role="status"
            className="animate-rise relative max-w-[260px] rounded-2xl rounded-br-sm border border-line bg-cream py-3 pr-9 pl-4 text-sm font-medium text-ink shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]"
          >
            <button type="button" onClick={() => void startDemo()} className="text-left">
              {bubble}
            </button>
            <button
              type="button"
              aria-label="Close message"
              onClick={stopBubbles}
              className="absolute top-2 right-2 rounded-full p-1 text-ink/50 transition hover:bg-ink/5 hover:text-ink"
            >
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => void startDemo()}
          aria-haspopup="dialog"
          className="group flex items-center gap-3 rounded-full border border-champagne/30 bg-navy/95 py-2 pr-5 pl-2 text-sm font-semibold text-cream shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur transition hover:border-champagne/60 hover:bg-navy-2"
        >
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-champagne to-gold text-ink">
            <span className="animate-pulse-ring absolute inset-0 rounded-full bg-champagne/50" />
            <MicIcon className="relative h-5 w-5" />
          </span>
          <span className="hidden sm:inline">Talk to our AI receptionist</span>
          <span className="sm:hidden">Talk to our AI</span>
        </button>
      </div>

      {/* Demo dialog — stays mounted after first open so an active call isn't torn down */}
      <div
        className={`fixed inset-0 z-50 flex items-end justify-center p-0 transition sm:items-center sm:p-6 ${
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Talk to the demo salon receptionist"
          tabIndex={-1}
          className="relative flex max-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden rounded-t-3xl border border-line bg-ink-2 shadow-2xl outline-none sm:rounded-3xl"
        >
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">Live demo</p>
              <p className="font-serif text-2xl leading-tight">Luxe Hair Salon</p>
              <p className="text-xs text-mist">Sophia, AI receptionist · built by DialPilot AI</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close demo"
              className="rounded-full border border-line p-2 text-mist transition hover:text-cream"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          {status === "checking" && (
            <div className="grid min-h-[300px] place-items-center px-6 text-center">
              <div>
                <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-champagne/10 text-champagne">
                  <MicIcon className="h-6 w-6" />
                </span>
                <p className="font-medium">Allow your microphone</p>
                <p className="mt-1 text-sm text-mist">Your browser will ask once. We only use it for this call.</p>
              </div>
            </div>
          )}

          {status === "error" && errorKind && (
            <div className="px-6 py-10 text-center">
              <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-rose/10 text-rose">
                <MicIcon className="h-6 w-6" />
              </span>
              <p className="font-serif text-2xl">{errorCopy[errorKind].title}</p>
              <p className="mx-auto mt-2 max-w-xs text-sm text-mist">
                {errorKind === "notfound" ? (
                  <>
                    Mic not found — check your microphone and try again, or WhatsApp us at{" "}
                    <span className="whitespace-nowrap text-cream">{site.phoneDisplay}</span>.
                  </>
                ) : (
                  errorCopy[errorKind].body
                )}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={() => void startDemo()}
                  className="rounded-full bg-champagne px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-cream"
                >
                  Try again
                </button>
                <a
                  href={whatsappLink(WA_DEFAULT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition hover:border-champagne/50"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp us
                </a>
              </div>
            </div>
          )}

          {widgetRequested && (
            <div className={status === "ready" ? "block" : "hidden"}>
              <div
                ref={hostRef}
                data-retell-widget="true"
                data-voice-public-key={PUBLIC_KEY}
                data-voice-agent-id={AGENT_ID}
                data-title="Luxe Hair Salon · demo"
                data-theme-color="#12203d"
                data-component-color="#9c7a43"
                className="h-[520px] max-h-[calc(100dvh-170px)] w-full"
              />
              <p className="border-t border-line px-5 py-3 text-center text-[11px] leading-relaxed text-mist">
                Closing this window doesn&apos;t end the call — use the hang-up button. Demo bookings send a real
                confirmation email.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
