import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import NavbarFallback from "@/components/NavbarFallback";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import "./globals.css";

// next/font/local: las fuentes se sirven desde el propio dominio (sin pedir a Google en cada visita)
// y Next.js genera un fallback ajustado para evitar el "salto" del texto al cargar.
const raleway = localFont({
  src: "./fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
  display: "swap",
});

const openSans = localFont({
  src: "./fonts/OpenSans.woff2",
  variable: "--font-open-sans",
  weight: "300 800",
  display: "swap",
});

export const metadata: Metadata = {
  // template: cada página solo define su parte del título y se completa con "| IKOMI PERÚ"
  title: {
    default: "IKOMI PERÚ S.R.L. | Repuestos de Korea y Japón",
    template: "%s | IKOMI PERÚ",
  },
  description:
    "Empresa importadora de repuestos para camiones de todas las marcas: embragues, frenos, piñones y partes de caja de Korea y Japón.",
  keywords: ["repuestos", "camiones", "Korea", "Japón", "embrague", "frenos", "Lima", "Ate"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${raleway.variable} ${openSans.variable}`}>
      <body className="flex min-h-screen flex-col">
        {/* Suspense: con cacheComponents, usePathname puede suspender en rutas dinámicas;
            el fallback mantiene el layout estático mientras tanto. */}
        <Suspense fallback={<NavbarFallback />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
