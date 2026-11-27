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
    orden: "anuncios",
    soloDestacadas: false,
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
      if (!el || el.closest("#ra-host")) continue;
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
      if (nodo.parentElement && nodo.parentElement.closest("#ra-host")) continue;
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

  // ---------- interfaz (Shadow DOM: los estilos de Facebook no la tocan) ----------
  const ESTILOS = `
    :host { all: initial; }
    * { box-sizing: border-box; }
    .panel { position: fixed; right: 16px; bottom: 16px; z-index: 2147483647; width: 680px; max-width: calc(100vw - 32px);
      max-height: 76vh; display: flex; flex-direction: column; background: #fff; color: #111827; border: 1px solid #e5e7eb;
      border-radius: 14px; box-shadow: 0 20px 48px -12px rgba(17,24,39,.28); font: 13px/1.45 Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; overflow: hidden; }
    .cabeza { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-bottom: 1px solid #f0f1f3; }
    .logo { width: 22px; height: 22px; border-radius: 6px; background: #c1121f; display: grid; place-items: center; }
    .titulo { font-weight: 700; font-size: 14px; letter-spacing: -.01em; }
    .contexto { color: #6b7280; font-size: 12px; margin-left: auto; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 320px; }
    .icono { border: 0; background: transparent; width: 28px; height: 28px; border-radius: 8px; cursor: pointer; color: #374151; font-size: 16px; }
    .icono:hover { background: #f3f4f6; }
    .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; padding: 12px 14px 4px; }
    .kpi { border: 1px solid #f0f1f3; border-radius: 10px; padding: 8px 10px; }
    .kpi b { display: block; font-size: 18px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .kpi span { color: #6b7280; font-size: 11.5px; }
    .kpi.rojo b { color: #c1121f; }
    .barra { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding: 8px 14px; }
    .tabs { display: inline-flex; background: #f3f4f6; border-radius: 9px; padding: 2px; margin-right: auto; }
    .tabs button { border: 0; background: transparent; padding: 5px 12px; border-radius: 7px; font: inherit; cursor: pointer; color: #4b5563; }
    .tabs button.on { background: #fff; color: #111827; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,.08); }
    .btn { font: inherit; padding: 6px 11px; border: 1px solid #e5e7eb; border-radius: 9px; background: #fff; color: #111827; cursor: pointer; text-decoration: none; white-space: nowrap; }
    .btn:hover { background: #f9fafb; }
    .btn.primario { background: #c1121f; border-color: #c1121f; color: #fff; font-weight: 600; }
    .btn.primario:hover { background: #a10f1a; }
    .filtro { display: inline-flex; align-items: center; gap: 6px; margin-right: 6px; color: #374151; cursor: pointer; user-select: none; }
    .ajustes { display: flex; gap: 10px; padding: 0 14px 8px; color: #6b7280; font-size: 12px; }
    .ajustes input[type=number] { width: 56px; margin-left: 4px; padding: 3px 6px; border: 1px solid #e5e7eb; border-radius: 6px; font: inherit; }
    .aviso { margin: 0 14px 8px; padding: 8px 10px; border-radius: 9px; background: #f3f4f6; }
    .aviso.ok { background: #fdecee; color: #8a0d17; font-weight: 600; }
    .cuerpo { overflow: auto; min-height: 0; border-top: 1px solid #f0f1f3; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 8px 10px; border-bottom: 1px solid #f3f4f6; text-align: left; vertical-align: top; }
    th { position: sticky; top: 0; background: #fafafa; font-weight: 600; color: #4b5563; font-size: 12px; cursor: pointer; white-space: nowrap; }
    th.on { color: #c1121f; }
    td a { color: #111827; font-weight: 600; text-decoration: none; }
    td a:hover { text-decoration: underline; }
    .num { font-variant-numeric: tabular-nums; white-space: nowrap; }
    .sub { font-size: 11.5px; color: #6b7280; font-weight: 400; }
    .prod { max-width: 190px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #4b5563; }
    tr.dest td { background: #fff5f6; }
    .barrita { height: 4px; border-radius: 2px; background: #f3f4f6; margin-top: 4px; width: 70px; }
    .barrita i { display: block; height: 4px; border-radius: 2px; background: #c1121f; }
    .chips { display: flex; flex-wrap: wrap; gap: 4px; }
    .chip { padding: 1px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; white-space: nowrap; }
    .c-escala { background: #c1121f; color: #fff; } .c-ganador { background: #e7f6ec; color: #0b6b2b; } .c-grande { background: #111827; color: #fff; }
    .vacio { padding: 18px 14px; color: #6b7280; }
    .pie { padding: 8px 14px; font-size: 11px; color: #9ca3af; border-top: 1px solid #f0f1f3; }
    .pastilla { position: fixed; right: 16px; bottom: 16px; z-index: 2147483647; display: flex; align-items: center; gap: 8px; padding: 9px 14px;
      background: #111827; color: #fff; border: 0; border-radius: 999px; font: 600 13px/1 Inter, system-ui, sans-serif; cursor: pointer; box-shadow: 0 10px 28px -8px rgba(0,0,0,.45); }
    .pastilla em { font-style: normal; background: #c1121f; border-radius: 999px; padding: 3px 8px; }
  `;
  const LOGO = '<svg width="14" height="14" viewBox="0 0 16 16" fill="#fff"><rect x="2" y="9" width="3" height="5" rx="1"/><rect x="6.5" y="6" width="3" height="8" rx="1"/><rect x="11" y="2" width="3" height="12" rx="1"/></svg>';

  function el(tag, attrs = {}, ...hijos) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    for (const h of hijos) if (h !== null && h !== undefined && h !== false) n.append(h);
    return n;
  }

  const host = el("div", { id: "ra-host" });
  document.documentElement.appendChild(host);
  const raiz = host.attachShadow({ mode: "open" });
  const hoja = el("style");
  hoja.textContent = ESTILOS;
  raiz.append(hoja);
  const contenedor = el("div");
  raiz.append(contenedor);

  let auto = null;
  let sinCambios = 0;

  function urlEnPais(pais) { const u = new URL(location.href); u.searchParams.set("country", pais); return u.toString(); }
  function urlBuscar(nombre) {
    const { pais } = parametros();
    const u = new URL("https://www.facebook.com/ads/library/");
    u.search = new URLSearchParams({ active_status: "active", ad_type: "all", country: pais === "—" ? "US" : pais, q: nombre, search_type: "keyword_unordered" }).toString();
    return u.toString();
  }
  const fmt = (n) => Number(n).toLocaleString("es-AR");
  const chip = (t, c, title) => el("span", { class: `chip ${c}`, title }, t);

  function exportarCSV(lista) {
    const { pais, busqueda } = parametros();
    const filas = [["fecha", "pais", "busqueda", "marca", "anuncios_activos_leidos", `nuevos_${estado.ajustes.dias}_dias`, "porcentaje_nuevos", "anuncio_mas_viejo_dias", "total_medido", "producto_mas_repetido", "destinos"]];
    for (const g of lista) filas.push([hoyISO(), pais, busqueda, g.anunciante, g.anuncios, g.nuevos, Math.round(g.pct * 100), g.masViejoDias, g.medido ? g.medido.total : "", g.producto, [...g.destinos].join(" ")]);
    const csv = filas.map((f) => f.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = el("a", { href: URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" })), download: `rastreador-${pais}-${hoyISO()}.csv` });
    raiz.append(a); a.click(); a.remove();
  }

  function paso() {
    const antes = estado.porId.size;
    window.scrollBy(0, Math.round(window.innerHeight * 0.9));
    setTimeout(() => {
      leer();
      sinCambios = estado.porId.size === antes ? sinCambios + 1 : 0;
      if (auto && (sinCambios >= 6 || estado.porId.size >= LIMITE_TARJETAS)) auto = null;
      render();
      if (auto) auto = setTimeout(paso, 1200 + Math.random() * 1300);
    }, 700);
  }
  function alternarAuto() {
    if (auto) { clearTimeout(auto); auto = null; } else { sinCambios = 0; auto = setTimeout(paso, 100); }
    render();
  }

  const COLUMNAS = [
    ["anunciante", "Marca"], ["anuncios", "Activos"], ["pct", `Nuevos`], ["masViejoDias", "Más viejo"], [null, "Señales"], [null, "Producto más repetido"],
  ];

  function ordenar(lista) {
    const k = estado.orden;
    return [...lista].sort((a, b) => (k === "anunciante" ? a.anunciante.localeCompare(b.anunciante) : (b[k] || 0) - (a[k] || 0)));
  }

  function vistaMarcas(lista) {
    if (!lista.length) return el("div", { class: "vacio" }, estado.soloDestacadas ? "Ninguna marca cumple +500 y escalando en lo que se cargó. Cargá más o sacá el filtro." : "No hay anuncios en pantalla. Buscá una palabra clave en la Biblioteca y tocá \"Cargar más\".");
    const cab = el("tr", {}, ...COLUMNAS.map(([k, t]) => el("th", { class: k === estado.orden ? "on" : "", onclick: k ? () => { estado.orden = k; render(); } : null }, t + (k === estado.orden ? " ↓" : ""))));
    const cuerpo = el("tbody");
    for (const g of ordenar(lista).slice(0, 200)) {
      cuerpo.append(el("tr", { class: g.grande && g.escalando ? "dest" : "" },
        el("td", {}, el("a", { href: urlBuscar(g.anunciante), target: "_blank", rel: "noopener", title: "Buscar sus anuncios" }, g.anunciante),
          g.medido ? el("div", { class: "sub" }, `Total medido: ${fmt(g.medido.total)}`) : null),
        el("td", { class: "num" }, fmt(g.anuncios)),
        el("td", { class: "num" }, `${g.nuevos} · ${Math.round(g.pct * 100)}%`, el("div", { class: "barrita" }, el("i", { style: `width:${Math.round(g.pct * 100)}%` }))),
        el("td", { class: "num" }, g.masViejoDias ? `${g.masViejoDias} d` : "—"),
        el("td", {}, el("div", { class: "chips" },
          g.grande ? chip(`+${estado.ajustes.minimo}`, "c-grande", `Total medido ${fmt(g.medido.total)} el ${g.medido.fecha}`) : null,
          g.escalando ? chip("Escalando", "c-escala", "La mitad o más de sus anuncios activos son nuevos") : null,
          g.ganador ? chip("Ganador", "c-ganador", "Un anuncio activo hace 60 días o más") : null)),
        el("td", { class: "prod", title: g.producto }, g.producto || "—")));
    }
    return el("table", {}, el("thead", {}, cab), cuerpo);
  }

  function vistaHistorial() {
    const regs = Object.values(estado.historial).sort((a, b) => (b.puntos.at(-1)?.total || 0) - (a.puntos.at(-1)?.total || 0));
    if (!regs.length) return el("div", { class: "vacio" }, "Todavía no hay historial. Abrí la página de una marca (\"Ver todos los anuncios\") y su total queda guardado con la fecha. Volvé cada semana para ver si crece.");
    const cuerpo = el("tbody");
    for (const r of regs) {
      const ult = r.puntos.at(-1), prim = r.puntos[0];
      const cambio = r.puntos.length > 1 ? ult.total - prim.total : null;
      cuerpo.append(el("tr", {},
        el("td", {}, el("a", { href: `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=${encodeURIComponent(ult.pais)}&view_all_page_id=${encodeURIComponent(r.paginaId)}`, target: "_blank", rel: "noopener" }, r.nombre)),
        el("td", { class: "num" }, fmt(ult.total), el("div", { class: "sub" }, `${ult.pais} · ${ult.fecha}`)),
        el("td", { class: "num" }, cambio === null ? "—" : `${cambio >= 0 ? "+" : ""}${fmt(cambio)}`, cambio === null ? null : el("div", { class: "sub" }, `desde ${prim.fecha}`)),
        el("td", { class: "num" }, String(r.puntos.length))));
    }
    return el("table", {}, el("thead", {}, el("tr", {}, el("th", {}, "Marca"), el("th", {}, "Último total"), el("th", {}, "Cambio"), el("th", {}, "Mediciones"))), cuerpo);
  }

  function render() {
    const { pais, busqueda, paginaId } = parametros();
    const todas = agrupar();
    contenedor.replaceChildren();
    if (!estado.abierto) {
      const n = todas.filter((g) => g.escalando).length;
      contenedor.append(el("button", { class: "pastilla", onclick: () => { estado.abierto = true; render(); } }, "Rastreador", el("em", {}, `${n} escalando`)));
      guardarHistorial(todas);
      return;
    }
    const lista = estado.soloDestacadas ? todas.filter((g) => g.grande && g.escalando) : todas;
    const totalAnuncios = todas.reduce((s, g) => s + g.anuncios, 0);
    const logo = el("div", { class: "logo" }); logo.innerHTML = LOGO;

    const panel = el("div", { class: "panel" },
      el("div", { class: "cabeza" }, logo, el("div", { class: "titulo" }, "Rastreador de anuncios"),
        el("div", { class: "contexto", title: busqueda }, `${pais}${busqueda ? ` · "${busqueda}"` : ""}${paginaId ? " · página de marca" : ""}`),
        el("button", { class: "icono", title: "Minimizar", onclick: () => { estado.abierto = false; render(); } }, "–")),
      el("div", { class: "kpis" },
        el("div", { class: "kpi" }, el("b", {}, estado.totalResultados !== null ? `~${fmt(estado.totalResultados)}` : "—"), el("span", {}, "resultados en Meta")),
        el("div", { class: "kpi" }, el("b", {}, fmt(totalAnuncios)), el("span", {}, `activos leídos (${fmt(estado.porId.size)} tarjetas)`)),
        el("div", { class: "kpi" }, el("b", {}, fmt(todas.length)), el("span", {}, "marcas")),
        el("div", { class: "kpi rojo" }, el("b", {}, fmt(todas.filter((g) => g.escalando).length)), el("span", {}, "escalando"))),
      el("div", { class: "barra" },
        el("div", { class: "tabs" },
          el("button", { class: estado.vista === "marcas" ? "on" : "", onclick: () => { estado.vista = "marcas"; render(); } }, "Marcas"),
          el("button", { class: estado.vista === "historial" ? "on" : "", onclick: () => { estado.vista = "historial"; render(); } }, `Historial (${Object.keys(estado.historial).length})`)),
        el("button", { class: `btn ${auto ? "" : "primario"}`, onclick: alternarAuto }, auto ? "■ Frenar" : "▶ Cargar más"),
        el("button", { class: "btn", onclick: () => exportarCSV(todas) }, "CSV"),
        pais !== "AR" ? el("a", { class: "btn", href: urlEnPais("AR"), target: "_blank", rel: "noopener" }, "Ver en AR") : null),
      el("div", { class: "ajustes" },
        el("label", { class: "filtro" }, (() => { const c = el("input", { type: "checkbox", onchange: (e) => { estado.soloDestacadas = e.target.checked; render(); } }); c.checked = estado.soloDestacadas; return c; })(), `Solo +${estado.ajustes.minimo} y escalando`),
        el("label", {}, "Mínimo", el("input", { type: "number", min: "1", value: String(estado.ajustes.minimo), onchange: async (e) => { estado.ajustes.minimo = Math.max(1, +e.target.value || 500); await almacen.set(CLAVE_AJUSTES, estado.ajustes); render(); } })),
        el("label", {}, "Días nuevos", el("input", { type: "number", min: "7", value: String(estado.ajustes.dias), onchange: async (e) => { estado.ajustes.dias = Math.max(7, +e.target.value || 90); await almacen.set(CLAVE_AJUSTES, estado.ajustes); render(); } }))),
      paginaId && estado.totalResultados !== null
        ? el("div", { class: `aviso ${estado.totalResultados >= estado.ajustes.minimo ? "ok" : ""}` }, `Esta marca tiene ~${fmt(estado.totalResultados)} anuncios${estado.totalResultados >= estado.ajustes.minimo ? `: pasa los ${estado.ajustes.minimo}` : `: no llega a ${estado.ajustes.minimo}`}. Guardado en Historial.`)
        : null,
      el("div", { class: "cuerpo" }, estado.vista === "marcas" ? vistaMarcas(lista) : vistaHistorial()),
      el("div", { class: "pie" }, `Nuevos: arrancaron en los últimos ${estado.ajustes.dias} días · Escalando: la mitad o más de sus activos son nuevos (20+) · Ganador: un anuncio activo hace 60+ días · Nada sale de tu navegador.`));
    contenedor.append(panel);
    guardarHistorial(todas);
  }

  // ---------- arranque y cambios de página ----------
  let espera = null;
  const tarea = (fn) => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 0));
  const observador = new MutationObserver(() => {
    clearTimeout(espera);
    espera = setTimeout(() => tarea(() => { leer(); render(); }), 900);
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
