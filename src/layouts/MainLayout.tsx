
import { Outlet } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import CustomSidebar from "@/components/Sidebar";

export default function MainLayout() {
    return (
        <SidebarProvider>
            <div className="flex h-screen overflow-hidden bg-background w-full">
                {/* Mobile sidebar trigger */}
                <div className="fixed top-4 left-4 z-50 md:hidden">
                    <SidebarTrigger />
                </div>

                {/* Using Shadcn Sidebar with our custom sidebar content */}
                <Sidebar>
                    <SidebarContent>
                        <CustomSidebar />
                    </SidebarContent>
                </Sidebar>

                {/* Main content */}
                <SidebarInset className="overflow-auto">
                    <div className="container py-6 px-4 md:px-6 h-full">
                        <Outlet />
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
