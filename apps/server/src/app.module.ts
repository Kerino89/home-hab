import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { TRPCModule } from "@server/modules/trpc";
import { FileModule } from "@server/modules/file";
import { UsersModule } from "@server/modules/users";
import { RolesModule } from "@server/modules/roles";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import { AuthenticationModule } from "@server/modules/authentication";
import { DirectoryModule } from "@server/modules/directory";

import * as config from "@server/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: Object.values(config) }),
    ThrottlerModule.forRoot([
      {
        ttl: 5 * 60 * 1000,
        limit: 100,
      },
    ]),
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
    RedisModule.forRoot({
      closeClient: true,
      readyLog: true,
      config: {
        db: parseInt((process.env.REDIS_DB ||= "0"), 10),
        port: parseInt((process.env.REDIS_PORT ||= "6379"), 10),
        host: (process.env.REDIS_HOST ||= "localhost"),
        password: (process.env.REDIS_PASS ||= "redis"),
      },
    }),
    TRPCModule,
    FileModule,
    UsersModule,
    RolesModule,
    DirectoryModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
