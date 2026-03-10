import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


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
  console.log("teachers table from admin", data);

  return (
   <div className="">
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
        {!isLoading && !data && (
          <p className="text-center text-red-500 py-6">
            Teachrs not found!!
          </p>
        )}

        {/* Table */}
        {!isLoading && !isError && (
          <div className="max-h-125 overflow-auto custom-scrollbar">
            <div className="min-w-175">
            <Table >
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Salary</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data?.teachers?.map((teacher: any) => (
                  <TableRow
                    key={teacher.id}
                    onClick={() =>
                      navigate(`/admin/teacher-profile/${teacher.id}`)
                    }
                    className="cursor-pointer hover:bg-muted/40 transition"
                  >
                    {/* Teacher */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={teacher.imageUrl} />
                          <AvatarFallback>
                            {teacher.teacherName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="font-medium leading-none">
                            {teacher.teacherName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {teacher.experience}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Email */}
                    <TableCell className="text-muted-foreground">
                      {teacher.email}
                    </TableCell>

                    {/* Experience */}
                    <TableCell>{teacher.experience}</TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge variant="secondary">Active</Badge>
                    </TableCell>

                    {/* Salary */}
                    <TableCell className="text-right font-medium">
                      {teacher.salaryStructures?.map((bs: any) => (
                        <CountUp
                          key={bs.id}
                          end={bs?.baseSalary || 0}
                          duration={1.2}
                          separator=","
                          prefix="₹"
                        />
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </div>
        )}
   </div>
  );
};

export default TeachersTable;
