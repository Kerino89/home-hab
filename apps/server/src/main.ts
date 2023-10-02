import { NestFactory } from "@nestjs/core";
import { WinstonModule, utilities as nestWinstonUtilities } from "nest-winston";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { TRPCRouter } from "@server/modules/trpc";

import * as winston from "winston";
import cookieParser from "cookie-parser";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp({ format: "DD.MM.YYYY HH:mm:ss" }),
        winston.format.printf(({ level, message, timestamp, context }) => {
          return `${timestamp} - [${context}]\t${level}: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.File({
          filename: "error.log",
          level: "error",
          dirname: "logs",
        }),
        new winston.transports.File({
          filename: "info.log",
          level: "debug",
          dirname: "logs",
        }),
        new winston.transports.Console({
          format: winston.format.combine(winston.format.timestamp(), nestWinstonUtilities.format.nestLike()),
        }),
      ],
    }),
  });

  const trpc = app.get(TRPCRouter);

  app.use(helmet());
  app.use(cookieParser());

  app.enableCors();

  trpc.applyMiddleware(app);

  const config = new DocumentBuilder().setVersion("1.0").build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(parseInt((process.env.API_SERVER_PORT ||= "5000"), 10));
}

bootstrap();
