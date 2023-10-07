import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@server/modules/trpc";
import { authControl } from "@client/services/auth";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:5000/trpc",
      async headers() {
        return {
          Authorization: authControl.getAuthCookie(),
        };
      },
    }),
  ],
});
