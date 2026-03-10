import {
  Banknote,
  BookCheck,
  BookOpenCheckIcon,
  Calendar1Icon,
  CalendarDays,
  ChevronUp,
  HandCoins,
  LayoutDashboardIcon,
  School2,
  Settings2,
  User,
  User2,
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
  SidebarSeparator,
  useSidebar,
} from "../../../components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"

import { cn } from "@/lib/utils"

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
      {/* ================= HEADER ================= */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/" className="flex items-center gap-2 font-semibold">
                <img src="/vite.svg" alt="logo" width={20} />
                <span>New Dev</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

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
      </SidebarContent>

      {/* ================= FOOTER ================= */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-muted/60 transition">
                  <User2 />
                  John Doe
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
  )
}

export default AdminSidebar