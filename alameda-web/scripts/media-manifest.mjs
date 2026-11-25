// Revisa qué fotos y videos reales hay en public/media (y sus subcarpetas) y lo anota en lib/media-manifest.json.
// Corre solo antes de "dev" y de "build". Si falta un archivo, la landing muestra un lugar reservado.
// Los archivos de una subcarpeta se anotan con su carpeta: "kit-depilacion/kit.jpg".
import { existsSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dir = join(root, "public", "media");

function listar(carpeta, prefijo = "") {
  return readdirSync(carpeta, { withFileTypes: true })
    .filter((e) => !e.name.startsWith("."))
    .flatMap((e) =>
      e.isDirectory() ? listar(join(carpeta, e.name), `${prefijo}${e.name}/`) : [`${prefijo}${e.name}`],
    );
}

const files = existsSync(dir) ? listar(dir) : [];
mkdirSync(join(root, "lib"), { recursive: true });
writeFileSync(join(root, "lib", "media-manifest.json"), JSON.stringify({ files }, null, 2) + "\n");
console.log(`media: ${files.length ? files.join(", ") : "sin archivos todavía"}`);
