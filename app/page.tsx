import Nav from "@/components/nav/Nav";
import MobileMenu from "@/components/nav/MobileMenu";
import HeroIntro from "@/components/intro/HeroIntro";
import HeroContent from "@/components/sections/HeroContent";
import Marquee from "@/components/sections/Marquee";
import Studio from "@/components/sections/Studio";
import Gallery from "@/components/sections/Gallery";
import Craft from "@/components/sections/Craft";
import Featured from "@/components/sections/Featured";
import Process from "@/components/sections/Process";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";
import { StitchDivider, Selvedge } from "@/components/motion/StitchDivider";
import CartDrawer from "@/components/product/CartDrawer";
import ProductModal from "@/components/product/ProductModal";
import Toast from "@/components/product/Toast";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { getAllDolls } from "@/lib/sanity.queries";

export default async function Home() {
  const dolls = await getAllDolls();
  return (
    <>
      <ScrollProgress />
      <Nav />
      <MobileMenu />
      <HeroIntro>
        <HeroContent />
      </HeroIntro>

      <Marquee />
      <Selvedge />
      <Studio />
      <StitchDivider id="01" label="taglio · imbastitura · rifinitura" />
      <Gallery dolls={dolls} />
      <StitchDivider id="02" label="il rituale del fare" />
      <Craft />
      <StitchDivider id="03" label="vivagno · margine 1,5 cm" />
      <Featured />
      <Process />
      <Newsletter />
      <Footer />

      <CartDrawer />
      <ProductModal />
      <Toast />
    </>
  );
}
