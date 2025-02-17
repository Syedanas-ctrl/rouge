import { cellType } from "@/components/builder/types/table";

export const SAMPLE_TABLE_COLUMNS = [
    {
      accessorKey: "id",
      header: "Task",
      cell: [{ type: cellType.string, value: "id" }],
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: [{ type: cellType.string, value: "title" }],
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: [{ type: cellType.badge, value: "status" }],
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: [{ type: cellType.badge, value: "priority" }],
      enableSorting: false,
      enableHiding: false,
    },
  ]