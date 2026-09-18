import { useState } from "react";
import { Link } from "react-router-dom";
import { EnrollButton } from "@/components/EnrollButton";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Clock, Users } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

const individualFeatures = [
  "6 weeks of structured, live instruction",
  "Private community of 2,000+ AI practitioners",
  "1-on-1 feedback on your capstone project",
  "Lifetime access to all future updates",
  "Official PromptMaster certification"
];

const teamFeatures = [
  "Everything in Individual, plus:",
  "Team onboarding session with your org",
  "Shared team workspace & dashboard",
  "Priority instructor support",
  "Bulk certification & centralized billing"
];

// Pricing configuration
const INDIVIDUAL_PRICE = 499;
const INDIVIDUAL_INSTALLMENT_MONTHS = 3;
const INDIVIDUAL_INSTALLMENT_TOTAL = 525;
const INDIVIDUAL_MONTHLY = Math.round(INDIVIDUAL_INSTALLMENT_TOTAL / INDIVIDUAL_INSTALLMENT_MONTHS);

const TEAM_PRICE = 1999;

const AnimatedPrice = ({
  value,
  prefix = "$",
  isVisible
}: {
  value: number;
  prefix?: string;
  isVisible: boolean;
}) => {
  const {
    ref,
    formattedCount
  } = useCountUp({
    end: value,
    duration: 1.4
  });
  
  return (
    <span 
      ref={ref} 
      className={cn(
        "text-4xl md:text-5xl font-bold text-foreground font-lora transition-all duration-300 ease-in-out",
        isVisible ? "opacity-100 transform-none" : "opacity-0 scale-95"
      )}
    >
      {prefix}{formattedCount}
    </span>
  );
};

type PaymentType = "full" | "installments";

const SAVINGS_AMOUNT = INDIVIDUAL_INSTALLMENT_TOTAL - INDIVIDUAL_PRICE; // $26

const PaymentToggle = ({ 
  activePayment,
  onToggle
}: { 
  activePayment: PaymentType;
  onToggle: (payment: PaymentType) => void;
}) => {
  const activeIndex = activePayment === "full" ? 0 : 1;
  
  return (
    <div className="flex flex-col items-center gap-2 mb-6">
      {/* Toggle */}
      <div 
        className="relative inline-flex items-center h-14 bg-muted/50 backdrop-blur-sm border border-border/50 rounded-full p-1"
        role="tablist"
        aria-label="Select payment option"
      >
          {/* Sliding background indicator */}
          <div 
            className={cn(
              "absolute top-1 bottom-1 rounded-full bg-primary/20 border border-primary/40 transition-all duration-250 ease-in-out",
              activeIndex === 0 
                ? "left-1 w-[calc(50%-4px)]" 
                : "left-[calc(50%)] w-[calc(50%-4px)]"
            )}
            aria-hidden="true"
          />
          
          <button
            role="tab"
            aria-selected={activePayment === "full"}
            aria-label={`Pay in full, save $${SAVINGS_AMOUNT}`}
            tabIndex={activePayment === "full" ? 0 : -1}
            onClick={() => onToggle("full")}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") onToggle("installments");
              if (e.key === "ArrowLeft") onToggle("full");
            }}
            className={cn(
              "relative z-10 w-1/2 h-full flex items-center justify-center px-5 md:px-6 text-base leading-none font-semibold rounded-full transition-colors duration-200",
              activePayment === "full" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Pay in full
            {/* Savings badge */}
            <div 
              className={cn(
                "absolute -top-2 -right-1 z-30 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full transition-all duration-300 ease-in-out whitespace-nowrap",
                activePayment === "full" 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-90"
              )}
              aria-hidden={activePayment !== "full"}
            >
              Save ${SAVINGS_AMOUNT}
            </div>
          </button>
          
          <button
            role="tab"
            aria-selected={activePayment === "installments"}
            tabIndex={activePayment === "installments" ? 0 : -1}
            onClick={() => onToggle("installments")}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") onToggle("installments");
              if (e.key === "ArrowLeft") onToggle("full");
            }}
            className={cn(
              "relative z-10 w-1/2 h-full flex items-center justify-center px-5 md:px-6 text-base leading-none font-semibold rounded-full transition-colors duration-200",
              activePayment === "installments" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Pay in installments
          </button>
        </div>
      
      <p className="text-xs text-muted-foreground/70">
        Choose how you'd like to pay
      </p>
    </div>
  );
};

const PricingSection = () => {
  const [activePayment, setActivePayment] = useState<PaymentType>("full");
  
  const isFullPayment = activePayment === "full";
  const isInstallments = activePayment === "installments";

  return (
    <section id="pricing" className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Invest in your <span className="text-primary font-lora">future</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One program. Everything you need to become AI-fluent.
          </p>
        </div>

        {/* Payment Toggle */}
        <PaymentToggle 
          activePayment={activePayment}
          onToggle={setActivePayment}
        />

        {/* Pricing Cards Grid */}
        <div 
          className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {/* Individual Plan - Primary */}
          <div 
            className="group bg-card border-2 border-primary rounded-2xl p-6 md:p-7 relative overflow-hidden flex flex-col transition-all duration-300 ease-in-out shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_0_40px_-5px_hsl(var(--primary)/0.4)]"
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-[-100%] bg-[linear-gradient(90deg,transparent_0%,transparent_40%,hsl(var(--primary)/0.15)_50%,transparent_60%,transparent_100%)] animate-shimmer" />
            </div>
            
            {/* Limited Offer badge */}
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-0.5 rounded-bl-lg z-20">
              Limited Offer 
            </div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Plan name */}
              <div className="text-sm font-medium text-primary mb-3">
                Individual
              </div>

              {/* Price Block - Fixed height to prevent layout jump */}
              <div className="mb-4 h-[90px]">
                <div className="relative">
                  {/* Full payment price */}
                  <div className={cn(
                    "transition-all duration-300 ease-in-out",
                    isFullPayment 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 -translate-y-2 absolute inset-0 pointer-events-none"
                  )}>
                    <div className="mb-1">
                      <AnimatedPrice value={INDIVIDUAL_PRICE} isVisible={isFullPayment} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      One-time payment • Lifetime access
                    </p>
                  </div>
                  
                  {/* Installment price */}
                  <div className={cn(
                    "transition-all duration-300 ease-in-out",
                    isInstallments 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-2 absolute inset-0 pointer-events-none"
                  )}>
                    <div className="mb-1">
                      <AnimatedPrice value={INDIVIDUAL_MONTHLY} isVisible={isInstallments} />
                      <span className="text-lg text-muted-foreground font-medium ml-1">
                        /mo × {INDIVIDUAL_INSTALLMENT_MONTHS} months
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Total: ${INDIVIDUAL_INSTALLMENT_TOTAL}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Includes a small processing fee
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-5 flex-1">
                {individualFeatures.map((feature, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto">
                <EnrollButton 
                  size="lg" 
                  fullWidth 
                  label="Enroll as Individual" 
                  onClick={() => window.open("https://www.teachable.com", "_blank")} 
                />

                {/* Guarantee */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-3.5 h-3.5 text-primary" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Plan - Secondary */}
          <div 
            className="group bg-card border border-border rounded-2xl p-6 md:p-7 relative overflow-hidden flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-[-100%] bg-[linear-gradient(90deg,transparent_0%,transparent_40%,hsl(var(--primary)/0.12)_50%,transparent_60%,transparent_100%)] animate-shimmer" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              {/* Plan name */}
              <div className="text-sm font-medium text-muted-foreground mb-3">
                Team
              </div>

              {/* Price Block - Fixed height to prevent layout jump */}
              <div className="mb-4 h-[90px]">
                <div className="relative">
                  {/* Full payment price */}
                  <div className={cn(
                    "transition-all duration-300 ease-in-out",
                    isFullPayment 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 -translate-y-2 absolute inset-0 pointer-events-none"
                  )}>
                    <div className="mb-1">
                      <AnimatedPrice value={TEAM_PRICE} isVisible={isFullPayment} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      For teams of 5–10 • Volume pricing available
                    </p>
                  </div>
                  
                  {/* Installment info */}
                  <div className={cn(
                    "transition-all duration-300 ease-in-out",
                    isInstallments 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-2 absolute inset-0 pointer-events-none"
                  )}>
                    <div className="text-4xl md:text-5xl font-bold text-foreground font-lora mb-1">
                      Custom
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Custom installments — contact sales
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Flexible payment plans for your organization
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-5 flex-1">
                {teamFeatures.map((feature, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className={cn(
                      "text-sm",
                      index === 0 ? "text-primary font-medium" : "text-foreground"
                    )}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto">
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full h-14 px-8 text-base font-medium rounded-lg border-primary/30 hover:bg-primary/10 hover:-translate-y-px transition-all duration-150 ease-out active:translate-y-0 active:duration-75"
                >
                  <Link to="/contact">Contact Sales →</Link>
                </Button>

                {/* Note */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <span>Custom packages for 10+ seats</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm text-foreground">Next cohort starts January 27</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm text-foreground">Only 50 spots available</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
