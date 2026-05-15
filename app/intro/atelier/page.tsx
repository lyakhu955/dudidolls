import HeroIntroAtelier from "@/components/intro/HeroIntroAtelier";
import HeroContentDemo from "@/components/intro/HeroContentDemo";

export default function IntroAtelierPage() {
  return (
    <main className="intro-demo-page">
      <HeroIntroAtelier>
        <HeroContentDemo concept="atelier" />
      </HeroIntroAtelier>
      <section className="intro-demo-spacer">
        <p>fine demo · concept B — atelier stop-motion</p>
      </section>
    </main>
  );
}
