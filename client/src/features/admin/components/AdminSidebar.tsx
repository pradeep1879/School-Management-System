import {
  Banknote,
  BookCheck,
  BookOpenCheckIcon,
  Calendar1Icon,
  CalendarDays,
  HandCoins,
  LayoutDashboardIcon,
  LogOut,
  School2,
  Settings,
  Settings2,
  ShieldCheck,
  User,
  Users,

} from "lucide-react"

import { Link, useLocation } from "react-router-dom"

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
  useSidebar,
} from "../../../components/ui/sidebar"

  

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const applicationItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboardIcon },
  { title: "Teachers", url: "/admin/teachers", icon: Users },
  { title: "Classes", url: "/admin/classes", icon: School2 },
  { title: "Students", url: "/admin/students", icon: User },
  { title: "Time Table", url: "/admin/time-table", icon: CalendarDays },
  { title: "Notifications", url: "/admin/notifications", icon: BookCheck },
  { title: "Calendar", url: "/admin/calendar", icon: Calendar1Icon },
]

const financeItems = [
  { title: "Dashboard", url: "/admin/finance/dashboard", icon: BookOpenCheckIcon },
  { title: "Collect", url: "/admin/finance/collect", icon: HandCoins },
  { title: "Salary", url: "/admin/finance/salary", icon: Banknote },
  { title: "Setup", url: "/admin/finance/setup", icon: Settings2 },
];

const accountItems = [
  { title: "Setting", url: "/admin/setting", icon: Settings },
]

const AdminSidebar = () => {
  const { setOpenMobile } = useSidebar()
  const location = useLocation()

  const renderMenuItems = (items: typeof applicationItems) =>
    items.map((item) => {
      const isActive = location.pathname.startsWith(item.url)

      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link
              to={item.url}
              onClick={() =>setOpenMobile(false)}
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
      )
    })

  return (
    <Sidebar collapsible="icon" className="border-r bg-background">
      {/* ----------- HEADER ----------- */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/" className="flex items-center gap-3">
  
                {/* Logo Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-xl
                 bg-linear-to-br from-blue-500 to-purple-600">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>

                {/* Text */}
                <div className="flex flex-col leading-tight">
                  <span className="text-lg font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Admin Panel
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <Separator/>

      {/* ================= CONTENT ================= */}
      <SidebarContent>
        {/* ---------- Application ---------- */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(applicationItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ---------- Finance ---------- */}
        <SidebarGroup>
          <SidebarGroupLabel>Finance</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(financeItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

       <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(accountItems)}</SidebarMenu>
          </SidebarGroupContent>
       </SidebarGroup>
      </SidebarContent>


      <div className="border-b mx-3"/>

      {/* ---------- FOOTER ---------- */}
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
  )
}

export default AdminSidebar