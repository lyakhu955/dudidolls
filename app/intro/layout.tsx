import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "dudidolls · intro concepts",
  robots: { index: false, follow: false },
};

export default function IntroLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="intro-demo-nav" aria-label="Concept demo navigation">
        <Link href="/" className="intro-demo-nav-back">
          ← dudidolls
        </Link>
        <span className="intro-demo-nav-divider" />
        <Link href="/intro/eye" className="intro-demo-nav-link">
          A · eye
        </Link>
        <Link href="/intro/atelier" className="intro-demo-nav-link">
          B · atelier
        </Link>
        <Link href="/intro/curtain" className="intro-demo-nav-link">
          C · curtain
        </Link>
      </nav>
      {children}
    </>
  );
}
