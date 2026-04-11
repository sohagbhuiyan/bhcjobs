// ── TanStack Query Client Provider ────────────────────────────────────────────

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create a new QueryClient per component instance to avoid shared state across tests/renders
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time: 5 minutes – avoid refetching too often
            staleTime: 5 * 60 * 1000,
            // Cache time: 10 minutes
            gcTime: 10 * 60 * 1000,
            // Retry once on failure
            retry: 1,
            // Refetch when app comes to foreground
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
