import { useScrollParallax } from '@/hooks/use-parallax';

const HeroLightRays = () => {
  const scrollOffset = useScrollParallax(0.15);
  const gridOffset = useScrollParallax(0.05);

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Base dark layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: `hsl(var(--background))`,
        }}
      />

      {/* Animated ray container with parallax */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollOffset * 0.5}px)`,
          willChange: 'transform',
        }}
      >
        {/* Ray 1 - Center left */}
        <div 
          className="absolute top-0 left-1/2 origin-top animate-ray-sway-1"
          style={{
            width: '300px',
            height: '120%',
            transform: `translateX(-50%) rotate(-25deg) translateY(${scrollOffset * 0.3}px)`,
            background: `linear-gradient(
              to bottom,
               hsl(var(--primary) / 0.42) 0%,
               hsl(var(--accent) / 0.28) 30%,
               hsl(var(--primary) / 0.10) 60%,
              transparent 100%
            )`,
            filter: 'blur(40px)',
          }}
        />

        {/* Ray 2 - Center */}
        <div 
          className="absolute top-0 left-1/2 origin-top animate-ray-sway-2"
          style={{
            width: '280px',
            height: '120%',
            transform: `translateX(-50%) rotate(-8deg) translateY(${scrollOffset * 0.2}px)`,
            background: `linear-gradient(
              to bottom,
               hsl(var(--primary) / 0.5) 0%,
               hsl(var(--primary) / 0.3) 25%,
               hsl(var(--accent) / 0.12) 55%,
              transparent 100%
            )`,
            filter: 'blur(35px)',
          }}
        />

        {/* Ray 3 - Center right */}
        <div 
          className="absolute top-0 left-1/2 origin-top animate-ray-sway-3"
          style={{
            width: '260px',
            height: '120%',
            transform: `translateX(-50%) rotate(12deg) translateY(${scrollOffset * 0.35}px)`,
            background: `linear-gradient(
              to bottom,
               hsl(var(--accent) / 0.48) 0%,
               hsl(var(--primary) / 0.28) 28%,
               hsl(var(--accent) / 0.1) 58%,
              transparent 100%
            )`,
            filter: 'blur(38px)',
          }}
        />

        {/* Ray 4 - Far left */}
        <div 
          className="absolute top-0 left-1/2 origin-top animate-ray-sway-4"
          style={{
            width: '220px',
            height: '110%',
            transform: `translateX(-50%) rotate(-42deg) translateY(${scrollOffset * 0.4}px)`,
            background: `linear-gradient(
              to bottom,
               hsl(var(--primary) / 0.36) 0%,
               hsl(var(--accent) / 0.2) 35%,
               hsl(var(--primary) / 0.08) 65%,
              transparent 100%
            )`,
            filter: 'blur(45px)',
          }}
        />

        {/* Ray 5 - Far right */}
        <div 
          className="absolute top-0 left-1/2 origin-top animate-ray-sway-5"
          style={{
            width: '240px',
            height: '110%',
            transform: `translateX(-50%) rotate(35deg) translateY(${scrollOffset * 0.25}px)`,
            background: `linear-gradient(
              to bottom,
               hsl(var(--accent) / 0.4) 0%,
               hsl(var(--primary) / 0.22) 32%,
               hsl(var(--accent) / 0.08) 62%,
              transparent 100%
            )`,
            filter: 'blur(42px)',
          }}
        />

        {/* Ray 6 - Extra left */}
        <div 
          className="absolute top-0 left-1/2 origin-top animate-ray-sway-6"
          style={{
            width: '180px',
            height: '100%',
            transform: `translateX(-50%) rotate(-58deg) translateY(${scrollOffset * 0.45}px)`,
            background: `linear-gradient(
              to bottom,
               hsl(var(--primary) / 0.3) 0%,
               hsl(var(--accent) / 0.14) 40%,
              transparent 80%
            )`,
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Top glow source with parallax */}
      <div 
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[140%] h-[350px] animate-glow-breathe"
        style={{
          transform: `translateX(-50%) translateY(${scrollOffset * 0.1}px)`,
          background: `radial-gradient(
            ellipse 70% 100% at 50% 0%,
             hsl(var(--primary) / 0.5) 0%,
             hsl(var(--accent) / 0.3) 30%,
             hsl(var(--primary) / 0.1) 60%,
            transparent 100%
          )`,
          willChange: 'transform',
        }}
      />

      {/* Grid texture overlay with subtle parallax */}
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
             linear-gradient(hsl(var(--primary) / 0.18) 1px, transparent 1px),
             linear-gradient(90deg, hsl(var(--primary) / 0.18) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: `0 ${gridOffset}px`,
          willChange: 'background-position',
        }}
      />

      {/* Bottom fade to background */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background: `linear-gradient(to top, 
            hsl(var(--background)) 0%, 
            hsl(var(--background) / 0.8) 40%,
            transparent 100%
          )`,
        }}
      />
    </div>
  );
};

export default HeroLightRays;
