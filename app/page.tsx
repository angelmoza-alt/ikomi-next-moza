import Link from "next/link";
import BrandMarquee from "@/components/BrandMarquee";
import DarkSection from "@/components/DarkSection";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import { productos } from "@/data/productos";
import { servicios } from "@/data/servicios";

// Sin metadata propia: usa el título "default" del layout raíz.
export default function HomePage() {
  return (
    <>
      <Hero
        resaltado="REPUESTOS EN GENERAL"
        titulo="para camiones de todas las marcas."
        subtitulo="Somos una empresa importadora de repuestos."
        cta={{ href: "/productos", label: "Ver productos" }}
      />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <SectionTitle subtitle="Trabajamos con fabricantes líderes de Korea y Japón.">Nuestras marcas</SectionTitle>
          <BrandMarquee />
          <div className="text-center">
            <Link href="/marcas" className="font-semibold text-primary hover:underline">
              Conoce todas las marcas →
            </Link>
          </div>
        </div>
      </section>

      <DarkSection>
        <SectionTitle light subtitle="Estamos listos para atenderte.">
          Servicios
        </SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          {servicios.map((s) => (
            <ServiceCard key={s.titulo} servicio={s} />
          ))}
        </div>
      </DarkSection>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle subtitle="Los mejores productos y precios.">Productos destacados</SectionTitle>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productos.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <ProductCard producto={p} />
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link href="/productos" className="inline-block rounded bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-dark">
              Ver todo el catálogo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
