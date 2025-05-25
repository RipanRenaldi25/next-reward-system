import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX, Eye } from "lucide-react";

export default function columns(
  onView = () => {},
  onAccept = () => {},
  onReject = () => {}
) {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "transport",
      header: "Transportasi",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "createdAt",
      header: "Tanggal",
      cell: ({ row }) => {
        return <p>{new Date(row.original.createdAt).toLocaleDateString()}</p>;
      },
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        console.log({ row: row.original });
        return (
          <div className="flex gap-2">
            <Eye
              className="cursor-pointer"
              onClick={() => onView(row.original)}
            />
            <CircleCheck
              className="text-green-400 cursor-pointer"
              onClick={() => onAccept(row.original)}
            />
            <CircleX
              className="text-red-400 cursor-pointer"
              onClick={() => onReject(row.original)}
            />
          </div>
        );
      },
    },
  ];
}
