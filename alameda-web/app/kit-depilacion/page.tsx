import type { Metadata } from "next";
import Image from "next/image";
import {
  kit,
  mediaKit,
  archivoKit,
  precioTexto,
  precioTransferencia,
} from "@/config/kit-depilacion";
import { hayMedia, rutaMedia } from "@/lib/media";
import { BotonComprar } from "@/components/BotonComprar";
import { BarraCompra } from "@/components/BarraCompra";
import { Foto } from "@/components/Foto";
import { Aparecer } from "@/components/Aparecer";
import { Logo } from "@/components/kit-depilacion/Logo";
import { EsParaVos } from "@/components/kit-depilacion/EsParaVos";
import { VideoPortada } from "@/components/kit-depilacion/VideoPortada";
import { Calendario } from "@/components/kit-depilacion/Calendario";
import { Opiniones } from "@/components/kit-depilacion/Opiniones";
import { AvisoDesarrollo } from "@/components/kit-depilacion/AvisoDesarrollo";
import { EnlacesCompra } from "@/components/kit-depilacion/EnlacesCompra";
import { PixelMeta } from "@/components/kit-depilacion/PixelMeta";

const sitio =
  kit.sitioUrl ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(sitio),
  title: kit.seo.titulo,
  description: kit.seo.descripcion,
  alternates: { canonical: "/kit-depilacion" },
  openGraph: {
    title: kit.seo.titulo,
    description: kit.seo.descripcion,
    url: "/kit-depilacion",
    siteName: kit.marca,
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: kit.seo.titulo,
    description: kit.seo.descripcion,
  },
};

const precio = precioTexto(kit.precio);
const precioTransf = precioTexto(precioTransferencia());
const precioAnterior = kit.precioAnterior ? precioTexto(kit.precioAnterior) : null;
const comprarUrl = kit.comprarUrl || "#comprar";
const contenedor = "mx-auto max-w-[1200px] px-4 md:px-8";

function Titulo({ chico, children, id }: { chico: string; children: React.ReactNode; id: string }) {
  return (
    <div className="mb-8 md:mb-12">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-gris">{chico}</p>
      <h2 id={id} className="max-w-3xl text-[2rem] leading-[1.1] text-verde md:text-5xl">
        {children}
      </h2>
    </div>
  );
}

function Precio() {
  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-3">
        <span className="font-display text-[2.5rem] font-bold leading-none">{precio}</span>
        {precioAnterior && (
          <s className="text-lg text-gris">
            <span className="sr-only">Precio anterior: </span>
            {precioAnterior}
          </s>
        )}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-gris">
        Precio final. <b className="font-semibold text-tinta">{precioTransf}</b> por transferencia (
        {kit.descuentoTransferencia}% OFF). Cuotas con Mercado Pago.
      </p>
    </div>
  );
}

function jsonLd() {
  const datos: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: kit.nombre,
    brand: { "@type": "Brand", name: kit.marca },
    description: kit.seo.descripcion,
  };
  if (hayMedia(archivoKit(mediaKit.kit))) datos.image = [`${sitio}${rutaMedia(archivoKit(mediaKit.kit))}`];
  // Sin precio no hay oferta válida para Google. Sin calificaciones hasta tener opiniones reales.
  if (kit.precio !== null) {
    datos.offers = {
      "@type": "Offer",
      price: kit.precio,
      priceCurrency: "ARS",
      availability: `https://schema.org/${kit.disponibilidad}`,
      url: `${sitio}/kit-depilacion`,
    };
  }
  return JSON.stringify(datos).replace(/</g, "\\u003c");
}

export default function KitDepilacion() {
  const hayVideo = hayMedia(archivoKit(mediaKit.hero));
  const hayPoster = hayMedia(archivoKit(mediaKit.heroPoster));
  const hayKit = hayMedia(archivoKit(mediaKit.kit));
  const hayQr = hayMedia(archivoKit(kit.dataFiscalImagen));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      <AvisoDesarrollo />

      {/* 1. Barra superior */}
      <div className="bg-verde text-white">
        <ul className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-x-4 gap-y-0.5 px-4 py-2 text-center text-xs font-medium sm:text-[0.8125rem] md:gap-x-3 md:px-8">
          {kit.barraSuperior.map((t, i) => (
            <li key={t} className="flex gap-3">
              {i > 0 && (
                <span className="hidden md:inline" aria-hidden="true">
                  ·
                </span>
              )}
              {t}
            </li>
          ))}
        </ul>
      </div>

      <main id="comprar">
        {/* 2. Portada */}
        <section className={`${contenedor} grid gap-10 pb-16 pt-6 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-16 md:pb-24 md:pt-10`}>
          <div>
            <Logo className="text-2xl" />
            <h1 className="mt-8 text-[2.5rem] leading-[1.05] md:mt-12 md:text-[3.5rem]">{kit.portada.titulo}</h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-gris">{kit.portada.subtitulo}</p>

            <div className="mt-6">
              <Precio />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <BotonComprar
                id="comprar-portada"
                variante="verde"
                href={comprarUrl}
                rastreo="portada"
                className="w-full sm:w-auto sm:px-12"
              />
              <a href="#es-para-vos" className="text-center font-semibold text-verde underline underline-offset-4 sm:ml-2">
                ¿Es para vos? Fijate acá
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2 text-sm font-medium">
              {kit.portada.sellos.map((s) => (
                <li key={s} className="rounded-lg bg-verde-suave px-3 py-2">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-verde-suave">
            {hayVideo ? (
              <VideoPortada
                video={rutaMedia(archivoKit(mediaKit.hero))}
                poster={hayPoster ? rutaMedia(archivoKit(mediaKit.heroPoster)) : null}
                alt="Video del Kit Depilación en Casa: depiladora IPL, depiladora facial y rodillo de hielo"
                sizes="(min-width: 768px) 448px, 92vw"
              />
            ) : (
              <Foto
                archivo={archivoKit(mediaKit.heroPoster)}
                alt="El Kit Depilación en Casa: depiladora IPL, depiladora facial y rodillo de hielo"
                pedido="Video vertical 4:5 (hero.mp4) y su primer cuadro (hero-poster.jpg): el kit y la depiladora en uso, luz natural."
                sizes="(min-width: 768px) 448px, 92vw"
                prioridad
              />
            )}
          </div>
        </section>

        {/* 3. ¿Es para vos? */}
        <section id="es-para-vos" aria-labelledby="t-es-para-vos" className="scroll-mt-4 bg-verde-suave">
          <div className={`${contenedor} py-16 md:py-24`} data-aparecer>
            <Titulo chico="¿Es para vos?" id="t-es-para-vos">
              Dos preguntas y sabés si te sirve
            </Titulo>
            <EsParaVos
              tonos={kit.tonos}
              vellos={kit.vellos}
              motivoTonoNo={kit.motivoTonoNo}
              motivoVelloNo={kit.motivoVelloNo}
              reglaNivel={kit.reglaNivel}
              comprarUrl={comprarUrl}
            />
          </div>
        </section>

        {/* 4. Qué trae */}
        <section id="incluye" aria-labelledby="t-incluye" className={`${contenedor} py-16 md:py-24`} data-aparecer>
          <Titulo chico="Qué trae" id="t-incluye">
            3 piezas y todo lo que hace falta para usarlas
          </Titulo>
          <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-16">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-verde-suave">
              <Foto
                archivo={archivoKit(mediaKit.kit)}
                alt={`${kit.nombre}: ${kit.incluye.map((p) => p.pieza.toLowerCase()).join(", ")}`}
                pedido="El kit completo de arriba, fondo claro, foto cuadrada."
                sizes="(min-width: 768px) 560px, 92vw"
              />
              {hayKit &&
                kit.incluye.map((pieza, i) => (
                  <span
                    key={pieza.pieza}
                    className="absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-verde text-sm font-semibold text-white"
                    style={{ left: `${pieza.x}%`, top: `${pieza.y}%` }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                ))}
            </div>
            <ol className="divide-y divide-linea border-y border-linea">
              {kit.incluye.map((pieza, i) => (
                <li key={pieza.pieza} className="flex gap-4 py-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-verde text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="titulo-texto text-lg">{pieza.pieza}</h3>
                    <p className="text-gris">{pieza.detalle}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. Cómo se usa */}
        <section aria-labelledby="t-pasos" className="bg-verde-suave">
          <div className={`${contenedor} py-16 md:py-24`} data-aparecer>
            <Titulo chico="Cómo se usa" id="t-pasos">
              La depiladora IPL, en 6 pasos
            </Titulo>

            <aside
              aria-labelledby="t-prueba"
              className="mb-10 rounded-2xl border-2 border-verde bg-white p-6 md:mb-12 md:flex md:items-start md:gap-6 md:p-8"
            >
              <span
                className="mb-3 flex size-10 shrink-0 items-center justify-center rounded-full bg-verde font-display text-xl font-bold text-white md:mb-0"
                aria-hidden="true"
              >
                !
              </span>
              <div>
                <h3 id="t-prueba" className="text-2xl">
                  {kit.pruebaPrimerUso.titulo}
                </h3>
                <p className="mt-2 max-w-3xl text-lg leading-relaxed">{kit.pruebaPrimerUso.texto}</p>
              </div>
            </aside>

            <ol className="grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {kit.pasos.map((p, i) => (
                <li key={p.titulo}>
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-white">
                    <Foto
                      archivo={archivoKit(p.foto)}
                      alt={`Paso ${i + 1}: ${p.texto}`}
                      pedido={p.texto}
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 92vw"
                    />
                    <span
                      className="absolute left-3 top-3 flex size-10 items-center justify-center rounded-full bg-verde font-display text-lg font-bold text-white"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl">
                    <span className="sr-only">Paso {i + 1}: </span>
                    {p.titulo}
                  </h3>
                  <p className="mt-1 leading-relaxed">{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. Calendario */}
        <section aria-labelledby="t-calendario" className={`${contenedor} py-16 md:py-24`} data-aparecer>
          <Titulo chico="Calendario" id="t-calendario">
            Cada cuánto se usa
          </Titulo>
          <Calendario />
          <p className="mt-10 rounded-xl bg-verde-suave px-5 py-4 text-gris md:mt-12 md:inline-block">
            <b className="font-semibold text-tinta">Cuánto dura cada sesión:</b> {kit.tiempoPorSesion}
          </p>
        </section>

        {/* 7. Las otras dos piezas */}
        <section aria-labelledby="t-piezas" className="bg-verde-suave">
          <div className={`${contenedor} py-16 md:py-24`} data-aparecer>
            <Titulo chico="Las otras dos piezas" id="t-piezas">
              Para la cara y para después
            </Titulo>
            <div className="grid gap-10 md:grid-cols-2 md:gap-8">
              {kit.otrasPiezas.map((p) => (
                <article key={p.titulo}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
                    <Foto
                      archivo={archivoKit(p.foto)}
                      alt={`${p.titulo} en uso`}
                      pedido={p.pedido}
                      sizes="(min-width: 768px) 560px, 92vw"
                    />
                  </div>
                  <h3 className="mt-4 text-2xl">{p.titulo}</h3>
                  <p className="mt-1 leading-relaxed">{p.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Comparación */}
        <section aria-labelledby="t-compara" className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24" data-aparecer>
          <Titulo chico="Compará antes de elegir" id="t-compara">
            Kit en casa, centro de estética o cera
          </Titulo>
          <div className="overflow-hidden rounded-2xl border border-linea">
            <table className="w-full table-fixed border-collapse text-left text-[0.9375rem] md:text-base">
              <caption className="sr-only">Comparación entre el kit en casa, el centro de estética y la cera</caption>
              <thead>
                <tr>
                  {kit.comparacion.columnas.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`p-3 align-bottom font-semibold md:p-4 ${i === 0 ? "bg-verde text-white" : "bg-verde-suave"}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              {kit.comparacion.filas.map((fila) => (
                <tbody key={fila.dato} className="border-t border-linea">
                  <tr>
                    <th
                      scope="rowgroup"
                      colSpan={3}
                      className="px-3 pt-3 text-xs font-semibold uppercase tracking-[0.12em] text-gris md:px-4"
                    >
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
        </section>

        {/* 9. Seguridad */}
        <section aria-labelledby="t-seguridad" className="bg-verde-suave">
          <div className={`${contenedor} grid gap-10 py-16 md:grid-cols-[1fr_1.1fr] md:items-start md:gap-16 md:py-24`} data-aparecer>
            <div>
              <Titulo chico="Seguridad" id="t-seguridad">
                Cuándo no usarla y cómo cuidarla
              </Titulo>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
                <Foto
                  archivo={archivoKit(mediaKit.iplUso)}
                  alt="Depiladora IPL en uso, con los anteojos de protección puestos"
                  pedido="Usando la depiladora IPL en la pierna o el brazo, con los anteojos puestos."
                  sizes="(min-width: 768px) 540px, 92vw"
                />
              </div>
            </div>
            <div className="grid gap-6">
              <div className="rounded-2xl bg-white p-6 md:p-8">
                <h3 className="text-2xl">No la uses</h3>
                <ul className="mt-4 grid list-disc gap-2 pl-5 leading-relaxed marker:text-verde">
                  {kit.noUsar.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-6 md:p-8">
                <h3 className="text-2xl">Cuidados</h3>
                <ul className="mt-4 grid list-disc gap-2 pl-5 leading-relaxed marker:text-verde">
                  {kit.cuidados.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Opiniones (oculto hasta tener 3 reales) */}
        <Opiniones />

        {/* 11. Garantía y cambios */}
        <section aria-labelledby="t-garantia" className={`${contenedor} py-16 md:py-24`} data-aparecer>
          <Titulo chico="Garantía y cambios" id="t-garantia">
            Si no te sirve o falla, tenés respaldo
          </Titulo>
          <ul className="grid gap-4 md:grid-cols-3">
            <li className="rounded-2xl border border-linea p-6">
              <p className="font-display text-5xl font-bold text-verde">{kit.garantiaLegalMeses}</p>
              <p className="mt-1 text-lg font-semibold">meses de garantía legal</p>
              <p className="mt-2 text-gris">Por la Ley 24.240, desde que lo recibís.</p>
            </li>
            <li className="rounded-2xl border border-linea p-6">
              <p className="font-display text-5xl font-bold text-verde">{kit.diasArrepentimiento}</p>
              <p className="mt-1 text-lg font-semibold">días corridos para arrepentirte</p>
              <p className="mt-2 text-gris">Desde que lo recibís.</p>
              <a href={kit.arrepentimientoUrl || "#"} className="mt-3 inline-block font-semibold text-verde underline underline-offset-4">
                Botón de arrepentimiento
              </a>
            </li>
            <li className="rounded-2xl border border-linea p-6">
              <p className="text-lg font-semibold">Garantía del fabricante</p>
              <p className="mt-1 text-gris">{kit.garantiaFabricante}</p>
              <p className="mt-4 text-lg font-semibold">Plazo de cambio</p>
              <p className="mt-1 text-gris">{kit.plazoCambio}</p>
              <p className="mt-4 text-lg font-semibold">Soporte por WhatsApp</p>
              <p className="mt-1 text-gris">{kit.whatsappVisible}</p>
            </li>
          </ul>
        </section>

        {/* 12. Preguntas frecuentes */}
        <section aria-labelledby="t-faq" className="bg-verde-suave">
          <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24" data-aparecer>
            <Titulo chico="Preguntas frecuentes" id="t-faq">
              Antes de comprar
            </Titulo>
            <div className="divide-y divide-linea border-y border-linea">
              {kit.preguntas.map((q) => (
                <details key={q.p} className="group">
                  <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-lg font-semibold">
                    {q.p}
                    <span
                      className="text-2xl leading-none text-verde transition-transform duration-200 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-5 leading-relaxed text-gris">{q.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 13. Cierre */}
        <section aria-labelledby="t-cierre" className={`${contenedor} grid gap-10 py-16 md:grid-cols-2 md:items-center md:gap-16 md:py-24`} data-aparecer>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-verde-suave">
            <Foto
              archivo={archivoKit(mediaKit.caja)}
              alt="La caja del Kit Depilación en Casa"
              pedido="La caja del kit, cerrada, con luz natural."
              sizes="(min-width: 768px) 560px, 92vw"
            />
          </div>
          <div>
            <h2 id="t-cierre" className="text-[2rem] leading-[1.1] text-verde md:text-5xl">
              Todo en una caja, con la guía paso a paso
            </h2>
            <p className="mt-4 text-lg text-gris">{kit.portada.subtitulo.split(".")[0]}.</p>
            <div className="mt-6">
              <Precio />
            </div>
            <BotonComprar
              variante="verde"
              href={comprarUrl}
              rastreo="cierre"
              texto="Comprar el kit"
              className="mt-6 w-full sm:w-auto sm:px-12"
            />
            <p className="mt-4 text-sm text-gris">{kit.barraSuperior.join(" · ")}</p>
          </div>
        </section>
      </main>

      {/* 14. Pie de página */}
      <footer className="bg-verde-suave pb-28 md:pb-0">
        <div className={`${contenedor} grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_auto] md:gap-16 md:py-16`}>
          <div>
            <Logo className="text-xl" />
            <h2 className="mt-4 text-lg text-verde">Quiénes somos</h2>
            <p className="mt-1 max-w-md leading-relaxed text-gris">{kit.quienesSomos}</p>
            {kit.anmatConfirmado && kit.anmatRegistro && (
              <p className="mt-3 text-sm text-gris">Registro ANMAT: {kit.anmatRegistro}</p>
            )}
          </div>

          <nav aria-label="Legales y ayuda">
            <a
              href={kit.arrepentimientoUrl || "#"}
              className="inline-flex min-h-12 items-center rounded-xl border-2 border-verde bg-white px-5 font-semibold text-verde hover:bg-verde hover:text-white"
            >
              Botón de arrepentimiento
            </a>
            <ul className="mt-4 grid gap-1">
              {[
                ["Cambios y devoluciones", kit.cambiosUrl],
                ["Términos y condiciones", kit.terminosUrl],
                ["Política de privacidad", kit.privacidadUrl],
              ].map(([texto, url]) => (
                <li key={texto}>
                  <a href={url || "#"} className="inline-flex min-h-11 items-center underline underline-offset-4">
                    {texto}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={kit.whatsapp ? `https://wa.me/${kit.whatsapp}` : "#"}
                  className="inline-flex min-h-11 items-center underline underline-offset-4"
                >
                  WhatsApp: {kit.whatsappVisible}
                </a>
              </li>
            </ul>
          </nav>

          <a href={kit.dataFiscalUrl || "#"} className="block w-20" aria-label="Data Fiscal (ARCA)">
            {hayQr ? (
              <Image
                src={rutaMedia(archivoKit(kit.dataFiscalImagen))}
                alt="Código QR de Data Fiscal"
                width={80}
                height={110}
                className="h-auto w-20"
              />
            ) : (
              <span className="flex aspect-[8/11] w-20 items-center justify-center rounded-lg border border-dashed border-gris bg-white p-1 text-center text-xs leading-tight">
                QR Data Fiscal [completar]
              </span>
            )}
          </a>
        </div>
      </footer>

      <BarraCompra
        nombre={kit.nombre}
        precio={precio}
        detalle={`${precioTransf} por transferencia`}
        href={comprarUrl}
        tema="verde"
        rastreo="barra"
      />
      <EnlacesCompra />
      <PixelMeta
        id={kit.pixelId}
        contenido={{
          content_name: kit.nombre,
          content_type: "product",
          currency: "ARS",
          ...(kit.precio !== null ? { value: kit.precio } : {}),
        }}
      />
      <Aparecer />
    </>
  );
}
