import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Truck, Recycle, ShieldCheck, Users, Package, MapPin, Phone, Clock, Star, Power } from "lucide-react";
import Logo from "@/components/Logo";
import WorkerMap from "@/components/WorkerMap";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { workers as seed, type Role, type Status, type Worker } from "@/data/uaespWorkers";

const roleFilters: (Role | "All")[] = ["All", "Collector", "Driver", "Recycler", "Inspector", "Supervisor"];
const statusCycle: Status[] = ["Active", "On break", "Off duty"];
const statusStyle: Record<Status, string> = {
  Active: "bg-primary/15 text-primary border-primary/30",
  "On break": "bg-accent/15 text-accent border-accent/30",
  "Off duty": "bg-muted text-muted-foreground border-border",
};

const Stat = ({ icon: Icon, label, value, sub }: { icon: typeof Users; label: string; value: string; sub: string }) => (
  <div className="rounded-xl border border-border bg-card p-4">
    <div className="flex items-center gap-2 text-xs text-muted-foreground"><Icon className="w-4 h-4 text-primary" />{label}</div>
    <div className="mt-2 text-2xl font-display font-semibold text-foreground">{value}</div>
    <div className="text-xs text-muted-foreground">{sub}</div>
  </div>
);

const UaespDashboard = () => {
  const [list, setList] = useState<Worker[]>(seed);
  const [role, setRole] = useState<Role | "All">("All");
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => list.filter((w) =>
    (role === "All" || w.role === role) &&
    (w.name.toLowerCase().includes(q.toLowerCase()) || w.id.toLowerCase().includes(q.toLowerCase()) || w.locality.toLowerCase().includes(q.toLowerCase()))
  ), [list, role, q]);

  const selected = list.find((w) => w.id === selectedId) ?? null;
  const active = list.filter((w) => w.status === "Active").length;
  const collections = list.reduce((a, w) => a + w.collectionsToday, 0);
  const tons = (list.reduce((a, w) => a + w.kgToday, 0) / 1000).toFixed(1);

  const byWaste = useMemo(() => {
    const m: Record<string, number> = {};
    list.filter((w) => w.wasteType !== "Oversight").forEach((w) => (m[w.wasteType] = (m[w.wasteType] || 0) + w.collectionsToday));
    const max = Math.max(...Object.values(m), 1);
    return Object.entries(m).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ k, v, pct: (v / max) * 100 }));
  }, [list]);

  const cycleStatus = (id: string) => setList((l) => l.map((w) => w.id === id ? { ...w, status: statusCycle[(statusCycle.indexOf(w.status) + 1) % 3] } : w));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-20">
        <div className="max-w-[1500px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></Link>
            <Logo showText size="sm" />
            <span className="hidden md:inline text-sm text-muted-foreground border-l border-border pl-4">UAESP · Operations Command</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Live · demo data
          </div>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-semibold">Workforce oversight</h1>
          <p className="text-sm text-muted-foreground">Unidad Administrativa Especial de Servicios Públicos — bulky-waste field teams across Bogotá.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <Stat icon={Users} label="Workers on board" value={String(list.length)} sub={`${active} active now`} />
          <Stat icon={Package} label="Collections today" value={String(collections)} sub="across all localities" />
          <Stat icon={Recycle} label="Tonnes moved" value={tons} sub="today" />
          <Stat icon={Truck} label="Drivers en route" value={String(list.filter((w) => w.role === "Driver" && w.status === "Active").length)} sub="to disposal points" />
          <Stat icon={ShieldCheck} label="Inspectors active" value={String(list.filter((w) => w.role === "Inspector" && w.status === "Active").length)} sub="verifying reports" />
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-4">
          {/* Worker list */}
          <section className="rounded-xl border border-border bg-card flex flex-col h-[720px]">
            <div className="p-4 space-y-3 border-b border-border">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, ID or locality" className="pl-9" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {roleFilters.map((r) => (
                  <button key={r} onClick={() => setRole(r)} className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${role === r ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>{r}</button>
                ))}
              </div>
            </div>
            <div className="overflow-y-auto flex-1 divide-y divide-border">
              {filtered.map((w) => (
                <button key={w.id} onClick={() => setSelectedId(w.id)} className={`w-full text-left p-3 flex gap-3 items-start transition-colors ${selectedId === w.id ? "bg-primary/10" : "hover:bg-secondary/40"}`}>
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold shrink-0">{w.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-sm truncate">{w.name}</span>
                      <Badge variant="outline" className={`text-[10px] ${statusStyle[w.status]}`}>{w.status}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{w.role} · {w.id} · {w.locality}</div>
                    <div className="text-xs mt-1 flex gap-3 text-muted-foreground">
                      <span className="text-foreground">{w.wasteType}</span>
                      <span>{w.collectionsToday} today</span>
                    </div>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && <p className="p-6 text-sm text-muted-foreground text-center">No workers match.</p>}
            </div>
          </section>

          {/* Map + detail */}
          <section className="space-y-4">
            <div className="relative h-[460px] rounded-xl border border-border">
              <WorkerMap workers={filtered} selectedId={selectedId} onSelect={setSelectedId} />
              <div className="absolute bottom-3 left-3 rounded-lg bg-card/90 border border-border px-3 py-2 text-[11px] space-y-1">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-accent" /> Active worker</div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-muted-foreground" /> Break / off duty</div>
                <div className="flex items-center gap-2"><span className="w-4 border-t-2 border-dashed border-primary" /> Route to destination</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5 min-h-[240px]">
                {selected ? (
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display font-semibold text-lg">{selected.name}</h3>
                        <p className="text-xs text-muted-foreground">{selected.role} · {selected.id}</p>
                      </div>
                      <Badge variant="outline" className={statusStyle[selected.status]}>{selected.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex gap-2 items-center"><Package className="w-4 h-4 text-primary" />{selected.wasteType}</div>
                      <div className="flex gap-2 items-center"><MapPin className="w-4 h-4 text-primary" />{selected.locality}</div>
                      <div className="flex gap-2 items-center"><Clock className="w-4 h-4 text-primary" />{selected.shift}</div>
                      <div className="flex gap-2 items-center"><Star className="w-4 h-4 text-primary" />{selected.rating} rating</div>
                      <div className="flex gap-2 items-center col-span-2"><Phone className="w-4 h-4 text-primary" />{selected.phone}</div>
                      {selected.vehicle && <div className="flex gap-2 items-center col-span-2"><Truck className="w-4 h-4 text-primary" />{selected.vehicle}</div>}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-lg bg-secondary/50 p-2"><div className="font-semibold">{selected.collectionsToday}</div><div className="text-[10px] text-muted-foreground">today</div></div>
                      <div className="rounded-lg bg-secondary/50 p-2"><div className="font-semibold">{selected.collectionsMonth}</div><div className="text-[10px] text-muted-foreground">this month</div></div>
                      <div className="rounded-lg bg-secondary/50 p-2"><div className="font-semibold">{selected.kgToday} kg</div><div className="text-[10px] text-muted-foreground">moved today</div></div>
                    </div>
                    <p className="text-xs text-muted-foreground">Heading to <span className="text-foreground">{selected.destinationName}</span> · ETA {selected.eta} min</p>
                    <Button size="sm" variant="outline" onClick={() => cycleStatus(selected.id)}><Power className="w-4 h-4" /> Change status</Button>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-muted-foreground text-center">Select a worker from the list or map to view their profile.</div>
                )}
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-display font-semibold mb-4">Collections by waste type · today</h3>
                <div className="space-y-3">
                  {byWaste.map((b) => (
                    <div key={b.k}>
                      <div className="flex justify-between text-xs mb-1"><span>{b.k}</span><span className="text-muted-foreground">{b.v}</span></div>
                      <Progress value={b.pct} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UaespDashboard;
