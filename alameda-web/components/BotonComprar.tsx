import { producto } from "@/config/producto";

type Props = {
  id?: string;
  className?: string;
  texto?: string;
  variante?: "azul" | "claro";
};

/** Botón Comprar: lleva al link de Tiendanube definido en config/producto.ts */
export function BotonComprar({ id, className = "", texto = "Comprar", variante = "azul" }: Props) {
  const estilos =
    variante === "azul"
      ? "bg-azul text-fondo hover:bg-fondo hover:text-azul"
      : "bg-fondo text-azul hover:bg-rosa";
  return (
    <a
      id={id}
      href={producto.comprarUrl || "#comprar"}
      className={`inline-flex min-h-12 items-center justify-center rounded-full border-2 border-azul px-8 text-base font-semibold tracking-wide transition-colors duration-200 ${estilos} ${className}`}
    >
      {texto}
    </a>
  );
}
