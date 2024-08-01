import { archivosClient } from "@/apis/archivos/archivosClient";

export const fetchArchivos = async () => {
  console.log(`Obteniendo archivos`);
  const response = await archivosClient.get(`archivos`);
  return await response.json();
};
