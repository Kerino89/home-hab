import { normalize, sep, resolve } from "node:path";
import { existsSync, mkdirSync } from "node:fs";

export function validateNamespacePath(rootPath: string, path: string) {
  const normalizeRootPath = normalize(`${rootPath}${sep}`);
  const normalizePath = normalize(`${path}${sep}`);

  return normalizePath.startsWith(normalizeRootPath);
}

export function resolveTemp(...args: Array<string>) {
  const path = resolve(process.cwd(), "..", "..", ".temp", ...args);

  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }

  return path;
}
