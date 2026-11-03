// "Base de datos" local del catálogo. En un proyecto real vendría de una API o de una BD;
// aquí basta un arreglo tipado para alimentar /productos y /productos/[slug].

export const categorias = [
  "Disco, plato y collarín de embrague",
  "Pastilla y zapata de freno",
  "Piñón y parte de caja",
] as const;

export type Categoria = (typeof categorias)[number];

export type Producto = {
  slug: string; // parte de la URL: /productos/<slug>
  nombre: string;
  categoria: Categoria;
  marca: string;
  imagen: string;
  resumen: string; // texto corto para la tarjeta
  descripcion: string;
  compatibilidad: string[];
  credito?: string; // atribución requerida por la licencia de la foto (CC BY-SA)
};

export const productos: Producto[] = [
  {
    slug: "disco-de-embrague",
    nombre: "Disco de embrague",
    categoria: "Disco, plato y collarín de embrague",
    marca: "PHC Valeo",
    imagen: "/images/productos/disco-de-embrague.jpg",
    resumen: "Disco con material de fricción reforzado y resortes amortiguadores.",
    descripcion:
      "Disco de embrague de fricción orgánica reforzada para camiones de carga media y pesada. Sus resortes de torsión absorben las vibraciones del motor y protegen la caja de cambios en arranques con carga.",
    compatibilidad: ["Hyundai HD65 / HD78", "Kia K3000", "Mitsubishi Canter"],
  },
  {
    slug: "corona-y-pinon",
    nombre: "Corona y piñón",
    categoria: "Piñón y parte de caja",
    marca: "Hansang",
    imagen: "/images/productos/corona-y-pinon.jpg",
    resumen: "Juego de corona y piñón de acero templado para diferencial.",
    descripcion:
      "Juego de corona y piñón fabricado en acero aleado con tratamiento térmico, diseñado para soportar el torque del diferencial trasero en rutas de sierra y carga continua.",
    compatibilidad: ["Hyundai HD72", "Isuzu NPR", "Hino Serie 300"],
  },
  {
    slug: "plato-de-embrague",
    nombre: "Plato de embrague",
    categoria: "Disco, plato y collarín de embrague",
    marca: "PHC Valeo",
    imagen: "/images/productos/plato-de-embrague.jpg",
    resumen: "Plato de presión con diafragma de alta resistencia.",
    descripcion:
      "Plato de presión con diafragma de acero que mantiene una fuerza de sujeción constante durante toda su vida útil, para cambios suaves y menos desgaste del disco.",
    compatibilidad: ["Kia K2700", "Hyundai H100", "Nissan Cabstar"],
    credito: "Foto: Panoha, Wikimedia Commons (CC BY-SA 3.0)",
  },
  {
    slug: "pastillas-de-freno",
    nombre: "Pastillas de freno",
    categoria: "Pastilla y zapata de freno",
    marca: "Sangsin Brake",
    imagen: "/images/productos/pastillas-de-freno.jpg",
    resumen: "Juego delantero semimetálico de baja emisión de polvo y ruido.",
    descripcion:
      "Pastillas de freno de compuesto semimetálico, con buena respuesta en frío y en caliente. Fabricadas por un proveedor OEM de Hyundai y Kia.",
    compatibilidad: ["Hyundai H1", "Kia Sorento", "Hyundai Porter"],
  },
  {
    slug: "eje-de-caja",
    nombre: "Eje primario de caja",
    categoria: "Piñón y parte de caja",
    marca: "Hansang",
    imagen: "/images/productos/eje-de-caja.jpg",
    resumen: "Eje con estrías rectificadas para transmisión manual.",
    descripcion:
      "Eje primario de caja de cambios con estrías rectificadas y piñones integrados, mecanizado con tolerancias originales para un acople preciso con el disco de embrague.",
    compatibilidad: ["Hyundai HD65", "Kia Frontier", "Mitsubishi Fuso"],
  },
  {
    slug: "volante-bimasa",
    nombre: "Volante bimasa",
    categoria: "Disco, plato y collarín de embrague",
    marca: "PHC Valeo",
    imagen: "/images/productos/volante-bimasa.jpg",
    resumen: "Volante de doble masa que reduce vibraciones en la cabina.",
    descripcion:
      "Kit de volante bimasa (Dual Mass Flywheel) que separa la masa del motor y de la transmisión para filtrar vibraciones, mejorar el confort y prolongar la vida de la caja.",
    compatibilidad: ["Hyundai Starex", "Kia Bongo", "Hyundai County"],
    credito: "Foto: Cschirp, Wikimedia Commons (CC BY-SA 3.0)",
  },
];

export function obtenerProducto(slug: string) {
  return productos.find((p) => p.slug === slug);
}
