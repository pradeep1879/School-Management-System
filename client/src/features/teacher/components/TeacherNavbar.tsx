import { ModeToggle } from "@/components/extra-components/ModeToggle";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, LogOut, MessageCircle } from "lucide-react";
import { teacherLogout } from "../api/teacher.api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";




const TeacherNavbar = () => {
  const navigate = useNavigate();
  const logoutStore = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
      try {
        await teacherLogout();
  
        // clear Zustand auth state
        logoutStore();
  
        // redirect
        navigate("/teacherasdfasd/login");
      } catch (error) {
        console.error("Logout failed", error);
      }
    };


  return (
    <div className="h-16 sticky top-0 z-50 bg-background border-b flex items-center justify-between">
        {/* SLIDER */}
    <div className="">
         <SidebarTrigger variant="link"  className="h-14 w-14 rounded-lg hover:bg-muted [&>svg]:h-8 [&>svg]:w-8"/>
    </div>
    {/* NavBar */}

     <div className="flex items-center space-x-10">
        <div className="flex items-center gap-3">
            <div className="relative">
            <div className="absolute text-center -top-3 -right-1 bg-accent-foreground w-5 h-5
              rounded-full text-muted-foreground ">9</div>
            <Bell/>
            </div>
            <MessageCircle/>
         <ModeToggle />
        </div>
      <div className="flex items-center gap-2">
        <div className="">
            <p className="text-foreground font-semibold ">Admin User</p>
            <p className="text-muted-foreground text-sm">Administrator</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="px-1 rounded-full h-12 w-12">
                <img src="/vite.svg"  alt="" className="w-8 h-8" />
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
      </div>
     </div>
    </div>
  );
};
export default TeacherNavbar;
