// Fondo oscuro con bordes en diagonal (Servicios y Marcas en el sitio original).
// Se extrajo a un componente para no repetir el clip-path en dos páginas.
export default function DarkSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="clip-diagonal bg-dark px-4 py-24 text-white md:py-28">
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
