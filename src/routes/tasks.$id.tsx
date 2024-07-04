import { taskQueryOptions } from "@/apis/tasks/taskQueryOptions";
import TaskDetailPage from "@/features/tasks/detail/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/$id")({
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.ensureQueryData(taskQueryOptions(id)),
  component: TaskDetailPage,
});
