import HeroLightRays from "./HeroLightRays";
import { useScrollParallax } from "@/hooks/use-parallax";
import { ArrowDown, ArrowRight, BrainCircuit, Camera, Database, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/punto-vivo-logo.png.asset.json";

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
          <h1 
            className="mx-auto mb-6 max-w-5xl text-4xl font-extrabold leading-[1.03] opacity-0 sm:text-5xl md:text-7xl"
            style={{ 
              animation: 'heroFadeIn 0.7s ease-out 0.3s forwards',
              transform: `translateY(${headlineParallax}px)`,
            }}
          >
            Transforming Bogota, <span className="text-gradient-brand">Columbia</span> through bulky waste management
          </h1>
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
          <div className="mx-auto grid max-w-4xl gap-px border border-border bg-border text-left opacity-0 sm:grid-cols-3" style={{ animation: 'heroFadeIn 0.6s ease-out 0.8s forwards' }}>
            {[
              [Camera, "847", "active city cameras"],
              [BrainCircuit, "91.4%", "global AI precision"],
              [Database, "3.2M", "historical records"],
            ].map(([Icon, value, label]) => {
              const StatIcon = Icon as typeof Camera;
              return <div key={String(label)} className="flex items-center gap-4 bg-background/70 px-5 py-4 backdrop-blur-md">
                <StatIcon className="h-5 w-5 text-primary" />
                <div><div className="text-xl font-bold">{String(value)}</div><div className="font-mono text-[10px] uppercase text-muted-foreground">{String(label)}</div></div>
              </div>;
            })}
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