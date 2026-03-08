import PendingAttendanceTable from "../components/PendingAttendanceTable";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminTeacherAttendancePage() {
  return (
    <div className="space-y-6">

      <Card>
        <CardHeader>
          <CardTitle>Teacher Attendance Requests</CardTitle>
        </CardHeader>

        <CardContent>
          <PendingAttendanceTable />
        </CardContent>
      </Card>

    </div>
  );
}