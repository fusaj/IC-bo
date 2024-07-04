import PageHeader from "@/components/page-header/page-header";
import DataTable from "@/components/data-table/data-table";
import { columns } from "./components/columns";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { tasksQueryOptions } from "@/apis/tasks/tasksQueryOptions";
import data from "../tasks.json";

const TaskIndexPage = () => {
  const tasksQuery = useSuspenseQuery(tasksQueryOptions);
  let tasks = tasksQuery.data;
  tasks = data; // comment to use external api

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <PageHeader
          title="Tasks"
          subtitle="Here's a list of your tasks for this month!"
        ></PageHeader>
        <DataTable data={tasks as any} columns={columns} />
        <Link to="/tasks/$id" params={{ id: "1" }}>
          <Button size="icon" variant="outline">
            Agregar
          </Button>
        </Link>
      </div>
    </>
  );
};

export default TaskIndexPage;
