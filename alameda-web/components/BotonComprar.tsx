import { producto } from "@/config/producto";

type Props = {
  id?: string;
  className?: string;
  texto?: string;
  variante?: "azul" | "claro" | "verde";
  /** Link de compra. Si no se pasa, usa el del Kit Ondas (config/producto.ts). */
  href?: string;
  /** Marca el botón para sumarle los UTM y medir el clic (Kit Depilación). Valor: dónde está el botón. */
  rastreo?: string;
};

/** Botón Comprar: lleva al link de Tiendanube del producto. */
export function BotonComprar({ id, className = "", texto = "Comprar", variante = "azul", href, rastreo }: Props) {
  const estilos =
    variante === "verde"
      ? "rounded-xl bg-verde text-white hover:bg-verde-oscuro"
      : variante === "azul"
        ? "rounded-full border-2 border-azul bg-azul text-fondo hover:bg-fondo hover:text-azul"
        : "rounded-full border-2 border-azul bg-fondo text-azul hover:bg-rosa";
  return (
    <a
      id={id}
      href={href ?? (producto.comprarUrl || "#comprar")}
      data-comprar={rastreo}
      className={`inline-flex min-h-12 items-center justify-center px-8 text-base font-semibold tracking-wide transition-colors duration-200 ${estilos} ${className}`}
    >
      {texto}
    </a>
  );
}
