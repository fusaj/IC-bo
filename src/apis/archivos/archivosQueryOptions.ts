import { fetchArchivos } from "@/features/archivos/services/archivos-service";
import { queryOptions } from "@tanstack/react-query";

export const archivosQueryOptions = queryOptions({
  queryKey: ["archivos"],
  queryFn: () => fetchArchivos(),
});
