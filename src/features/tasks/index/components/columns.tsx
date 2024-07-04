import { Badge } from "@/components/ui/badge";
import DataTableRowActions from "@/components/data-table/data-table-row-actions";

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";
import { ColumnBasic } from "@/components/data-table/data-table";
import TaskType from "../../models/taskType";
import { df } from "@/lib/utils";
// import EnumStatus from "@/enums/EnumStatus";
// import EnumResponse from "@/models/enum-response";

export const columns: ColumnBasic<TaskType>[] = [
  {
    id: "select",
  },
  {
    accessorKey: "id",
    headerTitle: "Task",
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    headerTitle: "Title",
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   headerTitle: "Estado",
  //   cell: ({ row }) => {
  //     const status = EnumStatus.find(
  //       (status) =>
  //         // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  //         status.value === (row.getValue("status") as EnumResponse).value,
  //     );

  //     if (!status) {
  //       return <></>;
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 size-4 text-muted-foreground" />
  //         )}
  //         <span>{status.shortName}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   headerTitle: "Prioridad",
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority"),
  //     );

  //     if (!priority) {
  //       return <></>;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 size-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: "userId",
    headerTitle: "User",
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "date",
    headerTitle: "Date",
    enableSorting: true,
    enableHiding: true,
    cell: ({ row }) => {
      return <Badge variant="outline">{df(row.getValue("date"))}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      row.original.label;

      const rows = [
        {
          text: "Ver Detalle",
          to: "$id",
          id: row.original.id,
        },
        {
          text: "Ver Detalle",
          to: "$id",
          id: row.original.id,
        },
      ];

      return <DataTableRowActions rows={rows} />;
    },
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];
