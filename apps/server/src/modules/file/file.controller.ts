import { parse } from "node:path";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
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
import { FileService } from "./file.service";
import { FileDto } from "./dto/file.dto";
import type { Response } from "express";

@ApiTags("File")
@Controller("api/file")
export class FileController {
  constructor(private readonly _fileService: FileService) {}

  @Post("read")
  @ApiOperation({ summary: "Reading the file" })
  @HttpCode(HttpStatus.OK)
  public getFile(@Body() fileDto: FileDto, @Res({ passthrough: true }) res: Response): StreamableFile {
    if (!fileDto.path) {
      throw new HttpException("The path to the file is not specified", HttpStatus.NOT_FOUND);
    }

    const { path } = fileDto;
    const file = this._fileService.readFile(path);
    const { name, ext } = parse(path);

    res.set({
      "Content-Type": contentType(ext),
      "Content-Disposition": `attachment; filename="${name}${ext}"`,
    });

    return new StreamableFile(file);
  }
}
