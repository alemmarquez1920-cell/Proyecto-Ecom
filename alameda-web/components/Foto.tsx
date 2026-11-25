import Image from "next/image";
import { hayMedia, rutaMedia } from "@/lib/media";

type Props = {
  /** Dónde va el cartel del lugar reservado */
  cartelArriba?: boolean;
  archivo: string;
  alt: string;
  /** Qué foto real va acá, para el lugar reservado */
  pedido: string;
  sizes: string;
  className?: string;
  prioridad?: boolean;
};

/**
 * Muestra la foto real si existe en /public/media.
 * Si todavía no está, deja un lugar reservado con el nombre del archivo.
 * El contenedor padre define el tamaño (position: relative + aspect ratio).
 */
export function Foto({ cartelArriba = false, archivo, alt, pedido, sizes, className = "", prioridad = false }: Props) {
  if (hayMedia(archivo)) {
    return (
      <Image
        src={rutaMedia(archivo)}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${className}`}
        {...(prioridad ? { preload: true } : {})}
      />
    );
  }
  return (
    <div
      className={`lugar-foto absolute inset-0 flex p-4 ${cartelArriba ? "items-start pt-14" : "items-end"} ${className}`}
      role="img"
      aria-label={`Lugar para la foto: ${pedido}`}
    >
      <span className="rounded-lg bg-fondo px-3 py-2 text-xs leading-snug">
        <b className="block font-semibold">Tu foto real: {archivo}</b>
        {pedido}
      </span>
    </div>
  );
}
