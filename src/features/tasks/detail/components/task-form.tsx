/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { create } from "zustand";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TaskType from "../../models/taskType";
import { useNavigate } from "@tanstack/react-router";

// Define state shape
interface TaskState {
  task: TaskType | null;
  setTask: (task: TaskType) => void;
}

// Zustand store
const useStore = create<TaskState>((set) => ({
  task: null,
  setTask: (task) => set({ task }),
}));

// Form schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title debe tener al menos 3 caracteres.",
  }),
});

// Form component
const TaskForm = (task: TaskType) => {
  const { setTask } = useStore();
  useEffect(() => {
    if (task) {
      setTask(task);
    }
  }, [task, setTask]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) =>
    console.log(data);

  const navigate = useNavigate();

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create task</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Insert title..." {...field} />
                    </FormControl>
                    <FormDescription>Task title.</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/tasks" })}
            >
              Cancel
            </Button>
            <Button type="submit">Send</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
    <DevTool control={form.control} />
    </>
  );
};

export default TaskForm;
