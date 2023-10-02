import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "@server/modules/users";
import { TokenService } from "./services/token.service";
import { AuthenticationService } from "./services/authentication.service";
import { AuthenticationController } from "./authentication.controller";

@Module({
  providers: [AuthenticationService, TokenService],
  controllers: [AuthenticationController],
  exports: [AuthenticationService, JwtModule],
  imports: [
    JwtModule.register({
      secret: (process.env.JWT_SECRET_KEY ||= "SECRET"),
      signOptions: { expiresIn: (process.env.JWT_ACCESS_TOKEN_LIFETIME ||= "15m") },
    }),
    UsersModule,
  ],
})
export class AuthenticationModule {}
