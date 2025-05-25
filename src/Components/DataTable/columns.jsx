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
        const status = row.original.status;
        const isDisabled = status === "approved" || status === "rejected";

        return (
          <div className="flex gap-2 items-center">
            <Eye
              className="cursor-pointer"
              onClick={() => onView(row.original)}
            />
            <CircleCheck
              className={`cursor-pointer ${
                isDisabled ? "opacity-50 cursor-not-allowed" : "text-green-500"
              }`}
              onClick={() => {
                if (!isDisabled) onAccept(row.original);
              }}
            />
            <CircleX
              className={`cursor-pointer ${
                isDisabled ? "opacity-50 cursor-not-allowed " : "text-red-500"
              }`}
              onClick={() => {
                if (!isDisabled) onReject(row.original);
              }}
            />
          </div>
        );
      },
    },
  ];
}
