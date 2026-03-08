// import {
//   Table,
//   TableBody,
//   TableHead,
//   TableHeader,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";

// interface Column<T> {
//   header: string;
//   className?: string;
//   hideOn?: string;
//   cell: (row: T) => React.ReactNode;
// }

// interface Props<T> {
//   columns: Column<T>[];
//   data: T[];
//   onRowClick?: (row: T) => void;
// }

// export default function DataTable<T>({
//   columns,
//   data,
//   onRowClick,
// }: Props<T>) {
//   return (
//     <div className="overflow-x-auto custom-scrollbar rounded-lg border">
//       <Table className="min-w-187.5 text-xs sm:text-sm">
//         <TableHeader className="bg-muted">
//           <TableRow>
//             {columns.map((col, i) => (
//               <TableHead
//                 key={i}
//                 className={`p-2 sm:p-3 text-left ${col.className ?? ""}`}
//               >
//                 {col.header}
//               </TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {data.map((row, index) => (
//             <TableRow
//               key={index}
//               className="cursor-pointer"
//               onClick={() => onRowClick?.(row)}
//             >
//               {columns.map((col, i) => (
//                 <TableCell
//                   key={i}
//                   className={`p-2 sm:p-3 ${col.className ?? ""}`}
//                 >
//                   {col.cell(row)}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }