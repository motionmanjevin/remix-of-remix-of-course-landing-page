import { useRef, useEffect, useState, lazy, Suspense } from "react";
import { EnrollButton } from "@/components/EnrollButton";
import { useScrollParallax } from "@/hooks/use-parallax";

// Lazy load the globe for performance
const InteractiveGlobe = lazy(() => import("@/components/InteractiveGlobe"));

const FinalCTASection = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const parallaxOffset = useScrollParallax(0.08);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative pt-12 md:pt-20 pb-0 -mb-8 overflow-visible">
      {/* Single unified gradient background - similar to hero */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `hsl(var(--background))`,
        }}
      />

      {/* Globe glow - positioned to appear behind the globe - with parallax */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[80%] pointer-events-none animate-glow-breathe"
        style={{
          transform: `translate3d(0, ${-parallaxOffset * 0.3}px, 0)`,
          background: `radial-gradient(
            ellipse 90% 100% at 50% 100%,
            hsl(24 95% 55% / 0.6) 0%,
            hsl(24 95% 50% / 0.35) 25%,
            hsl(24 95% 45% / 0.15) 50%,
            transparent 75%
          )`,
          willChange: 'transform',
        }}
      />

      {/* Subtle rays emanating upward from globe - with parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center">
        <div 
          className="absolute bottom-0 origin-bottom"
          style={{
            width: '250px',
            height: '70%',
            transform: `translate3d(-50%, ${-parallaxOffset * 0.4}px, 0) rotate(-12deg)`,
            background: `linear-gradient(
              to top,
              hsl(24 95% 50% / 0.25) 0%,
              hsl(24 95% 45% / 0.1) 50%,
              transparent 80%
            )`,
            filter: 'blur(50px)',
            willChange: 'transform',
          }}
        />
        <div 
          className="absolute bottom-0 origin-bottom"
          style={{
            width: '220px',
            height: '65%',
            transform: `translate3d(50%, ${-parallaxOffset * 0.5}px, 0) rotate(15deg)`,
            background: `linear-gradient(
              to top,
              hsl(24 95% 52% / 0.2) 0%,
              hsl(24 95% 45% / 0.08) 55%,
              transparent 85%
            )`,
            filter: 'blur(45px)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* CTA Content - Above Globe */}
        <div className="max-w-5xl mx-auto mb-10">
          <div 
            ref={contentRef}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-700 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Left column - Headline and CTA */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-3 sm:mb-4">
                Start learning{" "}
                <span className="text-primary font-lora">today</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-5 sm:mb-6">
                Get ahead of everyone else changing the game right now.
              </p>

              <EnrollButton size="lg" fullWidthMobile />
            </div>

            {/* Right column - Benefits list */}
            <div className="space-y-2 sm:space-y-3">
              {[
                "30-day money-back guarantee",
                "Lifetime access & updates",
                "Access to private community",
                "Certificate of completion"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full border border-primary/50 flex items-center justify-center">
                    <svg 
                      className="w-3 h-3 text-primary" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Globe Section - Below CTA */}
        <div className="text-center mb-3 sm:mb-4">
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            2,000+ professionals learning from around the world
          </p>
        </div>
        
        {/* Globe viewport - fixed dimensions, no CLS */}
        <div className="relative overflow-visible mx-auto w-full h-[280px] md:h-[350px] pt-8 md:pt-16">
          {/* Globe anchor - absolutely positioned, centered, fixed size */}
          <div 
            className="absolute h-[560px] md:h-[700px]"
            style={{
              /* Lock position from first paint - never changes */
              left: '50%',
              bottom: '-280px',
              width: '100%',
              maxWidth: '700px',
              /* Single transform baseline - GPU accelerated */
              transform: 'translate3d(-50%, 0, 0)',
              transformOrigin: 'center top',
              willChange: 'transform',
            }}
          >
            {/* Shimmer placeholder - always present, fades out */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                opacity: 1,
                transition: 'opacity 0.5s ease-out',
              }}
            >
              <div 
                className="rounded-full overflow-hidden"
                style={{
                  width: 'min(400px, 80vw)',
                  height: 'min(400px, 80vw)',
                  transform: 'translate3d(0, 0, 0)',
                }}
              >
                {/* Base dark sphere */}
                <div className="absolute inset-0 rounded-full bg-background" />
                
                {/* Shimmer effect */}
                <div 
                  className="absolute inset-0 rounded-full animate-shimmer"
                  style={{
                    background: `linear-gradient(
                      110deg,
                      transparent 30%,
                      hsl(var(--foreground) / 0.04) 45%,
                      hsl(var(--foreground) / 0.08) 50%,
                      hsl(var(--foreground) / 0.04) 55%,
                      transparent 70%
                    )`,
                    backgroundSize: '200% 100%',
                  }}
                />
                
                {/* Orange glow ring */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: `
                      inset 0 0 60px 20px hsl(24 95% 50% / 0.15),
                      0 0 80px 30px hsl(24 95% 50% / 0.2)
                    `,
                  }}
                />
                
                {/* Subtle dot pattern hint */}
                <div 
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle, hsl(var(--foreground) / 0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>
            </div>

            {/* Globe canvas - lazy loaded, fades in over placeholder */}
            <Suspense fallback={null}>
              <InteractiveGlobe />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
