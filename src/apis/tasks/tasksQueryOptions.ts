import { fetchTasks } from "@/features/tasks/services/tasks-service";
import { queryOptions } from "@tanstack/react-query";

export const tasksQueryOptions = queryOptions({
  queryKey: ["tasks"],
  queryFn: () => fetchTasks(),
});
