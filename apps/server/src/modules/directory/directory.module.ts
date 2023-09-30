import { Module } from "@nestjs/common";
import { DirectoryService } from "./directory.service";
import { DirectoryController } from "./directory.controller";

@Module({
  imports: [],
  controllers: [DirectoryController],
  providers: [DirectoryService],
  exports: [DirectoryService],
})
export class DirectoryModule {}
