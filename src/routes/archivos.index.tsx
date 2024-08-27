import { createFileRoute } from "@tanstack/react-router";
import ArchivosIndexPage from "@/features/archivos/index/page";
import { archivosQueryOptions } from "@/apis/archivos/archivosQueryOptions";

export const Route = createFileRoute("/archivos/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(archivosQueryOptions),
  component: ArchivosIndexPage,
});
