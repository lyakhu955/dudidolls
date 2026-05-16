import type { Metadata, Viewport } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LenisProvider from "@/providers/LenisProvider";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "dudidolls — bambole d'autore, cucite a mano",
  description:
    "Bambole d'autore cucite una alla volta tra le valli del Sudtirolo. Ogni pezzo è unico, firmato, e ha già un nome.",
  metadataBase: new URL("https://dudidolls.vercel.app"),
  keywords: ["bambole artigianali", "bambole d'autore", "handmade dolls", "dudidolls", "Sudtirolo"],
  authors: [{ name: "Simona" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://dudidolls.vercel.app" },
  openGraph: {
    title: "dudidolls",
    description: "Bambole d'autore cucite a mano",
    images: ["/foto/hero.jpg"],
    url: "https://dudidolls.vercel.app",
    type: "website",
    locale: "it_IT",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      className={`${instrument.variable} ${dmSans.variable} ${jetbrains.variable} ${caveat.variable}`}
    >
      <body>
        <LenisProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </LenisProvider>
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "dudidolls",
              url: "https://dudidolls.vercel.app",
              logo: "https://dudidolls.vercel.app/foto/hero.jpg",
              contactPoint: {
                "@type": "ContactPoint",
                email: "atelier@dudidolls.it",
                contactType: "customer service",
                areaServed: "IT",
                availableLanguage: ["Italian", "English", "German"],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
