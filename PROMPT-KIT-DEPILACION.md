# Prompt para Claude Code: landing del Kit Depilación en Casa (Alameda)

## Tu rol

Sos diseñador web senior y desarrollador front-end. Tenés experiencia en landings de un solo producto y en conversión desde celular. Vas a diseñar y programar la landing del Kit Depilación en Casa de Alameda. Nivel de terminación: marca chica pero seria, no un template de dropshipping.

## Antes de escribir código

1. El proyecto está en el repo `alemmarquez1920-cell/Proyecto-Ecom`, carpeta `alameda-web`, rama `ccr-c961dd54-xzx0u4`. Partí de esa rama.
2. Leé `alameda-web/AGENTS.md`, `README.md`, `config/producto.ts`, `app/page.tsx` y la carpeta `components/`. Reutilizá lo que sirva: `BotonComprar`, `BarraCompra`, `Foto`, `Aparecer`.
3. Mostrame un plan corto: secciones, archivos nuevos y dudas. Esperá mi OK antes de programar.

## El negocio

- Marca: Alameda. La tienda está en Tiendanube: ahí están el checkout, los pagos y el stock.
- Esta landing es para anuncios de Meta. El botón "Comprar" lleva al producto en Tiendanube.
- Clienta: mujer de 25 a 55 años, en Argentina, con vello castaño u oscuro. Hoy usa cera, maquinita o centro de estética y quiere depilarse en casa, a su tiempo.
- Condiciones de la tienda:
  - Envío gratis desde $60.000
  - 10% OFF por transferencia
  - Cuotas con Mercado Pago
  - Despacho en 24 h hábiles
  - 10% OFF en la primera compra si se suscribe al newsletter

## El producto (datos confirmados, usalos tal cual)

**Kit Depilación en Casa, 3 piezas.** En la caja va también una tarjeta de uso impresa (ya diseñada).

### 1. Depiladora IPL (luz pulsada)

Tiene 5 niveles: 1 es el más suave, 5 el más fuerte. Trae cargador, anteojos de protección y maquinita de afeitar.

**Prueba antes del primer uso:** en una zona chica de la cara interna del brazo, en nivel 1. Esperar 2 horas. Si la piel queda bien, se puede empezar. Usar siempre los anteojos.

**Paso a paso:**
1. Rasurar la zona con la maquinita y dejar la piel limpia y seca.
2. Enchufar el cargador y mantener el botón 1 segundo para encender. Se prende la luz verde.
3. Elegir el nivel tocando el botón. Empezar por el 1.
4. Apoyar la ventana completa sobre la piel. Cuando la luz roja parpadea, está lista.
5. Disparar un destello y avanzar a la zona de al lado. No repetir más de 2 veces en el mismo lugar.
6. Calmar la piel con el rodillo de hielo. Para apagar, mantener el botón 3 segundos.

**Nivel según el tono de piel:**

| Tono de piel | Cuerpo | Rostro |
|---|---|---|
| Muy clara | 3 a 5 | 3 a 4 |
| Clara a media | 2 a 4 | 2 a 3 |
| Morena | 1 a 3 | 1 a 2 |
| Muy oscura | No usar | No usar |

Se sube de a un nivel y solo si la piel lo tolera.

**Calendario de sesiones:**
- Sesiones 1 a 6: una cada 2 semanas
- Sesiones 7 a 10: una cada 4 semanas
- Mantenimiento: una cada 2 o 3 meses

**Color de vello:** funciona en vello castaño o negro. No funciona en vello blanco, gris, pelirrojo o rubio muy claro.

**No usar:**
- Durante el embarazo, la lactancia o la menstruación
- Sobre piel bronceada, quemada por el sol o irritada
- Sobre tatuajes, lunares, heridas o costras
- Cerca de los ojos
- Con una enfermedad de la piel: consultar antes al médico

**Cuidados:** no mojarla. Limpiar la ventana con un paño apenas humedecido en alcohol, nunca con rociador. Fuera del alcance de los niños.

### 2. Depiladora facial

Se carga con cable USB. Cabezal redondo para bozo y mejillas, cabezal fino para cejas. Se usa sobre piel limpia y seca.

### 3. Rodillo de hielo

Se llena con agua y se lleva al freezer hasta que se congele. Se pasa suave sobre la piel 1 o 2 minutos.

## Datos que no tenemos

No los inventes. Dejalos como `[completar]` en el config:

- Precio y precio anterior (este último solo si es real)
- Link de compra de Tiendanube y link al botón de arrepentimiento
- WhatsApp de soporte
- Cantidad de destellos que dura la lámpara
- Garantía del fabricante (la legal es de 6 meses)
- Tiempo por sesión según la zona
- Qué se siente al usarla (con prueba real)
- Cuándo se ven resultados (según el fabricante)
- Demora del envío y plazo de cambio
- Estado ante ANMAT
- ID del píxel de Meta y dominio

## Reglas de texto

- Castellano rioplatense, con voseo. Frases cortas. Datos antes que adjetivos.
- Cero lenguaje de anuncio: nada de "increíble", "revolucionario" ni "el mejor".
- **Prohibido:**
  - "definitiva", "permanente", "para siempre", "sin dolor"
  - "cura", "elimina", "clínicamente probado", "dermatológicamente testeado"
  - "aprobado por ANMAT", salvo con un número de registro real
  - Porcentajes de resultado sin fuente
- **Resultados:** solo "según el fabricante", con el dato en `[completar]`.
- **No señales defectos de la persona** (Meta rechaza esos anuncios). Nada de "¿te da vergüenza…?". Hablale a lo que gana: hacerlo en casa, a su ritmo, sin turnos.
- **Decí claro para quién no sirve.** Baja las devoluciones y suma confianza.

## Estructura (celular primero, en este orden)

1. **Barra superior:** Envío gratis desde $60.000 · 10% OFF por transferencia · Despacho en 24 h hábiles.
2. **Portada:**
   - Título: "Depilate en casa, a tu ritmo".
   - Subtítulo: "Depiladora IPL, depiladora facial y rodillo de hielo. En una caja, con guía paso a paso."
   - Video o foto del kit, precio, precio con transferencia y botón "Comprar".
   - 3 sellos: Envío gratis desde $60.000 · Garantía [completar] · Cambios.
3. **"¿Es para vos?":** selector interactivo con dos preguntas.
   - Tono de piel: 4 opciones con muestra de color.
   - Color de vello: castaño o negro / rubio claro / pelirrojo / blanco o gris.
   - Resultado: "Sí te sirve", con el nivel sugerido para cuerpo y rostro según la tabla. O "No te sirve", con el motivo.
   - Botones de opción reales (radio), accesibles con teclado. No guarda datos.
4. **Qué trae:** foto del kit con puntos numerados sobre cada pieza (mismo patrón que `incluye` en `producto.ts`): las 3 piezas, más anteojos, maquinita, cargador, cable USB y tarjeta de uso.
5. **Cómo se usa:** los 6 pasos numerados, con foto. Antes de los pasos, la prueba del primer uso en un aviso destacado.
6. **Calendario:** línea de tiempo visual con sesiones 1 a 6 cada 2 semanas, 7 a 10 cada 4 semanas, y mantenimiento.
7. **Las otras dos piezas:** depiladora facial y rodillo de hielo, con foto de uso cada una.
8. **Comparación:** kit en casa, centro de estética y cera.
   - Filas: dónde se hace, si hace falta turno, costo (PRECIO una sola vez contra $[completar] por sesión) y quién la hace.
   - Solo datos verificables.
9. **Seguridad:** cuándo no usarla y cuidados. Tono calmo, no alarmista.
10. **Opiniones:** el componente queda listo pero oculto (`mostrarOpiniones: false`) hasta tener 3 reales con permiso.
11. **Garantía y cambios:** garantía legal de 6 meses, 10 días corridos para arrepentirse y link al botón de arrepentimiento.
12. **Preguntas frecuentes** (acordeón con `<details>`):
    - ¿Para qué color de vello sirve?
    - ¿Para qué tono de piel?
    - ¿Cada cuánto la uso?
    - ¿Cuándo se ven resultados? [completar]
    - ¿Qué se siente? [completar]
    - ¿La puedo usar en la cara? Sí, con el nivel de rostro y nunca cerca de los ojos. Las cejas, con la depiladora facial.
    - ¿Embarazada o amamantando? No.
    - ¿Cuántos destellos dura? [completar]
    - ¿Cómo se carga?
    - ¿Qué pasa si no me sirve?
    - ¿Cómo es el envío y cómo pago?
13. **Cierre:** foto del kit, precio y botón.
14. **Pie de página:**
    - Quiénes somos: Alameda no fabrica; elige, prueba y responde [completar con texto de Alexis].
    - Botón de arrepentimiento, cambios y devoluciones, términos, privacidad, QR de Data Fiscal y WhatsApp.

**En celular:** barra de compra fija abajo, con precio y botón, que aparece después de la portada.

## Diseño

Mantené la identidad de la tarjeta de uso que ya está impresa.

**Colores:**

| Uso | Color |
|---|---|
| Principal: botones y títulos de sección | `#1E5B46` |
| Hover | `#143F31` |
| Fondo suave | `#EAF3EE` |
| Texto | `#1A1D1B` |
| Texto secundario | `#454D48` |
| Líneas | `#B9C7BF` |
| Fondo | `#FFFFFF` |

**Tipografías** (cargadas con `next/font`):
- Space Grotesk 600 y 700 para títulos
- Inter 400 a 700 para texto

**Logo:** gota verde con línea blanca, más la palabra "alameda" en minúscula, Space Grotesk 700, color `#1E5B46`. SVG: `<svg viewBox="0 0 18 22"><path d="M9 1 C14 6 16 10 16 14 A7 7 0 0 1 2 14 C2 10 4 6 9 1 Z" fill="#1E5B46"/><path d="M9 8 V19" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/></svg>`

**Estilo:**
- Limpio y cálido: mucho blanco, el verde como acento y fotos reales con luz natural.
- Nada de degradados violetas, efecto vidrio, emojis ni íconos genéricos de stock.

**Medidas:**
- Texto base de 16 px en celular.
- Títulos de 32 a 40 px en celular y de 48 a 56 px en desktop.
- Espaciado en múltiplos de 8, bordes redondeados de 10 a 16 px.
- Botones de 48 px de alto como mínimo.

**Accesibilidad y adaptación:**
- Contraste AA como mínimo (4,5:1) y foco visible.
- Animaciones sutiles, que respeten `prefers-reduced-motion`.
- Primero 390 px de ancho, después tablet y desktop, con contenido de 1200 px como máximo.

## Fotos y video

- Solo material real. Nada generado con IA.
- Si falta un archivo, mostrá un lugar reservado con su nombre, como ya hace `Foto.tsx`.
- Van en `public/media/kit-depilacion/`:
  - `hero.mp4` y `hero-poster.jpg`
  - `kit.jpg` y `caja.jpg`
  - `ipl-uso.jpg`, `facial-uso.jpg` y `rodillo-uso.jpg`
  - `paso-1.jpg` a `paso-6.jpg`
- Sin fotos de antes y después hasta tener fotos propias reales.

## Técnica

- Next.js (App Router) y Tailwind, dentro de `alameda-web`.
- Ruta nueva: `/kit-depilacion`. No toques la landing del Kit Ondas en `/`.
- Todo lo editable va en `config/kit-depilacion.ts`, con el mismo patrón que `producto.ts`: textos, precio, links, tablas, preguntas y las marcas `mostrarOpiniones` y `anmatConfirmado`.
- Las tablas y el selector leen los datos del config. Nada escrito a mano en los componentes.
- El link de compra suma los UTM con los que llegó la visita.
- **Píxel de Meta:** se carga solo si hay un ID en el config.
  - Eventos: PageView, ViewContent y un evento propio "ClicComprar".
  - La compra la mide Tiendanube.
- **SEO:**
  - Metadata e imagen para compartir con el kit.
  - JSON-LD de Product con nombre, marca, precio y disponibilidad.
  - Sin calificaciones hasta tener opiniones reales.
- **Rendimiento:**
  - Lighthouse en celular de 95 o más en las cuatro categorías.
  - `next/image`, video con poster y `preload="metadata"`, fuentes con `display: swap`.
  - Sin librerías pesadas.
- **Accesibilidad:** HTML semántico y texto alternativo en todas las fotos.

## Legal en Argentina (obligatorio)

- Botón de arrepentimiento visible en el pie (Res. 424/2020), con link al de Tiendanube.
- Precio final con impuestos, y el precio con transferencia aclarado.
- Precio tachado solo si es un precio anterior real.
- Garantía legal de 6 meses (Ley 24.240), visible.
- Sin urgencia falsa: nada de cuentas regresivas, "quedan 3 unidades" inventados ni contadores de gente mirando.
- Mientras `anmatConfirmado` sea `false`, mostrá solo en desarrollo un aviso arriba: "No publicar en anuncios: falta confirmar ANMAT", con la lista de `[completar]` pendientes.

## Entregables

1. La ruta `/kit-depilacion` funcionando, con el config completo.
2. README actualizado: cómo cambiar precio, links y fotos.
3. La lista de todo lo que quedó en `[completar]`.
4. Capturas a 390 px y a 1440 px.
5. El resultado de Lighthouse en celular.
6. Sin publicar en Vercel hasta mi OK.

## Criterios de aceptación

- [ ] En celular, en 5 segundos se entiende qué es, cuánto sale y cómo se compra.
- [ ] El selector "¿Es para vos?" da el nivel correcto según la tabla.
- [ ] Cero datos inventados y cero palabras prohibidas.
- [ ] En celular, el botón de compra queda siempre a un toque.
- [ ] Lighthouse de 95 o más, contraste AA y navegable con teclado.
- [ ] La landing del Kit Ondas sigue igual.
