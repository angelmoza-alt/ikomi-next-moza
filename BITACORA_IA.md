# BITÁCORA DE USO DE IA — ikomi-next-moza

> Herramienta usada: **Claude** (Anthropic), como asistente para analizar el enunciado, generar código y revisar errores.
> Todo el código entregado fue revisado, ejecutado (`npm run dev` / `npm run build`) y es de mi responsabilidad.
> En qué partes participó la IA y qué decidí en cada caso está detallado en las entradas de abajo.

---

## 5.1 Registro de interacciones

### Entrada 1 — Entender el enunciado
- **Objetivo:** comprobar que entendía todo lo que pide la evaluación antes de empezar.
- **Prompt utilizado:**
  > "El examen solicita un README indicando los pasos para instalarlo, un archivo de decisiones (por ejemplo, por qué uso Tailwind en lugar de Bootstrap) y un archivo donde se escriba qué se le pidió a la IA. Necesito tu ayuda creando el proyecto, pero antes quiero que analices todo el documento y me digas si lo entiendes."
- **Resumen de la respuesta:** la IA resumió las 5 partes, la tabla de rutas, los entregables (mínimo 5 commits, despliegue, `evidencias/`) y las capturas de referencia (navbar azul con enlace activo amarillo, secciones oscuras en diagonal, línea roja bajo los títulos). Advirtió que las justificaciones deben estar en mis propias palabras.
- **Decisión:** ✅ **Aceptado**.
- **Justificación:** el resumen coincidía con el PDF y me sirvió como checklist. Lo comparé con la rúbrica punto por punto.

### Entrada 2 — Creación y configuración del proyecto
- **Objetivo:** crear `ikomi-next-moza` y decidir TS/JS, Tailwind, `src/`, App Router y ESLint.
- **Prompt utilizado:**
  > "Tienes la libertad de usar lo que gustes. Lo quería en Render, pero cualquiera está bien. Créalo en esa ubicación."
- **Resumen de la respuesta:** propuso `create-next-app@latest` con TypeScript, Tailwind, ESLint, App Router y **sin** `src/` (porque la tabla del examen usa `app/page.tsx`). Antes de escribir código leyó la documentación local de Next 16 (`node_modules/next/dist/docs`), porque la versión instalada (16.4.4) es más nueva que la que conocía.
- **Decisión:** ✏️ **Modificado**.
- **Justificación:** acepté las opciones, pero las justificaciones de `DECISIONES.md` las reescribí en función del sitio de IKOMI. Mantuve `cacheComponents: true`, que viene por defecto, aunque trajo complicaciones (entradas 4 y 6).

### Entrada 3 — Tipografía con next/font
- **Objetivo:** usar la tipografía del sitio original (Raleway en el menú) con `next/font`.
- **Prompt (instrucción del enunciado 4.3):** "Use next/image para las imágenes y next/font para la tipografía."
- **Resumen de la respuesta:** la primera opción era `next/font/google`, pero el entorno no tenía acceso a `fonts.googleapis.com` y el build habría fallado. La IA cambió a `next/font/local` con los archivos `.woff2` de Raleway y Open Sans (licencia OFL) dentro de `app/fonts/`.
- **Decisión:** ✏️ **Modificado**.
- **Justificación:** sigue cumpliendo el requisito (`next/font`) y además el build no depende de internet, lo cual sirve en el laboratorio de Tecsup.

### Entrada 4 — Enlace activo con usePathname
- **Objetivo:** resaltar en amarillo el enlace de la página actual (3.2).
- **Prompt:** "Resalta el enlace activo usando usePathname y explica por qué debe ser Client Component."
- **Resumen de la respuesta:** creó `Navbar.tsx` con `"use client"`, `usePathname()` y `useState` para el menú hamburguesa. Avisó que, según la documentación de Next 16, con `cacheComponents` activo `usePathname` puede quedar en espera en rutas dinámicas y **el build falla si no hay `<Suspense>`**. Por eso envolvió el Navbar en `<Suspense fallback={<NavbarFallback />}>`.
- **Decisión:** ✅ **Aceptado**.
- **Justificación:** comprobé en `node_modules/next/dist/docs/.../use-pathname.md` que es así. El fallback tiene la misma altura, así que no se ve un salto.

### Entrada 5 — Ruta dinámica y 404 de productos
- **Objetivo:** que `/productos/[slug]` muestre el detalle y use `notFound()` si el slug no existe.
- **Prompt:** "Crea data/productos.ts con productos y la ruta dinámica con generateMetadata y notFound()."
- **Resumen de la respuesta:** creó 6 productos, `generateStaticParams`, `generateMetadata` (con `params` como Promise) y `notFound()`. Al probar, `/productos/no-existe` mostraba la 404 pero con estado **200**. La IA quiso arreglarlo con `export const dynamicParams = false`, pero la documentación dice que **no está disponible con `cacheComponents`**.
- **Decisión:** ❌ **Rechazado** (la solución con `dynamicParams`).
- **Justificación:** usarlo habría roto el build. Verifiqué que la página lleva `<meta name="robots" content="noindex">`, así que Google no la indexa, y documenté la limitación en `DECISIONES.md`.

### Entrada 6 — Año del copyright en el Footer
- **Objetivo:** mostrar "Copyright © 2026" automáticamente.
- **Prompt:** "Crea el Footer con dirección, correo, teléfonos y links como en la captura."
- **Resumen de la respuesta:** la IA escribió `const anio = new Date().getFullYear()` dentro del Footer. **`npm run build` falló.** Ver el caso 1 de la sección 5.2.
- **Decisión:** ✏️ **Modificado**.
- **Justificación:** se corrigió con `"use cache"` después de leer el mensaje de error de Next.

### Entrada 7 — Experimento Link vs `<a>`
- **Objetivo:** medir la diferencia en Network (3.4).
- **Prompt:** "Compara la navegación con Link y con una etiqueta <a> en la pestaña Network."
- **Resumen de la respuesta:** midió con Playwright que con `Link` no hay petición `document` (solo las imágenes nuevas, porque la ruta ya estaba precargada con `?_rsc=`). Con `<a>` hubo 25 peticiones: HTML, CSS, fuentes, 10 scripts y otra vez los prefetch.
- **Decisión:** ✏️ **Modificado**.
- **Justificación:** usé los números como referencia, pero la captura de DevTools la tomé yo en Chrome (`evidencias/`), como pide el enunciado.

---

## 5.2 Casos en que la IA propuso código incorrecto

### Caso 1 — `new Date()` en un Server Component con cacheComponents

**Antes (propuesto por la IA):**

```tsx
export default function Footer() {
  const anio = new Date().getFullYear();
  ...
}
```

**Error real de `npm run build`:**

```
Error: Route "/": Next.js encountered the unstable value `new Date()` while prerendering.
This value can change between renders, so it must be either prerendered or computed later.
```

**Después (corregido):**

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

**Explicación:** en Next 16 con `cacheComponents`, el HTML estático se genera en el build. Un valor que cambia en cada ejecución, como la fecha, hace que Next no sepa si la página es estática o dinámica, así que obliga a decidirlo. Con `"use cache"` el año se calcula una vez en el build y queda guardado en el HTML. La IA usó un patrón que funcionaba en versiones anteriores y no tuvo en cuenta este cambio.

### Caso 2 — Estilos en conflicto en el título "Links" del Footer

**Antes (propuesto por la IA):**

```tsx
<SectionTitle as="h2" align="left" light className="text-lg">
  Links
</SectionTitle>
```

`SectionTitle` ya trae `text-3xl md:text-4xl`. Al agregar `text-lg`, Tailwind genera **ambas** clases y en pantallas `md` gana `md:text-4xl`. Resultado: "LINKS" salía gigante en el footer (se ve en la primera captura a 1280 px).

**Después (corregido):**

```tsx
<h2 className="text-lg font-bold">Links</h2>
<span className="mt-3 mb-6 block h-0.5 w-8 bg-accent" aria-hidden="true" />
```

**Explicación:** en Tailwind no se puede "sobrescribir" un tamaño pasando otra clase por `className`, porque el orden lo decide el CSS generado y no el orden en el HTML. `SectionTitle` está pensado para títulos de sección grandes, y reutilizarlo en el footer era forzarlo. Lo detecté revisando las capturas responsive.

### Caso 3 — `dynamicParams = false` incompatible

La IA propuso `export const dynamicParams = false` para que un slug inexistente devolviera el estado 404. En Next 16 esa opción **no está disponible cuando `cacheComponents` está activo**. Se rechazó (ver la entrada 5).

---

## 5.3 Reflexión (máx. 200 palabras)

> ✍️ **Pendiente: escribir con mis propias palabras.** Puntos que quiero tocar:
> - Qué entendí mejor gracias a la IA (por ejemplo: la diferencia Server/Client Component, por qué `Link` no recarga la página).
> - Qué tuve que razonar yo porque la IA no lo resolvió bien (el error de `new Date()`, el título del footer, el 404 con estado 200).
> - Qué aprendí de revisar la documentación de la versión instalada en lugar de confiar en lo que "se sabe" de versiones anteriores.

---

## 5.4 Preparación para la sustentación (sin IA)

Cambios que practiqué en vivo:
- [ ] Agregar la ruta `/blog` → crear `app/blog/page.tsx`, exportar `metadata` y añadir `{ href: "/blog", label: "Blog", icon: ... }` en `data/site.ts` (el Navbar y el Footer se actualizan solos).
- [ ] Añadir una prop a `ProductCard` → por ejemplo, `mostrarMarca` ya existe. Probar con `destacado?: boolean` para mostrar una etiqueta "Nuevo".
- [ ] Cambiar el color principal → editar `--color-primary` en `app/globals.css`.
