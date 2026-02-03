import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Home,
  Calendar,
} from "lucide-react";
import Button from "../../components/common/Button";
import Card, { CardContent } from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Input from "../../components/common/Input";
import TenantForm from "../../components/tenant-form/TenantForm";
import { formatCurrency, formatDate } from "../../utils/helpers";

const TenantsList = () => {
  const navigate = useNavigate();
  const [showTenantForm, setShowTenantForm] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data
  const [tenants, setTenants] = useState([
    {
      id: "1",
      fullName: "Arun Kumar",
      email: "arun.kumar@email.com",
      phone: "9876543210",
      propertyId: "1",
      propertyName: "Green Valley PG",
      roomId: "1",
      roomNumber: "101",
      moveInDate: "2023-06-15",
      rentAmount: 5500,
      securityDeposit: 11000,
      status: "active",
      occupation: "Software Engineer",
      companyName: "Tech Corp",
    },
    {
      id: "2",
      fullName: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "9876543211",
      propertyId: "2",
      propertyName: "Sunrise Residency",
      roomId: "5",
      roomNumber: "205",
      moveInDate: "2023-08-20",
      rentAmount: 6000,
      securityDeposit: 12000,
      status: "active",
      occupation: "Marketing Manager",
      companyName: "Brand Co",
    },
    {
      id: "3",
      fullName: "Rahul Verma",
      email: "rahul.verma@email.com",
      phone: "9876543212",
      propertyId: "3",
      propertyName: "Blue Haven",
      roomId: "8",
      roomNumber: "303",
      moveInDate: "2023-05-10",
      rentAmount: 4500,
      securityDeposit: 9000,
      status: "inactive",
      occupation: "Teacher",
      companyName: "ABC School",
    },
  ]);

  const handleAddTenant = (data) => {
    setTenants([...tenants, data]);
    console.log("Tenant added:", data);
  };

  const handleEditTenant = (data) => {
    setTenants(tenants.map((t) => (t.id === data.id ? data : t)));
    console.log("Tenant updated:", data);
  };

  const handleDeleteTenant = (id) => {
    if (window.confirm("Are you sure you want to remove this tenant?")) {
      setTenants(tenants.filter((t) => t.id !== id));
    }
  };

  const handleViewTenant = (tenantId) => {
    navigate(`/${window.location.pathname.split("/")[1]}/tenant/${tenantId}`);
  };

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.phone.includes(searchQuery) ||
      tenant.roomNumber.includes(searchQuery);
    const matchesStatus =
      filterStatus === "all" || tenant.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: tenants.length,
    active: tenants.filter((t) => t.status === "active").length,
    inactive: tenants.filter((t) => t.status === "inactive").length,
    totalRevenue: tenants
      .filter((t) => t.status === "active")
      .reduce((sum, t) => sum + t.rentAmount, 0),
  };

  return (
    <div className="pb-20 space-y-6 md:pb-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Tenants
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage all tenants
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => {
            setSelectedTenant(null);
            setShowTenantForm(true);
          }}
        >
          Add Tenant
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Tenants
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {stats.active}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Active
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">
              {stats.inactive}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Inactive
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary-600">
              {formatCurrency(stats.totalRevenue)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Monthly Revenue
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Search by name, email, phone, or room..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === "all"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("active")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === "active"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilterStatus("inactive")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === "inactive"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Tenants Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                    Tenant
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                    Property & Room
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                    Rent
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                    Move-in Date
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.map((tenant) => (
                  <tr
                    key={tenant.id}
                    className="transition-colors border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full bg-gradient-to-br from-primary-600 to-accent-600">
                          {tenant.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {tenant.fullName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {tenant.occupation}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="w-4 h-4" />
                          {tenant.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="w-4 h-4" />
                          {tenant.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {tenant.propertyName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Room {tenant.roomNumber}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-primary-600">
                        {formatCurrency(tenant.rentAmount)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        /month
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {formatDate(tenant.moveInDate)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge
                        variant={
                          tenant.status === "active" ? "success" : "danger"
                        }
                      >
                        {tenant.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Eye}
                          onClick={() => handleViewTenant(tenant.id)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Edit}
                          onClick={() => {
                            setSelectedTenant(tenant);
                            setShowTenantForm(true);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Trash2}
                          onClick={() => handleDeleteTenant(tenant.id)}
                          className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredTenants.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                No Tenants Found
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                {searchQuery
                  ? "Try adjusting your search criteria"
                  : "Get started by adding your first tenant"}
              </p>
              {!searchQuery && (
                <Button
                  variant="primary"
                  icon={Plus}
                  onClick={() => {
                    setSelectedTenant(null);
                    setShowTenantForm(true);
                  }}
                >
                  Add Tenant
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tenant Form Modal */}
      <TenantForm
        isOpen={showTenantForm}
        onClose={() => {
          setShowTenantForm(false);
          setSelectedTenant(null);
        }}
        onSubmit={selectedTenant ? handleEditTenant : handleAddTenant}
        properties={[
          { id: "1", name: "Green Valley PG" },
          { id: "2", name: "Sunrise Residency" },
        ]}
        rooms={[
          { id: "1", propertyId: "1", roomNumber: "101", status: "available" },
          { id: "2", propertyId: "1", roomNumber: "102", status: "available" },
        ]}
        initialData={selectedTenant}
      />
    </div>
  );
};

export default TenantsList;
