import { useEffect, useRef, useState } from "react";
import { Box, Map as MapIcon } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { wasteGenerators } from "@/data/uaespGenerators";
import type { Worker } from "@/data/uaespWorkers";

// Public (pk.) token — safe for browser use.
mapboxgl.accessToken = "pk.eyJ1IjoiaWthbmFiYSIsImEiOiJjbXVoYjl5dTgwcGM3MnhwZzlvNzJnb2tqIn0.uibgGpD_FcCGsGD4PO8fdQ";

const cssHsl = (variable: string) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return raw ? `hsl(${raw.replace(/ /g, ", ")})` : "hsl(98, 50%, 51%)";
};

interface Props {
  workers: Worker[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const generatorData: GeoJSON.FeatureCollection<GeoJSON.Point> = {
  type: "FeatureCollection",
  features: wasteGenerators.map((site) => ({
    type: "Feature",
    properties: {
      name: site.name,
      address: site.address,
      concessionaire: site.concessionaire,
    },
    geometry: { type: "Point", coordinates: site.coordinates },
  })),
};

const WorkerMap = ({ workers, selectedId, onSelect }: Props) => {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const ready = useRef(false);
  const workersRef = useRef(workers);
  const selectedRef = useRef(selectedId);
  const [is3D, setIs3D] = useState(true);

  workersRef.current = workers;
  selectedRef.current = selectedId;

  const lines = () => ({
    type: "FeatureCollection" as const,
    features: workersRef.current.map((worker) => ({
      type: "Feature" as const,
      properties: { selected: worker.id === selectedRef.current ? 1 : 0 },
      geometry: {
        type: "LineString" as const,
        coordinates: [worker.location, worker.destination],
      },
    })),
  });

  useEffect(() => {
    if (!el.current) return;

    const currentMap = new mapboxgl.Map({
      container: el.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [-74.085, 4.645],
      zoom: 11.2,
      pitch: 62,
      bearing: -24,
      antialias: true,
      maxPitch: 80,
    });

    currentMap.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");
    currentMap.addControl(new mapboxgl.FullscreenControl(), "top-right");
    currentMap.addControl(new mapboxgl.ScaleControl({ unit: "metric" }), "bottom-right");

    const showGeneratorPopup = (event: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
      const feature = event.features?.[0];
      if (!feature || feature.geometry.type !== "Point") return;
      const coordinates = [...feature.geometry.coordinates] as [number, number];
      const name = String(feature.properties?.name ?? "Large waste generator");
      const address = String(feature.properties?.address ?? "");
      const concessionaire = String(feature.properties?.concessionaire ?? "UAESP");
      const content = document.createElement("div");
      const title = document.createElement("strong");
      const meta = document.createElement("span");
      title.textContent = name;
      meta.textContent = `${address} · ${concessionaire}`;
      content.className = "space-y-1 text-xs";
      title.className = "block text-sm";
      meta.className = "block opacity-70";
      content.append(title, meta);
      new mapboxgl.Popup({ offset: 12, closeButton: false }).setLngLat(coordinates).setDOMContent(content).addTo(currentMap);
    };

    const openCluster = (event: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
      const feature = event.features?.[0];
      const clusterId = feature?.properties?.cluster_id;
      if (typeof clusterId !== "number" || feature?.geometry.type !== "Point") return;
      const source = currentMap.getSource("waste-generators") as mapboxgl.GeoJSONSource | undefined;
      source?.getClusterExpansionZoom(clusterId, (error, zoom) => {
        if (error || zoom === null || zoom === undefined) return;
        currentMap.easeTo({ center: feature.geometry.coordinates as [number, number], zoom });
      });
    };

    currentMap.on("load", () => {
      currentMap.addSource("mapbox-terrain", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      currentMap.setTerrain({ source: "mapbox-terrain", exaggeration: 1.35 });
      currentMap.setFog({
        color: cssHsl("--background"),
        "high-color": cssHsl("--muted"),
        "horizon-blend": 0.08,
        "space-color": cssHsl("--background"),
        "star-intensity": 0.08,
      });

      const labelLayer = currentMap.getStyle().layers?.find(
        (layer) => layer.type === "symbol" && layer.layout?.["text-field"],
      );
      currentMap.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 14,
          paint: {
            "fill-extrusion-color": cssHsl("--muted"),
            "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 14, 0, 14.6, ["get", "height"]],
            "fill-extrusion-base": ["interpolate", ["linear"], ["zoom"], 14, 0, 14.6, ["get", "min_height"]],
            "fill-extrusion-opacity": 0.82,
            "fill-extrusion-vertical-gradient": true,
          },
        },
        labelLayer?.id,
      );

      currentMap.addSource("waste-generators", {
        type: "geojson",
        data: generatorData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 44,
      });
      currentMap.addLayer({
        id: "generator-clusters",
        type: "circle",
        source: "waste-generators",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": cssHsl("--chart-3"),
          "circle-radius": ["step", ["get", "point_count"], 13, 10, 17, 30, 21],
          "circle-stroke-width": 2,
          "circle-stroke-color": cssHsl("--foreground"),
          "circle-opacity": 0.86,
        },
      });
      currentMap.addLayer({
        id: "generator-count",
        type: "symbol",
        source: "waste-generators",
        filter: ["has", "point_count"],
        layout: { "text-field": ["get", "point_count_abbreviated"], "text-size": 11 },
        paint: { "text-color": cssHsl("--foreground") },
      });
      currentMap.addLayer({
        id: "generator-points",
        type: "circle",
        source: "waste-generators",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": cssHsl("--chart-3"),
          "circle-radius": 5,
          "circle-stroke-width": 2,
          "circle-stroke-color": cssHsl("--foreground"),
        },
      });

      currentMap.addSource("routes", { type: "geojson", data: lines() });
      currentMap.addLayer({
        id: "routes",
        type: "line",
        source: "routes",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": ["case", ["==", ["get", "selected"], 1], cssHsl("--primary"), cssHsl("--foreground")],
          "line-width": ["case", ["==", ["get", "selected"], 1], 4, 1.5],
          "line-dasharray": [2, 2],
          "line-opacity": ["case", ["==", ["get", "selected"], 1], 1, 0.56],
        },
      });

      currentMap.on("click", "generator-clusters", openCluster);
      currentMap.on("click", "generator-points", showGeneratorPopup);
      for (const layer of ["generator-clusters", "generator-points"]) {
        currentMap.on("mouseenter", layer, () => { currentMap.getCanvas().style.cursor = "pointer"; });
        currentMap.on("mouseleave", layer, () => { currentMap.getCanvas().style.cursor = ""; });
      }
      ready.current = true;
    });

    map.current = currentMap;
    return () => {
      markers.current.forEach((marker) => marker.remove());
      currentMap.remove();
      map.current = null;
      ready.current = false;
    };
  }, []);

  useEffect(() => {
    const currentMap = map.current;
    if (!currentMap) return;
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];
    const destinations = new Map<string, [number, number]>();

    workers.forEach((worker) => {
      destinations.set(worker.destinationName, worker.destination);
      const marker = document.createElement("button");
      const selected = worker.id === selectedId;
      marker.className = `rounded-full border-2 shadow-lg transition-transform ${selected ? "bg-primary border-foreground w-6 h-6 scale-125" : worker.status === "Active" ? "bg-accent border-background w-4 h-4" : "bg-muted-foreground border-background w-4 h-4"}`;
      marker.title = `${worker.name} · ${worker.role} · ${worker.wasteType}`;
      marker.setAttribute("aria-label", `Select ${worker.name}, ${worker.role}`);
      marker.onclick = () => onSelect(worker.id);
      markers.current.push(new mapboxgl.Marker({ element: marker, pitchAlignment: "map" }).setLngLat(worker.location).addTo(currentMap));
    });

    destinations.forEach((coordinates, name) => {
      const label = document.createElement("div");
      label.className = "px-2 py-1 rounded-md bg-card border border-primary/60 text-[10px] font-semibold text-foreground whitespace-nowrap shadow-lg";
      label.textContent = `⬢ ${name}`;
      markers.current.push(new mapboxgl.Marker({ element: label }).setLngLat(coordinates).addTo(currentMap));
    });

    const applyRoutes = () => (currentMap.getSource("routes") as mapboxgl.GeoJSONSource | undefined)?.setData(lines());
    if (ready.current) applyRoutes();
    else currentMap.once("load", applyRoutes);

    const selectedWorker = workers.find((worker) => worker.id === selectedId);
    if (selectedWorker) {
      currentMap.flyTo({
        center: selectedWorker.location,
        zoom: 15.5,
        pitch: is3D ? 68 : 0,
        bearing: is3D ? -24 : 0,
        speed: 1.25,
      });
    }
  }, [workers, selectedId, onSelect, is3D]);

  const togglePerspective = () => {
    const next3D = !is3D;
    setIs3D(next3D);
    map.current?.easeTo({ pitch: next3D ? 62 : 0, bearing: next3D ? -24 : 0, duration: 900 });
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      <div ref={el} className="w-full h-full" />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={togglePerspective}
        className="absolute left-3 top-3 z-10 gap-2 shadow-lg"
        aria-label={is3D ? "Switch to top-down map" : "Switch to 3D map"}
      >
        {is3D ? <MapIcon className="h-4 w-4" /> : <Box className="h-4 w-4" />}
        {is3D ? "Top-down" : "3D view"}
      </Button>
    </div>
  );
};

export default WorkerMap;