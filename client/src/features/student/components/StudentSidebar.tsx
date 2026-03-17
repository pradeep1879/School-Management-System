import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  CalendarDays,
  Calendar1Icon,
  GraduationCap,
  BookCheck,
  CalendarCheck,
  Settings,
  ReceiptIndianRupee,
  LogOut,
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
} from "@/components/ui/sidebar";


import { cn } from "@/lib/utils";
import { useNotificationContext } from "@/features/notification/context/NotificationContext";
import { Button } from "@/components/ui/button";

const StudentSidebar = () => {
  const { notification } = useNotificationContext();
  const { setOpenMobile } = useSidebar();
  const location = useLocation();

  const applicationItems = [
    { title: "Dashboard", url: "/student/dashboard", icon: LayoutDashboard },
    { title: "Subjects", url: "/student/subjects", icon: BookOpen },
    { title: "Attendance", url: "/student/attendance", icon: CalendarCheck },
    { title: "Activities", url: "/student/activities", icon: ClipboardList },
    { title: "Homework", url: "/student/homework", icon: BookCheck },
    { title: "Exams", url: "/student/exams", icon: GraduationCap },
    { title: "Time Table", url: "/student/time-table", icon: CalendarDays },
    { title: "Calendar", url: "/student/calendar", icon: Calendar1Icon },
    {
      title: "Notifications",
      url: "/student/notification",
      icon: Calendar1Icon,
      badge: notification?.length,
    },
    { title: "Fee", url: "/student/fee", icon: ReceiptIndianRupee },
  ];

  const accountItems = [
    { title: "Setting", url: "/student/setting", icon: Settings },
  ];

  const renderItems = (itmes: typeof applicationItems) => {
    return itmes.map((item) => {
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
                  <span>Student Panel</span>
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

        {/* ---------- Finance ---------- */}
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

export default StudentSidebar;
