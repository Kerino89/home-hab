"use client";

import * as React from "react";
import { HTTPError } from "ky";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const { current: queryClient } = React.useRef(
    new QueryClient({
      defaultOptions: {
        mutations: { retry: false },
        queries: {
          refetchOnWindowFocus: false,
          retry(failureCount, error) {
            if (error instanceof HTTPError && [401, 403].includes(error.response.status)) {
              return false;
            }

            return failureCount <= 2;
          },
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
