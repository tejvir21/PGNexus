import logo from "./logo.svg";
import "./App.css";
import Auth from "./pages/auth";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAuthStore } from "./store";
import Layout from "./layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

// Admin Pages
import AdminDashboard from "./pages/dashboard/admin";

// Owner Pages
import OwnerDashboard from "./pages/dashboard/owner";

// Tenant Pages
import TenantDashboard from "./pages/dashboard/tenant";

// Import styles
import "./styles/globals.css";

function App() {
  const { isAuthenticated, userRole } = useAuthStore();

  const getDefaultRoute = () => {
    if (!isAuthenticated) return "/auth";

    const routes = {
      admin: "/admin/dashboard",
      owner: "/owner/dashboard",
      tenant: "/tenant/dashboard",
    };

    return routes[userRole] || "/auth";
  };

  return (
    // <Helmet>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/auth"
          element={
            isAuthenticated ? (
              <Navigate to={getDefaultRoute()} replace />
            ) : (
              <Auth />
            )
          }
        />

        {/* Protected Routes */}
        <Route element={<Layout />}>
          {/* Admin Routes */}
          <Route path="/admin">
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="properties"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                    Properties Page - Coming Soon
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="tenants"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                    Tenants Page - Coming Soon
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="payments"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                    Payments Page - Coming Soon
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="complaints"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                    Complaints Page - Coming Soon
                  </div>
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Owner Routes */}
          <Route path="/owner">
            <Route index element={<Navigate to="/owner/dashboard" replace />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="properties"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                    Properties Management - Coming Soon
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="tenants"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                    Tenants Management - Coming Soon
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="payments"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                    Payments Management - Coming Soon
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="complaints"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                    Complaints Management - Coming Soon
                  </div>
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Tenant Routes */}
          <Route path="/tenant">
            <Route
              index
              element={<Navigate to="/tenant/dashboard" replace />}
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                  <TenantDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="room"
              element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                  <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                    Room Details - Coming Soon
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="payments"
              element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                  <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                    Payment History - Coming Soon
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="complaints"
              element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                  <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                    My Complaints - Coming Soon
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="notices"
              element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                  <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                    Notices Board - Coming Soon
                  </div>
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">
                  404
                </h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                  Page not found
                </p>
                <button
                  onClick={() => (window.location.href = getDefaultRoute())}
                  className="px-6 py-3 mt-6 text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                >
                  Go Home
                </button>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
    // </Helmet>
  );
}

export default App;
