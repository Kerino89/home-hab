import { resolve, sep, normalize, join, parse } from "node:path";
import { readdir, stat } from "node:fs/promises";
import { existsSync, createReadStream } from "node:fs";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
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

      return result.reduce((arr, p) => {
        if (p.status === "fulfilled") arr.push(p.value);

        return arr;
      }, [] as Array<DirAndFileStatModel>);
    }
  }

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
