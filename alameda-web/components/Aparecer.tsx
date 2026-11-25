"use client";

import { useEffect } from "react";

/**
 * Hace aparecer suave los bloques con data-aparecer cuando entran en pantalla.
 * Lo que ya se ve al cargar no se anima, así no hay saltos ni demoras.
 */
export function Aparecer() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-aparecer]"));
    const abajo = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    abajo.forEach((el) => el.classList.add("reveal-pendiente"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-listo");
            e.target.classList.remove("reveal-pendiente");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    abajo.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
