import { cn } from "@/lib/utils";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ showText = true, size = "md", className }: LogoProps) => {
  const sizes = {
    sm: { icon: 24, text: "text-base" },
    md: { icon: 32, text: "text-lg" },
    lg: { icon: 40, text: "text-xl" },
  };

  const { icon: iconSize, text: textSize } = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5 group/logo", className)}>
      {/* Icon Mark - flat-bottom rounded rectangle for optical balance */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        {/* Rounded rectangle container - no tail for horizontal lockup */}
        <rect
          x="4"
          y="4"
          width="24"
          height="24"
          rx="6"
          fill="hsl(var(--primary))"
        />
        
        {/* Prompt caret + cursor group */}
        <g className="transition-transform duration-200 ease-out">
          {/* Prompt caret */}
          <path
            d="M10 11L15 16L10 21"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover/logo:translate-x-0.5 transition-transform duration-200"
          />
          
          {/* Cursor line */}
          <path
            d="M19 11V21"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="opacity-90 group-hover/logo:animate-cursor-blink"
          />
        </g>
      </svg>

      {/* Wordmark - clean, upright, confident */}
      {showText && (
        <span className={cn("font-bold text-foreground tracking-tight", textSize)}>
          <span className="font-extrabold">P</span>
          <span>rompt</span>
          <span className="text-primary font-semibold">Master</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
