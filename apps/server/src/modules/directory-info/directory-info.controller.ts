import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { DirectoryInfoService } from "./directory-info.service";
import { DirectoryDto } from "./dto/directory.dto";

@Controller("directory-info")
export class DirectoryInfoController {
  constructor(private readonly _directoryInfoService: DirectoryInfoService) {}

  @Post("read-dir")
  @HttpCode(HttpStatus.OK)
  public getDirsAndFiles(@Body() directoryDto: DirectoryDto) {
    return this._directoryInfoService.readDir(directoryDto);
  }
}
