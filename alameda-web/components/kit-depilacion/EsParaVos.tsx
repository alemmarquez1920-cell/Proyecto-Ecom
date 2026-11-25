"use client";

import { useState } from "react";

type Tono = { id: string; nombre: string; muestra: string; cuerpo: string | null; rostro: string | null };
type Vello = { id: string; nombre: string; muestra: string; sirve: boolean };
type Props = {
  tonos: Tono[];
  vellos: Vello[];
  motivoTonoNo: string;
  motivoVelloNo: string;
  reglaNivel: string;
  comprarUrl: string;
};

/**
 * Selector "¿Es para vos?": tono de piel + color de vello.
 * Los datos llegan desde config/kit-depilacion.ts (los pasa la página). No guarda nada.
 */
export function EsParaVos({ tonos, vellos, motivoTonoNo, motivoVelloNo, reglaNivel, comprarUrl }: Props) {
  const [tonoId, setTonoId] = useState<string | null>(null);
  const [velloId, setVelloId] = useState<string | null>(null);

  const tono = tonos.find((t) => t.id === tonoId);
  const vello = vellos.find((v) => v.id === velloId);

  const motivos: string[] = [];
  if (tono && tono.cuerpo === null) motivos.push(motivoTonoNo);
  if (vello && !vello.sirve) motivos.push(motivoVelloNo);

  // Con una sola respuesta que ya descarta, mostramos el "no" sin esperar la otra.
  const completo = Boolean(tono && vello);
  const estado: "falta" | "si" | "no" = motivos.length > 0 ? "no" : completo ? "si" : "falta";

  return (
    <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-start md:gap-10">
      <form className="grid gap-6" onSubmit={(e) => e.preventDefault()} aria-describedby="es-para-vos-nota">
        <Grupo
          leyenda="1. Tu tono de piel"
          nombre="tono"
          opciones={tonos}
          elegida={tonoId}
          alElegir={setTonoId}
        />
        <Grupo
          leyenda="2. El color de tu vello"
          nombre="vello"
          opciones={vellos}
          elegida={velloId}
          alElegir={setVelloId}
        />
        <p id="es-para-vos-nota" className="text-sm text-gris">
          No guardamos tus respuestas.
        </p>
      </form>

      <div
        aria-live="polite"
        className={`rounded-2xl border-2 p-6 md:sticky md:top-6 ${
          estado === "si"
            ? "border-verde bg-white"
            : estado === "no"
              ? "border-tinta bg-white"
              : "border-dashed border-linea bg-white"
        }`}
      >
        {estado === "falta" && (
          <>
            <p className="font-display text-2xl font-bold">Tu resultado</p>
            <p className="mt-2 text-gris">Elegí una opción en cada pregunta.</p>
          </>
        )}

        {estado === "si" && tono && (
          <>
            <p className="font-display text-3xl font-bold text-verde">Sí te sirve</p>
            <p className="mt-2 text-gris">Nivel sugerido para piel {tono.nombre.toLowerCase()}:</p>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-verde-suave p-4">
                <dt className="text-sm font-semibold">Cuerpo</dt>
                <dd className="font-display text-2xl font-bold">{tono.cuerpo}</dd>
              </div>
              <div className="rounded-xl bg-verde-suave p-4">
                <dt className="text-sm font-semibold">Rostro</dt>
                <dd className="font-display text-2xl font-bold">{tono.rostro}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-relaxed">
              Empezá siempre por el nivel 1, con la prueba en el brazo. {reglaNivel}
            </p>
            <a
              href={comprarUrl}
              data-comprar="es-para-vos"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-verde px-8 font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-verde-oscuro"
            >
              Comprar el kit
            </a>
          </>
        )}

        {estado === "no" && (
          <>
            <p className="font-display text-3xl font-bold">No te sirve</p>
            <ul className="mt-3 grid gap-2">
              {motivos.map((m) => (
                <li key={m} className="leading-relaxed">
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gris">Preferimos decírtelo antes de que lo compres.</p>
          </>
        )}
      </div>
    </div>
  );
}

type Opcion = { id: string; nombre: string; muestra: string };

function Grupo({
  leyenda,
  nombre,
  opciones,
  elegida,
  alElegir,
}: {
  leyenda: string;
  nombre: string;
  opciones: Opcion[];
  elegida: string | null;
  alElegir: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-lg font-semibold">{leyenda}</legend>
      <div className="grid grid-cols-2 gap-3">
        {opciones.map((o) => (
          <label
            key={o.id}
            className="group flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 border-linea bg-white px-3 py-2 transition-colors hover:border-verde has-checked:border-verde has-checked:bg-verde-suave has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-verde"
          >
            <input
              type="radio"
              name={nombre}
              value={o.id}
              checked={elegida === o.id}
              onChange={() => alElegir(o.id)}
              className="sr-only"
            />
            <span
              className="size-7 shrink-0 rounded-full border border-black/15"
              style={{ background: o.muestra }}
              aria-hidden="true"
            />
            <span className="text-[0.95rem] font-medium leading-tight">{o.nombre}</span>
            <span
              className="ml-auto size-5 shrink-0 rounded-full border-2 border-linea bg-white group-has-checked:border-[6px] group-has-checked:border-verde"
              aria-hidden="true"
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}
