import { useSuspenseQuery } from "@tanstack/react-query";
import TaskForm from "./components/task-form";
import TaskType from "../models/taskType";
import { taskQueryOptions } from "@/apis/tasks/taskQueryOptions";
import { Route } from "@/routes/tasks.$id";

export interface TaskDetailPageProps {
  id: string;
}

const TaskDetailPage = () => {
  const id = Route.useParams().id;
  const taskQuery = useSuspenseQuery(taskQueryOptions(id));
  const task = taskQuery.data as TaskType;
  return <TaskForm {...task} />;
};

export default TaskDetailPage;
