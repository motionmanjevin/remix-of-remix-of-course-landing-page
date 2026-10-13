import { cn } from "@/lib/utils";
import logoUrl from "@/assets/punto-vivo-logo.png";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ showText = true, size = "md", className }: LogoProps) => {
  const sizes = {
    sm: { icon: "h-7 w-7", text: "text-base" },
    md: { icon: "h-9 w-9", text: "text-lg" },
    lg: { icon: "h-11 w-11", text: "text-xl" },
  };

  const { icon: iconSize, text: textSize } = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5 group/logo", className)}>
      <img src={logoUrl} alt="" className={cn("flex-shrink-0 object-contain object-top", iconSize)} aria-hidden="true" />

      {/* Wordmark - clean, upright, confident */}
      {showText && (
        <span className={cn("font-bold text-foreground tracking-tight", textSize)}>
          <span className="font-extrabold">PUNTO</span>{" "}
          <span className="text-primary font-semibold">VIVO</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
