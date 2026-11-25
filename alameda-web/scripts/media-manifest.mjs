// Revisa qué fotos y videos reales hay en public/media y lo anota en lib/media-manifest.json.
// Corre solo antes de "dev" y de "build". Si falta un archivo, la landing muestra un lugar reservado.
import { existsSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dir = join(root, "public", "media");
const files = existsSync(dir) ? readdirSync(dir).filter((f) => !f.startsWith(".")) : [];
mkdirSync(join(root, "lib"), { recursive: true });
writeFileSync(join(root, "lib", "media-manifest.json"), JSON.stringify({ files }, null, 2) + "\n");
console.log(`media: ${files.length ? files.join(", ") : "sin archivos todavía"}`);
