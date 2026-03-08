import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const COLORS = [
  "#6366F1", // indigo
  "#22C55E", // green
  "#F59E0B", // amber
  "#EF4444", // red
  "#3B82F6", // blue
  "#14B8A6", // teal
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-lg shadow-md px-3 py-2 text-sm">
        <p className="font-medium">{payload[0].payload.subject}</p>
        <p className="text-muted-foreground">
          Average:{" "}
          <span className="font-semibold text-primary">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const SubjectPerformanceChart = ({ data }: any) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Subject Performance</CardTitle>
        <CardDescription>
          Average marks per subject
        </CardDescription>
      </CardHeader>

      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="subject"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="average"
              radius={[8, 8, 0, 0]}
              barSize={40}
            >
              {data?.map((_: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SubjectPerformanceChart;