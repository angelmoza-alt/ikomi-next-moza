import type { Metadata } from "next";
import ProductFilter from "@/components/ProductFilter";
import SectionTitle from "@/components/SectionTitle";
import { categorias, productos } from "@/data/productos";

export const metadata: Metadata = {
  title: "Productos",
  description: "Catálogo de discos y platos de embrague, pastillas de freno, piñones y partes de caja para camiones.",
};

export default function ProductosPage() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionTitle as="h1" subtitle="Los mejores productos y precios.">
          Nuestros productos
        </SectionTitle>
        <ProductFilter productos={productos} categorias={categorias} />
      </div>
    </section>
  );
}
