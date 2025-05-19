import {NavLink} from "react-router-dom";
import {SignOutButton, useUser} from "@clerk/clerk-react";
import {Clock, Home, MessageSquare, Settings, Trash2} from "lucide-react";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import {getReceivedMessages, subscribeToMessages} from "@/lib/supabaseClient";

export default function Sidebar() {
    const {user} = useUser();
    const [unreadCount, setUnreadCount] = useState(0);

    const navItems = [
        {to: "/", label: "Inicio", icon: <Home className="sidebar-link-icon"/>, exact: true},
        {to: "/messages", label: "Mensajes", icon: <MessageSquare className="sidebar-link-icon"/>, badge: unreadCount},
        {to: "/history", label: "Historial", icon: <Clock className="sidebar-link-icon"/>},
        {to: "/trash", label: "Papelera", icon: <Trash2 className="sidebar-link-icon"/>},
        {to: "/settings", label: "Ajustes", icon: <Settings className="sidebar-link-icon"/>},
    ];

    // Obtener conteo de mensajes no leídos
    useEffect(() => {
        if (!user?.id) return;

        const fetchUnreadCount = async () => {
            try {
                const messages = await getReceivedMessages(user.id);
                const unread = messages.filter(m => !m.is_read).length;
                setUnreadCount(unread);
            } catch (error) {
                console.error('Error fetching unread count:', error);
            }
        };

        fetchUnreadCount();

        // Suscribirse a nuevos mensajes
        const subscription = subscribeToMessages(user.id, (payload) => {
            // Incrementar contador cuando llega un nuevo mensaje
            setUnreadCount(prev => prev + 1);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [user?.id]);

    return (
        <aside className="w-64 bg-sidebar h-full flex flex-col border-r border-sidebar-border">
            {/* Logo and header */}
            <div className="p-4 border-b border-sidebar-border">
                <h1 className="text-xl font-bold text-sidebar-foreground">TempMessage</h1>
                <p className="text-xs text-sidebar-foreground/60">Mensajes temporales</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.exact}
                        className={({isActive}) =>
                            cn("sidebar-link relative", isActive ? "active" : "")
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>

                        {/* Badge para mensajes no leídos */}
                        {item.badge && item.badge > 0 && (
                            <span
                                className="absolute right-2 top-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {item.badge}
              </span>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* User section */}
            <div className="p-4 border-t border-sidebar-border">
                <div className="flex items-center gap-3">
                    {user?.imageUrl && (
                        <img
                            src={user.imageUrl}
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-sidebar-foreground truncate">
                            {user?.fullName || user?.username}
                        </p>
                        <p className="text-xs text-sidebar-foreground/60 truncate">
                            {user?.primaryEmailAddress?.emailAddress}
                        </p>
                    </div>
                    <SignOutButton>
                        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                        </button>
                    </SignOutButton>
                </div>
            </div>
        </aside>
    );
}
