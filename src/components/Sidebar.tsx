
import { NavLink } from "react-router-dom";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Clock, Home, MessageSquare, Settings, Trash2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getReceivedMessages, subscribeToMessages } from "@/lib/supabaseClient";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
    const { user } = useUser();
    const [unreadCount, setUnreadCount] = useState(0);
    const { t } = useTranslation();

    // Create navigation items with translations
    const navItems = [
        { to: "/", label: t("navigation.home"), icon: <Home className="sidebar-link-icon" />, exact: true },
        { to: "/messages", label: t("navigation.messages"), icon: <MessageSquare className="sidebar-link-icon" />, badge: unreadCount },
        { to: "/history", label: t("navigation.history"), icon: <Clock className="sidebar-link-icon" /> },
        { to: "/trash", label: t("navigation.trash"), icon: <Trash2 className="sidebar-link-icon" /> },
        { to: "/settings", label: t("navigation.settings"), icon: <Settings className="sidebar-link-icon" /> },
    ];

    // Get unread message count
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

        // Subscribe to new messages
        const subscription = subscribeToMessages(user.id, (payload) => {
            // Increment counter when new message arrives
            setUnreadCount(prev => prev + 1);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [user?.id]);

    return (
        <div className="w-full h-full flex flex-col bg-sidebar text-sidebar-foreground">
            {/* Logo and header */}
            <div className="p-4 border-b border-sidebar-border">
                <h1 className="text-xl font-bold text-sidebar-foreground">TempMessage</h1>
                <p className="text-xs text-sidebar-foreground/60">{t("messages.title")}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.exact}
                        className={({ isActive }) =>
                            cn("sidebar-link relative", isActive ? "active" : "")
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>

                        {/* Badge for unread messages */}
                        {item.badge && item.badge > 0 && (
                            <span className="absolute right-2 top-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
                            alt={t("settings.profile")}
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
                        <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground" title={t("auth.signOut")}>
                            <LogOut className="h-5 w-5" />
                        </button>
                    </SignOutButton>
                </div>
            </div>
        </div>
    );
}
