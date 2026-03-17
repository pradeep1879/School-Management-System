
import { LogOut } from "lucide-react";
import { ModeToggle } from "@/components/extra-components/ModeToggle";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { studentLogout } from "../api/student.api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStudentProfile } from "../hooks/useStudentProfile";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const { data } = useStudentProfile();
  const student = data?.student;
  const logoutStore = useAuthStore((state) => state.logout);
  
  const handleLogout = async () => {
      try {
        await studentLogout();
  
        // clear Zustand auth state
        console.log("above logout store teachernavbar")
        logoutStore();
        
        // redirect
        navigate("/student/login");
        console.log("below logout store teachernavbar")
      } catch (error) {
        console.error("Logout failed", error);
      }
    };
  return (
    <div className="h-16 sticky top-0 z-50 bg-background border-b flex items-center 
    justify-end px-6">

      <div className="flex items-center gap-6">
        <ModeToggle />
        <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
           <Button variant="outline" className="px-1 rounded-full h-12 w-12">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student?.imageUrl} />
                  <AvatarFallback className="text-xl font-bold">
                    {student?.studentName
                      ?.split(" ")
                      .map((word: string) => word.charAt(0).toUpperCase())
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
         <div className="">
            <p className="text-foreground font-semibold ">{student?.studentName}</p>
            <p className="text-muted-foreground text-sm">{student?.userName}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default StudentNavbar;