export type Servicio = {
  titulo: string;
  descripcion: string;
  icono: "ventas" | "asesoria" | "delivery" | "productos";
};

export const servicios: Servicio[] = [
  {
    titulo: "Ventas",
    icono: "ventas",
    descripcion:
      "Venta de los mejores repuestos de partes de motor, cajas, transmisiones, piñones, coronas y trenes fijos de las marcas de Korea y Japón. A los mejores precios del mercado.",
  },
  {
    titulo: "Asesoría",
    icono: "asesoria",
    descripcion:
      "Le brindamos una asesoría personalizada acerca de nuestros productos, para elegir el mejor repuesto para su movilidad.",
  },
  {
    titulo: "Delivery",
    icono: "delivery",
    descripcion: "Compras sin salir de casa: realizamos entregas a domicilio en el menor tiempo posible.",
  },
  {
    titulo: "Productos",
    icono: "productos",
    descripcion: "Contamos con las mejores marcas y calidad de productos del mercado.",
  },
];
