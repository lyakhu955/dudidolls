import HeroIntroCurtain from "@/components/intro/HeroIntroCurtain";
import HeroContentDemo from "@/components/intro/HeroContentDemo";

export default function IntroCurtainPage() {
  return (
    <main className="intro-demo-page">
      <HeroIntroCurtain>
        <HeroContentDemo concept="curtain" />
      </HeroIntroCurtain>
      <section className="intro-demo-spacer">
        <p>fine demo · concept C — sipario editoriale</p>
      </section>
    </main>
  );
}
