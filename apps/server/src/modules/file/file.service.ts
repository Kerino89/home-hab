import { resolve, sep, normalize } from "node:path";
import { existsSync, createReadStream } from "node:fs";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";

import { storageConfig } from "@server/config";
import type { ConfigType } from "@nestjs/config";

@Injectable()
export class FileService {
  constructor(@Inject(storageConfig.KEY) private readonly _storageConfig: ConfigType<typeof storageConfig>) {}

  public readFile(path: string) {
    const newPath = this.generatePath(path);

    if (!existsSync(newPath)) {
      throw new HttpException("The path to the file is not specified", HttpStatus.NOT_FOUND);
    }

    return createReadStream(newPath);
  }

  private generatePath(path: string) {
    const pathArr = normalize(path)
      .split(sep)
      .filter((path) => !path.includes(".."));

    return resolve(this._storageConfig.pathStorageFiles, ...pathArr);
  }
}
