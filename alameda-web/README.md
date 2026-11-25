# Landing Kit Ondas Sin Calor (Alameda)

Next.js + Tailwind. Una sola página, pensada primero para celular.

## Cambiar precio, link o textos

Todo está en `config/producto.ts`:

- `precio`: número sin puntos (ej. `34900`). Si queda `null`, se ve `$[completar]`.
- `precioAnterior`: solo si es un precio real anterior. Si no, `null`.
- `comprarUrl`: link de compra de Tiendanube.
- `arrepentimientoUrl`: link al botón de arrepentimiento de la tienda.
- `contacto`: WhatsApp o mail de soporte.
- Preguntas, tabla de comparación, pasos y textos: en el mismo archivo.

Todo lo que dice `[completar]` falta cargar con un dato real.

## Fotos y videos reales

Van en `public/media` con estos nombres exactos (ver `public/media/LEEME.txt`):
`hero.mp4`, `antes.jpg`, `despues.jpg`, `kit.jpg`, `paso-1.jpg`, `paso-2.jpg`, `paso-3.jpg`.

Si falta uno, la página muestra un lugar reservado con su nombre. Nada de imágenes hechas con IA.

## Probar en la compu

```bash
npm install
npm run dev
```

## Publicado en Vercel

- Proyecto: `alameda-web` (equipo `alameda4`)
- Link: https://alameda-web.vercel.app
- Para volver a publicar después de un cambio: pedíselo a Claude (sube los archivos con el conector de Vercel).
