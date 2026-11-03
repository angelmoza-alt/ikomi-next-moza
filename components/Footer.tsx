import Link from "next/link";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { empresa, navegacion } from "@/data/site";
import NavIcon from "./NavIcon";
import SocialIcon, { type Red } from "./SocialIcon";

// Server Component: es contenido fijo, no necesita JavaScript en el navegador.
const redes: { red: Red; href: string; label: string }[] = [
  { red: "facebook", href: "https://www.facebook.com/", label: "Facebook" },
  { red: "instagram", href: "https://www.instagram.com/", label: "Instagram" },
  { red: "tiktok", href: "https://www.tiktok.com/", label: "TikTok" },
  { red: "whatsapp", href: `https://wa.me/${empresa.whatsapp}`, label: "WhatsApp" },
];

function InfoCard({ icon, titulo, lineas }: { icon: React.ReactNode; titulo: string; lineas: string[] }) {
  return (
    <div className="rounded-md bg-white p-6 text-center text-ink shadow-xl">
      <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full border-2 border-dashed border-accent/40 text-accent">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-muted">{titulo}</h3>
      {lineas.map((l) => (
        <p key={l} className="text-sm leading-6">
          {l}
        </p>
      ))}
    </div>
  );
}

// Con cacheComponents, new Date() no puede ejecutarse "suelto" durante el prerender.
// "use cache" lo calcula una vez en el build y lo guarda como parte del HTML estático.
async function obtenerAnio() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const anio = await obtenerAnio();
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-[1fr_2fr_auto]">
        <div>
          <h2 className="text-2xl font-bold">IKOMI PERÚ</h2>
          <p className="mt-3 max-w-xs leading-7 text-white/85">{empresa.descripcion}</p>
          <ul className="mt-6 flex gap-3">
            {redes.map((r) => (
              <li key={r.red}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.label}
                  className="flex size-11 items-center justify-center rounded bg-white/10 transition hover:-translate-y-1 hover:bg-accent"
                >
                  <SocialIcon red={r.red} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:col-span-2 md:row-start-2 lg:col-span-1 lg:row-start-auto">
          <div className="sm:col-span-2">
            <InfoCard icon={<MapPin />} titulo="Dirección" lineas={empresa.direccion} />
          </div>
          <InfoCard icon={<Mail />} titulo="Correo" lineas={empresa.correos} />
          <InfoCard icon={<PhoneCall />} titulo="Teléfonos" lineas={empresa.telefonos} />
        </div>

        <div>
          <h2 className="text-lg font-bold">Links</h2>
          <span className="mt-3 mb-6 block h-0.5 w-8 bg-accent" aria-hidden="true" />
          <ul className="space-y-3">
            {navegacion.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex items-center gap-3 text-white/85 transition hover:text-highlight">
                  <NavIcon name={item.icon} size={16} className="text-blue-500" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/30">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-white/80">
          Copyright © {anio} <span className="text-blue-400">Grupo IKOMI PERÚ</span> · Réplica académica (Tecsup) hecha
          con Next.js por Angel Moza Cabanillas.
        </p>
      </div>
    </footer>
  );
}
