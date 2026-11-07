import { existsSync } from "node:fs";
import path from "node:path";

/** Returns the public path of a generated image if it exists, else null (UI falls back to gradients). */
export function optionalImage(file: string): string | null {
  return existsSync(path.join(process.cwd(), "public", "images", file)) ? `/images/${file}` : null;
}
