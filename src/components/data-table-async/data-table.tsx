import * as React from "react";
import {
  CellContext,
  ColumnDef,
  ColumnFiltersState,
  HeaderContext,
  PaginationState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
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
import { create } from "zustand";
import { useEffect } from "react";
import {
  FilterParams,
  QueryParamsList,
  SortParams,
} from "@/models/query-params-list";
import { ComparisonOperators } from "@/models/operators";
import { xPagination } from "@/models/pagination";

interface DataTableProps<TData> {
  columns: ColumnBasic<TData>[];
  queryData: (filters?: QueryParamsList) => Promise<{
    data: TData[];
    paginationData: xPagination | null;
  }>;
  toolbars?: { facetedFilters?: DataTableToolbarFacetedFilters[] };
}

export interface ColumnBasic<TData> {
  id?: string;
  accessorKey?: string;
  headerTitle?: string;
  enableSorting?: boolean;
  enableHiding?: boolean;
  enableFiltering?: boolean;
  type?: "text" | "number" | "date";
  filterPlaceHolder?: string;
  comparisonFilter?: ComparisonOperators;
  cell?: ({ row }: CellContext<TData, unknown>) => JSX.Element;
  header?: ({ column }: HeaderContext<TData, unknown>) => JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterFn?: (row: Row<TData>, id: string, value: any) => any; // ver si eliminar despues
}

function prepareIdColumns<TData>(columns: ColumnBasic<TData>[]) {
  columns.map((x) => {
    x.id = x.id ?? x.accessorKey;
  });
}

export function ColumnsDefFactory<TData, TValue = unknown>(
  columnsData: ColumnBasic<TData>[],
  canFilter: boolean,
): ColumnDef<TData, TValue>[] {
  const data = columnsData.map((x) => ColumnDefFactory(x, canFilter));

  return data;
}

export function ColumnDefFactory<TData, TValue = unknown>(
  columnData: ColumnBasic<TData>,
  canFilter: boolean,
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
          className="mr-2 translate-y-[2px]"
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
      enableColumnFilter: false,
    };
  } else if (columnData.id == "actions") {
    return {
      id: "actions",
      cell: columnData.cell,
      enableSorting: false,
      enableHiding: false,
      enableColumnFilter: false,
      header:
        columnData.header ?? columnData.headerTitle
          ? ({ column }) => (
              <DataTableColumnHeader
                column={column}
                title={columnData.headerTitle!}
                type={columnData.type ?? "text"}
                filterPlaceholder={columnData.filterPlaceHolder}
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
          type={columnData.type ?? "text"}
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
    enableFiltering: canFilter ? columnData.enableFiltering ?? true : false,
    ...(columnData.filterFn && { filterFn: columnData.filterFn }),
  } as ColumnDef<TData, TValue>;
}

// Define state shape
interface DataState<Tdata> {
  data: Tdata[];
  setData: (data: Tdata[]) => void;
}

// Zustand store
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStore = create<DataState<any>>((set) => ({
  data: [],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  setData: (data) => set({ data }),
}));

export default function DataTable<TData>({
  columns,
  queryData,
  toolbars,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  console.log(columnFilters);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [canFilter, setCanFilter] = React.useState(true);

  prepareIdColumns(columns);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, setData }: DataState<TData> = useStore();
  const [rowCount, setRowCount] = React.useState<number>(data.length);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const getData = async () => {
    try {
      const filter = columnFilters.map((y) => {
        const column = columns.find((x) => x.id == y.id);
        if (column != undefined && column != null) {
          const newFilter = {
            propertyName: column.accessorKey,
            value: y.value,
            typeOfSearch: column.comparisonFilter ?? ComparisonOperators.Equals,
          } as FilterParams;
          return newFilter;
        }
      }) as FilterParams[];

      const sort = sorting.map((y) => {
        const column = columns.find((x) => x.id == y.id);
        if (column != undefined && column != null) {
          const newSort = {
            propertyName: column.accessorKey,
            order: y.desc ? "DESC" : "ASC",
          } as SortParams;
          return newSort;
        }
      }) as SortParams[];

      const queryParams = {
        filter,
        sort,
        pagination: {
          pageIndex: pagination.pageIndex + 1,
          pageSize: pagination.pageSize,
        },
      } as QueryParamsList;
      const response = await queryData(queryParams);
      setData(response.data);
      setRowCount(response.paginationData?.totalCount ?? response.data.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
  }, [sorting, pagination, globalFilter]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
  }, []);

  const table = useReactTable({
    data,
    columns: ColumnsDefFactory(columns, canFilter),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
      pagination,
    },
    rowCount,
    enableRowSelection: true,
    manualFiltering: true,
    manualPagination: true,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
