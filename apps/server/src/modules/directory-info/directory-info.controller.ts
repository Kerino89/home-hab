import { parse } from "node:path";
import { contentType } from "mime-types";
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  StreamableFile,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { DirectoryInfoService } from "./directory-info.service";
import { DirectoryDto } from "./dto/directory.dto";
import type { Response } from "express";

@Controller("directory-info")
export class DirectoryInfoController {
  constructor(private readonly _directoryInfoService: DirectoryInfoService) {}

  @Post("read-dir")
  @HttpCode(HttpStatus.OK)
  public getDirsAndFiles(@Body() directoryDto: DirectoryDto) {
    return this._directoryInfoService.readDir(directoryDto);
  }

  @Post("read-file")
  @HttpCode(HttpStatus.OK)
  public getFile(
    @Body() directoryDto: DirectoryDto,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    if (!directoryDto.path) {
      throw new HttpException("The path to the file is not specified", HttpStatus.NOT_FOUND);
    }

    const file = this._directoryInfoService.readFile(directoryDto.path);
    const { name, ext } = parse(directoryDto.path);

    res.set({
      "Content-Type": contentType(ext),
      "Content-Disposition": `attachment; filename="${name}${ext}"`,
    });

    return new StreamableFile(file);
  }
}
