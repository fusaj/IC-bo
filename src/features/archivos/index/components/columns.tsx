import { ColumnBasic } from "@/components/data-table/data-table";
import ArchivosType from "../../models/archivosType";

export const columns: ColumnBasic<ArchivosType>[] = [
  {
    accessorKey: "periodo",
    headerTitle: "Período",
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "casa",
    headerTitle: "Casa",
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "descripcion",
    headerTitle: "Descripción",
  },
  {
    accessorKey: "version",
    headerTitle: "Versión",
    enableSorting: true,
    enableHiding: true,
  },
];
