import { normalize, sep } from "node:path";

export function validateNamespacePath(rootPath: string, path: string) {
  const normalizeRootPath = normalize(`${rootPath}${sep}`);
  const normalizePath = normalize(path);

  return normalizePath.startsWith(normalizeRootPath);
}
