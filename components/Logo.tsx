import Link from "next/link";

// Logo construido con texto + Tailwind (no es imagen): pesa 0 KB extra y se ve nítido en cualquier pantalla.
export default function Logo() {
  return (
    <Link href="/" aria-label="IKOMI Perú - ir al inicio" className="flex items-center gap-1.5 select-none">
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-extrabold tracking-widest text-white sm:text-xl">IKOMI PERÚ</span>
        <span className="mt-1 bg-accent px-1 py-0.5 text-[8px] font-bold tracking-wide text-white sm:text-[9px]">
          REPUESTOS DE KOREA Y JAPÓN
        </span>
      </span>
      <span className="border-y-4 border-accent font-heading text-2xl font-black italic leading-none text-white sm:text-3xl">
        IKM
      </span>
    </Link>
  );
}
