// Build-time helper: generates site imagery with Gemini image models.
// Usage: node --env-file=.env scripts/generate-images.mjs   (key stays server-side)
import { writeFile, mkdir } from "node:fs/promises";

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) throw new Error("GEMINI_API_KEY missing");
const MODELS = ["gemini-3-pro-image", "gemini-3.1-flash-image"];
const STYLE =
  "Editorial luxury photography, warm low-key lighting, deep charcoal and navy tones with soft champagne-gold highlights, shallow depth of field, photorealistic, 35mm. Absolutely no text, letters, logos, signage or watermarks anywhere in the image.";

const images = [
  { file: "hero-salon.jpg", ratio: "4:5", prompt: "A high-end hair salon interior at dusk: velvet styling chairs, round brass-framed mirrors, marble surfaces, warm pendant lights, empty and serene." },
  { file: "reception-phone.jpg", ratio: "4:3", prompt: "An elegant marble salon reception desk with a smartphone lying face up whose blank screen glows softly, a small orchid vase beside it, blurred stylist working on a client's hair in the background." },
  { file: "stylist-busy.jpg", ratio: "4:3", prompt: "Close-up of a hairstylist's hands sectioning and blow-drying a client's glossy hair, both hands busy, warm salon lighting, client's face not visible." },
  { file: "salon-detail.jpg", ratio: "1:1", prompt: "Still life of premium salon tools on a dark marble counter: gold scissors, a round brush, amber glass product bottles without labels, soft rim light." },
  { file: "og-image.jpg", ratio: "16:9", prompt: "Wide shot of a luxurious modern beauty salon with styling stations and warm ambient light, calm and empty, cinematic." },
];

await mkdir("public/images", { recursive: true });
for (const img of images) {
  let ok = false;
  for (const model of MODELS) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: { "x-goog-api-key": KEY, "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${img.prompt} ${STYLE}` }] }],
            generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: img.ratio } },
          }),
        }
      );
      const data = await res.json();
      const part = data?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
      if (!part) throw new Error(JSON.stringify(data).slice(0, 300));
      await writeFile(`public/images/${img.file}`, Buffer.from(part.inlineData.data, "base64"));
      console.log(`ok   ${img.file} (${model}, ${part.inlineData.mimeType})`);
      ok = true;
      break;
    } catch (e) {
      console.log(`fail ${img.file} with ${model}: ${e.message}`);
    }
  }
  if (!ok) console.log(`SKIPPED ${img.file} — site falls back to gradient`);
}
