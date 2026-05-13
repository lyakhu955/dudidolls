"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode, type ElementType } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  children: ReactNode;
};

export default function Reveal({ as: Tag = "div", className = "", style, delay = 0, children }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.unobserve(el);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={`reveal ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
