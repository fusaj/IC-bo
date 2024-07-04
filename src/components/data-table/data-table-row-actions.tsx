"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ReactNode, useNavigate } from "@tanstack/react-router";

interface DataTableRowActionsProps {
  textMenu?: string;
  rows: RowAccionButton[];
}

interface RowAccionButton {
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  text?: string;
  content?: () => JSX.Element;
  to?: string;
  id?: string | number;
}

const DataTableRowActions = ({
  textMenu = "Opciones",
  rows,
}: DataTableRowActionsProps) => {
  const navigate = useNavigate();

  if (rows.length > 1) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="size-4" />
            <span className="sr-only">{textMenu}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {rows.map((row, index) => {
            const onClickEvent =
              row.to != null
                ? row.id != null
                  ? (
                      to: string | undefined,
                      id: string | number | undefined,
                    ) => {
                      navigate({ to, params: { id: id!.toString() } });
                    }
                  : (to: string | undefined) => {
                      navigate({ to });
                    }
                : () => row.onClick!();

            const ButtonElement = row.content ? (
              row.content()
            ) : (
              <Button
                variant="outline"
                className="flex size-8 p-0"
                onClick={() => {
                  onClickEvent(row.to, row.id);
                }}
              >
                {row.icon && <row.icon className="size-4" />}
                <span>{row.text}</span>
              </Button>
            );

            return (
              <DropdownMenuItem key={index}>
                {ButtonElement as ReactNode}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    const row = rows[0];
    const onClickEvent =
      row.to != null
        ? row.id != null
          ? (to: string | undefined, id: string | number | undefined) => {
              navigate({ to, params: { id: id!.toString() } });
            }
          : (to: string | undefined) => {
              navigate({ to });
            }
        : () => row.onClick!();
    return row.content ? (
      row.content()
    ) : (
      <div className="flex items-center">
        <Button
          className="flex items-center p-2 data-[state=open]:bg-muted"
          onClick={() => {
            onClickEvent(row.to, row.id);
          }}
        >
          {row.icon && <row.icon className="size-4" />}
          <span>{row.text}</span>
        </Button>
      </div>
    );
  }
};

export default DataTableRowActions;
