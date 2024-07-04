import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { DataTableViewOptions } from "./data-table-view-options";
import React from "react";

import {
  DataTableFacetedFilter,
  DataTableToolbarFacetedFiltersOptions,
} from "./data-table-faceted-filter";
import { ColumnBasic } from "./data-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  facetedFilters?: DataTableToolbarFacetedFilters[];
  globalFilter: string;
  setGlobalFilter: any;
  columns: ColumnBasic<TData>[];
}

export interface DataTableToolbarFacetedFilters {
  columnName: string;
  title: string;
  options: DataTableToolbarFacetedFiltersOptions[];
}

export function DataTableToolbar<TData>({
  table,
  facetedFilters = [],
  globalFilter,
  setGlobalFilter,
  columns,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DebouncedInput
          value={globalFilter ?? ""}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
          onChange={(value) => setGlobalFilter(String(value))}
          className="h-8 w-[150px] lg:w-[250px]"
          placeholder="Buscar..."
        />
        {facetedFilters.map((facetedFilter) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div key={`${facetedFilter.columnName}-${facetedFilter.title}`}>
              {table.getColumn(facetedFilter.columnName) && (
                <DataTableFacetedFilter
                  key={`${facetedFilter.columnName}-${facetedFilter.title}`}
                  column={table.getColumn(facetedFilter.columnName)}
                  title={facetedFilter.title}
                  options={facetedFilter.options}
                />
              )}
            </div>
          );
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpiar
            <Cross2Icon className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} columns={columns} />
    </div>
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
