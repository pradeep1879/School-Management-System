import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, MessageCircle } from "lucide-react";
import { ModeToggle } from "@/components/extra-components/ModeToggle";

const StudentNavbar = () => {
  return (
    <div className="h-16 sticky top-0 z-50 bg-background border-b flex items-center justify-between px-4">
      
      <SidebarTrigger
        variant="link"
        className="h-14 w-14 rounded-lg hover:bg-muted [&>svg]:h-8 [&>svg]:w-8"
      />

      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </div>
          <Bell />
        </div>

        <MessageCircle />
        <ModeToggle />
      </div>
    </div>
  );
};

export default StudentNavbar;