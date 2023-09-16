import { Module } from "@nestjs/common";
import { TRPCModule } from "@server/modules/trpc";

@Module({
  imports: [TRPCModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
