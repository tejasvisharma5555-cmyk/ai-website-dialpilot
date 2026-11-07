import Image from "next/image";
import VoiceDemo from "@/components/VoiceDemo";
import OpenDemoButton from "@/components/OpenDemoButton";
import { optionalImage } from "@/lib/images";
import { site, whatsappLink, WA_DEFAULT, WA_PILOT } from "@/lib/site";
import {
  ArrowIcon,
  CalendarIcon,
  ChatIcon,
  ClockIcon,
  DocIcon,
  MailIcon,
  MoonIcon,
  PhoneIcon,
  RefreshIcon,
  ScissorsIcon,
  UserIcon,
  WhatsAppIcon,
} from "@/components/icons";

const heroImg = optionalImage("hero-salon.jpg");
const receptionImg = optionalImage("reception-phone.jpg");

/* ---------- small building blocks ---------- */

function Eyebrow({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`mb-5 inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase ${
        dark ? "text-gold" : "text-gold-deep"
      }`}
    >
      <span className={`h-px w-8 ${dark ? "bg-gold/60" : "bg-gold-deep/60"}`} />
      {children}
    </p>
  );
}

function BookCallButton({ className = "", variant = "ghost" }: { className?: string; variant?: "ghost" | "dark" }) {
  const styles =
    variant === "dark"
      ? "bg-ink text-cream hover:bg-navy"
      : "border border-champagne/35 text-cream hover:border-champagne hover:bg-champagne/5";
  return (
    <a
      href={site.calUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition ${styles} ${className}`}
    >
      <CalendarIcon className="h-4 w-4" />
      Book a free call
    </a>
  );
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="DialPilot AI home">
      <Image src="/brand/logo-champagne.png" alt="" width={36} height={36} priority className="h-9 w-9" />
      <span className="text-[15px] font-semibold tracking-wide">
        DialPilot <span className="text-champagne">AI</span>
      </span>
    </a>
  );
}

/* ---------- page ---------- */

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 border-b border-line/60 bg-ink/75 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm text-mist md:flex" aria-label="Main">
            <a href="#demo" className="transition hover:text-cream">Live demo</a>
            <a href="#how" className="transition hover:text-cream">How it works</a>
            <a href="#features" className="transition hover:text-cream">Features</a>
            <a href="#pricing" className="transition hover:text-cream">Pricing</a>
            <a href="#faq" className="transition hover:text-cream">FAQ</a>
          </nav>
          <a
            href={site.calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-champagne/40 px-4 py-2 text-xs font-semibold text-champagne transition hover:bg-champagne hover:text-ink sm:text-sm"
          >
            Book a free call
          </a>
        </div>
      </header>

      <main id="top">
        {/* ================= HERO ================= */}
        <section className="grain relative overflow-hidden pt-[72px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_20%,rgba(201,166,107,0.20),transparent_60%),radial-gradient(ellipse_60%_50%_at_10%_90%,rgba(27,43,79,0.9),transparent_70%)]"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24 lg:pb-28">
            <div className="animate-rise">
              <Eyebrow>AI voice receptionist for salons</Eyebrow>
              <h1 className="font-serif text-[2.9rem] leading-[1.02] font-medium tracking-tight sm:text-6xl lg:text-[4.6rem]">
                Your salon never misses a <em className="gold-text not-italic sm:italic">call</em> again
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
                An AI receptionist that answers every call, handles price and service questions, and books appointments
                24/7. Your stylists stay with the client in the chair.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <OpenDemoButton>Talk to the demo</OpenDemoButton>
                <BookCallButton />
              </div>
              <p className="mt-5 text-xs tracking-wide text-mist/80">
                Live demo in your browser · no sign-up · for hair, beauty, barber and nail studios
              </p>
            </div>

            {/* Visual: arched "mirror" with an example call */}
            <div className="animate-rise relative mx-auto w-full max-w-[420px] [animation-delay:150ms]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[28px] border border-champagne/25 bg-[linear-gradient(160deg,#1b2b4f_0%,#12203d_45%,#0b1222_100%)] shadow-[0_40px_120px_-30px_rgba(201,166,107,0.35)]">
                {heroImg ? (
                  <Image src={heroImg} alt="Luxury salon interior" fill priority sizes="420px" className="object-cover opacity-80" />
                ) : (
                  <div aria-hidden className="absolute inset-0">
                    <div className="absolute inset-x-10 top-10 bottom-1/3 rounded-t-[999px] border border-champagne/15 bg-[radial-gradient(circle_at_50%_30%,rgba(227,201,156,0.22),transparent_65%)]" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(9,14,26,0.85))]" />
                    <Image
                      src="/brand/logo-champagne.png"
                      alt=""
                      width={160}
                      height={160}
                      className="absolute top-[22%] left-1/2 h-32 w-32 -translate-x-1/2 opacity-[0.12]"
                    />
                  </div>
                )}
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-line bg-ink/85 p-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-semibold text-champagne">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      Incoming call · answered
                    </span>
                    <span className="flex h-4 items-end gap-[3px]" aria-hidden>
                      {[0, 1, 2, 3, 4].map((b) => (
                        <span
                          key={b}
                          className="animate-bar w-[3px] origin-bottom rounded-full bg-champagne"
                          style={{ height: "100%", animationDelay: `${b * 0.15}s` }}
                        />
                      ))}
                    </span>
                  </div>
                  <ul className="space-y-2 text-[13px] leading-snug">
                    <li className="text-mist">
                      <span className="font-semibold text-cream">Caller:</span> How much is a blowout? Can I come Saturday?
                    </li>
                    <li>
                      <span className="font-semibold text-champagne">Sophia:</span> Blowouts start at $45. I have 10:00 or
                      2:30 on Saturday.
                    </li>
                    <li className="text-mist">
                      <span className="font-semibold text-cream">Caller:</span> 2:30, please.
                    </li>
                  </ul>
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-champagne/10 px-3 py-2 text-xs text-champagne">
                    <CalendarIcon className="h-4 w-4" /> Booked into the salon calendar
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] text-mist/70">Example call with our demo salon</p>
            </div>
          </div>
        </section>

        {/* ================= PROBLEM ================= */}
        <section className="relative border-t border-line bg-ink-2 py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <Eyebrow>The problem</Eyebrow>
              <h2 className="font-serif text-4xl leading-tight font-medium sm:text-5xl">Missed calls are lost bookings</h2>
              <p className="mt-4 text-mist">
                A client who can&apos;t get through rarely leaves a voicemail. They call the next salon on the list.
              </p>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: ScissorsIcon,
                  title: "Hands full, phone ringing",
                  body: "Your stylists are mid-colour or mid-cut when the phone rings. The caller hangs up and books elsewhere.",
                },
                {
                  icon: MoonIcon,
                  title: "Nobody answers after hours",
                  body: "Clients book in the evening, on your day off and on packed weekends. That's exactly when no one picks up.",
                },
                {
                  icon: UserIcon,
                  title: "Front desk stuck on the phone",
                  body: "Prices, hours, parking, “do you do balayage?” on repeat. Your team should be with the client in front of them.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="group rounded-3xl border border-line bg-gradient-to-b from-navy/50 to-transparent p-7 transition hover:border-champagne/30"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-champagne/25 text-champagne">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-medium">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mist">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= LIVE DEMO ================= */}
        <section id="demo" className="grain relative overflow-hidden border-t border-line py-24 sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_0%,rgba(201,166,107,0.18),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Live demo</Eyebrow>
              <h2 className="font-serif text-4xl leading-tight font-medium sm:text-6xl">
                Call our <span className="gold-text">demo salon</span> now
              </h2>
              <p className="mt-5 text-lg text-mist">
                You&apos;re about to talk to Sophia, the AI receptionist at Luxe Hair Salon, a demo salon. She&apos;s
                exactly what your clients would hear.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-3xl border border-line bg-ink-2/70 p-7 sm:p-9">
                <p className="text-sm font-semibold text-champagne">Things to try</p>
                <ul className="mt-5 space-y-3">
                  {[
                    "“How much is a haircut?”",
                    "“Can I book a blowout for Saturday?”",
                    "“Are you open on Sunday?”",
                    "“I need to move my appointment.”",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-3 rounded-2xl border border-line bg-navy/40 px-4 py-3.5 font-serif text-xl"
                    >
                      <ChatIcon className="h-4 w-4 shrink-0 text-gold" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col items-start gap-4">
                  <OpenDemoButton size="lg">Start talking</OpenDemoButton>
                  <p className="text-xs leading-relaxed text-mist">
                    Uses your microphone, right in the browser. Book with your real email and you&apos;ll get a real
                    confirmation.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-line bg-[linear-gradient(160deg,#16244a,#0d1526)] p-7 sm:p-9">
                {receptionImg && (
                  <Image src={receptionImg} alt="" fill sizes="600px" className="object-cover opacity-20" />
                )}
                <div className="relative">
                  <p className="text-sm font-semibold text-champagne">Luxe Hair Salon · demo menu</p>
                  <p className="mt-1 text-xs text-mist">The demo knows this menu. Your agent learns yours.</p>
                  <dl className="mt-6 divide-y divide-line text-[15px]">
                    {[
                      ["Women’s cut & style", "from $65"],
                      ["Men’s haircut", "from $35"],
                      ["Blowout", "from $45"],
                      ["Root touch-up", "from $85"],
                      ["Full highlights", "from $200"],
                      ["Balayage", "from $225"],
                      ["Colour consultation", "free"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                        <dt>{k}</dt>
                        <dd className="font-serif text-lg text-champagne">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 flex items-start gap-2 text-xs text-mist">
                    <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    Tue–Fri 9–7 · Sat 9–6 · Sun 10–4 · closed Mondays. Three stylists, each with their own calendar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section id="how" className="bg-cream py-24 text-ink sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <Eyebrow dark={false}>How it works</Eyebrow>
              <h2 className="font-serif text-4xl leading-tight font-medium sm:text-5xl">Live in three simple steps</h2>
            </div>
            <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-3">
              {[
                {
                  n: "01",
                  title: "We build your agent",
                  body: "Send us your service menu, prices, stylists and hours. We set up, voice and test your receptionist for you.",
                },
                {
                  n: "02",
                  title: "It answers your calls",
                  body: "Forward your salon line, all day or just when you're busy. Every caller gets a warm, instant answer.",
                },
                {
                  n: "03",
                  title: "Bookings land in your calendar",
                  body: "It checks live availability and books the right stylist. Clients get a confirmation, you get the appointment.",
                },
              ].map((s) => (
                <li key={s.n} className="bg-cream p-8 sm:p-10">
                  <span className="font-serif text-5xl text-gold-deep">{s.n}</span>
                  <h3 className="mt-6 font-serif text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section id="features" className="border-t border-line bg-ink py-24 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <Eyebrow>Built for salons</Eyebrow>
                <h2 className="font-serif text-4xl leading-tight font-medium sm:text-5xl">A receptionist that never clocks off</h2>
              </div>
              <p className="max-w-sm text-mist">No phone trees, no hold music. Just a warm voice that gets the booking.</p>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: ClockIcon, title: "Answers 24/7", body: "Every call picked up in seconds, including evenings, Mondays and holiday weekends." },
                { icon: CalendarIcon, title: "Books into your calendar", body: "Checks live availability and books the right stylist for the right length of service." },
                { icon: ScissorsIcon, title: "Knows your menu", body: "Answers price, service, hours and policy questions the way your team would." },
                { icon: RefreshIcon, title: "Reschedules and cancels", body: "Clients move or cancel by phone, so the slot opens up instead of becoming a no-show." },
                { icon: DocIcon, title: "Captures every lead", body: "Takes messages for wedding groups, complaints and special requests. Every call is logged with a summary." },
                { icon: PhoneIcon, title: "Keeps your number", body: "Forward your existing salon line. Clients call the number they already know." },
              ].map(({ icon: Icon, title, body }) => (
                <article key={title} className="rounded-3xl border border-line p-7 transition hover:border-champagne/30 hover:bg-navy/30">
                  <Icon className="h-6 w-6 text-champagne" />
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mist">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PRICING ================= */}
        <section id="pricing" className="relative border-t border-line bg-ink-2 py-24 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight font-medium sm:text-5xl">Tailored to your salon</h2>
            <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-champagne/30 bg-[linear-gradient(160deg,#1b2b4f,#0d1526_70%)] p-8 text-left sm:p-12">
              <div aria-hidden className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-champagne/10 blur-3xl" />
              <p className="text-sm font-semibold text-champagne">Custom setup for your salon</p>
              <p className="mt-3 font-serif text-3xl leading-snug sm:text-4xl">
                Try it free for 2 weeks. No cost, no obligation.
              </p>
              <p className="mt-4 max-w-lg text-mist">
                We build your receptionist around your menu, team and calendar. Pricing depends on your call volume, so
                we&apos;ll quote you on a quick call.
              </p>
              <ul className="mt-7 grid gap-3 text-[15px] sm:grid-cols-2">
                {["Done-for-you setup", "Your services, prices and stylists", "Calendar booking", "Your existing number"].map(
                  (f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-champagne/15 text-champagne">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  )
                )}
              </ul>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={site.calUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-cream"
                >
                  Book a call for pricing <ArrowIcon className="h-4 w-4" />
                </a>
                <a
                  href={whatsappLink(WA_PILOT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition hover:border-champagne/50"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> Start the free pilot
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section id="faq" className="bg-cream py-24 text-ink sm:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Eyebrow dark={false}>FAQ</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight font-medium sm:text-5xl">Questions salon owners ask</h2>
            <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
              {[
                {
                  q: "Will it sound robotic?",
                  a: "It uses a warm, natural voice and keeps replies short, like a good receptionist. Don't take our word for it: call the demo above.",
                },
                {
                  q: "Can it handle my full service menu?",
                  a: "Yes. We load your services, prices, durations and which stylist does what, and it books the right length of appointment with the right person.",
                },
                {
                  q: "What if a client wants a real person?",
                  a: "It takes their name, number and reason and passes the message to your team, flagging anything urgent. We can also set it to transfer calls to you during opening hours.",
                },
                {
                  q: "How long does setup take?",
                  a: "We do the setup for you, so all you share is your menu, hours and calendar. We'll confirm your go-live date on the free call.",
                },
                {
                  q: "Which languages does it speak?",
                  a: "The demo speaks English. Your receptionist can be set up in other languages too, including Arabic and Hindi, and we test it with your callers in mind.",
                },
                {
                  q: "Does it work with my booking system?",
                  a: "The demo books into a live Cal.com calendar, and we also connect calendars like Calendly. Using another salon booking tool? Ask us on the call.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group py-6">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 font-serif text-xl font-semibold sm:text-2xl">
                    {q}
                    <span className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/15 text-lg transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/70">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="grain relative overflow-hidden border-t border-line py-24 sm:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_100%,rgba(201,166,107,0.22),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-serif text-4xl leading-tight font-medium sm:text-6xl">
              Stop losing bookings to <span className="gold-text">voicemail</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-mist">
              Hear the demo, then book a free 15-minute call. We&apos;ll show you what it would sound like for your salon.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <OpenDemoButton>Talk to the demo</OpenDemoButton>
              <BookCallButton />
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-mist">
              <a href={whatsappLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-cream">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp us
              </a>
              <a href={site.phoneHref} className="inline-flex items-center gap-2 transition hover:text-cream">
                <PhoneIcon className="h-4 w-4 text-champagne" /> {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition hover:text-cream">
                <MailIcon className="h-4 w-4 text-champagne" /> {site.email}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-ink-2 pt-14 pb-28 sm:pb-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-mist">
              AI voice receptionists for hair salons, beauty salons, barbershops and nail studios.
            </p>
            <p className="mt-2 text-xs text-mist/70">Serving salons in Dubai, Abu Dhabi, the US and the UK.</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={whatsappLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-mist hover:text-cream">
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-2 text-mist hover:text-cream">
                  <PhoneIcon className="h-4 w-4" /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-mist hover:text-cream">
                  <MailIcon className="h-4 w-4" /> {site.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Get started</p>
            <ul className="mt-4 space-y-3 text-sm text-mist">
              <li><a href="#demo" className="hover:text-cream">Talk to the demo</a></li>
              <li>
                <a href={site.calUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                  Book a free 15-min call
                </a>
              </li>
              <li><a href="#pricing" className="hover:text-cream">Free 2-week pilot</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <div className="hairline" />
          <p className="mt-6 text-xs text-mist/60">
            © {new Date().getFullYear()} DialPilot AI. Luxe Hair Salon is a demo salon used to show the product.
          </p>
        </div>
      </footer>

      <VoiceDemo />
    </>
  );
}
