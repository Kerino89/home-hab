import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TRPCModule } from "@server/modules/trpc";
import { FileModule } from "@server/modules/file";
import { DirectoryModule } from "@server/modules/directory";

import * as config from "@server/config";

@Module({
  imports: [
    TRPCModule,
    FileModule,
    DirectoryModule,
    ConfigModule.forRoot({ isGlobal: true, load: Object.values(config) }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
