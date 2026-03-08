// const columns = [
//   {
//     header: "Student",
//     cell: (student: any) => (
//       <div>
//         <p className="font-medium">{student.studentName}</p>
//         <p className="text-xs text-muted-foreground">
//           Roll: {student.rollNumber}
//         </p>
//       </div>
//     ),
//   },
//   {
//     header: "Present",
//     cell: (student: any) => (
//       <Badge className="bg-green-500 text-white text-xs">
//         {student.present}
//       </Badge>
//     ),
//   },
//   {
//     header: "Absent",
//     cell: (student: any) => (
//       <Badge className="bg-red-500 text-white text-xs">
//         {student.absent}
//       </Badge>
//     ),
//   },
//   {
//     header: "Late",
//     className: "hidden sm:table-cell",
//     cell: (student: any) => (
//       <Badge className="bg-yellow-500 text-white text-xs">
//         {student.late}
//       </Badge>
//     ),
//   },
//   {
//     header: "Leave",
//     className: "hidden md:table-cell",
//     cell: (student: any) => (
//       <Badge className="bg-blue-500 text-white text-xs">
//         {student.leave}
//       </Badge>
//     ),
//   },
//   {
//     header: "%",
//     cell: (student: any) => (
//       <div className="space-y-1 w-32 sm:w-40">
//         <Progress
//           value={Number(student.attendancePercentage)}
//           className="h-2"
//           indicatorClassName={getAttendanceColor(
//             Number(student.attendancePercentage)
//           )}
//         />
//         <p className="text-[10px] sm:text-xs">
//           {student.attendancePercentage}%
//         </p>
//       </div>
//     ),
//   },
// ];