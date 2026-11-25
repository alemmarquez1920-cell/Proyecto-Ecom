"use client";

import { useEffect, useState } from "react";
import { producto, precioTexto } from "@/config/producto";

type Props = {
  /** Si no se pasan, usa los datos del Kit Ondas (config/producto.ts). */
  nombre?: string;
  precio?: string;
  /** Línea chica debajo del precio, por ejemplo el precio con transferencia. */
  detalle?: string;
  href?: string;
  tema?: "ondas" | "verde";
  /** Marca el botón para sumarle los UTM y medir el clic. */
  rastreo?: string;
};

/** Barra de compra fija abajo, solo en celular. Aparece cuando el botón de la portada sale de pantalla. */
export function BarraCompra({
  nombre = producto.nombre,
  precio = precioTexto(producto.precio),
  detalle,
  href = producto.comprarUrl || "#comprar",
  tema = "ondas",
  rastreo,
}: Props) {
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

  const verde = tema === "verde";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t-2 px-4 pt-3 transition-transform duration-300 md:hidden ${
        verde ? "border-linea bg-white" : "border-azul bg-fondo"
      } ${visible ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="leading-tight">
          <p className="text-xs">{nombre}</p>
          <p className={verde ? "font-display text-2xl font-bold" : "font-titulo text-2xl"}>{precio}</p>
          {detalle && <p className="text-xs text-gris">{detalle}</p>}
        </div>
        <a
          href={href}
          tabIndex={visible ? 0 : -1}
          data-comprar={rastreo}
          className={`inline-flex min-h-12 items-center justify-center px-7 font-semibold ${
            verde ? "rounded-xl bg-verde text-white hover:bg-verde-oscuro" : "rounded-full bg-azul text-fondo"
          }`}
        >
          Comprar
        </a>
      </div>
    </div>
  );
}
