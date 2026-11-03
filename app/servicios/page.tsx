import type { Metadata } from "next";
import DarkSection from "@/components/DarkSection";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import { servicios } from "@/data/servicios";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Ventas, asesoría personalizada y delivery de repuestos para camiones de Korea y Japón.",
};

export default function ServiciosPage() {
  return (
    <div className="py-10">
      <DarkSection>
        <SectionTitle as="h1" light subtitle="Estamos listos para atenderte.">
          Servicios
        </SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          {servicios.map((s) => (
            <ServiceCard key={s.titulo} servicio={s} />
          ))}
        </div>
      </DarkSection>
    </div>
  );
}
