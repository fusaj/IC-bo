import * as React from "react";
import {
  CellContext,
  ColumnDef,
  ColumnFiltersState,
  HeaderContext,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DataTableToolbar,
  DataTableToolbarFacetedFilters,
} from "./data-table-toolbar";
import DataTablePagination from "./data-table-pagination";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Checkbox } from "../ui/checkbox";

interface DataTableProps<TData> {
  columns: ColumnBasic<TData>[];
  data: TData[];
  toolbars?: { facetedFilters?: DataTableToolbarFacetedFilters[] };
}

export interface ColumnBasic<TData> {
  id?: string;
  accessorKey?: string;
  headerTitle?: string;
  enableSorting?: boolean;
  enableHiding?: boolean;
  cell?: ({ row }: CellContext<TData, unknown>) => JSX.Element;
  header?: ({ column }: HeaderContext<TData, unknown>) => JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterFn?: (row: Row<TData>, id: string, value: any) => any;
}

function prepareIdColumns<TData>(columns: ColumnBasic<TData>[]) {
  columns.map((x) => {
    x.id = x.id ?? x.accessorKey;
  });
}

export function ColumnsDefFactory<TData, TValue = unknown>(
  columnsData: ColumnBasic<TData>[],
): ColumnDef<TData, TValue>[] {
  const data = columnsData.map((x) => ColumnDefFactory(x));

  return data;
}

export function ColumnDefFactory<TData, TValue = unknown>(
  columnData: ColumnBasic<TData>,
): ColumnDef<TData, TValue> {
  if (columnData.id == "select") {
    return {
      id: "select",
      accessorKey: "id",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    };
  } else if (columnData.id == "actions") {
    return {
      id: "actions",
      cell: columnData.cell,
      enableSorting: false,
      enableHiding: false,
      header:
        columnData.header ?? columnData.headerTitle
          ? ({ column }) => (
              <DataTableColumnHeader
                column={column}
                title={columnData.headerTitle!}
              />
            )
          : () => <></>,
    };
  }

  return {
    id: columnData.id,
    accessorKey: columnData.accessorKey,
    header:
      columnData.header ??
      (({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={columnData.headerTitle!}
        />
      )),
    cell:
      columnData.cell ??
      (({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue(columnData.accessorKey!)}
            </span>
          </div>
        );
      }),
    enableSorting: columnData.enableSorting ?? true,
    enableHiding: columnData.enableHiding ?? true,
    ...(columnData.filterFn && { filterFn: columnData.filterFn }),
  } as ColumnDef<TData, TValue>;
}

export default function DataTable<TData>({
  columns,
  data,
  toolbars,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  prepareIdColumns(columns);

  const table = useReactTable({
    data,
    columns: ColumnsDefFactory(columns),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },

    debugTable: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        facetedFilters={toolbars?.facetedFilters}
        columns={columns}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se han encontrado resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
