import {
  BookCheck,
  BookOpen,
  Calendar1Icon,
  CalendarCheck,
  CalendarDays,
  ChevronUp,
  ClipboardList,
  GraduationCap,
  LayoutDashboardIcon,
  School2,
  User,
  User2,
} from "lucide-react";

import { useLocation, Link } from "react-router-dom";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "../../../components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { useTeacherClass } from "@/features/class/hooks/useTeacherClass";

const TeacherSidebar = () => {
  const location = useLocation();
  const { data } = useTeacherClass(true);

  const classId = data?.classDetail?.id;

  const items = [
    { title: "Dashboard", url: "/teacher/dashboard", icon: LayoutDashboardIcon },

    //  Dynamic Class URL
    {
      title: "Your Class",
      url: classId ? `/teacher/class-detail/${classId}` : "#",
      icon: School2,
      disabled: !classId,
    },
    { title: "Students", url: "/teacher/class/students", icon: User },
    { title: "Attendance", url: "/teacher/attendance", icon: CalendarCheck,},
    { title: "Subjects", url: "/teacher/class/subjects", icon: BookOpen },
    { title: "Activities", url: "/teacher/class/activities", icon: ClipboardList},
    { title: "Exams", url: "/teacher/class/exams", icon: GraduationCap},
    { title: "HomeWork", url: "/teacher/class/homework", icon: GraduationCap},
    { title: "Time Table", url: "/teacher/time-table", icon: CalendarDays },
    { title: "Notifications", url: "/teacher/notifications", icon: BookCheck },
    { title: "Calendar", url: "/teacher/calendar", icon: Calendar1Icon },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r bg-background">

      {/* HEADER */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/teacher/dashboard" className="flex items-center gap-2 font-semibold">
                <img src="/vite.svg" alt="logo" width={20} />
                <span>Teacher Panel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild disabled={item.disabled}>
                      <Link
                        to={item.url}
                        className={cn(
                          "relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                          "hover:bg-muted/60 hover:shadow-sm",
                          isActive && "bg-primary/10 text-primary shadow-md",
                          item.disabled && "opacity-50 pointer-events-none"
                        )}
                      >
                        {isActive && (
                          <span className="absolute bg-purple-600 left-0 top-1 bottom-1 w-1 rounded-r-full" />
                        )}

                        <item.icon
                          className={cn(
                            "h-4 w-4 transition-colors",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />

                        <span
                          className={cn(
                            "text-sm font-medium transition-colors",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  Teacher
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Setting</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  );
};

export default TeacherSidebar;