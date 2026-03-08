import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type ClassData = {
  className: string
  total: number
  paid: number
  due: number
}

interface Props {
  data?: ClassData[]
}

export default function ClassCollectionChart({ data }: Props) {

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Class Collection</CardTitle>
        </CardHeader>

        <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
          No class data available
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Class Wise Collection
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={data}
            barSize={30}
            barGap={6}
          >

            {/* X Axis */}
            <XAxis
              dataKey="className"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            {/* Y Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.03)" }}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                fontSize: "13px"
              }}
            />

            {/* Legend */}
            <Legend
              wrapperStyle={{
                fontSize: "13px",
                paddingTop: "10px"
              }}
            />

            {/* Paid */}
            <Bar
              dataKey="paid"
              name="Paid"
              fill="#22c55e"
              radius={[8,8,0,0]}
            />

            {/* Due */}
            <Bar
              dataKey="due"
              name="Due"
              fill="#ef4444"
              radius={[8,8,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </CardContent>
    </Card>
  )
}