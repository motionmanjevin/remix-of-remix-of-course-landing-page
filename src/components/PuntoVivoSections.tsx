import { ArrowRight, BrainCircuit, Camera, Check, CircleDot, MapPin, Radio, Recycle, Route, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const modules = [
  {
    number: "01",
    icon: CircleDot,
    title: "Waste reports",
    copy: "Citizens flag bulky waste with a location, category and description. AI validates the report and recommends the next action.",
    meta: "Report · classify · route",
  },
  {
    number: "02",
    icon: Truck,
    title: "Collection requests",
    copy: "Every approved report becomes a traceable work order, assigned to an agency or community collector and monitored through completion.",
    meta: "Assign · dispatch · verify",
  },
  {
    number: "03",
    icon: BrainCircuit,
    title: "AI prediction",
    copy: "A citywide detection layer combines camera feeds and public data to anticipate hotspots before they become critical.",
    meta: "Detect · predict · prevent",
  },
];

const stages = ["Report", "AI classification", "Agency review", "Scheduled", "En route", "Collected"];

export const SystemSection = () => (
  <section id="system" className="border-y border-border/70 bg-card/25 py-24 md:py-32">
    <div className="container mx-auto px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase text-primary">One connected system</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">From street report to verified collection.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:justify-self-end">
            Punto Vivo connects citizens, city operators, agencies and informal collectors in one operational loop for Bogotá’s bulky waste.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {modules.map((module) => (
            <article key={module.number} className="group bg-background p-7 transition-colors hover:bg-card md:p-9">
              <div className="mb-12 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">MODULE {module.number}</span>
                <module.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">{module.title}</h3>
              <p className="mb-8 min-h-24 leading-relaxed text-muted-foreground">{module.copy}</p>
              <div className="border-t border-border pt-4 font-mono text-xs uppercase text-primary">{module.meta}</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const OperationsSection = () => (
  <section id="operations" className="py-24 md:py-32">
    <div className="container mx-auto px-4 md:px-6">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-bold uppercase text-primary">Operational clarity</p>
          <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">Every collection, visible from start to finish.</h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            Dispatchers review the facts, assign the right team, confirm the exact pickup point and follow every status change in real time.
          </p>
          <ul className="space-y-4">
            {["Agency and community collector assignment", "GPS pickup location and route support", "Nine-stage monitoring with a complete activity log"].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15"><Check className="h-3 w-3 text-primary" /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <div className="font-mono text-xs text-muted-foreground">COLLECTION REQUEST</div>
              <div className="mt-1 font-bold">CR-2841 · Furniture</div>
            </div>
            <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs text-primary">EN ROUTE</span>
          </div>
          <div className="grid gap-px bg-border sm:grid-cols-[1.3fr_0.7fr]">
            <div className="relative min-h-72 overflow-hidden bg-secondary/40 p-6">
              <div className="absolute inset-0 city-grid opacity-40" />
              <div className="absolute left-[22%] top-[62%] h-px w-[58%] origin-left -rotate-[24deg] bg-primary/70" />
              <div className="absolute left-[38%] top-[42%] h-px w-[38%] origin-left rotate-[18deg] bg-primary/70" />
              <MapPin className="absolute left-[34%] top-[50%] h-8 w-8 text-primary drop-shadow-glow" />
              <Truck className="absolute right-[20%] top-[37%] h-7 w-7 text-foreground" />
              <div className="relative z-10 font-mono text-[10px] uppercase text-muted-foreground">Bogotá · Live route</div>
              <div className="absolute bottom-5 left-5 right-5 flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>4.7110° N</span><span>74.0721° W</span>
              </div>
            </div>
            <div className="bg-background p-5">
              <div className="mb-5 font-mono text-[10px] uppercase text-muted-foreground">Collection status</div>
              <div className="space-y-0">
                {stages.map((stage, index) => (
                  <div key={stage} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className={`h-2.5 w-2.5 rounded-full ${index <= 4 ? "bg-primary" : "bg-muted"}`} />
                      {index < stages.length - 1 && <span className={`h-7 w-px ${index < 4 ? "bg-primary/60" : "bg-border"}`} />}
                    </div>
                    <span className={`-mt-1 text-xs ${index === 4 ? "font-bold text-primary" : "text-muted-foreground"}`}>{stage}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <div className="text-2xl font-bold">18 min</div>
                <div className="text-xs text-muted-foreground">Estimated arrival</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const IntelligenceSection = () => (
  <section id="intelligence" className="border-y border-border/70 bg-card/25 py-24 md:py-32">
    <div className="container mx-auto px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase text-primary">Anticipatory city operations</p>
          <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">See the next hotspot before it forms.</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">Punto Vivo processes Bogotá’s public camera network and six external data streams to move collection from reactive response to prevention.</p>
        </div>
        <div className="grid gap-px border border-border bg-border md:grid-cols-4">
          {[
            ["91.4%", "Global precision", BrainCircuit],
            ["1.2s", "Detection latency", Radio],
            ["847", "Active cameras", Camera],
            ["6", "Connected data streams", Route],
          ].map(([value, label, Icon]) => {
            const MetricIcon = Icon as typeof BrainCircuit;
            return <div key={String(label)} className="bg-background p-7">
              <MetricIcon className="mb-10 h-5 w-5 text-primary" />
              <div className="mb-2 text-4xl font-bold">{String(value)}</div>
              <div className="font-mono text-[10px] uppercase text-muted-foreground">{String(label)}</div>
            </div>;
          })}
        </div>
        <div className="mt-px grid gap-px bg-border md:grid-cols-3">
          {["CCTV + computer vision", "Geo-indexed hotspot prediction", "Monthly learning from outcomes"].map((item, index) => (
            <div key={item} className="flex items-center gap-4 bg-card p-6">
              <span className="font-mono text-xs text-primary">0{index + 1}</span>
              <span className="text-sm font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const WorkflowSection = () => (
  <section id="workflow" className="py-24 md:py-32">
    <div className="container mx-auto px-4 md:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <Recycle className="mx-auto mb-7 h-10 w-10 text-primary" />
        <p className="mb-4 text-xs font-bold uppercase text-primary">The connected workflow</p>
        <h2 className="mx-auto mb-6 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">Every completed collection makes the system smarter.</h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">Confirmed outcomes feed the prediction model, improving how Bogotá anticipates dumping patterns by location, time and conditions.</p>
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase text-muted-foreground">
          {["Detect", "Classify", "Dispatch", "Collect", "Learn"].map((item, index, all) => (
            <div key={item} className="flex items-center gap-3">
              <span className="border border-border bg-card px-4 py-3 text-foreground">{item}</span>
              {index < all.length - 1 && <ArrowRight className="h-4 w-4 text-primary" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const PartnershipSection = () => (
  <section id="contact" className="border-t border-border bg-primary py-20 text-primary-foreground md:py-24">
    <div className="container mx-auto px-4 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase"><Users className="h-4 w-4" /> Built for coordinated action</div>
          <h2 className="text-3xl font-bold leading-tight md:text-5xl">Help build a cleaner, more responsive Bogotá.</h2>
        </div>
        <Button asChild size="lg" variant="secondary" className="self-start bg-background text-foreground hover:bg-background/90 md:self-center">
          <a href="/contact">Talk to Punto Vivo <ArrowRight /></a>
        </Button>
      </div>
    </div>
  </section>
);