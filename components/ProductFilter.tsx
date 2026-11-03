"use client";
// Client Component: el filtro por categoría cambia lo que se ve sin recargar, por eso usa useState.
// Los datos llegan por props desde la página (Server Component), así el catálogo completo
// igual viene en el HTML inicial y Google puede indexarlo.

import { useState } from "react";
import type { Categoria, Producto } from "@/data/productos";
import ProductCard from "./ProductCard";

type Props = {
  productos: Producto[];
  categorias: readonly Categoria[];
};

export default function ProductFilter({ productos, categorias }: Props) {
  const [activa, setActiva] = useState<Categoria | "todas">("todas");
  const visibles = activa === "todas" ? productos : productos.filter((p) => p.categoria === activa);

  const opciones: { valor: Categoria | "todas"; label: string }[] = [
    { valor: "todas", label: "Todas las categorías" },
    ...categorias.map((c) => ({ valor: c, label: c })),
  ];

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar por categoría">
        {opciones.map((o) => (
          <button
            key={o.valor}
            type="button"
            onClick={() => setActiva(o.valor)}
            aria-pressed={activa === o.valor}
            className={`rounded px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${
              activa === o.valor ? "bg-accent text-white" : "text-ink hover:bg-gray-100"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((p) => (
          <li key={p.slug}>
            <ProductCard producto={p} />
          </li>
        ))}
      </ul>
    </>
  );
}
