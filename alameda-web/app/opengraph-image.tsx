import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { producto, precioTexto } from "@/config/producto";

export const alt = `${producto.nombre} | ${producto.marca}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Vista previa para WhatsApp e Instagram: solo texto y colores de marca, sin fotos generadas.
export default async function Image() {
  const fuente = await readFile(
    join(process.cwd(), "node_modules/@fontsource/dm-serif-display/files/dm-serif-display-latin-400-normal.woff"),
  );
  const precio = producto.precio === null ? null : precioTexto(producto.precio);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fcffff",
          color: "#09318d",
          padding: "64px 72px",
          fontFamily: "DM Serif Display",
          border: "18px solid #eed2e2",
        }}
      >
        <div style={{ fontSize: 44 }}>alameda</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1.02 }}>Ondas al despertar,</div>
          <div style={{ fontSize: 92, lineHeight: 1.02 }}>sin planchita</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 36 }}>
          <div style={{ background: "#09318d", color: "#fcffff", padding: "10px 26px", borderRadius: 999 }}>
            {producto.nombre}
          </div>
          {precio && <div>{precio}</div>}
          <div style={{ background: "#eed2e2", padding: "10px 26px", borderRadius: 999 }}>Listo para regalar</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "DM Serif Display", data: fuente, style: "normal", weight: 400 }] },
  );
}
