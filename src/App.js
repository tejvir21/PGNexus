// import logo from "./logo.svg";
import "./App.css";
import Auth from "./pages/auth";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
// import { Helmet } from "react-helmet";
import { useAuthStore } from "./store";
import Layout from "./layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

// Admin Pages
import AdminDashboard from "./pages/admin/dashboard/Dashboard";
import AdminProperties from "./pages/admin/pgs/Properties";
import AdminTenants from "./pages/admin/tenants/Tenants";
import AdminPayments from "./pages/admin/payments/Payments";
import AdminComplaints from "./pages/admin/complaints/Complaints";

// Owner Pages
import OwnerDashboard from "./pages/owner/dashboard/Dashboard";
import OwnerProperties from "./pages/owner/pgs/Properties";
import OwnerTenants from "./pages/owner/tenants/Tenants";
import OwnerPayments from "./pages/owner/payments/Payments";
import OwnerComplaints from "./pages/owner/complaints/Complaints";

// Tenant Pages
import TenantDashboard from "./pages/tenant/dashboard/Dashboard";
import TenantRoom from "./pages/tenant/room/Room";
import TenantPayments from "./pages/tenant/payments/Payments";
import TenantComplaints from "./pages/tenant/complaints/Complaints";
import TenantNotices from "./pages/tenant/notices/Notices";

// Import styles
import "./styles/globals.css";

// Demo Pages
import FormsDemo from "./pages/FormsDemo";

// Property Pages
import PropertiesList from "./pages/pgs";
import PropertyDetail from "./pages/pg-details";

// Room Pages
import RoomDetail from "./pages/room-details";

// Tenant Pages
import TenantsList from "./pages/tenants";
import TenantDetail from "./pages/tenant-details";

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
                  <AdminProperties />
                </ProtectedRoute>
              }
            />
            <Route
              path="properties/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <PropertyDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="tenants"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminTenants />
                </ProtectedRoute>
              }
            />
            <Route
              path="tenant/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <TenantDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="payments"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminPayments />
                </ProtectedRoute>
              }
            />
            <Route
              path="complaints"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminComplaints />
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
                  <OwnerProperties />
                </ProtectedRoute>
              }
            />
            <Route
              path="properties/:id"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <PropertyDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="room/:id"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <RoomDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="tenants"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <OwnerTenants />
                </ProtectedRoute>
              }
            />
            <Route
              path="tenant/:id"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <TenantDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="payments"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <OwnerPayments />
                </ProtectedRoute>
              }
            />
            <Route
              path="complaints"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <OwnerComplaints />
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
                  <TenantRoom />
                </ProtectedRoute>
              }
            />
            <Route
              path="room/:id"
              element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                  <RoomDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="payments"
              element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                  <TenantPayments />
                </ProtectedRoute>
              }
            />
            <Route
              path="complaints"
              element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                  <TenantComplaints />
                </ProtectedRoute>
              }
            />
            <Route
              path="notices"
              element={
                <ProtectedRoute allowedRoles={["tenant"]}>
                  <TenantNotices />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

        {/* Forms Demo Route */}
        <Route path="/forms" element={<FormsDemo />} />

        {/* Property Routes */}
        <Route path="/properties" element={<PropertiesList />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />

        {/* Room Routes */}
        <Route path="/rooms/:id" element={<RoomDetail />} />

        {/* Tenant Routes */}
        <Route path="/tenants" element={<TenantsList />} />
        <Route path="/tenants/:id" element={<TenantDetail />} />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">
                  404
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
                  Page not found
                </p>
                <button
                  onClick={() => (window.location.href = getDefaultRoute())}
                  className="mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
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
