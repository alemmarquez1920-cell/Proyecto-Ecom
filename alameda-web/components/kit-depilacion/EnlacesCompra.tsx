"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Parámetros de la visita que pasan al link de Tiendanube.
// fbclid va también: así el píxel de la tienda puede atribuir la compra al anuncio.
const esParametroDeCampana = (k: string) => k.startsWith("utm_") || k === "fbclid";

function sumarParametros(a: HTMLAnchorElement, params: [string, string][]) {
  const href = a.getAttribute("href") ?? "";
  if (!/^https?:\/\//.test(href)) return;
  const url = new URL(href);
  for (const [k, v] of params) if (!url.searchParams.has(k)) url.searchParams.set(k, v);
  a.setAttribute("href", url.toString());
}

/**
 * Botones de compra del Kit Depilación (los que tienen data-comprar):
 * 1. les suma los UTM con los que llegó la visita;
 * 2. mandan el evento "ClicComprar" al píxel de Meta, si está cargado.
 */
export function EnlacesCompra() {
  useEffect(() => {
    const params = [...new URLSearchParams(window.location.search)].filter(([k]) => esParametroDeCampana(k));
    const todos = () => document.querySelectorAll<HTMLAnchorElement>("a[data-comprar]");
    if (params.length) todos().forEach((a) => sumarParametros(a, params));

    const alClic = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-comprar]");
      if (!a) return;
      // Por si el botón apareció después (por ejemplo, el del selector "¿Es para vos?").
      if (params.length) sumarParametros(a, params);
      window.fbq?.("trackCustom", "ClicComprar", { ubicacion: a.dataset.comprar });
    };
    document.addEventListener("click", alClic, true);
    return () => document.removeEventListener("click", alClic, true);
  }, []);

  return null;
}
