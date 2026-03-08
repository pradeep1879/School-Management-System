import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { toast } from "sonner";

import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { useMarkAttendance } from "../hooks/useMarkAttendance";
import { useUpdateAttendanceSession } from "../hooks/useUpdateAttendanceSession";
import { useGetAttendanceByDate } from "../hooks/useGetAttendaceByDate";

interface Student {
  id: string;
  studentName: string;
  rollNumber: string;
}

interface Props {
  classId: string;
  students: Student[];
}

type StatusType = "ABSENT" | "LATE" | "LEAVE" | "HOLIDAY";

const statusOptions: StatusType[] = [
  "ABSENT",
  "LATE",
  "LEAVE",
  "HOLIDAY",
];

export default function MarkAttendanceDialog({
  classId,
  students,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [exceptions, setExceptions] = useState<Record<string, StatusType>>({});
  const [search, setSearch] = useState("");

  // Mutations
  const createMutation = useMarkAttendance();
  const updateMutation = useUpdateAttendanceSession();
  
  const { data, isLoading, isError, error } =
    useGetAttendanceByDate({
      classId,
      date: selectedDate,
      enabled: open,
    });

  const isEditMode = !!data?.sessionId;
  const sessionId = data?.sessionId;

  // Handle fetch error
  useEffect(() => {
    if (!isError) return;

    const err: any = error;

    // Ignore 404 (means attendance not marked yet)
    if (err?.response?.status === 404) return;

    toast.error(err?.response?.data?.message || "Failed to fetch attendance");
  }, [isError, error]);

  /**
   * PREFILL EXCEPTIONS IF EDIT MODE
   */
  useEffect(() => {
    if (data?.attendance) {
      const existing: Record<string, StatusType> = {};

      data.attendance.forEach((item: any) => {
        if (item.status !== "PRESENT") {
          existing[item.student.id] = item.status;
        }
      });

      setExceptions(existing);
    } else {
      setExceptions({});
    }
  }, [data]);


  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      student.studentName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, students]);

  /**
   * STATUS HANDLER
   */
  const handleStatusChange = (
  studentId: string,
  status: StatusType
) => {
  setExceptions((prev) => {
    const copy = { ...prev };

    if (copy[studentId] === status) {
      delete copy[studentId]; // back to PRESENT
    } else {
      copy[studentId] = status;
    }

    return copy;
  });
};
  /**
   * CLEAR SELECTION
   */
  const handleClear = () => {
    setExceptions({});
  };

  /**
   * MARK ALL ABSENT
   */
  const handleMarkAllAbsent = () => {
    const allAbsent: Record<string, StatusType> = {};
    students.forEach((s) => {
      allAbsent[s.id] = "ABSENT";
    });
    setExceptions(allAbsent);
  };

  /**
   * PREVIEW SUMMARY
   */
const summary = useMemo(() => {
  const total = students.length;

  const counts = {
    ABSENT: 0,
    LATE: 0,
    LEAVE: 0,
    HOLIDAY: 0,
  };

  for (const status of Object.values(exceptions)) {
    counts[status]++;
  }

  const present =
    total -
    (counts.ABSENT +
      counts.LATE +
      counts.LEAVE +
      counts.HOLIDAY);

  return {
    total,
    present,
    absent: counts.ABSENT,
    late: counts.LATE,
    leave: counts.LEAVE,
    holiday: counts.HOLIDAY,
  };
}, [exceptions, students]);

  /**
   * SUBMIT HANDLER
   */
 const handleSubmit = () => {
  const exceptionArray = Object.entries(exceptions).map(
    ([studentId, status]) => ({
      studentId,
      status,
    })
  );

  // force IST-safe date
  const safeDate = new Date(selectedDate);
  safeDate.setHours(0, 0, 0, 0);

  if (isEditMode && sessionId) {
    updateMutation.mutate(
      {
        sessionId,
        exceptions: exceptionArray,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setExceptions({});
        },
      }
    );
  } else {
    createMutation.mutate(
      {
        classId,
        date: format(safeDate, "yyyy-MM-dd"),
        exceptions: exceptionArray,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setExceptions({});
        },
      }
    );
  }
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          Mark Attendance
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[85vh] custom-scrollbar overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode
              ? "Update Attendance"
              : "Mark Attendance"}
          </DialogTitle>
        </DialogHeader>

        {/* DATE PICKER */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {format(selectedDate, "EEEE, dd MMM yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) =>
                date && setSelectedDate(date)
              }
              disabled={(date) =>
                date > new Date() || date < new Date("2024-01-01")
              }
            />
          </PopoverContent>
        </Popover>

        {/* SEARCH + ACTIONS */}
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search student..."
              className="pl-8"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <Button
            variant="secondary"
            onClick={handleClear}
          >
            Clear Selection
          </Button>

          <Button
            variant="destructive"
            onClick={handleMarkAllAbsent}
          >
            Mark All Absent
          </Button>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-6">
          <Badge variant="outline">
            Total: {summary.total}
          </Badge>
          <Badge className="bg-green-500">
            Present: {summary.present}
          </Badge>
          <Badge className="bg-red-500">
            Absent: {summary.absent}
          </Badge>
          <Badge className="bg-yellow-500">
            Late: {summary.late}
          </Badge>
          <Badge className="bg-blue-500">
            Leave: {summary.leave}
          </Badge>
          <Badge className="bg-purple-500">
            Holiday: {summary.holiday}
          </Badge>
        </div>

        {/* STUDENTS */}
        <div className="space-y-3 mt-6">
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </>
          ) : (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {student.studentName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Roll: {student.rollNumber}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {statusOptions.map((status) => (
                    <Badge
                      key={status}
                      variant={
                        exceptions[student.id] ===
                        status
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() =>
                        handleStatusChange(
                          student.id,
                          status
                        )
                      }
                    >
                      {status}
                    </Badge>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={handleSubmit}
            disabled={
              createMutation.isPending ||
              updateMutation.isPending
            }
          >
            {createMutation.isPending ||
            updateMutation.isPending
              ? "Submitting..."
              : isEditMode
              ? "Update Attendance"
              : "Submit Attendance"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}