import { tasksQueryOptions } from "@/apis/tasks/tasksQueryOptions";
import TaskIndexPage from "@/features/tasks/index/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(tasksQueryOptions),
  component: TaskIndexPage,
});

/*
export const Route = createFileRoute('/tasks/')({
  loaderDeps: ({ search: { offset, limit } }) => ({ offset, limit }),
  loader: ({ context:{queryClient}, deps: {offset, limit } }) =>
    queryClient.ensureQueryData(tasksQueryOptions(offset, limit)),
})
*/
