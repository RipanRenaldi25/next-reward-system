import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const BasicTable = ({ data = [] }) => {
  console.log({ data });
  return (
    <Table className="relative">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Transportasi</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Tanggal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((val) => (
            <TableRow key={val.id}>
              <TableCell className="font-medium">{val.id}</TableCell>
              <TableCell>{val.transport}</TableCell>
              <TableCell>{val.status}</TableCell>
              <TableCell className="text-right">
                {new Date(val.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-500">
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
