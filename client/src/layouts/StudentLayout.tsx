import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import StudentSidebar from "@/features/student/components/StudentSidebar";
import StudentNavbar from "@/features/student/components/StudentNavbar";

const StudentLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <StudentSidebar />

        <SidebarInset>
          <StudentNavbar />

          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default StudentLayout;