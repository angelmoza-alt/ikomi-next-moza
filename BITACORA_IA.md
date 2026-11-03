# BITÁCORA DE USO DE IA — ikomi-next-moza

**Herramienta utilizada:** Claude (Anthropic).

**Mi participación:** Dirigí el desarrollo del proyecto definiendo sus objetivos, requisitos y plataforma de despliegue. Utilicé Claude como apoyo para generar la estructura y gran parte del código, pero fui yo quien evaluó las propuestas, tomó las decisiones técnicas, solicitó modificaciones y comprobó que el resultado cumpliera con lo solicitado. También revisé el sitio publicado, hice preguntas para comprender el funcionamiento del código, realicé las pruebas en DevTools y gestioné los cambios en GitHub y Render.

Las siguientes entradas registran las interacciones y decisiones que tomé durante el desarrollo.

---

## 5.1 Registro de interacciones

### Entrada 1 — Análisis del enunciado

- **Objetivo:** Comprender los requisitos del examen y organizar el trabajo antes de iniciar el proyecto.
- **Prompt utilizado:**

  > "El examen solicita un README indicando los pasos para instalarlo, un archivo de decisiones (por ejemplo, por qué uso Tailwind en lugar de Bootstrap) y un archivo donde se escriba qué se le pidió a la IA. Necesito tu ayuda creando el proyecto, pero antes quiero que analices todo el documento y me digas si lo entiendes."

- **Resumen de la respuesta:** Claude identificó las cinco partes del examen, las rutas solicitadas, los entregables y las capturas de referencia. También señaló los puntos que debía tener en cuenta para cumplir con la evaluación.
- **Mi decisión:** Acepté el análisis y lo utilicé como guía para organizar el desarrollo.
- **Mi participación:** Comparé el resumen con el documento original y tomé los requisitos como referencia para revisar el avance del proyecto.

### Entrada 2 — Configuración del proyecto y elección del despliegue

- **Objetivo:** Crear el proyecto `ikomi-next-moza` y definir las tecnologías que utilizaría.
- **Prompt utilizado:**

  > "Tienes la libertad de usar lo que gustes. Lo quería en Render, pero cualquiera está bien. Créalo en esa ubicación."

- **Resumen de la respuesta:** Claude propuso TypeScript, Tailwind CSS v4, ESLint, App Router y una estructura sin carpeta `src/`. También revisó la documentación de Next.js 16 para adaptar la configuración a la versión instalada.
- **Mi decisión:** Acepté la configuración propuesta y elegí Render como plataforma de despliegue.
- **Mi participación:** Definí que quería trabajar con Render porque es una plataforma que vimos en clase y donde ya tenía una cuenta. También evalué la estructura propuesta y comprobé que coincidiera con los requisitos del examen.

### Entrada 3 — Desarrollo de páginas y componentes

- **Objetivo:** Construir el sitio web de IKOMI PERÚ cumpliendo con las rutas, componentes y funcionalidades solicitadas.
- **Tarea encargada:** Solicité la creación de las páginas, `data/productos.ts`, la ruta dinámica con `notFound()`, el Navbar con enlace activo y menú hamburguesa, los componentes, el README, DECISIONES.md y las adaptaciones responsive.
- **Resumen de la respuesta:** Claude generó la estructura y el código del proyecto, organizando el trabajo en cinco commits progresivos. También realizó verificaciones con `npm run build` y `npm run lint`, durante las cuales aparecieron problemas relacionados con Next.js 16 que fueron corregidos.
- **Mi decisión:** Acepté la base del proyecto, pero solicité modificaciones cuando encontré aspectos que no cumplían con lo que buscaba.
- **Mi participación:** Revisé el sitio publicado, evalué su apariencia y funcionamiento, pedí mejoras en las imágenes y solicité que la bitácora reflejara las interacciones reales. No me limité a aceptar el resultado inicial; fui indicando qué debía cambiarse.

### Entrada 4 — Comportamiento de la ruta 404

- **Objetivo:** Conseguir que una dirección de producto inexistente, como `/productos/no-existe`, mostrara la página 404.
- **Tarea encargada:** Revisar el comportamiento de la ruta dinámica y encontrar una solución compatible con Next.js 16.
- **Resumen de la respuesta:** La página 404 se mostraba, pero la respuesta HTTP seguía siendo 200. Claude propuso utilizar `export const dynamicParams = false`, pero al revisar la documentación se encontró que esa opción no era compatible con `cacheComponents`.
- **Mi decisión:** Rechacé la propuesta de `dynamicParams = false`.
- **Mi participación:** Revisé la alternativa y decidí no aplicar una configuración que podía romper la compilación. Se mantuvo `notFound()` junto con `<meta name="robots" content="noindex">`, y se documentó la limitación en DECISIONES.md.

### Entrada 5 — Comprensión del código y sus funcionalidades

- **Objetivo:** Comprender las partes principales del proyecto para poder explicarlas durante la sustentación.
- **Prompts utilizados:**

  > "¿Por qué el Navbar tiene `"use client"` y el Footer no?"

  > "Explícame qué hace `generateStaticParams` en `[slug]`."

  > "¿Por qué falló el build con `new Date()` y qué hace `"use cache"`?"

- **Resumen de la respuesta:**
  - El Navbar utiliza `usePathname` y `useState`, por eso necesita ejecutarse como Client Component. El Footer contiene información fija y puede mantenerse como Server Component.
  - `generateStaticParams` proporciona los slugs de los productos para generar sus páginas durante la compilación.
  - Con `cacheComponents`, utilizar directamente `new Date()` durante el prerender puede generar un error. La solución aplicada fue utilizar `"use cache"` en una función que obtiene el año.
- **Mi decisión:** Acepté las explicaciones después de relacionarlas con los archivos del proyecto.
- **Mi participación:** Hice preguntas sobre el código generado para entender su funcionamiento y no depender únicamente de tener el proyecto terminado. Me enfoqué en los componentes y funciones que podrían ser consultados durante la sustentación.

### Entrada 6 — Evaluación y reemplazo de imágenes

- **Objetivo:** Mejorar la presentación visual del sitio y reemplazar las ilustraciones provisionales.
- **Prompt utilizado:**

  > "Primero mejoremos las imágenes que pusiste de muestra, porque están muy simples y son genéricas. Quiero que descargues imágenes reales de la web y que queden perfectas para la página."

- **Resumen de la respuesta:** Claude buscó imágenes en Unsplash y Wikimedia Commons, presentó las opciones con sus fuentes y licencias, y luego realizó los cambios solicitados. También agregó los créditos correspondientes y limpió la caché de `next/image`.
- **Mi decisión:** Rechacé las ilustraciones iniciales y aprobé el uso de fotografías reales después de revisar la selección.
- **Mi participación:** Evalué la apariencia de las imágenes y determiné que las primeras opciones no representaban adecuadamente el estilo del sitio de referencia. Por eso solicité reemplazarlas. Después de revisar el resultado, realicé el commit y el push de los cambios.

### Entrada 7 — Comparación entre Link y la etiqueta `<a>`

- **Objetivo:** Comprobar las diferencias de navegación solicitadas en el apartado 3.4 del examen.
- **Prompts utilizados:**

  > "Capturas de Network, ¿cómo así?"

  > "Dime cómo hacerlo".

- **Resumen de la respuesta:** Claude explicó cómo utilizar DevTools para comparar las peticiones de navegación. Me indicó cómo activar `Keep log`, utilizar los filtros All y Doc y ejecutar un enlace temporal desde la consola. También me ayudó a solucionar el bloqueo de pegado de Chrome y a corregir el filtro Fetch/XHR que había seleccionado por error.
- **Mi decisión:** Decidí realizar personalmente el experimento y tomar las capturas directamente desde DevTools, en lugar de utilizar una medición automática.
- **Mi participación:** Ejecuté las pruebas, revisé las peticiones y tomé las cuatro capturas que utilicé como evidencia. Los resultados fueron:
  - Con `Link`: 4 peticiones y 0 documentos.
  - Con `<a>`: 16 peticiones, 714 kB y 1 documento (`servicios`, 304).
  
  Utilicé un enlace temporal desde la consola para realizar la comparación sin modificar el proyecto ni volver a desplegarlo.

---

## 5.2 Casos en que la IA propuso código incorrecto

### Caso 1 — Uso de `new Date()` en un Server Component

**Código inicial propuesto:**

```tsx
export default function Footer() {
  const anio = new Date().getFullYear();
  ...
}
```

**Error obtenido durante `npm run build`:**

```text
Error: Route "/": Next.js encountered the unstable value `new Date()` while prerendering.
This value can change between renders, so it must be either prerendered or computed later.
```

**Código corregido:**

```tsx
async function obtenerAnio() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const anio = await obtenerAnio();
  ...
}
```

**Mi análisis:** Al revisar el error de compilación, identifiqué que el problema estaba relacionado con el uso de una fecha durante el prerenderizado. Solicité una explicación y revisé la solución aplicada. Con `"use cache"` se consiguió almacenar el resultado de la función y evitar el error.

### Caso 2 — Conflicto de estilos en el título del Footer

**Código inicial propuesto:**

```tsx
<SectionTitle as="h2" align="left" light className="text-lg">
  Links
</SectionTitle>
```

El componente `SectionTitle` ya tenía los tamaños `text-3xl md:text-4xl`. Al agregar `text-lg`, el tamaño esperado no se mostraba correctamente en pantallas medianas.

**Código corregido:**

```tsx
<h2 className="text-lg font-bold">Links</h2>
<span className="mt-3 mb-6 block h-0.5 w-8 bg-accent" aria-hidden="true" />
```

**Mi análisis:** Detecté el problema al revisar visualmente el sitio y sus capturas responsive. Solicité corregir el título porque se veía demasiado grande para el Footer. La solución fue utilizar un encabezado independiente en lugar de reutilizar un componente diseñado para títulos de secciones.

### Caso 3 — `dynamicParams = false` incompatible

Claude propuso utilizar:

```tsx
export const dynamicParams = false;
```

La intención era conseguir que un slug inexistente devolviera un estado 404. Sin embargo, esta configuración no estaba disponible con `cacheComponents` en el proyecto.

**Mi análisis:** Antes de aceptar el cambio, revisé su compatibilidad con la versión de Next.js utilizada. Decidí rechazarlo para evitar problemas durante la compilación. Se mantuvo `notFound()` y se explicó la limitación en DECISIONES.md.

---

## 5.3 Reflexión (máximo 200 palabras)

Durante este proyecto aprendí que utilizar una IA no significa aceptar todo lo que genera. Mi participación fue definir lo que necesitaba, revisar las propuestas y decidir qué cambios se debían realizar. También comprendí mejor cómo funcionan los Server Components y Client Components, para qué sirve `generateStaticParams` y cómo `Link` permite navegar sin recargar toda la página. 

Una parte importante fue realizar las pruebas en DevTools, porque pude observar directamente las diferencias entre `Link` y `<a>`. También encontré problemas que no se habían resuelto correctamente al inicio, como el uso de `new Date()`, los estilos del Footer y el comportamiento de la ruta 404. Esto me permitió entender que debo comprobar el código y no confiar únicamente en una respuesta de la IA. Ahora tengo una mejor idea de cómo está organizado el proyecto y qué partes debo modificar si necesito agregar nuevas páginas o cambiar su diseño.

---

## 5.4 Preparación para la sustentación (sin IA)

Para comprobar que puedo realizar modificaciones sin depender de la IA, debo practicar los siguientes cambios:

- [ ] **Agregar una ruta `/blog`:** crear `app/blog/page.tsx`, exportar sus metadatos y agregar el enlace correspondiente en `data/site.ts`.
- [ ] **Modificar ProductCard:** agregar una propiedad `destacado?: boolean` para mostrar una etiqueta como "Nuevo".
- [ ] **Cambiar el color principal:** editar la variable `--color-primary` en `app/globals.css`.

**Mi objetivo:** Poder explicar cómo está organizado el proyecto, identificar dónde se realizan los cambios y demostrar que comprendo las decisiones técnicas que se aplicaron durante su desarrollo.