/*
 * Rastreador de Anuncios (Alameda)
 * Lee lo que ya está cargado en la Biblioteca de anuncios de Meta, en tu navegador.
 * No manda datos a ningún servidor: todo queda en el almacenamiento local de la extensión.
 */
(() => {
  "use strict";
  if (window.__rastreadorAlameda) return;
  window.__rastreadorAlameda = true;

  const DIA = 86400000;
  const LIMITE_TARJETAS = 800; // tope de la carga automática
  const MESES = {
    ene: 0, jan: 0, feb: 1, mar: 2, abr: 3, apr: 3, may: 4, mai: 4, jun: 5, jul: 6,
    ago: 7, aug: 7, sep: 8, set: 8, oct: 9, out: 9, nov: 10, dic: 11, dec: 11, dez: 11,
  };
  const RE_ID = /(Identificador de la biblioteca|Library ID|ID da biblioteca)\s*:?\s*(\d{6,})/i;
  const RE_ID_TEST = /(Identificador de la biblioteca|Library ID|ID da biblioteca)/i;
  const RE_ID_CONTAR = /(Identificador de la biblioteca|Library ID|ID da biblioteca)/gi;
  const RE_INICIO = /(En circulación desde(?: el)?|Started running on|Veiculação iniciada em)\s+(.+)/i;
  const RE_RANGO = /^(\d{1,2}\s+[a-zç]+\.?\s+\d{4}|[a-z]+\.?\s+\d{1,2},?\s+\d{4})\s*[-–]\s*/i;
  const RE_VERSIONES = /(\d+)\s+(anuncios usan|ads use|anúncios usam)/i;
  const RE_TOTAL = /~?\s*([\d.,]+)\s+(resultados|results)\b/i;
  const RE_DOMINIO = /^[A-Z0-9-]+(\.[A-Z0-9-]+)+$/;
  const PATROCINADO = ["publicidad", "sponsored", "patrocinado"];

  // ---------- almacenamiento ----------
  const almacen = {
    async get(clave, porDefecto) {
      try {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
          const r = await chrome.storage.local.get(clave);
          return r[clave] ?? porDefecto;
        }
      } catch (e) { /* sigue con localStorage */ }
      try { return JSON.parse(localStorage.getItem(clave)) ?? porDefecto; } catch (e) { return porDefecto; }
    },
    async set(clave, valor) {
      try {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
          await chrome.storage.local.set({ [clave]: valor });
          return;
        }
      } catch (e) { /* sigue con localStorage */ }
      try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* sin almacenamiento */ }
    },
  };
  const CLAVE_HISTORIAL = "rastreador.historial";
  const CLAVE_AJUSTES = "rastreador.ajustes";

  // ---------- estado ----------
  const estado = {
    url: location.href,
    porId: new Map(),
    totalResultados: null,
    ajustes: { minimo: 500, dias: 90 },
    historial: {},
    abierto: true,
    vista: "marcas",
  };

  // ---------- lectura de la página ----------
  function parseFecha(texto) {
    if (!texto) return null;
    const t = texto.toLowerCase().replace(/\./g, " ").replace(/\bde\b/g, " ").replace(/,/g, " ").replace(/\s+/g, " ").trim();
    let m = t.match(/(\d{1,2}) ([a-zç]+) (\d{4})/);
    if (m && MESES[m[2].slice(0, 3)] !== undefined) return new Date(+m[3], MESES[m[2].slice(0, 3)], +m[1]);
    m = t.match(/([a-zç]+) (\d{1,2}) (\d{4})/);
    if (m && MESES[m[1].slice(0, 3)] !== undefined) return new Date(+m[3], MESES[m[1].slice(0, 3)], +m[2]);
    return null;
  }

  function contarIds(texto) {
    return (texto.match(RE_ID_CONTAR) || []).length;
  }

  function buscarTarjetas() {
    const tarjetas = new Set();
    const cache = new Map(); // cuántos anuncios tiene cada contenedor, calculado una sola vez
    const ids = (nodo) => {
      if (!cache.has(nodo)) cache.set(nodo, contarIds(nodo.textContent || ""));
      return cache.get(nodo);
    };
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (RE_ID_TEST.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
    });
    let nodo;
    while ((nodo = walker.nextNode())) {
      let el = nodo.parentElement;
      if (!el || el.closest("#ra-panel")) continue;
      // Sube mientras el contenedor siga teniendo un solo anuncio adentro.
      while (el.parentElement && el.parentElement !== document.body && ids(el.parentElement) <= 1) {
        el = el.parentElement;
      }
      tarjetas.add(el);
    }
    return [...tarjetas];
  }

  function leerTarjeta(el) {
    const texto = el.innerText || el.textContent || "";
    const lineas = texto.split("\n").map((s) => s.trim()).filter(Boolean);
    const id = (texto.match(RE_ID) || [])[2];
    if (!id) return null;
    let activo = null, inicio = null, versiones = 1, destino = "";
    for (const l of lineas) {
      const low = l.toLowerCase();
      if (activo === null && /^(activo|active|ativo)$/.test(low)) activo = true;
      if (activo === null && /^(inactivo|inactive|inativo)$/.test(low)) activo = false;
      if (!inicio) {
        const m = l.match(RE_INICIO);
        if (m) inicio = parseFecha(m[2]);
        else {
          const r = l.match(RE_RANGO);
          if (r) inicio = parseFecha(r[1]);
        }
      }
      const v = l.match(RE_VERSIONES);
      if (v) versiones = Math.max(1, +v[1]);
      if (!destino && RE_DOMINIO.test(l)) destino = l.toLowerCase();
    }
    let anunciante = "", titulo = "";
    const i = lineas.findIndex((l) => PATROCINADO.includes(l.toLowerCase()));
    if (i > 0) {
      anunciante = lineas[i - 1];
      titulo = (lineas[i + 1] || "").slice(0, 90);
    }
    return {
      id,
      activo,
      inicio: inicio ? inicio.getTime() : null,
      versiones,
      anunciante: anunciante || "(sin nombre)",
      titulo,
      destino,
    };
  }

  function leerTotal() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (RE_TOTAL.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
    });
    let nodo;
    while ((nodo = walker.nextNode())) {
      if (nodo.parentElement && nodo.parentElement.closest("#ra-panel")) continue;
      const m = nodo.nodeValue.match(RE_TOTAL);
      if (m) return parseInt(m[1].replace(/[.,]/g, ""), 10);
    }
    return null;
  }

  function parametros() {
    const p = new URLSearchParams(location.search);
    return {
      pais: (p.get("country") || "").toUpperCase() || "—",
      busqueda: p.get("q") || "",
      paginaId: p.get("view_all_page_id") || "",
    };
  }

  function leer() {
    for (const el of buscarTarjetas()) {
      const a = leerTarjeta(el);
      if (a) estado.porId.set(a.id, a);
    }
    const total = leerTotal();
    if (total !== null) estado.totalResultados = total;
  }

  // ---------- análisis ----------
  function hoyISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function totalMedido(nombre) {
    const reg = Object.values(estado.historial).find((r) => r.nombre === nombre);
    if (!reg || !reg.puntos.length) return null;
    return reg.puntos[reg.puntos.length - 1];
  }

  function agrupar() {
    const ahora = Date.now();
    const dias = estado.ajustes.dias;
    const grupos = new Map();
    for (const a of estado.porId.values()) {
      if (a.activo === false) continue;
      const g = grupos.get(a.anunciante) || {
        anunciante: a.anunciante, anuncios: 0, tarjetas: 0, nuevos: 0, masViejoDias: 0,
        titulos: new Map(), destinos: new Set(),
      };
      g.tarjetas += 1;
      g.anuncios += a.versiones;
      if (a.inicio) {
        const d = Math.floor((ahora - a.inicio) / DIA);
        if (d <= dias) g.nuevos += a.versiones;
        g.masViejoDias = Math.max(g.masViejoDias, d);
      }
      if (a.titulo) g.titulos.set(a.titulo, (g.titulos.get(a.titulo) || 0) + a.versiones);
      if (a.destino) g.destinos.add(a.destino);
      grupos.set(a.anunciante, g);
    }
    const lista = [...grupos.values()].map((g) => {
      const top = [...g.titulos.entries()].sort((x, y) => y[1] - x[1])[0];
      const medido = totalMedido(g.anunciante);
      const pct = g.anuncios ? g.nuevos / g.anuncios : 0;
      return {
        ...g,
        pct,
        producto: top ? top[0] : "",
        medido,
        escalando: g.anuncios >= 20 && pct >= 0.5,
        ganador: g.masViejoDias >= 60,
        grande: medido ? medido.total >= estado.ajustes.minimo : false,
      };
    });
    return lista.sort((x, y) => y.anuncios - x.anuncios);
  }

  async function guardarHistorial(lista) {
    const { paginaId, pais } = parametros();
    if (!paginaId || estado.totalResultados === null || !lista.length) return;
    const nombre = lista[0].anunciante;
    const reg = estado.historial[paginaId] || { nombre, paginaId, puntos: [] };
    reg.nombre = nombre;
    const fecha = hoyISO();
    reg.puntos = reg.puntos.filter((p) => !(p.fecha === fecha && p.pais === pais));
    reg.puntos.push({ fecha, pais, total: estado.totalResultados });
    reg.puntos.sort((a, b) => a.fecha.localeCompare(b.fecha));
    estado.historial[paginaId] = reg;
    await almacen.set(CLAVE_HISTORIAL, estado.historial);
  }

  // ---------- interfaz ----------
  function el(tag, attrs = {}, ...hijos) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k === "onclick") n.addEventListener("click", v);
      else if (k === "oninput") n.addEventListener("input", v);
      else n.setAttribute(k, v);
    }
    for (const h of hijos) if (h !== null && h !== undefined) n.append(h);
    return n;
  }

  const panel = el("div", { id: "ra-panel" });
  document.body.appendChild(panel);

  let auto = null;
  let sinCambios = 0;

  function urlEnPais(pais) {
    const u = new URL(location.href);
    u.searchParams.set("country", pais);
    return u.toString();
  }

  function urlBuscar(nombre) {
    const { pais } = parametros();
    const u = new URL("https://www.facebook.com/ads/library/");
    u.searchParams.set("active_status", "active");
    u.searchParams.set("ad_type", "all");
    u.searchParams.set("country", pais === "—" ? "US" : pais);
    u.searchParams.set("q", nombre);
    u.searchParams.set("search_type", "keyword_unordered");
    return u.toString();
  }

  function chip(texto, clase, titulo) {
    return el("span", { class: `ra-chip ${clase}`, title: titulo }, texto);
  }

  function exportarCSV(lista) {
    const { pais, busqueda } = parametros();
    const filas = [["fecha", "pais", "busqueda", "marca", "anuncios_activos_leidos", `nuevos_${estado.ajustes.dias}_dias`, "porcentaje_nuevos", "anuncio_mas_viejo_dias", "total_medido", "producto_mas_repetido", "destinos"]];
    for (const g of lista) {
      filas.push([hoyISO(), pais, busqueda, g.anunciante, g.anuncios, g.nuevos, Math.round(g.pct * 100), g.masViejoDias, g.medido ? g.medido.total : "", g.producto, [...g.destinos].join(" ")]);
    }
    const csv = filas.map((f) => f.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const a = el("a", { href: URL.createObjectURL(blob), download: `rastreador-${pais}-${hoyISO()}.csv` });
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function paso() {
    const antes = estado.porId.size;
    window.scrollBy(0, Math.round(window.innerHeight * 0.9));
    setTimeout(() => {
      leer();
      sinCambios = estado.porId.size === antes ? sinCambios + 1 : 0;
      render();
      if (!auto) return;
      if (sinCambios >= 6 || estado.porId.size >= LIMITE_TARJETAS) {
        auto = null;
        render();
        return;
      }
      auto = setTimeout(paso, 1200 + Math.random() * 1300);
    }, 700);
  }

  function alternarAuto() {
    if (auto) {
      clearTimeout(auto);
      auto = null;
    } else {
      sinCambios = 0;
      auto = setTimeout(paso, 100);
    }
    render();
  }

  function vistaHistorial() {
    const regs = Object.values(estado.historial).sort((a, b) => (b.puntos.at(-1)?.total || 0) - (a.puntos.at(-1)?.total || 0));
    if (!regs.length) {
      return el("p", { class: "ra-vacio" }, "Todavía no hay historial. Abrí la página de una marca (\"Ver todos los anuncios\") y el total queda guardado acá con la fecha. Volvé cada semana para ver si crece.");
    }
    const tabla = el("table", { class: "ra-tabla" },
      el("thead", {}, el("tr", {}, el("th", {}, "Marca"), el("th", {}, "Último total"), el("th", {}, "Cambio"), el("th", {}, "Mediciones"))));
    const cuerpo = el("tbody");
    for (const r of regs) {
      const ult = r.puntos.at(-1);
      const prim = r.puntos[0];
      const cambio = r.puntos.length > 1 ? ult.total - prim.total : null;
      cuerpo.append(el("tr", {},
        el("td", {}, el("a", { href: `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=${encodeURIComponent(ult.pais)}&view_all_page_id=${encodeURIComponent(r.paginaId)}`, target: "_blank", rel: "noopener" }, r.nombre)),
        el("td", { class: "ra-num" }, `${ult.total.toLocaleString("es-AR")} (${ult.pais}, ${ult.fecha})`),
        el("td", { class: "ra-num" }, cambio === null ? "—" : `${cambio >= 0 ? "+" : ""}${cambio.toLocaleString("es-AR")} desde ${prim.fecha}`),
        el("td", { class: "ra-num" }, String(r.puntos.length))));
    }
    tabla.append(cuerpo);
    return tabla;
  }

  function vistaMarcas(lista) {
    if (!lista.length) {
      return el("p", { class: "ra-vacio" }, "No encontré anuncios en pantalla. Hacé una búsqueda en la Biblioteca, bajá un poco o tocá \"Cargar más\".");
    }
    const tabla = el("table", { class: "ra-tabla" },
      el("thead", {}, el("tr", {},
        el("th", {}, "Marca"),
        el("th", { title: "Anuncios activos leídos en esta página (suma las versiones)" }, "Activos"),
        el("th", { title: `Arrancaron en los últimos ${estado.ajustes.dias} días` }, `Nuevos ${estado.ajustes.dias} d`),
        el("th", { title: "Días que lleva el anuncio activo más viejo" }, "Más viejo"),
        el("th", {}, "Señales"),
        el("th", {}, "Producto más repetido"))));
    const cuerpo = el("tbody");
    for (const g of lista.slice(0, 150)) {
      const senales = el("div", { class: "ra-chips" },
        g.grande ? chip(`+${estado.ajustes.minimo}`, "ra-grande", `Total medido: ${g.medido.total} (${g.medido.fecha})`) : null,
        g.escalando ? chip("Escalando", "ra-escala", "La mitad o más de sus anuncios activos son nuevos") : null,
        g.ganador ? chip("Ganador", "ra-ganador", "Tiene un anuncio activo hace 60 días o más") : null);
      cuerpo.append(el("tr", { class: g.grande && g.escalando ? "ra-destacada" : "" },
        el("td", {}, el("a", { href: urlBuscar(g.anunciante), target: "_blank", rel: "noopener", title: "Buscar sus anuncios" }, g.anunciante),
          g.medido ? el("div", { class: "ra-sub" }, `Total medido: ${g.medido.total.toLocaleString("es-AR")}`) : null),
        el("td", { class: "ra-num" }, String(g.anuncios)),
        el("td", { class: "ra-num" }, `${g.nuevos} (${Math.round(g.pct * 100)}%)`),
        el("td", { class: "ra-num" }, g.masViejoDias ? `${g.masViejoDias} d` : "—"),
        el("td", {}, senales),
        el("td", { class: "ra-prod", title: g.producto }, g.producto || "—")));
    }
    tabla.append(cuerpo);
    return tabla;
  }

  function render() {
    const { pais, busqueda, paginaId } = parametros();
    const lista = agrupar();
    panel.replaceChildren();

    const cabeza = el("div", { class: "ra-cabeza" },
      el("strong", {}, "Rastreador de anuncios"),
      el("button", { class: "ra-min", type: "button", title: estado.abierto ? "Minimizar" : "Abrir", onclick: () => { estado.abierto = !estado.abierto; render(); } }, estado.abierto ? "–" : "+"));
    panel.append(cabeza);
    panel.classList.toggle("ra-cerrado", !estado.abierto);
    if (!estado.abierto) return;

    const totalAnuncios = lista.reduce((s, g) => s + g.anuncios, 0);
    panel.append(el("div", { class: "ra-resumen" },
      `País: ${pais}`,
      busqueda ? ` · Búsqueda: "${busqueda}"` : "",
      paginaId ? " · Página de una marca" : "",
      estado.totalResultados !== null ? ` · Meta dice ~${estado.totalResultados.toLocaleString("es-AR")}` : "",
      ` · Leídos: ${estado.porId.size} tarjetas, ${totalAnuncios} anuncios activos`));

    const minimo = el("input", { type: "number", min: "1", value: String(estado.ajustes.minimo), oninput: async (e) => { estado.ajustes.minimo = Math.max(1, +e.target.value || 500); await almacen.set(CLAVE_AJUSTES, estado.ajustes); render(); } });
    const dias = el("input", { type: "number", min: "7", value: String(estado.ajustes.dias), oninput: async (e) => { estado.ajustes.dias = Math.max(7, +e.target.value || 90); await almacen.set(CLAVE_AJUSTES, estado.ajustes); render(); } });
    panel.append(el("div", { class: "ra-controles" },
      el("button", { type: "button", class: auto ? "ra-activo" : "", onclick: alternarAuto }, auto ? "■ Frenar" : "▶ Cargar más"),
      el("button", { type: "button", onclick: () => { leer(); render(); } }, "Releer"),
      el("button", { type: "button", onclick: () => exportarCSV(lista) }, "Exportar CSV"),
      el("button", { type: "button", onclick: () => { estado.vista = estado.vista === "marcas" ? "historial" : "marcas"; render(); } }, estado.vista === "marcas" ? "Historial" : "Marcas"),
      pais !== "AR" ? el("a", { class: "ra-boton", href: urlEnPais("AR"), target: "_blank", rel: "noopener" }, "Ver en Argentina") : null,
      el("label", {}, "Mínimo ", minimo),
      el("label", {}, "Días ", dias)));

    if (paginaId && estado.totalResultados !== null) {
      const ok = estado.totalResultados >= estado.ajustes.minimo;
      panel.append(el("div", { class: `ra-aviso ${ok ? "ra-ok" : ""}` },
        `Esta marca tiene ~${estado.totalResultados.toLocaleString("es-AR")} anuncios ${ok ? `(pasa los ${estado.ajustes.minimo})` : `(no llega a ${estado.ajustes.minimo})`}. Quedó guardado en el historial.`));
    }

    const cuerpo = el("div", { class: "ra-cuerpo" });
    cuerpo.append(estado.vista === "marcas" ? vistaMarcas(lista) : vistaHistorial());
    panel.append(cuerpo);
    panel.append(el("p", { class: "ra-nota" },
      `Nuevos: arrancaron en los últimos ${estado.ajustes.dias} días. Escalando: la mitad o más de sus anuncios activos son nuevos (con 20 o más). Ganador: un anuncio activo hace 60 días o más. +${estado.ajustes.minimo}: total medido al abrir la página de la marca.`));

    guardarHistorial(lista);
  }

  // ---------- arranque y cambios de página ----------
  let espera = null;
  const observador = new MutationObserver((cambios) => {
    if (cambios.every((c) => panel.contains(c.target))) return;
    clearTimeout(espera);
    espera = setTimeout(() => { leer(); render(); }, 900);
  });

  setInterval(() => {
    if (location.href !== estado.url) {
      estado.url = location.href;
      estado.porId.clear();
      estado.totalResultados = null;
      leer();
      render();
    }
  }, 1000);

  (async () => {
    estado.historial = await almacen.get(CLAVE_HISTORIAL, {});
    estado.ajustes = { ...estado.ajustes, ...(await almacen.get(CLAVE_AJUSTES, {})) };
    leer();
    render();
    observador.observe(document.body, { childList: true, subtree: true });
  })();
})();
