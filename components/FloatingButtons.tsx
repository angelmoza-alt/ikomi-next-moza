"use client";
// Client Component: necesita escuchar el evento scroll de la ventana para mostrar el botón "subir".

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { empresa } from "@/data/site";
import SocialIcon from "./SocialIcon";

export default function FloatingButtons() {
  const [mostrarSubir, setMostrarSubir] = useState(false);

  useEffect(() => {
    const onScroll = () => setMostrarSubir(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <a
        href={`https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent("Hola IKOMI, quisiera cotizar un repuesto.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-110"
      >
        <SocialIcon red="whatsapp" size={30} />
      </a>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0 })}
        aria-label="Volver arriba"
        className={`flex size-11 items-center justify-center rounded bg-accent text-white shadow-lg transition-all hover:bg-accent-dark ${
          mostrarSubir ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
}
