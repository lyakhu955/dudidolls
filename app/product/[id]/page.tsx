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
import { DOLLS, findDoll } from "@/lib/data";

type Params = { id: string };

export async function generateStaticParams(): Promise<Params[]> {
  return DOLLS.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const doll = findDoll(id);
  if (!doll) return { title: "dudidolls" };
  return {
    title: `dudidolls — ${doll.name}`,
    description: doll.desc,
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const doll = findDoll(id);
  if (!doll) notFound();

  return (
    <>
      <ScrollProgress />
      <Nav />
      <MobileMenu />
      <MobileBottomBar />
      <ProductDetail doll={doll} />
      <OtherDolls excludeId={doll.id} />
      <Footer />

      <CartDrawer />
      <ProductModal />
      <Toast />
    </>
  );
}
