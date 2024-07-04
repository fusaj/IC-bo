import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

const EnumStatus = [
  {
    value: 0,
    name: "Borrador",
    description: "Borrador",
    shortName: "Borrador",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: -1,
    name: "Obsoleto",
    description: "Obsoleto",
    shortName: "Obsoleto",
    icon: CircleIcon,
  },
  {
    value: 2,
    name: "Pendiente de Aprobación",
    description: "Pendiente de Aprobación",
    shortName: "Pendiente",
    icon: StopwatchIcon,
  },
  {
    value: 1,
    name: "Vigente",
    description: "Vigente",
    shortName: "Vigente",
    icon: CheckCircledIcon,
  },
  {
    value: -2,
    name: "Rechazado",
    description: "Rechazado",
    shortName: "Rechazado",
    icon: CrossCircledIcon,
  },
];

export default EnumStatus;
