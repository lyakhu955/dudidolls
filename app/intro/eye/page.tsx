import HeroIntroEye from "@/components/intro/HeroIntroEye";
import HeroContentDemo from "@/components/intro/HeroContentDemo";

export default function IntroEyePage() {
  return (
    <main className="intro-demo-page">
      <HeroIntroEye>
        <HeroContentDemo concept="eye" />
      </HeroIntroEye>
      <section className="intro-demo-spacer">
        <p>fine demo · concept A — l&apos;occhio magico</p>
      </section>
    </main>
  );
}
