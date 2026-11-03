# Evidencias

| Archivo | Requisito |
|---|---|
| `01-npm-run-build.png` | 1.5 — `npm run build` termina sin errores |
| `responsive-375-*.png`, `responsive-768-*.png`, `responsive-1280-*.png` | 4.4 — Inicio, Productos y Detalle en 3 anchos |
| `responsive-375-menu-hamburguesa-abierto.png` | 3.3 — Menú responsive |
| `404-producto-inexistente.png` | 2.2 — `notFound()` con slug inválido |
| `network-link.png` y `network-a-href.png` | 3.4 — Experimento Link vs `<a>` (**tomar en Chrome**) |

## Cómo tomar las capturas de Network (3.4)

1. Ejecuta `npm run build` y luego `npm run start`, y abre http://localhost:3000.
2. Abre DevTools (F12) → pestaña **Network** → marca **Preserve log** y filtra por **All**.
3. **Con Link:** haz clic en "Nosotros" en el menú. Toma la captura → `network-link.png` (no aparece ningún `document`).
4. **Con `<a>`:** en `components/Navbar.tsx` reemplaza temporalmente `<Link` por `<a` y `</Link>` por `</a>` (solo para el experimento). Reinicia y haz clic en otro enlace. Toma la captura → `network-a-href.png` (aparece `document` y se vuelven a descargar el CSS, las fuentes y el JS).
5. **Revierte el cambio** (`git checkout components/Navbar.tsx`).
