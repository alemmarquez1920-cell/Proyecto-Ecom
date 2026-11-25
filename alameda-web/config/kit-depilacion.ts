// ─────────────────────────────────────────────────────────────
// KIT DEPILACIÓN EN CASA: TODO LO QUE CAMBIA ESTÁ ACÁ.
// Cambiá un valor, guardá, y la landing /kit-depilacion se actualiza sola.
// Lo que dice [completar] todavía falta: no lo publiques en anuncios
// hasta reemplazarlo por un dato real.
// ─────────────────────────────────────────────────────────────

// Datos que se usan en más de un lugar de la página: cambialos acá una sola vez.
const plazoCambio = "[completar]";
const demoraEnvio = "[completar]";
const tiempoPorSesion = "[completar según el fabricante: minutos por zona]";

export const kit = {
  marca: "Alameda",
  nombre: "Kit Depilación en Casa",

  // ── Precio y compra ──────────────────────────────────────
  // Precio final en pesos, con impuestos, sin puntos. Ejemplo: 89900. Mientras sea null se ve "$[completar]".
  precio: null as number | null,
  // Solo si es un precio anterior REAL. Si no, dejalo en null (no se muestra tachado).
  precioAnterior: null as number | null,
  // Descuento por transferencia, en %. El precio con transferencia se calcula solo.
  descuentoTransferencia: 10,
  // Disponibilidad para Google: "InStock" (hay stock) u "OutOfStock" (sin stock).
  disponibilidad: "InStock" as "InStock" | "OutOfStock",

  // Link del producto en Tiendanube. Mientras esté vacío, el botón no lleva a ningún lado.
  // A este link se le suman solos los UTM con los que llegó la visita.
  comprarUrl: "",

  // ── Links legales y contacto ─────────────────────────────
  // Botón de arrepentimiento de Tiendanube (obligatorio, Res. 424/2020).
  arrepentimientoUrl: "",
  cambiosUrl: "",
  terminosUrl: "",
  privacidadUrl: "",
  // Data Fiscal (ARCA): el link del QR y la imagen del QR (en public/media/kit-depilacion/).
  dataFiscalUrl: "",
  dataFiscalImagen: "data-fiscal.jpg",
  // WhatsApp de soporte: solo números, con código de país. Ejemplo: "5491122334455".
  whatsapp: "",
  // Cómo se ve el número en la página. Ejemplo: "11 2233-4455".
  whatsappVisible: "[completar WhatsApp de soporte]",

  // ── Sitio y medición ─────────────────────────────────────
  // Dominio final, con https. Ejemplo: "https://alameda.com.ar". Se usa para compartir y para Google.
  sitioUrl: "",
  // ID del píxel de Meta. Vacío = el píxel no se carga.
  pixelId: "",

  // ── Marcas de control ────────────────────────────────────
  // Pasalo a true solo con 3 opiniones reales y con permiso.
  mostrarOpiniones: false,
  // Pasalo a true solo con el registro ANMAT confirmado (y cargalo abajo).
  anmatConfirmado: false,
  anmatRegistro: "",

  // ── Condiciones de la tienda ─────────────────────────────
  garantiaLegalMeses: 6,
  garantiaFabricante: "[completar]",
  diasArrepentimiento: 10,
  plazoCambio,
  demoraEnvio,

  barraSuperior: ["Envío gratis desde $60.000", "10% OFF por transferencia", "Despacho en 24 h hábiles"],

  portada: {
    titulo: "Depilate en casa, a tu ritmo",
    subtitulo: "Depiladora IPL, depiladora facial y rodillo de hielo. En una caja, con guía paso a paso.",
    sellos: ["Envío gratis desde $60.000", "Garantía 6 meses", "Cambios"],
  },

  // ── ¿Es para vos? ────────────────────────────────────────
  // Niveles según la tabla del fabricante. null = no usar.
  tonos: [
    { id: "muy-clara", nombre: "Muy clara", muestra: "#F4DCCB", cuerpo: "3 a 5", rostro: "3 a 4" },
    { id: "clara-media", nombre: "Clara a media", muestra: "#DDB08C", cuerpo: "2 a 4", rostro: "2 a 3" },
    { id: "morena", nombre: "Morena", muestra: "#A8714D", cuerpo: "1 a 3", rostro: "1 a 2" },
    { id: "muy-oscura", nombre: "Muy oscura", muestra: "#5B3A28", cuerpo: null, rostro: null },
  ] as { id: string; nombre: string; muestra: string; cuerpo: string | null; rostro: string | null }[],
  motivoTonoNo: "En piel muy oscura no se usa. Lo indica el fabricante en la tabla de niveles.",

  vellos: [
    { id: "castano-negro", nombre: "Castaño o negro", muestra: "#3B2A20", sirve: true },
    { id: "rubio-claro", nombre: "Rubio claro", muestra: "#E3C98F", sirve: false },
    { id: "pelirrojo", nombre: "Pelirrojo", muestra: "#B5552B", sirve: false },
    { id: "blanco-gris", nombre: "Blanco o gris", muestra: "#D9D9D6", sirve: false },
  ],
  motivoVelloNo: "La depiladora IPL funciona en vello castaño o negro. No funciona en vello blanco, gris, pelirrojo o rubio muy claro.",
  reglaNivel: "Se sube de a un nivel y solo si la piel lo tolera.",

  // ── Qué trae ─────────────────────────────────────────────
  // "x" e "y" son la posición del punto sobre kit.jpg, en % (0 a 100). Ajustalos cuando tengas la foto.
  incluye: [
    { pieza: "Depiladora IPL", detalle: "Luz pulsada, 5 niveles.", x: 30, y: 40 },
    { pieza: "Depiladora facial", detalle: "Cabezal redondo para bozo y mejillas, y cabezal fino para cejas.", x: 62, y: 30 },
    { pieza: "Rodillo de hielo", detalle: "Calma la piel después de cada sesión.", x: 78, y: 58 },
    { pieza: "Anteojos de protección", detalle: "Se usan siempre con la depiladora IPL.", x: 50, y: 15 },
    { pieza: "Maquinita de afeitar", detalle: "Para rasurar la zona antes de usarla.", x: 18, y: 75 },
    { pieza: "Cargador", detalle: "De la depiladora IPL.", x: 42, y: 80 },
    { pieza: "Cable USB", detalle: "Carga la depiladora facial.", x: 62, y: 85 },
    { pieza: "Tarjeta de uso", detalle: "Impresa, con el paso a paso y la tabla de niveles.", x: 85, y: 20 },
  ],

  // ── Cómo se usa ──────────────────────────────────────────
  pruebaPrimerUso: {
    titulo: "Antes del primer uso: la prueba",
    texto:
      "Probala en una zona chica de la cara interna del brazo, en nivel 1. Esperá 2 horas. Si la piel queda bien, podés empezar. Usá siempre los anteojos.",
  },
  pasos: [
    { titulo: "Rasurá", texto: "Rasurá la zona con la maquinita. Dejá la piel limpia y seca.", foto: "paso-1.jpg" },
    { titulo: "Encendé", texto: "Enchufá el cargador y mantené el botón 1 segundo. Se prende la luz verde.", foto: "paso-2.jpg" },
    { titulo: "Elegí el nivel", texto: "Tocá el botón para cambiar de nivel. Empezá por el 1.", foto: "paso-3.jpg" },
    { titulo: "Apoyá", texto: "Apoyá la ventana completa sobre la piel. Cuando la luz roja parpadea, está lista.", foto: "paso-4.jpg" },
    { titulo: "Dispará y avanzá", texto: "Dispará un destello y pasá a la zona de al lado. No repitas más de 2 veces en el mismo lugar.", foto: "paso-5.jpg" },
    { titulo: "Calmá la piel", texto: "Pasá el rodillo de hielo. Para apagarla, mantené el botón 3 segundos.", foto: "paso-6.jpg" },
  ],

  // ── Calendario ───────────────────────────────────────────
  // Las semanas de la línea de tiempo se calculan solas con estos datos.
  calendario: [
    { desde: 1, hasta: 6, cadaSemanas: 2, texto: "Una cada 2 semanas" },
    { desde: 7, hasta: 10, cadaSemanas: 4, texto: "Una cada 4 semanas" },
  ],
  mantenimiento: "Una cada 2 o 3 meses",
  tiempoPorSesion,

  // ── Las otras dos piezas ─────────────────────────────────
  otrasPiezas: [
    {
      titulo: "Depiladora facial",
      texto: "Se carga con cable USB. Cabezal redondo para bozo y mejillas, cabezal fino para cejas. Se usa sobre piel limpia y seca.",
      foto: "facial-uso.jpg",
      pedido: "Usando la depiladora facial en el bozo o las cejas, luz natural.",
    },
    {
      titulo: "Rodillo de hielo",
      texto: "Se llena con agua y va al freezer hasta que se congele. Pasalo suave sobre la piel 1 o 2 minutos.",
      foto: "rodillo-uso.jpg",
      pedido: "Pasando el rodillo de hielo por la pierna o el brazo, luz natural.",
    },
  ],

  // ── Comparación ──────────────────────────────────────────
  // Solo datos verificables. "PRECIO" se reemplaza solo por el precio del kit.
  comparacion: {
    columnas: ["Kit en casa", "Centro de estética", "Cera"],
    filas: [
      { dato: "Dónde se hace", valores: ["En tu casa", "En el centro", "En casa o en un centro"] },
      { dato: "Turno", valores: ["No hace falta", "Hace falta", "En casa no; en un centro, sí"] },
      { dato: "Costo", valores: ["PRECIO, una sola vez", "$[completar] por sesión", "$[completar] por sesión"] },
      { dato: "Quién la hace", valores: ["Vos", "Personal del centro", "Vos o personal del centro"] },
    ],
  },

  // ── Seguridad ────────────────────────────────────────────
  noUsar: [
    "Durante el embarazo, la lactancia o la menstruación.",
    "Sobre piel bronceada, quemada por el sol o irritada.",
    "Sobre tatuajes, lunares, heridas o costras.",
    "Cerca de los ojos.",
    "Con una enfermedad de la piel: consultá antes al médico.",
  ],
  cuidados: [
    "No la mojes.",
    "Limpiá la ventana con un paño apenas humedecido en alcohol. Nunca con rociador.",
    "Guardala fuera del alcance de los niños.",
  ],

  // ── Opiniones ────────────────────────────────────────────
  // Solo opiniones reales, con permiso de quien la escribió. Se muestran con mostrarOpiniones: true y al menos 3.
  opiniones: [] as { nombre: string; ciudad: string; texto: string }[],

  // ── Preguntas frecuentes ─────────────────────────────────
  preguntas: [
    { p: "¿Para qué color de vello sirve?", r: "Para vello castaño o negro. No funciona en vello blanco, gris, pelirrojo o rubio muy claro." },
    { p: "¿Para qué tono de piel?", r: "De piel muy clara a morena, cada una con su nivel. En piel muy oscura no se usa. Fijate tu nivel en «¿Es para vos?»." },
    { p: "¿Cada cuánto la uso?", r: "Sesiones 1 a 6: una cada 2 semanas. Sesiones 7 a 10: una cada 4 semanas. Después, mantenimiento: una cada 2 o 3 meses." },
    { p: "¿Cuándo se ven resultados?", r: "Según el fabricante: [completar]." },
    { p: "¿Qué se siente?", r: "[completar con prueba real]" },
    { p: "¿La puedo usar en la cara?", r: "Sí, con el nivel de rostro y nunca cerca de los ojos. Las cejas, con la depiladora facial." },
    { p: "¿Embarazada o amamantando?", r: "No. Tampoco durante la menstruación." },
    { p: "¿Cuántos destellos dura?", r: "[completar con el dato del fabricante]" },
    { p: "¿Cómo se carga?", r: "La depiladora IPL va con su cargador: se enchufa antes de encenderla. La depiladora facial se carga con el cable USB. El rodillo no se carga: va al freezer." },
    { p: "¿Qué pasa si no me sirve?", r: `Tenés 10 días corridos desde que lo recibís para arrepentirte de la compra (Ley 24.240, art. 34), con el botón de arrepentimiento. Si falla, tiene 6 meses de garantía legal. Plazo de cambio: ${plazoCambio}.` },
    { p: "¿Cómo es el envío y cómo pago?", r: `Despachamos en 24 h hábiles. El envío es gratis desde $60.000. Demora: ${demoraEnvio}. Pagás en cuotas con Mercado Pago, o por transferencia con 10% OFF. Si te suscribís al newsletter de la tienda, tenés 10% OFF en la primera compra.` },
  ],

  // ── Pie de página ────────────────────────────────────────
  quienesSomos: "Alameda no fabrica: elige, prueba y responde. [completar con texto de Alexis]",

  seo: {
    titulo: "Kit Depilación en Casa: depiladora IPL, facial y rodillo | Alameda",
    descripcion:
      "Depiladora IPL de 5 niveles, depiladora facial y rodillo de hielo, con guía paso a paso. Envío gratis desde $60.000 y 10% OFF por transferencia.",
  },
};

// Fotos y videos reales: van en public/media/kit-depilacion/ con estos nombres exactos.
export const carpetaMedia = "kit-depilacion";
export const mediaKit = {
  hero: "hero.mp4",
  heroPoster: "hero-poster.jpg",
  kit: "kit.jpg",
  caja: "caja.jpg",
  iplUso: "ipl-uso.jpg",
} as const;

/** Ruta del archivo dentro de public/media (para hayMedia / rutaMedia / Foto). */
export function archivoKit(nombre: string) {
  return `${carpetaMedia}/${nombre}`;
}

export function precioTexto(n: number | null) {
  return n === null ? "$[completar]" : "$" + n.toLocaleString("es-AR");
}

export function precioTransferencia() {
  return kit.precio === null ? null : Math.round(kit.precio * (1 - kit.descuentoTransferencia / 100));
}

/** Lista de lo que falta cargar. Se muestra en el aviso de desarrollo. */
export function pendientes(): string[] {
  const faltan: string[] = [];
  const vacios: [unknown, string][] = [
    [kit.precio, "Precio"],
    [kit.comprarUrl, "Link de compra de Tiendanube"],
    [kit.arrepentimientoUrl, "Link al botón de arrepentimiento"],
    [kit.cambiosUrl, "Link a cambios y devoluciones"],
    [kit.terminosUrl, "Link a términos y condiciones"],
    [kit.privacidadUrl, "Link a política de privacidad"],
    [kit.dataFiscalUrl, "QR de Data Fiscal"],
    [kit.whatsapp, "WhatsApp de soporte"],
    [kit.sitioUrl, "Dominio del sitio"],
    [kit.pixelId, "ID del píxel de Meta"],
  ];
  for (const [valor, nombre] of vacios) if (valor === null || valor === "") faltan.push(nombre);
  if (!kit.anmatConfirmado) faltan.push("Estado ante ANMAT");

  // Cualquier texto que todavía diga [completar], con dónde está
  const recorte = (t: string) => {
    if (t.length <= 70) return t;
    const i = t.indexOf("[completar");
    return "…" + t.slice(Math.max(0, i - 30), i + 40).trim() + "…";
  };
  const recorrer = (v: unknown, ruta: string) => {
    if (typeof v === "string") {
      if (v.includes("[completar")) faltan.push(`${ruta}: «${recorte(v)}»`);
    } else if (Array.isArray(v)) {
      v.forEach((x, i) => recorrer(x, `${ruta} ${i + 1}`));
    } else if (v && typeof v === "object") {
      const o = v as Record<string, unknown>;
      const nombre = o.p ?? o.dato ?? o.titulo ?? o.pieza;
      const base = typeof nombre === "string" ? `${ruta.replace(/ \d+$/, "")} «${nombre}»` : ruta;
      for (const [k, x] of Object.entries(o)) recorrer(x, base ? `${base} › ${k}` : k);
    }
  };
  const vistos = new Set<string>();
  recorrer(kit, "");
  return faltan.filter((f) => !vistos.has(f) && vistos.add(f));
}
