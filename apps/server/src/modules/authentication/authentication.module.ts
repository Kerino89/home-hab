import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "@server/modules/users";
import { TokenService } from "./services/token.service";
import { AuthenticationGuard } from "./authentication.guard";
import { AuthenticationService } from "./services/authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { APP_GUARD } from "@nestjs/core";

@Module({
  providers: [
    AuthenticationService,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: (process.env.JWT_SECRET_KEY ||= "SECRET"),
      signOptions: { expiresIn: (process.env.JWT_ACCESS_TOKEN_LIFETIME ||= "15m") },
    }),
  ],
})
export class AuthenticationModule {}
