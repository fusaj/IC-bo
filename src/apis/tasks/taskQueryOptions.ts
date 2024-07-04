import { fetchTask } from "@/features/tasks/services/tasks-service";
import { queryOptions } from "@tanstack/react-query";

export const taskQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["tasks", { id }],
    queryFn: () => fetchTask(id),
  });
