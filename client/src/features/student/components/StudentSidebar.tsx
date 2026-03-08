import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  CalendarDays,
  Calendar1Icon,
  ChevronUp,
  User2,
  GraduationCap,
  BookCheck,
  CalendarCheck,
  Settings,
  ReceiptIndianRupee,
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
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

const StudentSidebar = () => {
  const location = useLocation();

  const items = [
    { title: "Dashboard", url: "/student/dashboard", icon: LayoutDashboard },
    { title: "Subjects", url: "/student/subjects", icon: BookOpen },
    { title: "Attendance", url: "/student/attendance", icon: CalendarCheck },
    { title: "Activities", url: "/student/activities", icon: ClipboardList },
    { title: "Homework", url: "/student/homework", icon: BookCheck },
    { title: "Exams", url: "/student/exams", icon: GraduationCap },
    { title: "Time Table", url: "/student/time-table", icon: CalendarDays },
    { title: "Calendar", url: "/student/calendar", icon: Calendar1Icon },
    { title: "Fee", url: "/student/fee", icon: ReceiptIndianRupee },
    { title: "Setting", url: "/student/setting", icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r bg-background">
      {/* HEADER */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/student/dashboard"
                className="flex items-center gap-2 font-semibold"
              >
                <img src="/vite.svg" alt="logo" width={20} />
                <span>Student Panel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Academic</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={cn(
                          "relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                          "hover:bg-muted/60 hover:shadow-sm",
                          isActive && "bg-primary/10 text-primary shadow-md"
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
                  Student
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default StudentSidebar;