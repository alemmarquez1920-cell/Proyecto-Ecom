import { producto, media, precioTexto } from "@/config/producto";
import { hayMedia, rutaMedia } from "@/lib/media";
import { BotonComprar } from "@/components/BotonComprar";
import { Foto } from "@/components/Foto";
import { AntesDespues } from "@/components/AntesDespues";
import { Aparecer } from "@/components/Aparecer";
import { BarraCompra } from "@/components/BarraCompra";

const precio = precioTexto(producto.precio);
const precioAnterior = producto.precioAnterior ? precioTexto(producto.precioAnterior) : null;

function Titulo({ chico, children, id }: { chico: string; children: React.ReactNode; id?: string }) {
  return (
    <div className="mb-8 md:mb-10">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]">{chico}</p>
      <h2 id={id} className="text-[2.1rem] leading-[1.08] md:text-5xl">
        {children}
      </h2>
    </div>
  );
}

const iconos = {
  calor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-7" aria-hidden="true">
      <path d="M12 3c1 3-2 4.5-2 7.5a2 2 0 0 0 4 0c0-1 .5-1.8 1-2.5 1.5 2 2.5 3.5 2.5 6a5.5 5.5 0 0 1-11 0C6.5 9.5 10 7 12 3z" />
      <path d="M4 4l16 16" />
    </svg>
  ),
  tiempo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-7" aria-hidden="true">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2.5M9 2h6" />
    </svg>
  ),
  frizz: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-7" aria-hidden="true">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  ),
  caja: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-7" aria-hidden="true">
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M3 12h18M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zm0 0c2-4 6-4 6-1.5S15 8 12 8z" />
    </svg>
  ),
  tarjeta: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-7" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 10h10M7 14h6" />
    </svg>
  ),
  cambio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-7" aria-hidden="true">
      <path d="M4 9h13l-3-3M20 15H7l3 3" />
    </svg>
  ),
};

export default function Pagina() {
  const hayVideo = hayMedia(media.hero);
  const hayKit = hayMedia(media.kit);

  return (
    <>
      {/* 1. Barra fija arriba */}
      <div className="sticky top-0 z-50 bg-azul text-fondo">
        <p className="mx-auto max-w-6xl px-4 py-2 text-center text-[0.78rem] font-medium tracking-wide">
          {producto.barraSuperior.join(" · ")}
        </p>
      </div>

      <main id="comprar">
        {/* 2. Portada */}
        <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-14 pt-6 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-14 md:pb-24 md:pt-12">
          <div>
            <p className="font-titulo text-2xl">alameda</p>
            <h1 className="mt-6 text-[2.75rem] leading-[1.02] md:text-7xl">{producto.portada.titulo}</h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed">{producto.portada.subtitulo}</p>

            <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-titulo text-4xl">{precio}</span>
              {precioAnterior && <s className="text-lg">{precioAnterior}</s>}
              <span className="text-sm">{producto.nombre}</span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BotonComprar id="comprar-portada" className="w-full sm:w-auto" />
              <a href="#incluye" className="text-center text-sm font-semibold underline underline-offset-4 sm:ml-3">
                Ver qué trae
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
              <li className="rounded-full bg-rosa px-3 py-1.5">Sin calor</li>
              <li className="rounded-full bg-rosa px-3 py-1.5">Listo para regalar</li>
              <li className="rounded-full bg-rosa px-3 py-1.5">Garantía {producto.garantiaMeses} meses</li>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-sm md:max-w-md">
            <div className="relative aspect-[9/16] max-h-[78vh] w-full overflow-hidden rounded-[2rem] border-2 border-azul bg-rosa">
              {hayVideo ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={hayKit ? rutaMedia(media.kit) : undefined}
                  aria-label="Video: cómo quedan las ondas al soltar el ondulador"
                >
                  <source src={rutaMedia(media.hero)} type="video/mp4" />
                </video>
              ) : (
                <Foto
                  archivo={media.hero}
                  alt=""
                  pedido="Video vertical: ella soltando las ondas a la mañana."
                  sizes="(min-width: 768px) 448px, 90vw"
                />
              )}
            </div>
            <div className="absolute -right-2 -top-4 flex size-28 rotate-[8deg] flex-col items-center justify-center rounded-full border-2 border-azul bg-rosa text-center md:-right-6 md:size-32">
              {iconos.caja}
              <span className="mt-1 px-3 text-xs font-semibold leading-tight">{producto.portada.sello}</span>
            </div>
          </div>
        </section>

        {/* 3. El problema */}
        <section aria-labelledby="t-problema" className="bg-rosa">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24" data-aparecer>
            <Titulo chico="El problema" id="t-problema">
              Ondas todos los días, sin pagarlo con el pelo
            </Titulo>
            <div className="grid gap-4 md:grid-cols-3">
              {producto.problema.map((p, i) => (
                <article key={p.titulo} className="flex gap-4 rounded-3xl bg-fondo p-5 md:block md:p-6">
                  <span className="shrink-0">{[iconos.calor, iconos.tiempo, iconos.frizz][i]}</span>
                  <div>
                    <h3 className="text-2xl md:mt-4">{p.titulo}</h3>
                    <p className="mt-1 leading-relaxed md:mt-2">{p.texto}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Cómo se usa */}
        <section aria-labelledby="t-pasos" className="mx-auto max-w-6xl px-4 py-16 md:py-24" data-aparecer>
          <Titulo chico="Cómo se usa" id="t-pasos">
            Tres pasos, y el último es dormir
          </Titulo>
          <ol className="grid gap-8 md:grid-cols-3">
            {producto.pasos.map((p, i) => (
              <li key={p.titulo}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-azul md:aspect-[4/5]">
                  <Foto archivo={p.foto} alt={p.titulo} pedido={p.texto} sizes="(min-width: 768px) 33vw, 92vw" />
                  <span className="absolute left-3 top-3 flex size-10 items-center justify-center rounded-full bg-azul font-titulo text-xl text-fondo">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl">{p.titulo}</h3>
                <p className="mt-1 leading-relaxed">{p.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 5. Antes y después */}
        <section aria-labelledby="t-antes" className="bg-azul text-fondo">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center md:py-24" data-aparecer>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]">Antes y después</p>
              <h2 id="t-antes" className="text-[2.1rem] leading-[1.08] md:text-5xl">
                La misma persona, la noche anterior y a la mañana
              </h2>
              <p className="mt-4 max-w-md leading-relaxed">
                Deslizá para comparar. Fotos reales.
              </p>
            </div>
            <AntesDespues
              antes={
                <Foto cartelArriba archivo={media.antes} alt="Pelo antes de usar el kit" pedido="Pelo lacio, antes de enrollar." sizes="(min-width: 768px) 50vw, 92vw" />
              }
              despues={
                <Foto cartelArriba archivo={media.despues} alt="Pelo con ondas después de soltar el ondulador" pedido="Mismas luz y ángulo, a la mañana." sizes="(min-width: 768px) 50vw, 92vw" />
              }
            />
          </div>
        </section>

        {/* 6. Qué incluye */}
        <section id="incluye" aria-labelledby="t-incluye" className="mx-auto max-w-6xl px-4 py-16 md:py-24" data-aparecer>
          <Titulo chico="Qué incluye" id="t-incluye">
            Cinco piezas, todo lo que se usa en una noche
          </Titulo>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-azul">
              <Foto archivo={media.kit} alt={`${producto.nombre} con sus cinco piezas`} pedido="El kit completo, de arriba, fondo claro." sizes="(min-width: 768px) 50vw, 92vw" />
              {hayKit &&
                producto.incluye.map((pieza, i) => (
                  <span
                    key={pieza.pieza}
                    className="absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-fondo bg-azul text-sm font-semibold text-fondo"
                    style={{ left: `${pieza.x}%`, top: `${pieza.y}%` }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                ))}
            </div>
            <ol className="divide-y-2 divide-rosa">
              {producto.incluye.map((pieza, i) => (
                <li key={pieza.pieza} className="flex gap-4 py-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-azul text-sm font-semibold text-fondo">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-texto text-lg font-semibold">{pieza.pieza}</h3>
                    <p>{pieza.detalle}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7. Comparación */}
        <section aria-labelledby="t-compara" className="bg-rosa">
          <div className="mx-auto max-w-4xl px-4 py-16 md:py-24" data-aparecer>
            <Titulo chico="Compará antes de elegir" id="t-compara">
              Kit, buclera o peluquería
            </Titulo>
            <div className="overflow-hidden rounded-3xl border-2 border-azul bg-fondo">
              <table className="w-full table-fixed border-collapse text-left text-sm md:text-base">
                <caption className="sr-only">Comparación entre el {producto.nombre}, la buclera y la peluquería</caption>
                <thead>
                  <tr>
                    {producto.comparacion.columnas.map((c, i) => (
                      <th
                        key={c}
                        scope="col"
                        className={`p-3 align-bottom font-semibold md:p-4 ${i === 0 ? "bg-azul text-fondo" : ""}`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                {producto.comparacion.filas.map((fila) => (
                  <tbody key={fila.dato} className="border-t-2 border-rosa">
                    <tr>
                      <th scope="rowgroup" colSpan={3} className="px-3 pt-3 text-xs font-semibold uppercase tracking-[0.14em] md:px-4">
                        {fila.dato}
                      </th>
                    </tr>
                    <tr>
                      {fila.valores.map((v, i) => (
                        <td key={i} className={`p-3 align-top md:p-4 ${i === 0 ? "font-semibold" : ""}`}>
                          {v.replace("PRECIO", precio)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            <p className="mt-4 text-sm">Lo que dice [completar] lo medimos y lo cargamos con datos reales.</p>
          </div>
        </section>

        {/* 8. Para regalar */}
        <section aria-labelledby="t-regalo" className="mx-auto max-w-6xl px-4 py-16 md:py-24" data-aparecer>
          <Titulo chico="Para regalar" id="t-regalo">
            Un regalo que se usa todas las noches
          </Titulo>
          <div className="grid gap-4 md:grid-cols-3">
            {producto.regalo.map((r, i) => (
              <article key={r.titulo} className="flex gap-4 rounded-3xl border-2 border-azul p-5 md:block md:p-6">
                <span className="shrink-0">{[iconos.caja, iconos.tarjeta, iconos.cambio][i]}</span>
                <div>
                  <h3 className="text-2xl md:mt-4">{r.titulo}</h3>
                  <p className="mt-1 leading-relaxed md:mt-2">{r.texto}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 9. Garantía */}
        <section aria-labelledby="t-garantia" className="bg-azul text-fondo">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1fr_1.2fr] md:items-center md:py-24" data-aparecer>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]">Garantía Alameda</p>
              <h2 id="t-garantia" className="text-[2.1rem] leading-[1.08] md:text-5xl">
                No lo fabricamos. Lo elegimos, lo probamos y respondemos por él.
              </h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              <li className="rounded-3xl bg-fondo p-6 text-azul">
                <p className="font-titulo text-5xl">{producto.garantiaMeses}</p>
                <p className="mt-1 font-semibold">meses de garantía</p>
                <p className="mt-2 text-sm">Si una pieza falla, te la cambiamos.</p>
              </li>
              <li className="rounded-3xl bg-fondo p-6 text-azul">
                <p className="font-titulo text-5xl">10</p>
                <p className="mt-1 font-semibold">días para devolverlo</p>
                <p className="mt-2 text-sm">Por ley, desde que lo recibís.</p>
              </li>
              <li className="rounded-3xl bg-fondo p-6 text-azul">
                <p className="font-titulo text-4xl leading-[1.2]">Soporte</p>
                <p className="mt-1 font-semibold">antes y después de comprar</p>
                <p className="mt-2 text-sm">{producto.contacto}</p>
              </li>
            </ul>
          </div>
        </section>

        {/* 10. Preguntas frecuentes */}
        <section aria-labelledby="t-faq" className="mx-auto max-w-3xl px-4 py-16 md:py-24" data-aparecer>
          <Titulo chico="Preguntas frecuentes" id="t-faq">
            Antes de comprar
          </Titulo>
          <div className="divide-y-2 divide-rosa border-y-2 border-rosa">
            {producto.preguntas.map((q) => (
              <details key={q.p} className="group">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-lg font-semibold">
                  {q.p}
                  <span className="text-2xl leading-none transition-transform duration-200 group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="pb-5 leading-relaxed">{q.r}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 11. Cierre */}
        <section aria-labelledby="t-cierre" className="bg-rosa">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center md:py-24" data-aparecer>
            <h2 id="t-cierre" className="text-[2.4rem] leading-[1.05] md:text-6xl">
              Esta noche lo enrollás. Mañana lo soltás.
            </h2>
            <p className="mt-5 font-titulo text-4xl">{precio}</p>
            <p className="mt-2 text-sm">{producto.barraSuperior.join(" · ")}</p>
            <BotonComprar className="mt-7 w-full sm:w-auto" texto={`Comprar el ${producto.nombre}`} />
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-rosa pb-24 md:pb-0">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            <span className="font-titulo text-xl">alameda</span> · Seleccionamos, probamos y garantizamos.
          </p>
          <a href={producto.arrepentimientoUrl || "#"} className="font-semibold underline underline-offset-4">
            Botón de arrepentimiento
          </a>
        </div>
      </footer>

      <BarraCompra />
      <Aparecer />
    </>
  );
}
