import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Briefcase,
  Landmark,
  Check,
  ArrowRight,
  Users,
  Home,
  GraduationCap,
  ShoppingBag,
  Hotel,
  Hospital,
  HardHat,
  Store,
  MapPin,
} from "lucide-react";

const audiences = [
  { icon: Home, label: "Residential buildings" },
  { icon: Users, label: "Property managers" },
  { icon: GraduationCap, label: "Universities" },
  { icon: ShoppingBag, label: "Shopping centres" },
  { icon: Hotel, label: "Hotels" },
  { icon: Hospital, label: "Hospitals" },
  { icon: HardHat, label: "Construction companies" },
  { icon: Store, label: "Large commercial premises" },
  { icon: MapPin, label: "Neighbourhood organisations" },
];

const plans = [
  {
    icon: Users,
    name: "Punto Vivo Community",
    price: "$0–50",
    period: "/month",
    tagline: "For smaller residential & community users",
    features: [
      "Bulky-waste requests",
      "Collection scheduling",
      "Disposal guidance",
      "Building / community dashboard",
      "Monthly waste report",
      "Vivos / rewards",
    ],
    highlighted: false,
  },
  {
    icon: Briefcase,
    name: "Punto Vivo Business",
    price: "$100–200",
    period: "/month",
    tagline: "For businesses & property managers",
    features: [
      "Multiple users",
      "Multiple locations",
      "Priority collection coordination",
      "Waste tracking",
      "Disposal records",
      "Monthly sustainability report",
      "Recovery / recycling reporting",
      "Dashboard",
    ],
    highlighted: true,
  },
  {
    icon: Landmark,
    name: "Punto Vivo Enterprise",
    price: "$300+",
    period: "/month",
    tagline: "For larger organisations",
    features: [
      "Multiple properties",
      "Advanced analytics",
      "API / integration",
      "Dedicated support",
      "Waste-generation analytics",
      "Recovery metrics",
      "Location-based hotspot intelligence",
      "ESG / sustainability reporting",
    ],
    highlighted: false,
  },
];

const Plans = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 md:pt-36 pb-24">
        {/* Hero */}
        <section className="container mx-auto px-4 md:px-6 max-w-6xl">
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
              Subscriptions
            </p>
            <h1 className="font-lora text-4xl md:text-6xl font-bold leading-tight mb-6">
              Punto Vivo for{" "}
              <span className="text-gradient-brand">Organisations</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-4">
              A monthly or annual subscription to manage bulky waste — from a
              single residential building to a city-wide property portfolio.
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-2xl">
              Citizens use Punto Vivo for free. The prices below are proposed
              pricing assumptions, not final rates.
            </p>
          </ScrollReveal>
        </section>

        {/* Who it's for */}
        <section className="container mx-auto px-4 md:px-6 max-w-6xl mt-16">
          <ScrollReveal>
            <h2 className="font-lora text-2xl md:text-3xl font-semibold mb-8">
              Who it's for
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {audiences.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-4"
                >
                  <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Pricing tiers */}
        <section className="container mx-auto px-4 md:px-6 max-w-6xl mt-20">
          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                    plan.highlighted
                      ? "border-primary/60 bg-card shadow-[0_0_40px_hsl(var(--primary)/0.12)] md:-translate-y-2"
                      : "border-border bg-card/60"
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Most popular
                    </span>
                  )}
                  <plan.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-lora text-xl font-semibold mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {plan.tagline}
                  </p>
                  <div className="mb-6">
                    <span className="font-lora text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/90">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={plan.highlighted ? "default" : "outline"}
                    className="w-full"
                  >
                    <a href="/contact">
                      Get started <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Citizen free note */}
          <ScrollReveal delay={100}>
            <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-8 flex flex-col md:flex-row md:items-center gap-6">
              <Building2 className="h-10 w-10 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-lora text-xl font-semibold mb-2">
                  Citizens always ride free
                </h3>
                <p className="text-muted-foreground text-sm max-w-2xl">
                  Individual residents request bulky-waste collection at no
                  cost. Subscriptions are for the buildings, businesses and
                  organisations that coordinate waste at scale.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Plans;
