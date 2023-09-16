import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TRPCRouter } from "@server/modules/trpc";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const trpc = app.get(TRPCRouter);
  trpc.applyMiddleware(app);

  await app.listen(5000);
}

bootstrap();
