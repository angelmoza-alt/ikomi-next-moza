import type { Marca } from "@/data/marcas";

// Los logotipos se representan con el nombre en el color de la marca (no se copian logos registrados).
export default function BrandCard({ marca }: { marca: Marca }) {
  return (
    <article className="h-full rounded bg-white p-7 text-ink shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <h3 className="mb-4 font-heading text-2xl font-black tracking-tight" style={{ color: marca.color }}>
        {marca.nombre}
      </h3>
      <p className="text-justify text-sm leading-6 text-ink/85">{marca.descripcion}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">Origen: {marca.origen}</p>
    </article>
  );
}
