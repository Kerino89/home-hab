import { resolve } from "node:path";
import { validateNamespacePath } from "@server/helpers/path";
import { existsSync, createReadStream } from "node:fs";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";

import { storageConfig } from "@server/config";
import type { ConfigType } from "@nestjs/config";

@Injectable()
export class FileService {
  constructor(@Inject(storageConfig.KEY) private readonly _storageConfig: ConfigType<typeof storageConfig>) {}

  public readFile(path: string) {
    const { pathStorageFiles } = this._storageConfig;
    const newPath = resolve(pathStorageFiles, path);

    if (!validateNamespacePath(pathStorageFiles, newPath) && !existsSync(newPath)) {
      throw new HttpException("The path to the file is not specified", HttpStatus.NOT_FOUND);
    }

    return createReadStream(newPath);
  }
}
