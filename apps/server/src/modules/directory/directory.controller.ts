import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DirAndFileStatModel } from "./models/dir-and-file-stat.model";
import { DirectoryService } from "./directory.service";
import { DirectoryDto } from "./dto/directory.dto";

@ApiTags("Directory")
@Controller("api/directory")
export class DirectoryController {
  constructor(private readonly _directoryService: DirectoryService) {}

  @Post("read")
  @ApiOperation({ summary: "Getting a list of files and folders" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: [DirAndFileStatModel] })
  @HttpCode(HttpStatus.OK)
  public getDirsAndFiles(@Body() directoryDto: DirectoryDto) {
    return this._directoryService.readDir(directoryDto);
  }
}
