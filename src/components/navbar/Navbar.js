import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Moon,
  Sun,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  Palette,
  Building2,
} from "lucide-react";
import { useAuthStore, useThemeStore } from "../../store";
import { cn } from "../../utils/helpers";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { theme, isDarkMode, toggleDarkMode, setTheme } = useThemeStore();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const themes = [
    { name: "Blue", value: "blue", color: "bg-blue-600" },
    { name: "Purple", value: "purple", color: "bg-purple-600" },
    { name: "Green", value: "green", color: "bg-green-600" },
    { name: "Orange", value: "orange", color: "bg-orange-600" },
  ];

  const roleBasedHome = {
    admin: "/admin/dashboard",
    owner: "/owner/dashboard",
    tenant: "/tenant/dashboard",
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg dark:border-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={roleBasedHome[user?.role] || "/"}
            className="flex items-center space-x-2 group"
          >
            <div className="flex items-center justify-center w-10 h-10 transition-transform duration-200 transform bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl group-hover:scale-110">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="hidden text-xl font-bold text-transparent bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text sm:block">
              PG Nexus
            </span>
          </Link>

          {/* Desktop Actions */}
          <div className="items-center hidden space-x-4 md:flex">
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 text-gray-700 transition-colors rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Palette className="w-5 h-5" />
              </button>
              {showThemeMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowThemeMenu(false)}
                  />
                  <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700 animate-scale-in">
                    {themes.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => {
                          setTheme(t.value);
                          setShowThemeMenu(false);
                        }}
                        className={cn(
                          "w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                          theme === t.value && "bg-gray-50 dark:bg-gray-700",
                        )}
                      >
                        <div className={cn("w-4 h-4 rounded-full", t.color)} />
                        <span className="text-sm">{t.name}</span>
                        {theme === t.value && (
                          <span className="ml-auto text-primary-600">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 transition-colors rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-700 transition-colors rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell className="w-5 h-5" />
              <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center p-2 space-x-2 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full bg-gradient-to-br from-primary-600 to-accent-600">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
              </button>
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 z-20 w-56 py-2 mt-2 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700 animate-scale-in">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {user?.email}
                      </p>
                      <p className="mt-1 text-xs capitalize text-primary-600">
                        {user?.role}
                      </p>
                    </div>
                    <button className="flex items-center w-full px-4 py-2 space-x-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button className="flex items-center w-full px-4 py-2 space-x-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 space-x-2 text-sm text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 text-gray-700 rounded-lg md:hidden dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {showMobileMenu ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="border-t border-gray-200 md:hidden dark:border-gray-800 animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center pb-3 space-x-3 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-center w-10 h-10 font-medium text-white rounded-full bg-gradient-to-br from-primary-600 to-accent-600">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className="flex items-center w-full px-3 py-2 space-x-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              <span>Toggle Theme</span>
            </button>
            <button className="flex items-center w-full px-3 py-2 space-x-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </button>
            <button className="flex items-center w-full px-3 py-2 space-x-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 space-x-3 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
