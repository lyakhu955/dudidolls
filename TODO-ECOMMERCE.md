# dudidolls — TODO E-commerce

## Stato attuale (maggio 2026)

Sito: Next.js 15, React 19, Tailwind, GSAP, Lenis, Zustand, Stripe (installato, non configurato).
Build: pulito, 27 pagine statiche + 1 API route dinamica.
Repo: https://github.com/lyakhu955/dudidolls

---

## ✅ GIA FATTO

- Bugfix completo (Cart qty, ProductModal aria, DollCard aria-label, Newsletter validation)
- ESLint v9 flat config
- Nav/Footer links vivi (Link Next.js)
- Favicon SVG (app/icon.svg)
- robots.txt + sitemap.xml automatici
- metadataBase corretto
- Pagine: /diario, /accedi, /privacy, /cookie, /termini, /recesso, /spedizioni
- CookieBanner (localStorage consent)
- Campo `sold: boolean` su Doll type in lib/data.ts
- Badge "Venduta" su DollCard + ProductDetail
- lib/stripe.ts (lazy singleton)
- app/api/checkout/route.ts (Stripe Checkout Sessions)
- /checkout/success + /checkout/cancel pages
- CartDrawer collegato a Stripe (fetch POST /api/checkout)
- Cart persistenza localStorage
- .env.local.example con template variabili

---

## 🔴 PRIORITA ALTA — Stripe attivazione (SUBITO)

### 1. Variabili ambiente

Creare `.env.local` da `.env.local.example`:

```
STRIPE_SECRET_KEY=sk_test_...         # da dashboard.stripe.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...       # dopo aver creato webhook
NEXT_PUBLIC_SITE_URL=https://dudidolls.vercel.app
```

Su Vercel: Settings → Environment Variables → aggiungere le stesse.

### 2. Prodotti Stripe Dashboard

Per ogni bambola creare un prodotto su Stripe:
- Nome, prezzo, immagine
- Impostare quantita = 1 (pezzo unico)

Oppure usare l'approccio attuale (price_data dinamico dall'API) che non richiede prodotti pre-creati.

### 3. Webhook Stripe (per marcare bambola come venduta)

Creare `app/api/webhook/route.ts`:

```ts
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature")!;

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body, sig, process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Webhook signature invalid" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const dollIds = session.metadata?.doll_ids?.split(",") ?? [];
    // TODO: marcare bambole come sold nel DB
    // Per ora: loggare e inviare email manuale
    console.log("ORDINE COMPLETATO:", dollIds, session.customer_details?.email);
  }

  return NextResponse.json({ received: true });
}
```

Configurare webhook su Stripe Dashboard:
- URL: https://dudidolls.vercel.app/api/webhook
- Events: checkout.session.completed

### 4. Email conferma ordine (Resend)

Installare: `npm install resend`

Aggiungere a `.env.local`: `RESEND_API_KEY=re_...`

Nel webhook, dopo checkout.session.completed, inviare email a:
- Cliente (session.customer_details.email)
- Simona (atelier@dudidolls.it) con dettagli ordine

---

## 🟡 FASE 3 — Database (ordini persistenti)

### Stack consigliato: Supabase + Prisma

```bash
npm install @supabase/supabase-js prisma @prisma/client
npx prisma init
```

Schema Prisma da creare (`prisma/schema.prisma`):

```prisma
model Order {
  id          String   @id @default(cuid())
  stripeId    String   @unique
  customerEmail String
  totalAmount Int      // in cents
  status      String   @default("pending")
  createdAt   DateTime @default(now())
  items       OrderItem[]
}

model OrderItem {
  id      String @id @default(cuid())
  orderId String
  order   Order  @relation(fields: [orderId], references: [id])
  dollId  String
  price   Int
}
```

Env vars aggiuntive:
```
DATABASE_URL=postgresql://...  # da Supabase
DIRECT_URL=postgresql://...
```

Nel webhook: creare Order + OrderItem dopo checkout.session.completed.
Poi aggiornare `sold: true` sulla bambola (o nel DB se migrato da data.ts).

---

## 🟡 FASE 4 — CMS prodotti (gestire bambole senza deploy)

### Opzione consigliata: Sanity CMS

```bash
npm install next-sanity @sanity/image-url
npx sanity@latest init --env
```

Schema bambola in Sanity (rimpiazza lib/data.ts):
- name, italic, price, sold, tag, desc, images[], edition, origin, materials, height, year, weight

Aggiungere alla Doll type:
- `weight: number` (grammi, per calcolo spedizioni)
- `dimensions: string`
- `sku: string`
- `category: string`

Migrare 8 bambole su Sanity Studio.
Aggiornare Gallery, DollCard, ProductDetail per usare Sanity fetch.

---

## 🟡 FASE 5 — SEO strutturato (JSON-LD)

In `app/product/[id]/page.tsx`, aggiungere Product schema:

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${doll.name} — ${doll.italic}`,
  description: doll.desc,
  image: `https://dudidolls.vercel.app${doll.images[0]}`,
  offers: {
    "@type": "Offer",
    price: doll.price,
    priceCurrency: "EUR",
    availability: doll.sold
      ? "https://schema.org/SoldOut"
      : "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "dudidolls" },
  },
};

// In JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

Aggiungere anche Organization schema in app/layout.tsx.

---

## 🟡 FASE 6 — Analytics

```bash
npm install @vercel/analytics @vercel/speed-insights
```

In `app/layout.tsx`:
```tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// nel body dopo LenisProvider:
<Analytics />
<SpeedInsights />
```

---

## 🟢 FASE 7 — Features extra (post-lancio)

### Wishlist
- Zustand store: `wishlist: string[]` (doll IDs)
- localStorage persist
- Cuore su DollCard (toggle)
- Pagina /wishlist

### Multi-lingua (IT/EN/DE)
- `npm install next-intl`
- Struttura: `app/[locale]/...`
- Traduzioni: `messages/it.json`, `messages/en.json`, `messages/de.json`
- Middleware per redirect lingua

### Immagini multiple per bambola
- Aggiungere 2-4 foto per ogni bambola in `public/foto/`
- Aggiornare `images[]` array in lib/data.ts (o Sanity)
- ProductDetail gia supporta multi-image gallery

### Zoom immagine
- `npm install yet-another-react-lightbox`
- Aggiungere su click immagine in ProductDetail

### Auth clienti (opzionale)
- Clerk o NextAuth
- Storico ordini
- Profilo cliente

---

## 📁 File chiave da conoscere

```
lib/data.ts          — Dati bambole (8 dolls hardcoded)
lib/store.ts         — Zustand: cart, drawer, modal, toast
lib/stripe.ts        — Stripe lazy singleton
app/api/checkout/    — Stripe checkout session API
app/layout.tsx       — Root layout (font, metadata, providers)
app/globals.css      — Tutto il CSS (unico file, ~600 righe)
components/product/  — DollCard, CartDrawer, ProductModal, ProductDetail
components/intro/    — HeroIntro (animazione scroll GSAP)
components/nav/      — Nav, MobileMenu
.env.local.example   — Template variabili ambiente
```

---

## ⚠️ NOTE IMPORTANTI

1. **Stripe in TEST mode**: usare chiavi `sk_test_` / `pk_test_` in dev, `sk_live_` / `pk_live_` in produzione
2. **`sold: boolean` in data.ts**: per ora manuale (cambiare `sold: true` e fare deploy dopo ogni vendita). Con DB/Sanity diventa automatico via webhook
3. **P.IVA 02938471055** gia in footer e privacy — verificare correttezza
4. **Email atelier@dudidolls.it** — configurare su dominio reale prima del lancio
5. **Dominio**: `dudidolls.vercel.app` → comprare `dudidolls.it` / `dudidolls.com` e aggiornare metadataBase in app/layout.tsx
6. **Spedizioni**: i prezzi in /spedizioni e in /api/checkout/route.ts devono essere allineati (ora lo sono: IT 8.90, EU 18.90, Mondo 29.90)
