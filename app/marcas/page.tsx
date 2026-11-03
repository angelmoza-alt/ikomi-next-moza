import type { Metadata } from "next";
import BrandCard from "@/components/BrandCard";
import DarkSection from "@/components/DarkSection";
import SectionTitle from "@/components/SectionTitle";
import { marcas } from "@/data/marcas";

export const metadata: Metadata = {
  title: "Marcas",
  description: "Sangsin Brake, Hansang, Mando, TCIC, PHC Valeo y Yulim: marcas coreanas de repuestos con altos estándares de calidad.",
};

export default function MarcasPage() {
  return (
    <div className="py-10">
      <DarkSection>
        <SectionTitle
          as="h1"
          light
          subtitle="Contamos con las marcas más reconocidas en el mercado nacional e internacional especializadas en la fabricación de repuestos para vehículos con altos estándares de calidad."
        >
          Marcas
        </SectionTitle>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {marcas.map((m) => (
            <li key={m.nombre}>
              <BrandCard marca={m} />
            </li>
          ))}
        </ul>
      </DarkSection>
    </div>
  );
}
