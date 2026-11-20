"use client";

import { useEffect, useState } from "react";
import { producto, precioTexto } from "@/config/producto";

/** Barra de compra fija abajo, solo en celular. Aparece cuando el botón de la portada sale de pantalla. */
export function BarraCompra() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const boton = document.getElementById("comprar-portada");
    if (!boton) return;
    const io = new IntersectionObserver(([e]) => {
      setVisible(!e.isIntersecting && e.boundingClientRect.top < 0);
    });
    io.observe(boton);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t-2 border-azul bg-fondo px-4 pt-3 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="leading-tight">
          <p className="text-xs">{producto.nombre}</p>
          <p className="font-titulo text-2xl">{precioTexto(producto.precio)}</p>
        </div>
        <a
          href={producto.comprarUrl || "#comprar"}
          tabIndex={visible ? 0 : -1}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-azul px-7 font-semibold text-fondo"
        >
          Comprar
        </a>
      </div>
    </div>
  );
}
