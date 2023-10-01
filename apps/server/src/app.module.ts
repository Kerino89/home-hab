import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TRPCModule } from "@server/modules/trpc";
import { FileModule } from "@server/modules/file";
import { UsersModule } from "@server/modules/users";
import { RolesModule } from "@server/modules/roles";
import { DirectoryModule } from "@server/modules/directory";

import * as config from "@server/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: Object.values(config) }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: (process.env.POSTGRES_HOST ||= "localhost"),
      port: parseInt((process.env.POSTGRES_PORT ||= "5432"), 10),
      username: (process.env.POSTGRES_USER ||= "postgres"),
      password: (process.env.POSTGRES_PASSWORD ||= "postgres"),
      database: (process.env.POSTGRES_DB ||= "postgres"),
      synchronize: true,
      autoLoadEntities: true,
    }),
    TRPCModule,
    FileModule,
    UsersModule,
    RolesModule,
    DirectoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
