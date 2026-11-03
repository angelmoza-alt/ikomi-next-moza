# DECISIONES — ikomi-next-moza

Registro de las decisiones técnicas tomadas durante el desarrollo del sitio de IKOMI PERÚ con Next.js 16 (App Router). Para ello utilicé Claude como herramienta de apoyo para evaluar alternativas, generar código y resolver dudas técnicas. Revisé las propuestas, probé su funcionamiento y seleccioné las opciones que mejor se ajustaban a los requisitos del examen.

> Alumno: Angel Moza Cabanillas · Desarrollo de Aplicaciones Web Avanzado · Tecsup

---

## 1. Configuración inicial del proyecto (Parte 1.2)

Comando usado:

```bash
npx create-next-app@latest ikomi-next-moza --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

| Opción elegida | Alternativa descartada | Justificación |
|---|---|---|
| **TypeScript** | JavaScript | El catálogo de IKOMI tiene una estructura fija (slug, nombre, categoría, marca, compatibilidad). Con el tipo `Producto` el editor me avisa si una tarjeta usa un campo que no existe o si escribo mal una categoría. <br> Además el tipo `Categoria` sale del arreglo `categorias`, así que el filtro de productos no acepta una categoría que no esté registrada. |
| **Tailwind CSS v4** | CSS Modules / Bootstrap | El sitio repite muchos patrones (tarjetas blancas con sombra, títulos con línea roja, secciones oscuras). Con Tailwind los armo rápido en el mismo componente sin crear un archivo .css por cada uno. <br> Los colores de IKOMI (azul, rojo, amarillo) se definen una sola vez en `@theme` dentro de `globals.css` (ver sección 4). |
| **Sin carpeta `src/`** | Con `src/` | El proyecto es pequeño (un sitio corporativo de 7 páginas) y la tabla del examen usa rutas como `app/page.tsx`. Sin `src/` la estructura coincide exactamente con la del enunciado. <br> `app/`, `components/` y `data/` quedan en la raíz y se distinguen bien. |
| **App Router** | Pages Router | Es lo que pide el examen y es el router actual de Next.js. Me da Server Components por defecto (menos JavaScript para el cliente), layouts anidados y la API `metadata`. <br> En el Pages Router tendría que usar `getStaticProps`/`getStaticPaths` y `_app.tsx`, que ya no son la forma recomendada. |
| **ESLint** (eslint-config-next) | Sin linter | Detecta errores típicos de Next.js, como usar `<img>` en lugar de `next/image` o `<a>` para rutas internas. <br> Lo ejecuto con `npm run lint` antes de cada commit. |
| **Alias `@/*`** | Rutas relativas `../../` | En `app/productos/[slug]/page.tsx` importar `@/components/ProductCard` es más legible que `../../../components/ProductCard`. <br> Si muevo un archivo, el import no se rompe. |
| **Mantener `cacheComponents: true`** (lo trae Next 16.4 por defecto) | Desactivarlo | Las páginas se prerenderizan como HTML estático y la navegación es casi instantánea, algo ideal para un catálogo que cambia poco. <br> **Costo:** me obligó a envolver el Navbar en `<Suspense>`, a usar `"use cache"` para el año del footer y a no poder usar `dynamicParams = false` (ver la sección 2). |

### 1.3 ¿Para qué sirve cada archivo?

- **`app/layout.tsx`**: el layout raíz. Envuelve todas las páginas con `<html>` y `<body>`. Aquí pongo lo que se repite en todo el sitio: **Navbar, Footer, botones flotantes, fuentes y la metadata por defecto**. Cuando se navega no se vuelve a renderizar, solo cambia `children`.
- **`app/page.tsx`**: la página de la ruta `/` (Inicio). Cada carpeta dentro de `app/` que tenga un `page.tsx` se convierte en una URL (`app/marcas/page.tsx` → `/marcas`).
- **`public/`**: archivos estáticos que se sirven tal cual desde la raíz del dominio. Por ejemplo, `public/images/hero.jpg` se pide como `/images/hero.jpg`. Ahí están las fotos de productos y de la empresa.
- **`next.config.ts`**: la configuración de Next.js (opciones de imágenes, `cacheComponents`, turbopack). Lo leen `next dev` y `next build`.
- **Scripts de `package.json`**:
  - `npm run dev` → `next dev`: servidor de desarrollo con recarga en caliente (http://localhost:3000).
  - `npm run build` → `next build`: compila y optimiza para producción y prerenderiza las páginas estáticas en `.next/`.
  - `npm run start` → `next start`: sirve lo que generó el build. Es lo que ejecuta Render en producción.

### 1.4 ¿Qué gana IKOMI con Next.js frente a una SPA (React + Vite)?

En una SPA con Vite, el servidor entrega un `index.html` casi vacío (`<div id="root"></div>`) y el contenido aparece solo cuando el navegador descarga y ejecuta todo el JavaScript. En Next.js, **cada página llega ya renderizada como HTML desde el servidor** (en este proyecto, prerenderizada en el build).

**Ejemplo concreto:** si un mecánico busca en Google *"disco de embrague PHC Valeo Hyundai HD65"*, el bot de Google entra a `/productos/disco-de-embrague` y recibe directamente:
- `<title>Disco de embrague | IKOMI PERÚ</title>` y su `<meta description>` (de `generateMetadata`),
- el `<h1>`, la descripción y la lista de compatibilidad ya en el HTML.

En la SPA, ese producto tendría el mismo título genérico que el resto del sitio y el contenido dependería de que el bot ejecute JavaScript. Además:
- **Rendimiento:** las páginas del catálogo son Server Components, así que su código no se manda al navegador. Solo viajan como JS el Navbar, el filtro de productos, el formulario y los botones flotantes. En un celular con datos móviles (muchos clientes de IKOMI son transportistas) eso se nota.
- **Imágenes:** `next/image` sirve cada foto en WebP y al tamaño de la pantalla. En Vite tendría que configurarlo a mano.

---

## 2. Enrutamiento (Parte 2.4)

| Opción elegida | Alternativa descartada | Justificación |
|---|---|---|
| **No usar layout anidado en `/productos`** | `app/productos/layout.tsx` | El listado y el detalle no comparten ninguna interfaz propia: el detalle tiene breadcrumb y el listado tiene filtros. Un layout anidado quedaría vacío o forzaría elementos que una de las dos páginas no necesita. <br> Si más adelante se agrega una barra lateral de categorías común a ambas, ahí sí lo crearía. |
| **No usar route groups `(marketing)`** | `app/(marketing)/...` | Todas las páginas de IKOMI comparten el mismo layout (Navbar + Footer), así que agruparlas no aporta nada. Los route groups sirven cuando hay secciones con layouts distintos, por ejemplo un futuro `(admin)` para gestionar el catálogo sin el menú público. <br> Agregarlo ahora solo sumaría carpetas sin beneficio. |
| **`generateStaticParams`** en `[slug]` | Renderizar cada producto en cada petición | El catálogo está en `data/productos.ts` y no cambia entre visitas, así que cada producto se genera como HTML en el build (aparecen en la salida de `npm run build`). <br> Es el reemplazo de `getStaticPaths` del Pages Router. |
| **`notFound()` + `app/not-found.tsx`** | Mostrar "producto no existe" dentro de la misma página | Así uso una sola 404 con el diseño de IKOMI para rutas inexistentes y para slugs inválidos. <br> **Hallazgo:** `/cualquier-cosa` responde con estado 404, pero `/productos/no-existe` responde 200 con `<meta name="robots" content="noindex">`. Pasa porque con `cacheComponents` la página empieza a enviarse antes de saber si el slug existe, y `dynamicParams = false` no está disponible con esa opción (lo dice la documentación de Next 16). Como Google no indexa la página gracias al `noindex`, acepté este comportamiento. |
| **`metadata` con `title.template`** | Escribir el título completo en cada página | En el layout definí `template: "%s | IKOMI PERÚ"`, así cada página solo exporta `title: "Marcas"` y el resultado es "Marcas \| IKOMI PERÚ". <br> Si la empresa cambia de nombre, se modifica en un solo lugar. |

---

## 3. Navegación (Parte 3)

### 3.2 ¿Por qué el Navbar es Client Component y el resto no?

`Navbar.tsx` empieza con `"use client"` por dos razones:
1. **`usePathname()`** lee la URL actual del navegador para pintar en amarillo el enlace activo. Es un hook de React y los hooks solo funcionan en Client Components.
2. **`useState`** guarda si el menú hamburguesa está abierto o cerrado, y eso depende del clic del usuario, que solo ocurre en el navegador.

El resto del sitio (Hero, tarjetas, Footer y todas las páginas) **solo muestra contenido**: no tiene estado ni eventos. Por eso queda como Server Component y su JavaScript no se descarga. Los únicos Client Components son los que necesitan interacción: `Navbar`, `ProductFilter` (filtro), `ContactForm` (formulario) y `FloatingButtons` (botón para subir, que escucha el scroll).

En el layout envolví `<Navbar />` en `<Suspense fallback={<NavbarFallback />}>`. Con `cacheComponents`, `usePathname` puede quedar en espera en rutas con parámetros desconocidos (como `/productos/no-existe`), y sin `Suspense` el build falla. El fallback tiene la misma altura y color, así que no se ve ningún salto.

### 3.4 Experimento `Link` frente a `<a href>`

Hice el experimento en Chrome DevTools > Network (con "Keep log" activado) sobre el sitio publicado en Render. Primero hice clic en "Nosotros" del menú (`Link`). Luego, desde la consola, agregué temporalmente un enlace `<a href="/servicios">` normal a la página y le hice clic. Tomé las capturas con el filtro **All** y con el filtro **Doc** (`evidencias/network-link*.png` y `evidencias/network-a-href*.png`).

| | `<Link href="/nosotros">` (Navbar) | `<a href="/servicios">` |
|---|---|---|
| Peticiones totales | **4** (solo las imágenes de Nosotros) | **16** |
| Transferido | **0 B** (todo desde la caché en memoria) | **4.8 kB** |
| Recursos cargados | 184 kB | **714 kB** |
| Filtro **Doc** | **0**: no se pidió ningún documento | **1**: `servicios`, tipo `document` (304) |
| Eventos de carga | No hay | `DOMContentLoaded` 676 ms y `Load` 732 ms |

El `document` de servicios salió con estado **304** (Not Modified): el servidor confirmó que el HTML no había cambiado y el navegador usó su copia guardada. Aun así fue una navegación completa: la página anterior se descartó y se volvieron a cargar y ejecutar el CSS, las fuentes y todos los scripts. Por eso aparecen `DOMContentLoaded` y `Load`, que solo ocurren cuando se carga una página entera.

**Por qué:** `Link` intercepta el clic y hace una navegación del lado del cliente. Además, cuando el enlace aparece en pantalla, Next.js hace un *prefetch* del payload RSC de esa ruta (`/nosotros?_rsc=...`), así que al hacer clic los datos ya están y solo cambia el contenido de `children`. Con `<a>`, el navegador hace una navegación tradicional: tira la página actual y vuelve a cargarlo todo desde cero.

---

## 4. Componentes y estilos (Parte 4)

### 4.2 Estrategia de estilos: Tailwind CSS

| Opción elegida | Alternativa descartada | Justificación |
|---|---|---|
| **Tailwind CSS** | **Bootstrap** | Bootstrap trae un diseño "de Bootstrap" que habría que sobrescribir para conseguir el azul de IKOMI, el corte diagonal de las secciones oscuras y las tarjetas del footer. Además añade su CSS completo y, para el menú hamburguesa, su JavaScript (que no conversa con React). <br> Con Tailwind el menú es un `useState` de 3 líneas y solo se genera el CSS de las clases que uso. |
| **Tailwind CSS** | **CSS Modules** | CSS Modules aísla bien los estilos, pero tendría un `.module.css` por cada uno de los ~15 componentes y estaría saltando entre archivos. <br> Las variantes responsive (`sm:`, `md:`, `lg:`) y los estados (`hover:`, `group-hover:`) se escriben directo en el JSX, lo que me ayudó a cumplir los tres anchos que pide el examen. |

**Criterio coherente:** los colores y las fuentes están definidos **una sola vez** en `app/globals.css`:

```css
@theme {
  --color-primary: #2b3fa8;   /* azul navbar  → bg-primary   */
  --color-accent: #e03131;    /* rojo botones → bg-accent    */
  --color-highlight: #fcc419; /* enlace activo → text-highlight */
  --font-heading: var(--font-raleway), ...;
}
```

Para cambiar el color principal de todo el sitio basta con editar `--color-primary`. No hay ningún `#2b3fa8` repetido en los componentes.

### 4.3 `next/image` y `next/font`

| Opción elegida | Alternativa descartada | Justificación |
|---|---|---|
| **`next/image`** con `width`/`height` o `fill` + `sizes` | `<img>` normal | Convierte las fotos de repuestos a WebP y las sirve al ancho de la pantalla. En un celular de 375 px no se descarga el PNG de 800 px. <br> Como reserva el espacio, no hay saltos de contenido mientras cargan, y las imágenes fuera de pantalla se cargan de forma diferida. |
| **`preload`** en el Hero y en la foto del detalle | `priority` | `priority` quedó **deprecado en Next 16**: ahora se usa `preload`. Lo puse solo en la imagen más grande visible al cargar (LCP), porque precargar todas anularía la ventaja. |
| **`next/font/local`** (Raleway + Open Sans, woff2 variables) | `next/font/google` o un `<link>` a Google Fonts | Raleway se parece a la tipografía del menú de IKOMI y Open Sans se lee bien en los textos. `next/font` las sirve desde mi propio dominio y genera un fallback con métricas ajustadas, así el texto no "salta" al cargar la fuente. <br> Usé la versión **local** porque `next/font/google` descarga la fuente durante el `build` y en mi entorno no había acceso a Google Fonts, así que el build fallaba. Con los .woff2 dentro del repo el build funciona también sin internet (por ejemplo, en el laboratorio). |

### 4.5 Animaciones con propósito

1. **Hover en `ProductCard`**: la tarjeta se eleva y la foto hace zoom. Le indica al cliente que la tarjeta es clicable y lleva al detalle del repuesto.
2. **Carrusel de marcas (`BrandMarquee`)** en la portada: muestra las 6 marcas en poco espacio. Es **solo CSS** (`animate-marquee`), así que no necesita `"use client"`. Se **pausa al pasar el mouse** para que se pueda leer la marca.
3. **`fade-up` del Hero**: el texto principal entra suavemente y dirige la mirada al mensaje "Repuestos en general".

Todas se desactivan si el usuario tiene activado *reducir movimiento* en su sistema (`prefers-reduced-motion`), por accesibilidad.

---

## 5. Despliegue

| Opción elegida | Alternativa descartada | Justificación |
|---|---|---|
| **Render (Web Service Node)** | Vercel | Render es la plataforma que usamos en clase y mi cuenta ya está vinculada a GitHub. El archivo `render.yaml` deja documentados los comandos de build y start. <br> Desventaja: en el plan gratuito el servicio se "duerme" y la primera visita tarda unos segundos. Vercel no tiene ese problema, pero preferí la plataforma vista en clase. |
