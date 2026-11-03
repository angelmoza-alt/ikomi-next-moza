import Image from "next/image";
import Link from "next/link";

type Props = {
  titulo: string;
  resaltado?: string; // primera línea en mayúsculas, como en la referencia
  subtitulo?: string;
  imagen?: string;
  compacto?: boolean; // versión baja para páginas internas
  cta?: { href: string; label: string };
};

// Server Component reutilizable: el mismo banner sirve para Inicio (grande) y páginas internas (compacto).
export default function Hero({ titulo, resaltado, subtitulo, imagen = "/images/hero.jpg", compacto = false, cta }: Props) {
  return (
    <section className={`relative isolate flex items-center overflow-hidden ${compacto ? "h-56 md:h-64" : "h-[520px] md:h-[620px]"}`}>
      {/* preload (antes "priority"): es la imagen más grande visible al cargar, se descarga primero (mejor LCP) */}
      <Image
        src={imagen}
        alt="Repuestos para camiones: discos de embrague, frenos, filtros y piñones"
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className={`ml-auto max-w-2xl animate-fade-up text-white ${compacto ? "text-left md:text-right" : "text-right"}`}>
          {resaltado && <p className="font-heading text-3xl font-extrabold md:text-5xl">{resaltado}</p>}
          <h1 className={`font-heading font-bold leading-tight ${compacto ? "text-3xl md:text-4xl" : "text-3xl md:text-5xl"}`}>
            {titulo}
          </h1>
          {subtitulo && <p className="mt-3 text-lg md:text-2xl">{subtitulo}</p>}
          {cta && (
            <Link
              href={cta.href}
              className="mt-6 inline-block rounded bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-dark"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
