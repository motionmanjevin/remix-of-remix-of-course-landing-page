import HeroLightRays from "./HeroLightRays";
import { useScrollParallax } from "@/hooks/use-parallax";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/punto-vivo-logo.png.asset.json";
import { useEffect, useState } from "react";

const HEADLINE_SEGMENTS: { text: string; gradient: boolean }[] = [
  { text: "Integrated Smart ", gradient: false },
  { text: "Bulky-Waste Management", gradient: true },
  { text: " for Bogotá", gradient: false },
];

const FULL_TEXT = HEADLINE_SEGMENTS.map((s) => s.text).join("");

function TypewriterHeadline({ parallax }: { parallax: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= FULL_TEXT.length) {
      // Pause briefly while the full line is visible, then restart from the top.
      const t = setTimeout(() => setCount(0), 2600);
      return () => clearTimeout(t);
    }
    const speed = FULL_TEXT[count - 1] === " " ? 60 : 38;
    const t = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [count]);

  // Walk the segments, emitting only the characters revealed so far.
  let remaining = count;
  const parts: { text: string; gradient: boolean }[] = [];
  for (const seg of HEADLINE_SEGMENTS) {
    if (remaining <= 0) break;
    const take = Math.min(remaining, seg.text.length);
    parts.push({ text: seg.text.slice(0, take), gradient: seg.gradient });
    remaining -= take;
  }
  const done = count >= FULL_TEXT.length;

  return (
    <h1
      className="mx-auto mb-6 max-w-5xl text-4xl font-extrabold leading-[1.03] sm:text-5xl md:text-7xl"
      style={{
        transform: `translateY(${parallax}px)`,
      }}
    >
      {parts.map((p, i) =>
        p.gradient ? (
          <span key={i} className="text-gradient-brand">{p.text}</span>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
      <span
        className="inline-block w-[0.6ch] -ml-1 animate-pulse text-primary"
        style={{ opacity: done ? 0 : 1, transition: "opacity 0.4s ease" }}
        aria-hidden="true"
      >
        |
      </span>
    </h1>
  );
}

const HeroSection = () => {
  const headlineParallax = useScrollParallax(0.08);
  const subheadlineParallax = useScrollParallax(0.05);

  return (
    <section className="relative min-h-[94vh] flex flex-col overflow-hidden">
      <HeroLightRays />
      <div className="container relative z-10 mx-auto flex flex-1 items-center px-4 pb-20 pt-28 md:px-6 md:pt-32">
        <div className="mx-auto w-full max-w-6xl text-center">
          <img src={logoAsset.url} alt="Punto Vivo" className="mx-auto mb-8 h-auto w-40 sm:w-52 opacity-0" style={{ animation: 'heroFadeIn 0.6s ease-out 0.1s forwards' }} />
          <div 
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 opacity-0 backdrop-blur-md"
            style={{ animation: 'heroFadeIn 0.6s ease-out 0.2s forwards' }}
          >
            <span className="h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-primary" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase text-foreground">Bogotá · Intelligent waste operations</span>
          </div>
          <div className="opacity-0" style={{ animation: 'heroFadeIn 0.5s ease-out 0.3s forwards' }}>
            <TypewriterHeadline parallax={headlineParallax} />
          </div>
          <p 
            className="mx-auto mb-9 max-w-2xl px-2 text-base leading-relaxed text-muted-foreground opacity-0 sm:text-lg md:text-xl"
            style={{ 
              animation: 'heroFadeIn 0.6s ease-out 0.45s forwards',
              transform: `translateY(${subheadlineParallax}px)`,
            }}
          >
            One connected platform for reporting, classifying, dispatching and predicting bulky waste across the city.
          </p>
          <div 
            className="mb-14 flex flex-col items-center justify-center gap-3 opacity-0 sm:flex-row"
            style={{ animation: 'heroFadeIn 0.6s ease-out 0.65s forwards' }}
          >
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#system">Explore the system <ArrowRight /></a>
            </Button>
            <Button asChild size="lg" variant="outline"><a href="/contact">Partner with us</a></Button>
          </div>
        </div>
      </div>
      <a href="#system" aria-label="View the Punto Vivo system" className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-primary"><ArrowDown className="h-5 w-5 animate-bounce" /></a>

      <style>{`
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;