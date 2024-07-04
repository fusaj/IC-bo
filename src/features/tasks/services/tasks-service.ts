import { tasksClient } from "@/apis/tasks/tasksClient";

export const fetchTask = async (id: string) => {
  console.log(`Fetching task with id ${id}...`);
  const response = await tasksClient.get(`posts/${id}`);
  return await response.json();
};

export const fetchTasks = async () => {
  console.log(`Fetching tasks...`);
  const response = await tasksClient.get(`posts`);
  return await response.json();
};
