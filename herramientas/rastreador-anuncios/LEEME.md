# Rastreador de Anuncios (Alameda)

Extensión de Chrome que lee la Biblioteca de anuncios de Meta mientras la mirás. Sirve para encontrar marcas con **500 anuncios activos o más** que **escalaron en los últimos 3 meses**.

No manda datos a ningún lado: todo queda guardado en tu navegador.

## Instalar (en la compu)

Chrome del celular no acepta extensiones. Usá Chrome, Edge o Brave en la compu.

1. Descomprimí `rastreador-anuncios.zip` en una carpeta.
2. Abrí `chrome://extensions`.
3. Activá **Modo de desarrollador** (arriba a la derecha).
4. Tocá **Cargar descomprimida** y elegí la carpeta.
5. Abrí la [Biblioteca de anuncios](https://www.facebook.com/ads/library/). Abajo a la derecha aparece el panel **Rastreador de anuncios**.

## Cómo encontrar lo que buscás

1. En la Biblioteca elegí país (por ejemplo **Estados Unidos**), **Todos los anuncios**, y buscá una palabra clave (ej. `"dog bed"`).
2. Tocá **▶ Cargar más**: baja solo, despacio, y va leyendo. Frenalo cuando quieras.
3. Mirá la tabla:
   - **Activos**: anuncios activos de esa marca que se cargaron.
   - **Nuevos 90 d**: cuántos arrancaron en los últimos 90 días.
   - **Más viejo**: días que lleva su anuncio activo más antiguo.
   - **Escalando**: la mitad o más de sus anuncios activos son nuevos (con 20 o más).
   - **Ganador**: tiene un anuncio activo hace 60 días o más.
4. Para saber si una marca pasa los 500: abrí su página (**Ver todos los anuncios**). El panel lee el total que muestra Meta y lo guarda en **Historial** con la fecha. Desde ahí la marca aparece con la señal **+500** en todas tus búsquedas.
5. **La fila resaltada** es lo que pediste: +500 anuncios y escalando.
6. **Ver en Argentina** abre la misma búsqueda con país Argentina, para ver si acá hay hueco.
7. **Exportar CSV** baja la tabla para abrirla en Excel o Google Sheets.

## Historial: el crecimiento real

Cada vez que abrís la página de una marca, queda guardado su total del día. Volvé una vez por semana: en **Historial** ves cuánto creció desde la primera medición. Así se arma, desde hoy, la curva de los últimos 3 meses.

## Límites

- Lee solo lo que se cargó en pantalla. Para una marca con 500 anuncios, "Cargar más" tarda unos minutos.
- La carga automática va a ritmo humano y frena sola a las 800 tarjetas. No la dejes corriendo horas: Meta puede limitar la cuenta.
- Si Meta cambia el diseño de la Biblioteca, puede dejar de leer. Mandá una captura y se ajusta.
- Mínimo y días se cambian en el panel (por defecto, 500 y 90).
