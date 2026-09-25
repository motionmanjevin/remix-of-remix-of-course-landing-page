import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Worker } from "@/data/uaespWorkers";

// Public (pk.) token — safe for browser use.
mapboxgl.accessToken = "pk.eyJ1IjoiaWthbmFiYSIsImEiOiJjbXVoYjl5dTgwcGM3MnhwZzlvNzJnb2tqIn0.uibgGpD_FcCGsGD4PO8fdQ";

const cssHsl = (v: string) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  return raw ? `hsl(${raw.replace(/ /g, ", ")})` : "#64BE45";
};

interface Props { workers: Worker[]; selectedId: string | null; onSelect: (id: string) => void; }

const WorkerMap = ({ workers, selectedId, onSelect }: Props) => {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const ready = useRef(false);

  const lines = () => ({
    type: "FeatureCollection" as const,
    features: workers.map((w) => ({
      type: "Feature" as const,
      properties: { sel: w.id === selectedId ? 1 : 0 },
      geometry: { type: "LineString" as const, coordinates: [w.location, w.destination] },
    })),
  });

  useEffect(() => {
    if (!el.current) return;
    const m = new mapboxgl.Map({ container: el.current, style: "mapbox://styles/mapbox/dark-v11", center: [-74.1, 4.64], zoom: 10.6 });
    m.addControl(new mapboxgl.NavigationControl(), "top-right");
    m.on("load", () => {
      m.addSource("routes", { type: "geojson", data: lines() });
      m.addLayer({ id: "routes", type: "line", source: "routes", paint: {
        "line-color": ["case", ["==", ["get", "sel"], 1], cssHsl("--primary"), cssHsl("--muted-foreground")],
        "line-width": ["case", ["==", ["get", "sel"], 1], 3.5, 1.2],
        "line-dasharray": [2, 2],
        "line-opacity": ["case", ["==", ["get", "sel"], 1], 1, 0.5],
      } });
      ready.current = true;
    });
    map.current = m;
    return () => m.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const m = map.current;
    if (!m) return;
    markers.current.forEach((mk) => mk.remove());
    markers.current = [];
    const dests = new Map<string, [number, number]>();
    workers.forEach((w) => {
      dests.set(w.destinationName, w.destination);
      const d = document.createElement("button");
      const sel = w.id === selectedId;
      d.className = `rounded-full border-2 border-background shadow-lg transition-transform ${sel ? "bg-primary w-5 h-5 scale-125" : w.status === "Active" ? "bg-accent w-3.5 h-3.5" : "bg-muted-foreground w-3.5 h-3.5"}`;
      d.title = `${w.name} · ${w.role}`;
      d.onclick = () => onSelect(w.id);
      markers.current.push(new mapboxgl.Marker({ element: d }).setLngLat(w.location).addTo(m));
    });
    dests.forEach((c, name) => {
      const d = document.createElement("div");
      d.className = "px-2 py-1 rounded-md bg-card border border-primary/60 text-[10px] font-semibold text-foreground whitespace-nowrap";
      d.textContent = `⬢ ${name}`;
      markers.current.push(new mapboxgl.Marker({ element: d }).setLngLat(c).addTo(m));
    });
    const apply = () => (m.getSource("routes") as mapboxgl.GeoJSONSource | undefined)?.setData(lines());
    if (ready.current) apply(); else m.once("load", apply);
    const w = workers.find((x) => x.id === selectedId);
    if (w) m.flyTo({ center: w.location, zoom: 12.5, speed: 1.4 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workers, selectedId]);

  return <div ref={el} className="w-full h-full rounded-xl overflow-hidden" />;
};

export default WorkerMap;
