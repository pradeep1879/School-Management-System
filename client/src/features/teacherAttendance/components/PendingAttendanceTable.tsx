import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { usePendingTeacherAttendance } from "../hooks/usePendingTeacherAttendance";
import { useApproveAttendance } from "../hooks/useApproveAttendance";


import AttendanceStatusBadge from "./AttendanceStatusBadge";
import { useRejectAttendance } from "../hooks/useRejectAttendance";

export default function PendingAttendanceTable() {
  const { data, isLoading } = usePendingTeacherAttendance();
  console.log(data)
  const approve = useApproveAttendance();
  const reject = useRejectAttendance();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  const records = data || [];

  return (
    <div className="border rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Approval</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {records.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.teacher.teacherName}</TableCell>

              <TableCell>
                {new Date(item.date).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <AttendanceStatusBadge status={item.status} />
              </TableCell>

              <TableCell className="capitalize">
                {item.approvalStatus?.toLowerCase()}
              </TableCell>

              <TableCell className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    navigate(`/admin/teacher-attendance/${item.teacherId}`)
                  }
                >
                  View
                </Button>

                <Button
                  size="sm"
                  disabled={approve.isPending}
                  onClick={() => approve.mutate(item.id)}
                >
                  {approve.isPending ? "Approving..." : "Approve"}
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    reject.mutate({
                      attendanceId: item.id,
                      reason: "Rejected by admin",
                    })
                  }
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}