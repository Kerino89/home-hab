import { resolve, sep, normalize, join, parse } from "node:path";
import { readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { Inject, Injectable } from "@nestjs/common";
import { DirAndFileStatModel } from "./models/dir-and-file-stat.model";
import { DirectoryDto } from "./dto/directory.dto";

import { storageConfig } from "@server/config";
import type { ConfigType } from "@nestjs/config";

@Injectable()
export class DirectoryInfoService {
  constructor(@Inject(storageConfig.KEY) private readonly _storageConfig: ConfigType<typeof storageConfig>) {}

  public async readDir({ path = "" }: DirectoryDto) {
    const newPath = this.generatePath(path);

    if (existsSync(newPath)) {
      const dirList = await readdir(this.generatePath(path));

      const result = await Promise.allSettled(
        dirList.map((dir) => this.createDirAndFileStat(join(path, dir))),
      );

      return result
        .filter(({ status }) => status === "fulfilled")
        .map((p) => p.status === "fulfilled" && p.value);
    }
  }

  private generatePath(path: string) {
    const pathArr = normalize(path)
      .split(sep)
      .filter((path) => !path.includes(".."));

    return resolve(this._storageConfig.pathStorageFiles, ...pathArr);
  }

  private async createDirAndFileStat(path: string) {
    const dirStat = await stat(this.generatePath(path));
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
