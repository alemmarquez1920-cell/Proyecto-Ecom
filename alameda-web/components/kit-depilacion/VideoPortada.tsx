"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

const consulta = "(prefers-reduced-motion: reduce)";
const movimientoReducido = () => window.matchMedia(consulta).matches;
const suscribirMovimiento = (avisar: () => void) => {
  const mq = window.matchMedia(consulta);
  mq.addEventListener("change", avisar);
  return () => mq.removeEventListener("change", avisar);
};

type Props = { video: string; poster: string | null; alt: string; sizes: string };

/**
 * Video de portada que no frena la carga: primero se ve el poster (imagen liviana)
 * y el video se monta recién cuando la página terminó de cargar.
 * Con "reducir movimiento" activado no hay autoplay: queda el poster con un botón.
 */
export function VideoPortada({ video, poster, alt, sizes }: Props) {
  const [montar, setMontar] = useState(false);
  const reducido = useSyncExternalStore(suscribirMovimiento, movimientoReducido, () => false);

  useEffect(() => {
    if (reducido) return;
    const arrancar = () => setMontar(true);
    if (document.readyState === "complete") {
      const t = window.setTimeout(arrancar, 300);
      return () => window.clearTimeout(t);
    }
    window.addEventListener("load", arrancar, { once: true });
    return () => window.removeEventListener("load", arrancar);
  }, [reducido]);

  return (
    <>
      {poster && <Image src={poster} alt={montar ? "" : alt} fill sizes={sizes} preload className="object-cover" />}
      {montar && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay={!reducido}
          controls={reducido}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster ?? undefined}
          aria-label={alt}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      {reducido && !montar && (
        <button
          type="button"
          onClick={() => setMontar(true)}
          className="absolute bottom-4 left-4 inline-flex min-h-12 items-center rounded-xl bg-white px-5 font-semibold text-verde"
        >
          Ver video
        </button>
      )}
    </>
  );
}
