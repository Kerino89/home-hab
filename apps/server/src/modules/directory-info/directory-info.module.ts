import { Module } from "@nestjs/common";
import { DirectoryInfoService } from "./directory-info.service";
import { DirectoryInfoController } from "./directory-info.controller";

@Module({
  imports: [],
  controllers: [DirectoryInfoController],
  providers: [DirectoryInfoService],
  exports: [DirectoryInfoService],
})
export class DirectoryInfoModule {}
