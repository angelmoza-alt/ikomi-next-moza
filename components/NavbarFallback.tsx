import Logo from "./Logo";

// Se muestra solo un instante mientras Navbar (Client Component) resuelve la ruta actual.
// Tiene la misma altura y color para que no haya "salto" visual (layout shift).
export default function NavbarFallback() {
  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3" style={{ minHeight: 68 }}>
        <Logo />
      </div>
    </header>
  );
}
