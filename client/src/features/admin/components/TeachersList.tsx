
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTeachers } from "@/features/teacher/hooks/useTeacher";
import { Loader2 } from "lucide-react";
import CountUp from "react-countup";

interface TeachersTableProps {
  page?: number;
  limit?: number;
}

const TeachersTable = ({ page = 1, limit = 10 }: TeachersTableProps) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useTeachers(page, limit);
  console.log("teachers table from admin", data)


  return (
    <Card className="shadow-sm border-border/60">
      <CardHeader>
        <CardTitle>Teachers Directory</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Loading */}
       {isLoading && (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          Fetching teachers...
        </p>
      </div>
    )}

        {/* Error */}
        {isError && (
          <p className="text-center text-red-500 py-6">
            Failed to load teachers
          </p>
        )}

        {/* Table */}
        {!isLoading && !isError && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Salary
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.teachers?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No teachers found
                  </TableCell>
                </TableRow>
              )}

              {data?.teachers?.map((teacher: any) => (
                <TableRow
                  key={teacher.id}
                  onClick={() =>
                    navigate(`/admin/teacher-profile/${teacher.id}`)
                  }
                  className="hover:bg-muted/40 transition cursor-pointer"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={teacher.imageUrl} />
                        <AvatarFallback>
                          {teacher.teacherName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium">
                          {teacher.teacherName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {teacher.experience}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{teacher.email}</TableCell>

                  <TableCell>{teacher.experience}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">
                      Active
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right font-medium">
                     {teacher?.salaryStructures?.map((bs:any) =>(
                      <CountUp
                      end={bs?.baseSalary || 0 }
                      duration={1.5}
                      separator=","
                      prefix="₹"
                      />
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TeachersTable;