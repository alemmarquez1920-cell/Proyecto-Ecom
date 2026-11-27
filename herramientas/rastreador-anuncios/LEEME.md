# Rastreador de Anuncios (Alameda) — v1.0.0

Extensión de Chrome que lee la Biblioteca de anuncios de Meta mientras la mirás. Sirve para encontrar marcas con **500 anuncios activos o más** que **escalaron en los últimos 3 meses**.

No manda datos a ningún lado: todo queda guardado en tu navegador.

## Publicarla en la Chrome Web Store

1. Creá tu cuenta de desarrollador en https://chrome.google.com/webstore/devconsole (pago único USD 5).
2. **Nuevo elemento** → subí `rastreador-anuncios.zip`.
3. Completá la ficha con lo que está en `tienda/FICHA-TIENDA.md` y las imágenes de `tienda/`.
4. Elegí **No listada** y mandá a revisión. Google tarda de 1 a 7 días.
5. Cuando la aprueben, se instala con un clic desde el link.

## Instalar sin tienda (en la compu)

Chrome del celular no acepta extensiones. Usá Chrome, Edge o Brave en la compu.

1. Descomprimí `rastreador-anuncios.zip` en una carpeta.
2. Abrí `chrome://extensions`.
3. Activá **Modo de desarrollador** (arriba a la derecha).
4. Tocá **Cargar descomprimida** y elegí la carpeta.
5. Abrí la [Biblioteca de anuncios](https://www.facebook.com/ads/library/). Abajo a la derecha aparece el panel **Rastreador de anuncios**.

## Cómo encontrar lo que buscás

1. En la Biblioteca elegí país (por ejemplo **Estados Unidos**), **Todos los anuncios**, y buscá una palabra clave (ej. `"dog bed"`).
2. Tocá **▶ Cargar más**: baja solo, despacio, y va leyendo. Frenalo cuando quieras.
3. Mirá la tabla (tocá el título de una columna para ordenar):
   - **Activos**: anuncios activos de esa marca que se cargaron.
   - **Nuevos 90 d**: cuántos arrancaron en los últimos 90 días.
   - **Más viejo**: días que lleva su anuncio activo más antiguo.
   - **Escalando**: la mitad o más de sus anuncios activos son nuevos (con 20 o más).
   - **Ganador**: tiene un anuncio activo hace 60 días o más.
4. Para saber si una marca pasa los 500: abrí su página (**Ver todos los anuncios**). El panel lee el total que muestra Meta y lo guarda en **Historial** con la fecha. Desde ahí la marca aparece con la señal **+500** en todas tus búsquedas.
5. **La fila resaltada** es lo que pediste: +500 anuncios y escalando. El filtro **Solo +500 y escalando** deja solo esas.
6. El botón **–** la achica a una pastilla abajo a la derecha.
7. **Ver en AR** abre la misma búsqueda con país Argentina, para ver si acá hay hueco.
8. **CSV** baja la tabla para abrirla en Excel o Google Sheets.

## Historial: el crecimiento real

Cada vez que abrís la página de una marca, queda guardado su total del día. Volvé una vez por semana: en **Historial** ves cuánto creció desde la primera medición. Así se arma, desde hoy, la curva de los últimos 3 meses.

## Límites

- Lee solo lo que se cargó en pantalla. Para una marca con 500 anuncios, "Cargar más" tarda unos minutos.
- La carga automática va a ritmo humano y frena sola a las 800 tarjetas. No la dejes corriendo horas: Meta puede limitar la cuenta.
- Si Meta cambia el diseño de la Biblioteca, puede dejar de leer. Mandá una captura y se ajusta.
- Mínimo y días se cambian en el panel (por defecto, 500 y 90).
