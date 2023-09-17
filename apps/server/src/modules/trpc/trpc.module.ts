import { Module } from "@nestjs/common";
import { TRPCService } from "./trpc.service";
import { TRPCRouter } from "./trpc.router";
import { DirectoryInfoModule } from "@server/modules/directory-info";

@Module({
  imports: [DirectoryInfoModule],
  controllers: [],
  providers: [TRPCService, TRPCRouter],
})
export class TRPCModule {}
