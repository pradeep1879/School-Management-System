import { Mail, Phone, Users, Pencil } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuthStore } from "@/store/auth.store"


interface Props {
  student: any
}

export default function StudentProfileHeader({ student }: Props) {
  const role = useAuthStore((state) => state.role)

  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={student.imageUrl} />
            <AvatarFallback>
              {student.studentName
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-3xl font-semibold">
              {student.studentName}
            </h1>

            <p className="text-muted-foreground">
              Class {student.class?.slug} • Roll No: {student.rollNumber}
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              <Badge variant="secondary">Active</Badge>
              <Badge variant="outline">
                Admission Date: {new Date(student.admissionDate).toLocaleDateString()}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
              <div className="flex items-center gap-1">
                <Mail size={14} /> {student.userName}
              </div>
              <div className="flex items-center gap-1">
                <Phone size={14} /> {student.contactNo}
              </div>
              <div className="flex items-center gap-1">
                <Users size={14} /> Parent: {student.fatherName}
              </div>
            </div>
          </div>
        </div>

        {/* Role-based Edit */}
        {role === "admin" && (
          <Button variant="outline" className="gap-2">
            <Pencil size={14} />
            Edit
          </Button>
        )}
      </div>
    </Card>
  )
}