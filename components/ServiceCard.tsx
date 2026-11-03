import { BriefcaseBusiness, ClipboardList, PackageSearch, Truck } from "lucide-react";
import type { Servicio } from "@/data/servicios";

const iconos = { ventas: BriefcaseBusiness, asesoria: ClipboardList, delivery: Truck, productos: PackageSearch };

export default function ServiceCard({ servicio }: { servicio: Servicio }) {
  const Icono = iconos[servicio.icono];
  return (
    <article className="flex gap-5 rounded bg-dark-card p-7 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50">
      <Icono className="size-10 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
      <div>
        <h3 className="mb-3 text-xl font-bold underline underline-offset-4">{servicio.titulo}</h3>
        <p className="text-sm leading-7 text-white/90">{servicio.descripcion}</p>
      </div>
    </article>
  );
}
