import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const formatCurrency = (amount?: number) =>
  `₹${(amount || 0).toLocaleString()}`;

const ClassCollectionTable = ({ classes }: { classes?: any[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Collection Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {classes?.map((cls) => (
          <div
            key={cls.id}
            className="flex justify-between border p-3 rounded-lg"
          >
            <div>
              <p className="font-medium">{cls.className}</p>
            </div>
            <div className="flex gap-6 text-sm">
              <span>Total: {formatCurrency(cls.total)}</span>
              <span className="text-green-600">
                Paid: {formatCurrency(cls.paid)}
              </span>
              <span className="text-red-600">
                Due: {formatCurrency(cls.due)}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ClassCollectionTable;