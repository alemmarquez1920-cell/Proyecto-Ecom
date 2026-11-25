import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { kit, mediaKit, archivoKit, precioTexto } from "@/config/kit-depilacion";
import { hayMedia } from "@/lib/media";

export const alt = `${kit.nombre} | ${kit.marca}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Vista previa para WhatsApp e Instagram. Si está kit.jpg (foto real), va a la derecha. Nada generado con IA.
export default async function Image() {
  const fuentes = join(process.cwd(), "node_modules/@fontsource/space-grotesk/files");
  const [titulo, texto] = await Promise.all([
    readFile(join(fuentes, "space-grotesk-latin-700-normal.woff")),
    readFile(join(fuentes, "space-grotesk-latin-600-normal.woff")),
  ]);

  const archivoFoto = archivoKit(mediaKit.kit);
  const foto = hayMedia(archivoFoto)
    ? `data:image/jpeg;base64,${(await readFile(join(process.cwd(), "public/media", archivoFoto))).toString("base64")}`
    : null;
  const precio = kit.precio === null ? null : precioTexto(kit.precio);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFFFFF", color: "#1A1D1B" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 64px 56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 40, color: "#1E5B46", fontFamily: "SG700" }}>
            <svg width="33" height="40" viewBox="0 0 18 22">
              <path d="M9 1 C14 6 16 10 16 14 A7 7 0 0 1 2 14 C2 10 4 6 9 1 Z" fill="#1E5B46" />
              <path d="M9 8 V19" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            alameda
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "SG700", fontSize: foto ? 68 : 84, lineHeight: 1.04, letterSpacing: -2 }}>
            <div>Depilate en casa,</div>
            <div>a tu ritmo</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, fontFamily: "SG600" }}>
            <div style={{ fontSize: 28, color: "#454D48" }}>Depiladora IPL · Depiladora facial · Rodillo de hielo</div>
            <div style={{ display: "flex", gap: 16, fontSize: 28 }}>
              {precio && (
                <div style={{ background: "#1E5B46", color: "#FFFFFF", padding: "10px 24px", borderRadius: 12 }}>{precio}</div>
              )}
              <div style={{ background: "#EAF3EE", padding: "10px 24px", borderRadius: 12 }}>Envío gratis desde $60.000</div>
            </div>
          </div>
        </div>
        {foto ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img src={foto} width={480} height={630} style={{ objectFit: "cover" }} />
        ) : (
          <div style={{ width: 24, background: "#1E5B46" }} />
        )}
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "SG700", data: titulo, style: "normal", weight: 700 },
        { name: "SG600", data: texto, style: "normal", weight: 600 },
      ],
    },
  );
}
