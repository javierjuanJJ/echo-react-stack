import {Outlet} from "react-router-dom";
import Sidebar from "@/components/Sidebar";

export default function MainLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar */}
            <Sidebar/>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                <div className="container py-6 h-full">
                    <Outlet/>
                </div>
            </main>
        </div>
    );
}
