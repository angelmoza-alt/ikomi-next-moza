# Evidencias

| Archivo | Requisito |
|---|---|
| `01-npm-run-build.png` | 1.5 — `npm run build` termina sin errores |
| `responsive-375-*.png`, `responsive-768-*.png`, `responsive-1280-*.png` | 4.4 — Inicio, Productos y Detalle en 3 anchos |
| `responsive-375-menu-hamburguesa-abierto.png` | 3.3 — Menú responsive |
| `404-producto-inexistente.png` | 2.2 — `notFound()` con slug inválido |
| `network-link.png` y `network-link-doc.png` | 3.4 — Navegación con `Link` en DevTools > Network (filtros All y Doc) |
| `network-a-href.png` y `network-a-href-doc.png` | 3.4 — Navegación con `<a>` normal en DevTools > Network (filtros All y Doc) |

## Cómo se hizo el experimento de Network (3.4)

En Chrome, sobre https://ikomi-next-moza.onrender.com:
1. F12 → **Network** → marcar **Keep log** → filtro **All**.
2. Clic en **Nosotros** del menú (`Link`) → captura con **All** (4 peticiones, 0 B) y con **Doc** (0 documentos).
3. En **Console** se agregó un enlace `<a>` temporal:
   ```js
   const a=document.createElement('a');a.href='/servicios';a.textContent='IR CON <a>';a.style.cssText='position:fixed;top:90px;left:20px;z-index:9999;background:red;color:#fff;padding:10px';document.body.appendChild(a)
   ```
4. Clic en el botón rojo **IR CON <a>** → captura con **All** (16 peticiones, 714 kB de recursos) y con **Doc** (1 documento: `servicios`).
