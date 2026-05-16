import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/nav/Nav";
import MobileMenu from "@/components/nav/MobileMenu";
import MobileBottomBar from "@/components/nav/MobileBottomBar";
import CartDrawer from "@/components/product/CartDrawer";
import ProductModal from "@/components/product/ProductModal";
import Toast from "@/components/product/Toast";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";
import ProductDetail from "@/components/product/ProductDetail";
import OtherDolls from "@/components/product/OtherDolls";
import { getDollById, getAllDolls } from "@/lib/sanity.queries";

type Params = { id: string };

export async function generateStaticParams(): Promise<Params[]> {
  const dolls = await getAllDolls();
  return dolls.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const doll = await getDollById(id);
  if (!doll) return { title: "dudidolls" };
  return {
    title: `dudidolls — ${doll.name}`,
    description: doll.desc,
    openGraph: {
      images: [`https://dudidolls.vercel.app${doll.images[0]}`],
    },
    twitter: {
      card: "summary_large_image",
      images: [`https://dudidolls.vercel.app${doll.images[0]}`],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const doll = await getDollById(id);
  if (!doll) notFound();

  const allDolls = await getAllDolls();

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Nav />
      <MobileMenu />
      <MobileBottomBar />
      <ProductDetail doll={doll} />
      <OtherDolls excludeId={doll.id} dolls={allDolls} />
      <Footer />

      <CartDrawer />
      <ProductModal />
      <Toast />
    </>
  );
}
