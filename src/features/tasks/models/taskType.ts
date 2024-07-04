import EnumResponse from "@/models/enum-response";

export default interface TaskType {
  id: string;
  title: string;
  status: EnumResponse;
  label: string;
  priority: string;
}
