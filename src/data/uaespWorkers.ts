export type Role = "Collector" | "Driver" | "Recycler" | "Inspector" | "Supervisor";
export type Status = "Active" | "On break" | "Off duty";

export interface Worker {
  id: string;
  name: string;
  role: Role;
  status: Status;
  locality: string;
  wasteType: string;
  vehicle?: string;
  collectionsToday: number;
  collectionsMonth: number;
  kgToday: number;
  rating: number;
  shift: string;
  phone: string;
  location: [number, number];
  destination: [number, number];
  destinationName: string;
  eta: number;
}

const names = ["Andrés Gómez","Luisa Martínez","Carlos Rodríguez","Valentina Rojas","Jorge Herrera","Camila Torres","Diego Ramírez","Natalia Castro","Felipe Moreno","Sofía Vargas","Julián Ortiz","Daniela Ríos","Mateo Suárez","Paula Jiménez","Santiago Díaz","Mariana López","Nicolás Peña","Laura Cárdenas","Sebastián Mejía","Juliana Parra","Óscar Salazar","Isabela Cruz","Ricardo Pineda","Ana María León"];
const roles: Role[] = ["Collector","Driver","Recycler","Inspector","Collector","Driver","Recycler","Collector","Supervisor"];
const localities = ["Usaquén","Chapinero","Suba","Engativá","Kennedy","Bosa","Fontibón","Teusaquillo","Ciudad Bolívar","San Cristóbal"];
const waste = ["Furniture","Mattresses","Appliances (RAEE)","Construction debris","Tree & garden","Electronics","Mixed bulky"];
const dests: { name: string; c: [number, number] }[] = [
  { name: "Relleno Doña Juana", c: [-74.135, 4.511] },
  { name: "Punto Limpio Kennedy", c: [-74.155, 4.628] },
  { name: "ECA Engativá", c: [-74.11, 4.705] },
  { name: "Punto Limpio Suba", c: [-74.085, 4.745] },
  { name: "Planta RCD Fontibón", c: [-74.145, 4.675] },
];
const statuses: Status[] = ["Active","Active","Active","On break","Off duty"];

let s = 7;
const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);

export const workers: Worker[] = names.map((name, i) => {
  const role = roles[i % roles.length];
  const d = dests[i % dests.length];
  const m = 12 + Math.floor(rnd() * 30);
  return {
    id: `UA-${(1040 + i).toString()}`,
    name,
    role,
    status: statuses[Math.floor(rnd() * statuses.length)],
    locality: localities[i % localities.length],
    wasteType: role === "Inspector" || role === "Supervisor" ? "Oversight" : waste[i % waste.length],
    vehicle: role === "Driver" ? `Compactor ${["BQX","TRM","KLP"][i % 3]}-${100 + i}` : undefined,
    collectionsToday: role === "Inspector" ? 0 : Math.floor(rnd() * 14),
    collectionsMonth: m * 8,
    kgToday: Math.floor(rnd() * 2400),
    rating: +(3.8 + rnd() * 1.2).toFixed(1),
    shift: ["06:00–14:00","14:00–22:00","22:00–06:00"][i % 3],
    phone: `+57 310 ${String(1000000 + Math.floor(rnd() * 8999999)).slice(0, 3)} ${String(Math.floor(rnd() * 9999)).padStart(4, "0")}`,
    location: [-74.17 + rnd() * 0.12, 4.56 + rnd() * 0.18],
    destination: d.c,
    destinationName: d.name,
    eta: 5 + Math.floor(rnd() * 40),
  };
});
