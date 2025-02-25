export interface TableColumn {
    accessorKey: string;
    header: string;
    cell: { type: cellType; value: string }[];
    enableSorting: boolean;
    enableHiding: boolean;
}

export enum cellType {
    string = "string",
    number = "number",
    boolean = "boolean",
    date = "date",
    badge = "badge",
    link = "link",
}