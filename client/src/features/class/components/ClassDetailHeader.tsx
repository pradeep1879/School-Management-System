import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, Users, BookOpen, Calendar } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import MarkAttendanceDialog from "@/features/attendance/components/MarkAttendanceDialog";

interface Student {
  id: string;
  studentName: string;
  rollNumber: string;
}

interface ClassDetailHeaderProps {
  classId: string;
  students: Student[];

  className: string;
  section: string;
  classTeacher: string;
  totalStudents: number;
  totalSubjects: number;
  attendance: number;
  academicYear: string;
}

const ClassDetailHeader = ({
  classId,
  students,
  className,
  section,
  classTeacher,
  totalStudents,
  totalSubjects,
  attendance,
  academicYear,
}: ClassDetailHeaderProps) => {
  const role = useAuthStore((state) => state.role);

  return (
    <Card className="relative overflow-hidden border border-border/50 bg-linear-to-br from-background to-muted/30 shadow-sm">
      <div className="absolute inset-0 bg-primary/5 opacity-30" />

      <CardContent className="relative z-10 p-8 space-y-6">
        {/* ================= TOP ROW ================= */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
          {/* Left */}
          <div className="flex items-start gap-5">
            <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <GraduationCap size={30} />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {className}
              </h1>

              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="secondary">
                  Section {section}
                </Badge>

                <Badge variant="outline">
                  {academicYear}
                </Badge>
              </div>

              {/* Teacher */}
              <div className="flex items-center gap-3 mt-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {classTeacher
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <p className="text-sm text-muted-foreground">
                  Class Teacher:{" "}
                  <span className="font-medium text-foreground">
                    {classTeacher}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Button - Only Teacher */}

        {role === "teacher" && (
              <MarkAttendanceDialog
                classId={classId}
                students={students}
              />
            )}
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t">
          <div className="flex items-center gap-3">
            <Users className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">
                Total Students
              </p>
              <p className="text-xl font-semibold">
                {totalStudents}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <BookOpen className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">
                Subjects
              </p>
              <p className="text-xl font-semibold">
                {totalSubjects}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">
                Attendance
              </p>
              <p className="text-xl font-semibold">
                {attendance}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassDetailHeader;