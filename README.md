# DialPilot AI — salon website

One-page Next.js 16 + Tailwind CSS 4 site selling AI voice receptionists to salons, with a live Retell voice demo
("Sophia" at Luxe Hair Salon, a demo salon).

## Run locally

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev            # http://localhost:3000
```

## Environment variables

| Name | Where it's used | Secret? |
| --- | --- | --- |
| `NEXT_PUBLIC_RETELL_PUBLIC_KEY` | Browser (Retell widget) | No, public key |
| `NEXT_PUBLIC_RETELL_AGENT_ID` | Browser (Retell widget) | No |
| `NEXT_PUBLIC_SITE_URL` | SEO / Open Graph URLs | No |
| `RETELL_API_KEY` | Scripts only, never shipped to the browser | **Yes** |
| `CAL_API_KEY` | Scripts only | **Yes** |
| `GEMINI_API_KEY` | `npm run images` (image generation) | **Yes** |

The site itself needs only the three `NEXT_PUBLIC_` values. `.env` is git-ignored.

## Images

`npm run images` generates salon photography with Gemini (Nano Banana Pro, falls back to Nano Banana 2) into
`public/images/`. The page picks up `hero-salon.jpg`, `reception-phone.jpg` and `og-image.jpg` automatically at build
time and uses designed gradients when they're missing. The current Gemini key returns "free tier limit 0" for image
models, so billing must be enabled on the Google AI Studio project before this works.

## Voice demo

- `components/VoiceDemo.tsx` mounts Retell's official embedded widget (`retell-widget-embed.js`) inside a branded
  dialog. Every "Talk to the demo" / "Start talking" button opens it.
- Mic permission is requested first. Missing or blocked mics get a friendly message with a WhatsApp fallback.
- Speech bubbles rotate (show 5s, hide 5s) starting 5s after load. They stop for good once the visitor closes one or
  starts the demo.
- Original agent config before edits: `backup/retell-agent-original.json`.

## Deploy to Vercel (no command line)

1. Go to **vercel.com** → sign up with GitHub.
2. **Add New → Project** → import `ai-website-dialpilot` (pick the branch you want live, or merge it into `main`).
3. Framework preset: **Next.js** (auto-detected). Leave build settings as they are.
4. Open **Environment Variables** and add `NEXT_PUBLIC_RETELL_PUBLIC_KEY`, `NEXT_PUBLIC_RETELL_AGENT_ID` and
   `NEXT_PUBLIC_SITE_URL=https://dialpilotai.com`.
5. Click **Deploy**. You'll get a `something.vercel.app` URL.

### Point dialpilotai.com to Vercel

1. In Vercel: **Project → Settings → Domains → Add** `dialpilotai.com`, and also add `www.dialpilotai.com`.
2. At your domain registrar (Hostinger, since the old site is Hostinger Horizons) open **DNS records** and:
   - delete the old `A` record for `@` and any `CNAME` for `www` that point to Hostinger;
   - add `A` · name `@` · value `76.76.21.21`;
   - add `CNAME` · name `www` · value `cname.vercel-dns.com`.
   If Vercel's Domains page shows different values for your project, use the ones Vercel shows.
3. Wait for DNS to update (minutes to a few hours). Vercel issues the HTTPS certificate automatically.

### Retell allowed domains

Retell dashboard → **API Keys → Public Keys** → edit your key → allowed domains:
`dialpilotai.com`, `www.dialpilotai.com`, your `*.vercel.app` URL, and `localhost`.
