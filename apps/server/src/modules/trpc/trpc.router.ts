import { type INestApplication, Injectable } from "@nestjs/common";
import { z } from "zod";
import { TRPCService } from "./trpc.service";
import { DirectoryInfoService } from "@server/modules/directory-info";
import * as trpcExpress from "@trpc/server/adapters/express";

import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

@Injectable()
export class TRPCRouter {
  constructor(
    private readonly _trpc: TRPCService,
    private readonly _directoryInfoService: DirectoryInfoService,
  ) {}

  public appRouter = this._trpc.router({
    readDir: this._trpc.procedure
      .input(
        z.object({
          path: z.string().optional(),
        }),
      )
      .query(({ input }) => this._directoryInfoService.readDir(input)),
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
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
