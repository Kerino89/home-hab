import { type INestApplication, Injectable } from "@nestjs/common";
import { z } from "zod";
import { TRPCService } from "./trpc.service";
import * as trpcExpress from "@trpc/server/adapters/express";

@Injectable()
export class TRPCRouter {
  constructor(private readonly trpc: TRPCService) {}

  public appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        const { name } = input;

        return {
          greeting: `Hello ${name ? name : `Bilbo`}`,
        };
      }),
  });

  public async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TRPCRouter["appRouter"];
