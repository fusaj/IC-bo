import { BookmarkCheck, Search } from "lucide-react";
import { FileText } from "lucide-react";

interface NavigationSchema {
  id: string;
  name: string;
  to?: string;
  icon?: JSX.Element;
  description?: string;
  subActions?: NavigationSchema[];
}
// ICON PROPS: size, strokeWidth, color, absoluteStrokeWidth
// https://lucide.dev/guide/packages/lucide-react#props
// pasar todo a un componente llamado Sidebar y eliminar los archivos que no son necesarios
export const navigationProps: NavigationSchema[] = [
  /*{
    id: "submodulo-personas",
    name: "Personas",
    icon: <Search strokeWidth={2} size={24}/>,
    to: "/dashboard",
    subActions: [
      {
        id: "persona",
        name: "Persona",
        to: "/dashboard",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque quae tenetur voluptatum voluptas quidem fugit rem debitis expedita ipsam?",
      },
      {
        id: "direccion-electronica",
        name: "Dirección Electrónica",
        to: "/tasks",
        description: "Aca podes ver la correo de la persona ",
      },
      {
        id: "director",
        name: "Director",
        to: "/dashboard",
      },
      {
        id: "relacion",
        name: "Relación",
        to: "/tasks",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque quae tenetur voluptatum voluptas quidem fugit rem debitis expedita ipsam?",
      },
    ],
  },
  {
    id: "submodulo-lotes",
    name: "Lotes",
    icon: <Book/>,
    subActions: [
      {
        id: "peoplesoft",
        name: "People Soft",
        subActions: [
          {
            id: "peoplesoft-lote",
            name: "Lote",
            to: "/dashboard",
            description:
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque quae tenetur voluptatum voluptas quidem fugit rem debitis expedita ipsam?",
          },
          {
            id: "peoplesoft-novedad",
            name: "Novedad",
            to: "/tasks",
            description: "Aca podes ver la correo de la persona ",
          },
        ],
      },
      {
        id: "apc",
        name: "APC",
        subActions: [
          {
        id: "apc-lote",
            name: "Lote",
            to: "/dashboard",
            description: "Aca podes ver la correo de la persona ",
          },
          {
            id: "apc-novedad-cabecera",
            name: "Novedad Cabecera",
            to: "/tasks",
          },
          {
            id: "apc-novedad-detalle",
            name: "Novedad Detalle",
            to: "/dashboard",
          },
        ],
      },
      {
        id: "dw",
        name: "DW",
        subActions: [
          {
            id: "dw-lote",
            name: "Lote",
            to: "/dashboard",
          },
          {
            id: "dw-novedad",
            name: "Novedad",
            to: "/tasks",
            description: "Lorem ipsum dolor sit, expedita ipsam?",
          },
        ],
      },
      {
        id: "baja-vinculados",
        name: "Baja Vinculados",
        subActions: [
          {
            id: "baja-vinculados-lote",
            name: "Lote",
            to: "/dashboard",
            description: "debitis expedita ipsam?",
          },
          {
            id: "baja-vinculados-novedad",
            name: "Novedad",
            to: "/tasks",
          },
        ],
      },
    ],
  },
  {
    id: "dashboard",
    name: "Dashboard",
    to: "/dashboard",
    icon: <BookmarkCheck/>,
  },
  {
    id: "sin-icono",
    name: "Sin Icono",
    to: "/dashboard",
  }*/
  {
    id: "archivos-index",
    name: "Archivos",
    to: "/archivos",
    description: "Lista de archivos",
    icon: <FileText />,
  },
  // {
  //   id: "dashboard",
  //   name: "Dashboard",
  //   to: "/dashboard",
  //   icon: <BookmarkCheck />,
  // },
  // {
  //   id: "modulo-task",
  //   name: "Task",
  //   icon: <Search strokeWidth={2} size={24} />,
  //   to: "/tasks",
  //   subActions: [
  //     {
  //       id: "task-index",
  //       name: "List Tasks",
  //       to: "/tasks",
  //       description: "Here's a list of your tasks!",
  //     },
  //     {
  //       id: "task-add",
  //       name: "Add Task",
  //       to: "/tasks/add",
  //       description: "Add a new Task!",
  //     },
  //   ],
  // },
];
