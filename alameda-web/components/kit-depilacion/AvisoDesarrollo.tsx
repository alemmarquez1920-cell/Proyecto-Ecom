import { kit, pendientes } from "@/config/kit-depilacion";

/**
 * Aviso arriba de todo, SOLO en desarrollo (npm run dev) y mientras anmatConfirmado sea false.
 * En la versión publicada no aparece.
 */
export function AvisoDesarrollo() {
  if (process.env.NODE_ENV !== "development" || kit.anmatConfirmado) return null;
  const lista = pendientes();
  return (
    <div role="note" className="bg-tinta px-4 py-3 text-sm text-white">
      <details className="mx-auto max-w-[1200px]">
        <summary className="cursor-pointer font-semibold">
          No publicar en anuncios: falta confirmar ANMAT · {lista.length} datos en [completar] (tocá para ver)
        </summary>
        <ul className="mt-2 list-disc columns-1 gap-8 pl-5 md:columns-2">
          {lista.map((p) => (
            <li key={p} className="mb-1 break-inside-avoid">
              {p}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
