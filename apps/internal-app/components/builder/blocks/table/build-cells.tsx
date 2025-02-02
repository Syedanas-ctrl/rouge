import { cellType } from "@/components/builder/types";
import { Row } from "@tanstack/react-table";
import { Badge } from "@workspace/ui/components/badge";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { format } from "date-fns";
import { Link } from "lucide-react";

export const CellBuilder = (cellValues: { type: cellType; value: string }[], row: Row<any>) => {
  const cells: React.ReactNode[] = [];
  for (const cellValue of cellValues) {
    switch (cellValue.type) {
      case cellType.string:
      case cellType.number:
        cells.push(<div className="w-[80px] text-sm truncate">{row.getValue(cellValue.value)}</div>);
        break;
      case cellType.boolean:
        cells.push(
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
            className="translate-y-[2px]"
          />
        );
        break;
      case cellType.badge:
        cells.push(<Badge variant="outline">{row.getValue(cellValue.value)}</Badge>);
        break;
      case cellType.link:
        cells.push(<Link href={row.getValue(cellValue.value)}>{row.getValue(cellValue.value)}</Link>);
        break;
      case cellType.date:
        cells.push(<div className="w-[80px]">{format(row.getValue(cellValue.value), "MMMM dd, yyyy")}</div>);
        break;
    }
  }
  return cells;
};
