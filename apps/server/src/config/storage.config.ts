import { registerAs } from "@nestjs/config";
import { resolveTemp } from "@server/helpers/path";

export default registerAs("storage", () => ({
  pathStorageFiles: process.env.PATH_STORAGE_FILES || resolveTemp("disk"),
}));
