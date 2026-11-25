# Landings de Alameda

Next.js + Tailwind. Páginas de un solo producto, pensadas primero para celular.

| Ruta | Producto | Config |
|---|---|---|
| `/` | Kit Ondas Sin Calor | `config/producto.ts` |
| `/kit-depilacion` | Kit Depilación en Casa | `config/kit-depilacion.ts` |

Todo lo que dice `[completar]` falta cargar con un dato real.

---

## Kit Depilación en Casa (`/kit-depilacion`)

Todo lo editable está en `config/kit-depilacion.ts`. Cambiás un valor, guardás y la página se actualiza.

### Precio

- `precio`: precio final con impuestos, en pesos y sin puntos. Ejemplo: `89900`. Si queda `null`, se ve `$[completar]`.
- El precio con transferencia se calcula solo con `descuentoTransferencia` (hoy 10%).
- `precioAnterior`: solo si es un precio anterior **real**. Si no, `null` (no se muestra tachado).
- `disponibilidad`: `"InStock"` u `"OutOfStock"` (lo lee Google).

### Links

- `comprarUrl`: link del producto en Tiendanube. Se le suman solos los UTM de la visita y el `fbclid` del anuncio.
- `arrepentimientoUrl`: botón de arrepentimiento de Tiendanube (obligatorio).
- `cambiosUrl`, `terminosUrl`, `privacidadUrl`: páginas legales de la tienda.
- `dataFiscalUrl`: el link del QR de Data Fiscal. La imagen del QR va como `public/media/kit-depilacion/data-fiscal.jpg`.
- `whatsapp`: solo números con código de país (ejemplo: `5491122334455`). `whatsappVisible`: cómo se ve el número.
- `sitioUrl`: el dominio final con https. Se usa para compartir en WhatsApp/Instagram y para Google.

### Medición

- `pixelId`: ID del píxel de Meta. Vacío = no se carga.
- Eventos: `PageView`, `ViewContent` (con el precio) y `ClicComprar` (dice qué botón: portada, es-para-vos, cierre o barra).
- La compra la mide Tiendanube con su píxel.

### Marcas de control

- `mostrarOpiniones`: en `true` solo con 3 opiniones reales y con permiso, cargadas en `opiniones`.
- `anmatConfirmado` y `anmatRegistro`: mientras `anmatConfirmado` sea `false`, en `npm run dev` aparece arriba el aviso "No publicar en anuncios", con la lista de lo que falta. En la versión publicada ese aviso no se ve.

### Textos y tablas

Preguntas, pasos, calendario, tabla de niveles, comparación y cuidados están en el mismo archivo. La demora del envío, el plazo de cambio y el tiempo por sesión se cargan una sola vez, arriba del archivo, y se repiten solos donde corresponde.

### Fotos y video

Van en `public/media/kit-depilacion/` con los nombres exactos de `public/media/kit-depilacion/LEEME.txt`:
`hero.mp4`, `hero-poster.jpg`, `kit.jpg`, `caja.jpg`, `ipl-uso.jpg`, `facial-uso.jpg`, `rodillo-uso.jpg`, `paso-1.jpg` a `paso-6.jpg` y `data-fiscal.jpg`.

- Si falta un archivo, la página muestra un lugar reservado con su nombre.
- Solo material real. Nada generado con IA. Sin antes y después hasta tener fotos propias.
- Después de subir `kit.jpg`, ajustá en `incluye` la posición `x` / `y` (en %) de cada punto numerado.
- El video de portada arranca cuando la página terminó de cargar. Antes se ve `hero-poster.jpg`, así la página no se frena.

### Datos que faltan (`[completar]`)

1. Precio (y precio anterior, solo si es real)
2. Link de compra de Tiendanube
3. Link al botón de arrepentimiento
4. Links a cambios y devoluciones, términos y privacidad
5. QR de Data Fiscal (link e imagen)
6. WhatsApp de soporte
7. Dominio del sitio
8. ID del píxel de Meta
9. Estado ante ANMAT (y número de registro, si corresponde)
10. Garantía del fabricante
11. Plazo de cambio
12. Demora del envío
13. Tiempo por sesión según la zona (dato del fabricante)
14. Cuándo se ven resultados (dato del fabricante)
15. Qué se siente al usarla (con prueba real)
16. Cuántos destellos dura la lámpara (dato del fabricante)
17. Costo por sesión en centro de estética y en cera (para la comparación)
18. Texto de "Quiénes somos"
19. Todas las fotos y el video

La lista completa y al día aparece en `npm run dev`, en el aviso de arriba de la página.

---

## Kit Ondas Sin Calor (`/`)

Todo está en `config/producto.ts`:

- `precio`: número sin puntos (ej. `34900`). Si queda `null`, se ve `$[completar]`.
- `precioAnterior`: solo si es un precio real anterior. Si no, `null`.
- `comprarUrl`: link de compra de Tiendanube.
- `arrepentimientoUrl`: link al botón de arrepentimiento de la tienda.
- `contacto`: WhatsApp o mail de soporte.
- Preguntas, tabla de comparación, pasos y textos: en el mismo archivo.

Fotos en `public/media` con estos nombres exactos (ver `public/media/LEEME.txt`):
`hero.mp4`, `antes.jpg`, `despues.jpg`, `kit.jpg`, `paso-1.jpg`, `paso-2.jpg`, `paso-3.jpg`.

---

## Probar en la compu

```bash
npm install
npm run dev
```

Kit Ondas en http://localhost:3000 y Kit Depilación en http://localhost:3000/kit-depilacion.

## Publicado en Vercel

- Proyecto: `alameda-web` (equipo `alameda4`)
- Link: https://alameda-web.vercel.app
- Para volver a publicar después de un cambio: pedíselo a Claude (sube los archivos con el conector de Vercel).
- `/kit-depilacion` todavía **no** está publicado.
