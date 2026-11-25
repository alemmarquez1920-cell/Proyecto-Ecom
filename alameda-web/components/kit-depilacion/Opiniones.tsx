import { kit } from "@/config/kit-depilacion";

/**
 * Opiniones reales. Queda oculto hasta que mostrarOpiniones sea true y haya al menos 3.
 * Sin estrellas ni calificaciones inventadas.
 */
export function Opiniones() {
  if (!kit.mostrarOpiniones || kit.opiniones.length < 3) return null;
  return (
    <section aria-labelledby="t-opiniones" className="mx-auto max-w-[1200px] px-4 py-16 md:py-24" data-aparecer>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-verde">Opiniones</p>
      <h2 id="t-opiniones" className="text-[2rem] leading-[1.1] text-verde md:text-5xl">
        Lo que cuentan quienes ya lo usan
      </h2>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {kit.opiniones.map((o) => (
          <li key={o.nombre + o.texto} className="rounded-2xl border border-linea p-6">
            <blockquote className="leading-relaxed">«{o.texto}»</blockquote>
            <p className="mt-4 text-sm font-semibold">
              {o.nombre}, <span className="font-normal text-gris">{o.ciudad}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
