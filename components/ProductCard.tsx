import Image from "next/image";
import Link from "next/link";
import type { Producto } from "@/data/productos";

type Props = {
  producto: Producto;
  mostrarMarca?: boolean;
};

// Tarjeta reutilizable: recibe el producto por props, así sirve en /productos, en la portada
// y en "productos relacionados" sin duplicar código.
// Animación con propósito: al pasar el mouse la tarjeta se eleva y la imagen hace zoom,
// indicando al usuario que es clicable y que lleva al detalle.
export default function ProductCard({ producto, mostrarMarca = true }: Props) {
  return (
    <Link
      href={`/productos/${producto.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded bg-white shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:-translate-y-2"
    >
      <div className="overflow-hidden bg-white p-4">
        <Image
          src={producto.imagen}
          alt={`${producto.nombre} ${producto.marca} para camión`}
          width={800}
          height={800}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-auto w-full transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col border-t border-gray-100 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">{producto.categoria}</p>
        <h3 className="mt-1 text-lg font-bold">{producto.nombre}</h3>
        {mostrarMarca && <p className="text-sm text-muted">Marca: {producto.marca}</p>}
        <p className="mt-2 flex-1 text-sm text-ink/80">{producto.resumen}</p>
        <span className="mt-4 text-sm font-semibold text-primary group-hover:underline">Ver detalle →</span>
      </div>
    </Link>
  );
}
