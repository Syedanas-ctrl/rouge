import { TableColumn } from "@/components/builder/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { CellBuilder } from "./build-cells";

export const columnBuilder = (columnsBlocks: TableColumn[]): ColumnDef<any>[] => {
    return columnsBlocks.map((columnBlock) => {
      return {
        accessorKey: columnBlock.accessorKey,
        header: ({ column }) => <DataTableColumnHeader column={column} title={columnBlock.header} />,
        cell: ({ row }) => {
          return <div key={columnBlock.accessorKey} className="flex gap-2 items-center">{CellBuilder(columnBlock.cell, row)}</div>;
        },
        enableSorting: columnBlock.enableSorting,
        enableHiding: columnBlock.enableHiding,
      };
    });
  };