import { resolve, join, parse } from "node:path";
import { readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { validateNamespacePath } from "@server/helpers/path";
import { Inject, Injectable } from "@nestjs/common";
import { DirAndFileStatModel } from "./models/dir-and-file-stat.model";
import { DirectoryDto } from "./dto/directory.dto";

import { storageConfig } from "@server/config";
import type { ConfigType } from "@nestjs/config";

@Injectable()
export class DirectoryService {
  constructor(@Inject(storageConfig.KEY) private readonly _storageConfig: ConfigType<typeof storageConfig>) {}

  public async readDir({ path = "" }: DirectoryDto) {
    const { pathStorageFiles } = this._storageConfig;
    const newPath = resolve(pathStorageFiles, path);

    if (validateNamespacePath(pathStorageFiles, newPath) && existsSync(newPath)) {
      const dirList = await readdir(newPath);

      const result = await Promise.allSettled(
        dirList.map((dir) => this.createDirAndFileStat(join(path, dir))),
      );

      return result.reduce((arr, p) => {
        if (p.status === "fulfilled") arr.push(p.value);

        return arr;
      }, [] as Array<DirAndFileStatModel>);
    }
  }

  private async createDirAndFileStat(path: string) {
    const newPath = resolve(this._storageConfig.pathStorageFiles, path);
    const dirStat = await stat(newPath);
    const { name, ext } = parse(path);

    return new DirAndFileStatModel({
      ext: ext || null,
      name,
      path,
      isFile: dirStat.isFile(),
      size: dirStat.size,
      createDate: dirStat.birthtime,
      openDate: dirStat.atime,
      updateDate: dirStat.ctime,
    });
  }
}
