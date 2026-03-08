import { useState, useMemo } from "react";
import { useClassAttendanceSummary } from "../hooks/useClassAttendanceSummary";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, CalendarDays, Search, Users } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import StudentAttendanceCard from "./StudentAttendanceCard";
import { AttendanceTopStatsCards } from "./AttendanceTopStatsCards";


interface Props {
  classId: string;
}

const getAttendanceColor = (percent: number ) => {
  if (percent >= 90) return "bg-green-500";
  if (percent >= 70) return "bg-orange-500";
  return "bg-red-500";
};

export default function ClassAttendanceOverview({
  classId,
}: Props) {
  const { data, isLoading } =
    useClassAttendanceSummary(classId);

  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>("");

  const filteredStudents = useMemo(() => {
    if (!data?.students) return [];
    return data.students.filter((s) =>
      s.studentName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, data]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (!data) return null;

  const { classSummary, } = data;
  console.log("clasSummary", classSummary);

  return (
    <div className="space-y-6">

    {/* ================= SUMMARY CARDS ================= */}
    <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <AttendanceTopStatsCards
        title="Total Students"
        value={classSummary.totalStudents}
        icon={Users}
        color="border-blue-500 text-blue-500"
      />

      <AttendanceTopStatsCards
        title="Total Sessions"
        value={classSummary.totalSessions}
        icon={CalendarDays}
        color="border-purple-500 text-purple-500"
      />

      <AttendanceTopStatsCards
        title="Average Attendance"
        value={Number(classSummary.averageAttendance)}
        icon={BarChart3}
        color="border-green-500 text-green-500"
        suffix="%"
      />
    </div>

    {/* ================= SEARCH ================= */}
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search student..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

    {/* ================= TABLE ================= */}
    <div className="overflow-x-auto custom-scrollbar rounded-lg border">
      <table className="min-w-127.5 w-full text-xs sm:text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-2 sm:p-3">Student</th>
            <th className="text-left p-2 sm:p-3">Present</th>
            <th className="text-left p-2 sm:p-3">Absent</th>
            <th className="text-left p-2 sm:p-3 hidden sm:table-cell">Late</th>
            <th className="text-left p-2 sm:p-3 hidden md:table-cell">Leave</th>
            <th className="text-left p-2 sm:p-3">%</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id} onClick={() => setSelectedStudent(student.id)}
             className="border-t cursor-pointer">
              <td className="p-2 sm:p-3">
                <div>
                  <p className="font-medium">
                    {student.studentName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Roll: {student.rollNumber}
                  </p>
                </div>
              </td>

              <td className="p-2 sm:p-3">
                <Badge className="bg-green-500 text-white text-xs">
                  {student.present}
                </Badge>
              </td>

              <td className="p-2 sm:p-3">
                <Badge className="bg-red-500 text-white text-xs">
                  {student.absent}
                </Badge>
              </td>

              {/* Hide on small screens */}
              <td className="p-2 sm:p-3 hidden sm:table-cell">
                <Badge className="bg-yellow-500 text-white text-xs">
                  {student.late}
                </Badge>
              </td>

              <td className="p-2 sm:p-3 hidden md:table-cell">
                <Badge className="bg-blue-500 text-white text-xs">
                  {student.leave}
                </Badge>
              </td>

              <td className="p-2 sm:p-3 w-32 sm:w-40">
                <div className="space-y-1">
                  <Progress
                    value={Number(student.attendancePercentage)}
                    className="h-2"
                    indicatorClassName={getAttendanceColor(Number(student?.attendancePercentage))}
                  />
                  <p className="text-[10px] sm:text-xs">
                    {student.attendancePercentage}%
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {selectedStudent && (
      <Dialog
        open={!!selectedStudent}
        onOpenChange={() => setSelectedStudent(null)}
      >
        <DialogContent className="max-w-3xl">
          <StudentAttendanceCard
            studentId={selectedStudent}
          />
        </DialogContent>
      </Dialog>
  )}
  </div>
);

}