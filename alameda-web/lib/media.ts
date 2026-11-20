import manifest from "./media-manifest.json";

const files = new Set<string>(manifest.files);

/** true si el archivo real ya está en /public/media */
export function hayMedia(nombre: string) {
  return files.has(nombre);
}

export function rutaMedia(nombre: string) {
  return `/media/${nombre}`;
}
