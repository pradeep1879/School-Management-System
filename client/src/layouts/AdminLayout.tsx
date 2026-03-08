import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import AdminNavbar from "@/features/admin/components/AdminNavbar";
import AdminSidebar from "@/features/admin/components/AdminSidebar";


const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />

        <SidebarInset>
          <AdminNavbar />

          <main className="flex-1 p-4">
            <Outlet />   {/* child route renders here */}
          </main>

        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
