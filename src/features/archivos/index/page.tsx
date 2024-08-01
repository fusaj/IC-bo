import { useSuspenseQuery } from "@tanstack/react-query";
import { archivosQueryOptions } from "@/apis/archivos/archivosQueryOptions";

import { columns } from "./components/columns";
import DataTable from "@/components/data-table/data-table";
import PageHeader from "@/components/page-header/page-header";

const ArchivosIndexPage = () => {
  const archivosQuery = useSuspenseQuery(archivosQueryOptions);
  let archivos = archivosQuery.data;

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <PageHeader
          title="Archivos"
          subtitle="Acá se puede visualizar la lista de archivos que representan los balances presentados por BNA País, las Filiales del exterior y las empresas Subsidiarias"
        ></PageHeader>
        <DataTable data={archivos as any} columns={columns} />
      </div>
    </>
  );
};

export default ArchivosIndexPage;
