import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Props {
  student: any
}

const WelcomeCard = ({ student }: Props) => {
  return (
    <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <CardContent className="flex items-center gap-5 p-6">
        
        <Avatar className="h-16 w-16 border">
          <AvatarImage src={student?.imageUrl} />
          <AvatarFallback>
            {student?.studentName?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-2xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="text-lg opacity-90">
            {student?.studentName}
          </p>

          <p className="text-sm opacity-80">
            Roll No: {student?.rollNumber}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default WelcomeCard