import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TRPCModule } from "@server/modules/trpc";
import { FileModule } from "@server/modules/file";
import { DirectoryInfoModule } from "@server/modules/directory-info";

import * as config from "@server/config";

@Module({
  imports: [
    TRPCModule,
    FileModule,
    DirectoryInfoModule,
    ConfigModule.forRoot({ isGlobal: true, load: Object.values(config) }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
