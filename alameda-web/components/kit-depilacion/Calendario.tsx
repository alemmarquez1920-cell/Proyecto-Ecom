import { kit } from "@/config/kit-depilacion";

/**
 * Línea de tiempo de sesiones. La separación entre puntos es proporcional
 * a las semanas entre sesiones (lee config/kit-depilacion.ts).
 * En celular va vertical; en desktop, horizontal.
 */
export function Calendario() {
  return (
    <ol className="flex flex-col gap-10 md:flex-row md:gap-16">
      {kit.calendario.map((tramo, t) => {
        const sesiones = Array.from({ length: tramo.hasta - tramo.desde + 1 }, (_, i) => tramo.desde + i);
        return (
          <li key={tramo.desde} className="relative flex gap-5 md:flex-col">
            {/* Línea desde el primer punto de este tramo hasta el primero del siguiente */}
            <span
              className="absolute -bottom-14 left-[15px] top-4 w-0.5 bg-linea md:-right-20 md:bottom-auto md:left-4 md:top-[15px] md:h-0.5 md:w-auto"
              aria-hidden="true"
            />
            <ol
              className="relative flex flex-col gap-[calc(var(--semanas)*8px)] md:flex-row md:gap-[calc(var(--semanas)*12px)]"
              style={{ "--semanas": tramo.cadaSemanas } as React.CSSProperties}
            >
              {sesiones.map((n) => (
                <li
                  key={n}
                  className={`flex size-8 items-center justify-center rounded-full text-sm font-semibold ring-4 ring-white ${
                    t === 0 ? "bg-verde text-white" : "border-2 border-verde bg-white text-verde"
                  }`}
                >
                  <span className="sr-only">Sesión </span>
                  {n}
                </li>
              ))}
            </ol>
            <div className="md:max-w-56">
              <h3 className="text-xl md:text-2xl">
                Sesiones {tramo.desde} a {tramo.hasta}
              </h3>
              <p className="mt-1 text-gris">{tramo.texto}</p>
            </div>
          </li>
        );
      })}

      <li className="relative flex gap-5 md:flex-col">
        {/* Cola punteada: el mantenimiento sigue */}
        <span
          className="absolute left-[15px] top-8 h-8 border-l-2 border-dashed border-linea md:left-8 md:top-[15px] md:h-0 md:w-16 md:border-l-0 md:border-t-2"
          aria-hidden="true"
        />
        <span
          className="relative flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-verde bg-white text-verde ring-4 ring-white"
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" className="size-4 rotate-90 md:rotate-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
        <div className="md:max-w-56">
          <h3 className="text-xl md:text-2xl">Mantenimiento</h3>
          <p className="mt-1 text-gris">{kit.mantenimiento}</p>
        </div>
      </li>
    </ol>
  );
}
