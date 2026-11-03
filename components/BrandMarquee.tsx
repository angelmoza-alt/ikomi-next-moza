import { marcas } from "@/data/marcas";

// Carrusel infinito de marcas hecho solo con CSS (animate-marquee definido en globals.css).
// No necesita "use client": la animación la ejecuta el navegador, no JavaScript.
// Se pausa al pasar el mouse para que el usuario pueda leer la marca que le interesa.
export default function BrandMarquee() {
  const lista = [...marcas, ...marcas]; // duplicada para que el bucle no tenga cortes
  return (
    <div className="group relative overflow-hidden py-6" aria-label="Marcas que distribuimos">
      <ul className="flex w-max animate-marquee gap-12 group-hover:[animation-play-state:paused]">
        {lista.map((m, i) => (
          <li
            key={`${m.nombre}-${i}`}
            aria-hidden={i >= marcas.length}
            className="font-heading text-2xl font-black whitespace-nowrap opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 md:text-3xl"
            style={{ color: m.color }}
          >
            {m.nombre}
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white" />
    </div>
  );
}
