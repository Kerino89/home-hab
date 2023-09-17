import { registerAs } from "@nestjs/config";

export default registerAs("storage", () => ({
  pathStorageFiles: process.env.PATH_STORAGE_FILES || "G:",
}));
