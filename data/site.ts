// Datos generales de la empresa: se usan en el Footer, Contacto y botones flotantes.
// Centralizarlos evita repetir teléfonos o correos en varios componentes.
export const empresa = {
  nombre: "IKOMI PERÚ S.R.L.",
  lema: "Repuestos de Korea y Japón",
  descripcion:
    "Empresa importadora y comercializadora de repuestos para todo tipo de vehículos con calidad y a precios de mercado.",
  direccion: ["Avenida Nicolás Ayllón 3384", "Carretera Central - Paradero Rayovac", "Lima - Ate"],
  correos: ["ventas@ikomiperu.com"],
  telefonos: ["985 068 416", "981 453 306"],
  whatsapp: "51985068416",
  mapaEmbed: "https://www.google.com/maps?q=Av.+Nicol%C3%A1s+Ayll%C3%B3n+3384,+Ate,+Lima&output=embed",
};

export const navegacion = [
  { href: "/", label: "Inicio", icon: "inicio" },
  { href: "/nosotros", label: "Nosotros", icon: "nosotros" },
  { href: "/servicios", label: "Servicios", icon: "servicios" },
  { href: "/productos", label: "Productos", icon: "productos" },
  { href: "/marcas", label: "Marcas", icon: "marcas" },
  { href: "/contacto", label: "Contáctenos", icon: "contacto" },
] as const;

export type NavIcon = (typeof navegacion)[number]["icon"];
