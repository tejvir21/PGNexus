import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import BottomNav from "../components/navbar/BottomNav";
import { useThemeStore } from "../store";

const Layout = () => {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <div className="min-h-screen transition-colors duration-200 bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
