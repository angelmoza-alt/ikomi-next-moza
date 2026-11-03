import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import { empresa } from "@/data/site";
import { obtenerProducto, productos } from "@/data/productos";

// Genera en el build una página HTML por cada producto (SSG). Reemplaza a getStaticPaths del Pages Router.
export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

// Título y descripción distintos por producto (importante para SEO: cada repuesto aparece en Google con su nombre).
export async function generateMetadata({ params }: PageProps<"/productos/[slug]">): Promise<Metadata> {
  const { slug } = await params; // en Next 15+ params es una Promise
  const producto = obtenerProducto(slug);
  if (!producto) return { title: "Producto no encontrado" };
  return {
    title: producto.nombre,
    description: `${producto.nombre} ${producto.marca}: ${producto.resumen}`,
  };
}

export default async function ProductoDetallePage({ params }: PageProps<"/productos/[slug]">) {
  const { slug } = await params;
  const producto = obtenerProducto(slug);

  // Si el slug no existe (ej. /productos/motor-cohete) se muestra app/not-found.tsx con estado 404.
  if (!producto) notFound();

  const relacionados = productos.filter((p) => p.categoria === producto.categoria && p.slug !== producto.slug).slice(0, 3);
  const mensaje = encodeURIComponent(`Hola IKOMI, quiero cotizar: ${producto.nombre} (${producto.marca}).`);

  return (
    <>
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Ruta de navegación" className="mb-8 text-sm text-muted">
            <Link href="/" className="hover:text-primary">Inicio</Link> /{" "}
            <Link href="/productos" className="hover:text-primary">Productos</Link> /{" "}
            <span className="text-ink">{producto.nombre}</span>
          </nav>

          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="rounded bg-white p-6 shadow ring-1 ring-gray-100">
              <Image
                src={producto.imagen}
                alt={`${producto.nombre} marca ${producto.marca}`}
                width={800}
                height={800}
                preload
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">{producto.categoria}</p>
              <h1 className="mt-2 text-3xl font-bold md:text-4xl">{producto.nombre}</h1>
              <p className="mt-1 text-muted">Marca: {producto.marca}</p>
              <p className="mt-6 leading-7">{producto.descripcion}</p>

              <h2 className="mt-8 mb-3 text-lg font-bold">Compatible con</h2>
              <ul className="space-y-2">
                {producto.compatibilidad.map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-green-600" aria-hidden="true" /> {c}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${empresa.whatsapp}?text=${mensaje}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-dark"
                >
                  Cotizar por WhatsApp
                </a>
                <Link href="/contacto" className="rounded border-2 border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white">
                  Enviar consulta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="bg-surface px-4 py-14">
          <div className="mx-auto max-w-6xl">
            <SectionTitle>Productos relacionados</SectionTitle>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((p) => (
                <li key={p.slug}>
                  <ProductCard producto={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
