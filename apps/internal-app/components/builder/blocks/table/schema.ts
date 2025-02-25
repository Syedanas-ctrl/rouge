import { z } from "zod";
import { cellType, TableColumn } from "../../types";

export const TableColumnSchema = z.object({
    accessorKey: z.string(),
    header: z.string(),
    cell: z.array(z.object({ type: z.enum([cellType.string, cellType.number, cellType.boolean, cellType.date, cellType.badge, cellType.link]), value: z.string() })),
    enableSorting: z.boolean(),
    enableHiding: z.boolean(),
});

export const schema = z.object({
    columns: z.array(TableColumnSchema),
    data: z.array(z.object({}))
});