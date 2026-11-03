type Props = {
  children: React.ReactNode;
  subtitle?: string;
  as?: "h1" | "h2";
  align?: "center" | "left";
  light?: boolean; // true cuando va sobre fondo oscuro
  className?: string;
};

// Título de sección con la línea roja inferior que se repite en todo el sitio de IKOMI.
// Recibe "as" para que cada página tenga un único h1 (bueno para SEO) y el resto sean h2.
export default function SectionTitle({ children, subtitle, as: Tag = "h2", align = "center", light = false, className = "" }: Props) {
  const centrado = align === "center";
  return (
    <div className={`mb-10 ${centrado ? "text-center" : "text-left"}`}>
      <Tag className={`text-3xl font-bold uppercase md:text-4xl ${light ? "text-white" : "text-ink"} ${className}`}>
        {children}
      </Tag>
      <span className={`mt-4 block h-0.5 w-12 bg-accent ${centrado ? "mx-auto" : ""}`} aria-hidden="true" />
      {subtitle && <p className={`mt-5 text-lg ${light ? "text-white/90" : "text-ink/80"}`}>{subtitle}</p>}
    </div>
  );
}
