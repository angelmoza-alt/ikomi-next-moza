import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SectionTitle from "@/components/SectionTitle";
import { empresa } from "@/data/site";

export const metadata: Metadata = {
  title: "Contáctenos",
  description: "Escríbenos o visítanos en Av. Nicolás Ayllón 3384, Ate. Un asesor te responderá lo más pronto posible.",
};

// La página es Server Component; solo el formulario (ContactForm) se envía como JavaScript al navegador.
export default function ContactoPage() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionTitle as="h1" subtitle="Llene el formulario y un asesor se pondrá en contacto lo más pronto posible.">
          Contáctenos
        </SectionTitle>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <iframe
            src={empresa.mapaEmbed}
            title="Mapa: Av. Nicolás Ayllón 3384, Ate, Lima"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full rounded border-0 shadow lg:h-[450px]"
          />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
