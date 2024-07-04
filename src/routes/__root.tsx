import { createRootRouteWithContext } from "@tanstack/react-router";

import Layout from "../features/layout/page";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: Layout,
});
