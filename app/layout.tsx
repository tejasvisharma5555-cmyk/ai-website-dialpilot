import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import { optionalImage } from "@/lib/images";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = "DialPilot AI | AI Voice Receptionist for Salons";
const description =
  "An AI receptionist for hair salons, beauty salons, barbershops and nail studios. It answers every call, handles price and service questions, and books appointments 24/7. Talk to the live demo.";

const ogImage = optionalImage("og-image.jpg") ?? "/brand/icon-512.png";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description,
    images: [{ url: ogImage, alt: "DialPilot AI — AI voice receptionist for salons" }],
  },
  twitter: {
    card: ogImage.endsWith(".jpg") ? "summary_large_image" : "summary",
    title,
    description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#090e1a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
