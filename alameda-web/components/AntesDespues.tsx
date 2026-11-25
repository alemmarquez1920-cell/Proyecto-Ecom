"use client";

import { useState, type ReactNode } from "react";

type Props = { antes: ReactNode; despues: ReactNode };

/** Deslizador antes / después. Se maneja con el dedo, el mouse o las flechas del teclado. */
export function AntesDespues({ antes, despues }: Props) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-3xl border-2 border-azul">
      <div className="absolute inset-0">{despues}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {antes}
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-azul px-3 py-1 text-xs font-semibold text-fondo">
        Antes
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-rosa px-3 py-1 text-xs font-semibold text-azul">
        Después
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-fondo"
        style={{ left: `${pos}%` }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-azul bg-fondo">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Mover para comparar antes y después"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
