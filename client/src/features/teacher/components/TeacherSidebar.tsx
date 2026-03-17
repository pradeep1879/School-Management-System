import {
  BookCheck,
  BookOpen,
  Calendar1Icon,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  LayoutDashboardIcon,
  LogOut,
  School2,
  Settings,
  User,
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
  SidebarTrigger,
  useSidebar,
} from "../../../components/ui/sidebar";

import { cn } from "@/lib/utils";
import { useTeacherClass } from "@/features/class/hooks/useTeacherClass";
import { Button } from "@/components/ui/button";

const TeacherSidebar = () => {
  const { setOpenMobile } = useSidebar();
  const location = useLocation();
  const { data } = useTeacherClass(true);
  const classId = data?.classDetail?.id;

  const applicationItems = [
    {
      title: "Dashboard",
      url: "/teacher/dashboard",
      icon: LayoutDashboardIcon,
    },

    //  Dynamic Class URL
    {
      title: "Your Class",
      url: classId ? `/teacher/class-detail/${classId}` : "#",
      icon: School2,
      disabled: !classId,
    },
    { title: "Students", url: "/teacher/class/students", icon: User },
    { title: "Attendance", url: "/teacher/attendance", icon: CalendarCheck },
    { title: "Subjects", url: "/teacher/class/subjects", icon: BookOpen },
    {
      title: "Activities",
      url: "/teacher/class/activities",
      icon: ClipboardList,
    },
    { title: "Exams", url: "/teacher/class/exams", icon: GraduationCap },
    { title: "HomeWork", url: "/teacher/class/homework", icon: GraduationCap },
    { title: "Time Table", url: "/teacher/time-table", icon: CalendarDays },
    { title: "Notifications", url: "/teacher/notifications", icon: BookCheck },
    { title: "Calendar", url: "/teacher/calendar", icon: Calendar1Icon },
  ];

  const accountItems = [
    { title: "Setting", url: "/teacher/setting", icon: Settings },
  ];

  const renderItems = (items: typeof applicationItems) => {
    return items.map((item) => {
      const isActive = location.pathname.startsWith(item.url);
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link
              to={item.url}
              onClick={() => setOpenMobile(false)}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                "hover:bg-muted/60 hover:shadow-sm",
                isActive && "bg-primary/10 text-primary shadow-md",
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
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />

              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              >
                {item.title}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  return (
    <Sidebar collapsible="icon" className="border-r bg-background">
      {/* HEADER */}
      <SidebarHeader className="py-3">
        <div className="flex items-center justify-between px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  to="/teacher/dashboard"
                  className="flex items-center gap-2 font-semibold"
                >
                  <img src="/vite.svg" alt="logo" className="w-5 h-5" />
                  <span>Teacher Panel</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <SidebarTrigger
            variant="link"
            className="h-10 w-10 rounded-lg hover:bg-muted [&>svg]:h-5 [&>svg]:w-5"
          />
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      {/* CONTENT */}
      <SidebarContent>
        {/* ---------- Application ---------- */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(applicationItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ---------- Account ---------- */}
        <SidebarGroup>
          <SidebarGroupLabel>Acccount</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(accountItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
     <div className="border-b mx-3"/>
      {/* FOOTER */}
      <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Button variant="destructive">
              <LogOut className="w-6 h-6 text-red-200" />
              <span className="text-primary">Logout</span>
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    </Sidebar>
  );
};

export default TeacherSidebar;
