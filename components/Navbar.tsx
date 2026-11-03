"use client";
// Client Component porque usa usePathname (lee la URL del navegador) y useState (abrir/cerrar menú).
// Ambos hooks solo existen en el cliente; un Server Component no puede usarlos.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navegacion } from "@/data/site";
import Logo from "./Logo";
import NavIcon from "./NavIcon";

function esActivo(pathname: string, href: string) {
  // "/" solo es activo en la portada; las demás rutas también se activan en sus subrutas
  // (ej. /productos/disco-de-embrague mantiene resaltado "Productos").
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" aria-label="Principal">
        <Logo />

        <button
          type="button"
          className="rounded p-2 text-white transition hover:bg-white/10 lg:hidden"
          onClick={() => setAbierto(!abierto)}
          aria-expanded={abierto}
          aria-controls="menu-principal"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        >
          {abierto ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul
          id="menu-principal"
          className={`${abierto ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col gap-1 bg-primary-dark px-4 pb-4 shadow-lg lg:static lg:flex lg:w-auto lg:flex-row lg:gap-6 lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          {navegacion.map((item) => {
            const activo = esActivo(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setAbierto(false)}
                  aria-current={activo ? "page" : undefined}
                  className={`flex items-center gap-2 rounded px-2 py-2 font-heading text-[17px] font-semibold transition-colors lg:px-0 ${
                    activo ? "text-highlight" : "text-white hover:text-highlight"
                  }`}
                >
                  <NavIcon name={item.icon} size={18} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
