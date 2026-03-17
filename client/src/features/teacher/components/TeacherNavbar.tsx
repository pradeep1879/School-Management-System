import { ModeToggle } from "@/components/extra-components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { teacherLogout } from "../api/teacher.api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTeacherProfile } from "../hooks/useTeacherProfile";

const TeacherNavbar = () => {
  const navigate = useNavigate();
  const { data } = useTeacherProfile();
  const teacher = data?.teacher;

  const logoutStore = useAuthStore((state) => state.logout);

  const getInitials = (name?: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("");
  };

  const handleLogout = async () => {
    try {
      await teacherLogout();
      logoutStore();
      navigate("/teacher/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="h-16 sticky top-0 z-50 bg-background border-b flex items-center justify-end px-6">
      <div className="flex items-center gap-6">

        {/* Dark Mode Toggle */}
        <ModeToggle />

        {/* Avatar + Dropdown */}
        <div className="flex items-center gap-3">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-11 w-11 rounded-full p-0">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={teacher?.imageUrl} />
                  <AvatarFallback className="text-sm font-bold">
                    {getInitials(teacher?.teacherName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">

              {/* User Info */}
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">{teacher?.teacherName}</span>
                <span className="text-xs text-muted-foreground">
                  Teacher Account
                </span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

          {/* Teacher Info */}
          <div className="leading-tight">
            <p className="text-foreground font-semibold">
              {teacher?.teacherName}
            </p>
            <p className="text-muted-foreground text-sm">
              {teacher?.email}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TeacherNavbar;