export type Marca = {
  nombre: string;
  origen: "Korea" | "Japón";
  color: string; // color de la marca para su "logotipo" en texto
  descripcion: string;
};

export const marcas: Marca[] = [
  {
    nombre: "SANGSIN BRAKE",
    origen: "Korea",
    color: "#c92a2a",
    descripcion:
      "Fabricante líder en la industria coreana de piezas y partes para frenos de fricción, con más de 6 plantas a nivel mundial. Es proveedor OEM para Hyundai, Kia, GM Daewoo, SsangYong y Renault Samsung.",
  },
  {
    nombre: "HANSANG",
    origen: "Korea",
    color: "#1864ab",
    descripcion:
      "Maneja una amplia gama de repuestos de partes de caja como: piñón y corona, deslizante, piñones, trenfijo, satélites, planetarios, propulsor, bronces, etc.",
  },
  {
    nombre: "MANDO",
    origen: "Korea",
    color: "#1971c2",
    descripcion:
      "Mando Corporation pertenece al grupo Halla Holding y cuenta con 20 fábricas en el mundo, 16 centros de investigación y más de 11,000 trabajadores. Su visión es crear productos seguros, ecológicos y de fácil uso.",
  },
  {
    nombre: "TCIC",
    origen: "Korea",
    color: "#e03131",
    descripcion:
      "Tae Chul Industrial Co. fabrica piezas de automóviles desde hace más de 70 años, especializada en bombas y bombines de freno y embrague de la mejor calidad. Cuenta con 5 plantas en Asia.",
  },
  {
    nombre: "PHC VALEO",
    origen: "Korea",
    color: "#2f9e44",
    descripcion:
      "Valeo Pyeong Hwa International tiene más de 90 años de creación y se ha convertido en socio de los principales fabricantes de automóviles, con operaciones en 33 países.",
  },
  {
    nombre: "YULIM",
    origen: "Korea",
    color: "#37b24d",
    descripcion:
      "Establecida en 1998, Yulim High-Tech es una de las compañías líderes de la industria automotriz en Corea. Produce y exporta piezas para sistemas de suspensión y dirección.",
  },
];
