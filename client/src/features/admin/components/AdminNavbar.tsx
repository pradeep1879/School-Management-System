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

import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";

import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../api/admin.api";
import { useAdminProfile } from "../hooks/useAdminProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const logoutStore = useAuthStore((state) => state.logout);
  const { data } = useAdminProfile();
  const admin = data?.admin;

  const handleLogout = async () => {
    try {
      await adminLogout();

      // clear Zustand auth state
      logoutStore();

      // redirect
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="h-16 px-4 sticky top-0 z-50 bg-background border-b flex items-center justify-between">
      {/* Sidebar Toggle */}
      <SidebarTrigger
        variant="link"
        className="h-14 w-14 rounded-lg hover:bg-muted [&>svg]:h-8 [&>svg]:w-8"
      />

      {/* Navbar Right */}
      <div className="flex items-center space-x-10">
        {/* Icons */}
        <div className="flex items-center gap-3">
          <ModeToggle />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-1 rounded-full h-12 w-12">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={admin?.imageUrl} />
                  <AvatarFallback className="text-xl font-bold">
                    {admin?.name
                      ?.split(" ")
                      .map((word: string) => word.charAt(0).toUpperCase())
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>

              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
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
          <div>
            <p className="text-foreground font-semibold">{admin?.name}</p>
            <p className="text-muted-foreground text-sm">{admin?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
