// ─────────────────────────────────────────────────────────────
// TODO LO QUE CAMBIA ESTÁ ACÁ.
// Cambiá un valor, guardá, y la landing se actualiza sola.
// Lo que dice [completar] todavía falta: no lo publiques en anuncios
// hasta reemplazarlo por un dato real.
// ─────────────────────────────────────────────────────────────

export const producto = {
  marca: "Alameda",
  nombre: "Kit Ondas Sin Calor",

  // Precio en pesos, sin puntos. Ejemplo: 34900. Mientras sea null se ve "$[completar]".
  precio: null as number | null,
  // Solo si es un precio anterior REAL. Si no, dejalo en null (no se muestra tachado).
  precioAnterior: null as number | null,

  // Link de compra de Tiendanube. Mientras esté vacío, el botón no lleva a ningún lado.
  comprarUrl: "",
  // Link al botón de arrepentimiento de la tienda (obligatorio en Argentina).
  arrepentimientoUrl: "",
  // WhatsApp o mail de soporte, tal como querés que se vea.
  contacto: "[completar WhatsApp de soporte]",

  // URL final del sitio (se usa para la vista previa de WhatsApp e Instagram).
  sitioUrl: "",

  garantiaMeses: 6,

  barraSuperior: ["Envío gratis", "Garantía 6 meses", "Cambios y devoluciones"],

  portada: {
    titulo: "Ondas al despertar, sin planchita",
    subtitulo:
      "Enrollás el pelo en el ondulador de satén antes de dormir y lo soltás a la mañana. Sin calor y sin enchufe.",
    sello: "Listo para regalar",
  },

  // Qué trae el kit. "x" e "y" son la posición del punto sobre kit.jpg, en % (0 a 100).
  incluye: [
    { pieza: "Ondulador de satén", detalle: "Donde se enrolla el pelo.", x: 30, y: 35 },
    { pieza: "2 scrunchies de satén", detalle: "Sujetan las puntas.", x: 70, y: 30 },
    { pieza: "Broche caimán", detalle: "Fija el ondulador arriba de la cabeza.", x: 75, y: 65 },
    { pieza: "Cofia de satén", detalle: "Cubre todo mientras dormís.", x: 35, y: 70 },
    { pieza: "Caja de regalo", detalle: "Llega lista para entregar.", x: 50, y: 88 },
  ],

  problema: [
    {
      titulo: "Calor",
      texto: "La planchita y la buclera trabajan con calor directo sobre el pelo. Este kit no se enchufa.",
    },
    {
      titulo: "Tiempo",
      texto: "Peinarte con calor se hace a la mañana. Con el kit, el trabajo lo hacés la noche anterior.",
    },
    {
      titulo: "Frizz",
      texto: "El pelo roza la almohada toda la noche. La cofia de satén lo cubre mientras dormís.",
    },
  ],

  pasos: [
    { titulo: "Enrollá de noche", texto: "Apoyá el ondulador arriba de la cabeza, enrollá los mechones y sujetá las puntas con los scrunchies.", foto: "paso-1.jpg" },
    { titulo: "Dormí", texto: "Poné la cofia de satén encima y dormí como siempre.", foto: "paso-2.jpg" },
    { titulo: "Soltá a la mañana", texto: "Sacá los scrunchies, desenrollá y abrí las ondas con los dedos.", foto: "paso-3.jpg" },
  ],

  // Tabla de comparación. Solo datos verificables. Lo que falta queda en [completar].
  comparacion: {
    columnas: ["Kit Ondas Sin Calor", "Buclera", "Peluquería"],
    filas: [
      { dato: "Calor", valores: ["No usa: no se enchufa", "Sí: se enchufa y calienta", "[completar según servicio]"] },
      { dato: "Tiempo a la mañana", valores: ["[completar con prueba real]", "[completar con prueba real]", "Turno y traslado: [completar]"] },
      { dato: "Costo", valores: ["PRECIO, una sola vez", "$[completar]", "$[completar] cada vez"] },
      { dato: "Se hace mientras dormís", valores: ["Sí", "No", "No"] },
    ],
  },

  regalo: [
    { titulo: "Caja de regalo", texto: "El kit viene en su caja, listo para entregar." },
    { titulo: "Tarjeta", texto: "Para escribir tu mensaje. [completar: confirmar que va en cada pedido]" },
    { titulo: "Cambio si no le gusta", texto: "Si a quien se lo regalaste no le gusta, se cambia. Plazo: [completar]." },
  ],

  preguntas: [
    { p: "¿Sirve para pelo corto?", r: "[completar con prueba real: desde qué largo funciona]" },
    { p: "¿Y para pelo fino?", r: "[completar con prueba real]" },
    { p: "¿Y si tengo rulos?", r: "[completar con prueba real]" },
    { p: "¿Cuántas horas lo tengo que dejar?", r: "[completar con prueba real: horas mínimas]. Lo práctico es ponértelo antes de dormir y sacarlo al levantarte." },
    { p: "¿Cómo se lava?", r: "[completar con la indicación del proveedor para el satén]" },
    { p: "¿Cuánto tarda el envío?", r: "El envío es gratis. Demora: [completar]." },
    { p: "¿Y si me arrepiento?", r: "Tenés 10 días corridos desde que lo recibís para arrepentirte de una compra online (Ley 24.240, art. 34). Además, si es regalo y no le gusta, se cambia." },
    { p: "¿Qué cubre la garantía?", r: "6 meses de garantía Alameda: si una pieza falla, te la cambiamos. Condiciones: [completar]." },
  ],

  seo: {
    titulo: "Kit Ondas Sin Calor | Alameda",
    descripcion:
      "Ondulador de satén, 2 scrunchies, broche, cofia y caja de regalo. Ondas sin planchita. Envío gratis y 6 meses de garantía.",
  },
} as const;

// Fotos y videos reales. Se suben a /public/media con estos nombres exactos.
export const media = {
  hero: "hero.mp4",
  antes: "antes.jpg",
  despues: "despues.jpg",
  kit: "kit.jpg",
} as const;

export function precioTexto(n: number | null) {
  return n === null ? "$[completar]" : "$" + n.toLocaleString("es-AR");
}
