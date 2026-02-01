import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  Receipt,
  AlertCircle,
  Home,
  Megaphone,
  DollarSign,
  BellRing,
  UserCircle,
} from "lucide-react";
import { cn } from "../../utils/helpers";
import { useAuthStore } from "../../store";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const adminNavItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/properties", icon: Building2, label: "Properties" },
    { path: "/admin/tenants", icon: Users, label: "Tenants" },
    { path: "/admin/payments", icon: Receipt, label: "Payments" },
    { path: "/admin/complaints", icon: AlertCircle, label: "Issues" },
  ];

  const ownerNavItems = [
    { path: "/owner/dashboard", icon: Home, label: "Home" },
    { path: "/owner/properties", icon: Building2, label: "Properties" },
    { path: "/owner/tenants", icon: Users, label: "Tenants" },
    { path: "/owner/payments", icon: DollarSign, label: "Payments" },
    { path: "/owner/complaints", icon: AlertCircle, label: "Issues" },
  ];

  const tenantNavItems = [
    { path: "/tenant/dashboard", icon: Home, label: "Home" },
    { path: "/tenant/room", icon: Building2, label: "Room" },
    { path: "/tenant/payments", icon: DollarSign, label: "Payments" },
    { path: "/tenant/complaints", icon: BellRing, label: "Complaints" },
    { path: "/tenant/notices", icon: Megaphone, label: "Notices" },
  ];

  const getNavItems = () => {
    switch (user?.role) {
      case "admin":
        return adminNavItems;
      case "owner":
        return ownerNavItems;
      case "tenant":
        return tenantNavItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden dark:bg-gray-900 dark:border-gray-800 pb-safe">
      <nav className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 min-w-[60px]",
                active
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-gray-600 dark:text-gray-400",
              )}
            >
              <div className={cn("relative", active && "transform scale-110")}>
                <Icon className="w-6 h-6" />
                {active && (
                  <div className="absolute w-1 h-1 -translate-x-1/2 rounded-full -bottom-1 left-1/2 bg-primary-600 dark:bg-primary-400" />
                )}
              </div>
              <span
                className={cn("text-xs font-medium", active && "font-semibold")}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
