"use client";
import { useState, type FormEvent } from "react";
import Reveal from "@/components/motion/Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (done) return;
    const trimmed = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (valid) setDone(true);
  };

  return (
    <section className="news">
      <Reveal>
        <h2>
          Una lettera <span className="it">ogni stagione.</span>
          <br />
          Niente di più.
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <form onSubmit={submit}>
          <input
            type="email"
            placeholder={done ? "Grazie, ci leggiamo a giugno." : "la tua email"}
            value={done ? "" : email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">{done ? "↻" : "Iscriviti →"}</button>
        </form>
        <div className="micro">Quattro lettere all&apos;anno · annulla l&apos;iscrizione quando vuoi</div>
      </Reveal>
    </section>
  );
}
