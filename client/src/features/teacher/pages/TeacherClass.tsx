import ClassCard from "@/features/class/components/ClassCard"
import { useNavigate } from "react-router-dom"



const TeacherClass = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            Access Your Class
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
          </p>
        </div>
      </div>
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
       <ClassCard
      className="Class 10"
      section="A"
      classTeacher="Rahul Sharma"
      students={45}
      onView={() => navigate("/staff/class-detail/1")}
      onUpdate={() => console.log("Update")}
      onDelete={() => console.log("Delete")}
    />
     <ClassCard
      className="Class 10"
      section="A"
      classTeacher="Rahul Sharma"
      students={45}
      onView={() => navigate("/staff/class-detail/2")}
      onUpdate={() => console.log("Update")}
      onDelete={() => console.log("Delete")}
    />
     <ClassCard
      className="Class 10"
      section="A"
      classTeacher="Rahul Sharma"
      students={45}
      onView={() => navigate("/staff/class-detail/3")}
      onUpdate={() => console.log("Update")}
      onDelete={() => console.log("Delete")}
    />
     <ClassCard
      className="Class 10"
      section="A"
      classTeacher="Rahul Sharma"
      students={45}
      onView={() => navigate("/staff/class-detail/4")}
      onUpdate={() => console.log("Update")}
      onDelete={() => console.log("Delete")}
    />
     </div>

    </div>
  )
}

export default TeacherClass
