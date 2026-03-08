import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"
import { useDailyAttendance } from "../../hooks/useAdminDashboard"





const CustomTooltip = ({ active, payload, label }: any) => {

  if (!active || !payload || payload.length === 0) return null

  const students = payload.find((p: any) => p.dataKey === "students")?.value
  const teachers = payload.find((p: any) => p.dataKey === "teachers")?.value

  return (
    <div className="bg-white dark:bg-zinc-900 border rounded-lg shadow-md px-3 py-2 text-xs">

      <p className="font-semibold mb-1">{label}</p>

      <div className="space-y-1">

        <p className="flex items-center gap-2 text-indigo-500">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          Students: {students}
        </p>

        <p className="flex items-center gap-2 text-green-500">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Teachers: {teachers}
        </p>

      </div>

    </div>
  )
}



/* ---------- MAIN COMPONENT ---------- */

const DailyAttendanceChart = () => {

  const { data, isLoading } = useDailyAttendance(7)

  console.log("daily attendance chart", data)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Daily Attendance</CardTitle>
        </CardHeader>

        <CardContent>
          <Skeleton className="h-80 w-full rounded-lg" />
        </CardContent>
      </Card>
    )
  }

  const chartData =
    data?.map((d) => ({
      date: new Date(d.date).toLocaleDateString("en-IN", {
        weekday: "short",
        timeZone: "Asia/Kolkata"
      }),
      students: d.studentsPresent,
      teachers: d.teachersPresent,
    })) || []



  return (
    <Card className="shadow-sm border-muted/40">

      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Daily Attendance Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={chartData} barGap={6}>

            {/* Gradient Colors */}
            <defs>

              <linearGradient id="studentBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.5} />
              </linearGradient>

              <linearGradient id="teacherBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.5} />
              </linearGradient>

            </defs>


            {/* Axes */}
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              domain={[0, "dataMax + 2"]}
            />


            {/* Tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
            />


            {/* Legend */}
            <Legend wrapperStyle={{ fontSize: "12px" }} />


            {/* Bars */}
            <Bar
              dataKey="students"
              fill="url(#studentBar)"
              radius={[6, 6, 0, 0]}
              name="Students"
              barSize={22}
              animationDuration={600}
            />

            <Bar
              dataKey="teachers"
              fill="url(#teacherBar)"
              radius={[6, 6, 0, 0]}
              name="Teachers"
              barSize={22}
              animationDuration={600}
            />

          </BarChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>
  )
}

export default DailyAttendanceChart