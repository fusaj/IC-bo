import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  MixerHorizontalIcon,
  EyeOpenIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { ColumnBasic } from "./data-table";
import { useState } from "react";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  columns: ColumnBasic<TData>[];
}

export function DataTableViewOptions<TData>({
  table,
  columns,
}: DataTableViewOptionsProps<TData>) {
  const [iconVisible, setIconVisible] = useState(true);

  const toggleIcon = () => {
    setIconVisible((prev) => !prev);
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.type = iconVisible ? "hidden" : "text";
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <MixerHorizontalIcon className="mr-2 size-4" />
            Alternar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Alternar columnas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide(),
            )
            .map((column) => {
              const columnBasic = columns.find((x) => x.id == column.id);
              console.log(columnBasic);
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {columnBasic != undefined || columnBasic != null
                    ? columnBasic.headerTitle
                    : column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="sm"
        className="ml-2 hidden h-8 lg:flex"
        onClick={toggleIcon}
      >
        {iconVisible ? (
          <EyeOpenIcon className="mr-2 size-4" />
        ) : (
          <EyeNoneIcon className="mr-2 size-4" />
        )}
        Filtros
      </Button>
    </>
  );
}
