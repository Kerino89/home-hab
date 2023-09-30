import { Module } from "@nestjs/common";
import { TRPCService } from "./trpc.service";
import { TRPCRouter } from "./trpc.router";
import { DirectoryModule } from "@server/modules/directory";

@Module({
  imports: [DirectoryModule],
  controllers: [],
  providers: [TRPCService, TRPCRouter],
})
export class TRPCModule {}
