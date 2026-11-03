import type { Metadata } from "next";
import Link from "next/link";
import { Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

// 404 personalizada: se muestra en cualquier ruta inexistente y cuando una página llama a notFound().
// Como vive dentro del layout raíz, conserva Navbar y Footer.
export default function NotFound() {
  return (
    <section className="flex flex-col items-center px-4 py-24 text-center">
      <Wrench className="size-16 animate-bounce text-accent" aria-hidden="true" />
      <p className="mt-6 font-heading text-7xl font-black text-primary">404</p>
      <h1 className="mt-2 text-2xl font-bold md:text-3xl">Esta pieza no está en nuestro almacén</h1>
      <p className="mt-3 max-w-md text-muted">La página que buscas no existe o fue movida. Revisa nuestro catálogo o vuelve al inicio.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="rounded bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-dark">
          Volver al inicio
        </Link>
        <Link href="/productos" className="rounded border-2 border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white">
          Ver productos
        </Link>
      </div>
    </section>
  );
}
