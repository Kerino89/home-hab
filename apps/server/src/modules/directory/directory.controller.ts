import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { DirectoryService } from "./directory.service";
import { DirectoryDto } from "./dto/directory.dto";

@Controller("api/directory")
export class DirectoryController {
  constructor(private readonly _directoryService: DirectoryService) {}

  @Post("read")
  @HttpCode(HttpStatus.OK)
  public getDirsAndFiles(@Body() directoryDto: DirectoryDto) {
    return this._directoryService.readDir(directoryDto);
  }
}
