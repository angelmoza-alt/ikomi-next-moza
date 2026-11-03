import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce a IKOMI PERÚ: nuestro equipo, almacén, tienda y empresa importadora de repuestos en Ate, Lima.",
};

const galeria = [
  { titulo: "Equipo", src: "/images/nosotros/equipo.jpg", alt: "Mecánico revisando el motor de un vehículo en el taller" },
  { titulo: "Almacén", src: "/images/nosotros/almacen.jpg", alt: "Pasillo del almacén con estantes llenos de cajas de repuestos" },
  { titulo: "Tienda", src: "/images/nosotros/tienda.jpg", alt: "Estantes de la tienda con productos y repuestos en exhibición" },
  { titulo: "Empresa", src: "/images/nosotros/empresa.jpg", alt: "Almacén central con mercadería lista para despacho" },
];

export default function NosotrosPage() {
  return (
    <>
      <Hero compacto titulo="Nosotros" subtitulo="Importadores directos de repuestos de Korea y Japón." />

      <section className="bg-surface px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle subtitle="Más de una década llevando repuestos de calidad a los transportistas del Perú.">
            ¿Quiénes somos?
          </SectionTitle>

          <div className="mb-14 grid gap-6 md:grid-cols-2">
            <article className="rounded bg-white p-7 shadow-sm">
              <h3 className="mb-2 text-xl font-bold text-primary">Misión</h3>
              <p className="leading-7">
                Abastecer al sector transporte con repuestos originales y alternativos de alta calidad, con asesoría
                técnica y precios justos, para que ningún camión se quede parado.
              </p>
            </article>
            <article className="rounded bg-white p-7 shadow-sm">
              <h3 className="mb-2 text-xl font-bold text-primary">Visión</h3>
              <p className="leading-7">
                Ser la importadora de repuestos coreanos y japoneses de referencia en el Perú, reconocida por su
                stock, rapidez de entrega y confianza.
              </p>
            </article>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galeria.map((g) => (
              <li key={g.titulo} className="rounded border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="mb-4 rounded bg-gray-600 py-3 text-center text-sm font-normal text-white">{g.titulo}</h3>
                <div className="overflow-hidden">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    width={640}
                    height={500}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full transition duration-500 hover:scale-105"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
