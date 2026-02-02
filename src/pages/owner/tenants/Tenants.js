import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  Plus,
  Eye,
  Edit,
  Phone,
  Mail,
  Home,
  Calendar,
} from "lucide-react";
import Button from "../../../components/common/Button";
import Card, { CardContent } from "../../../components/common/Card";
import Badge from "../../../components/common/Badge";
import Input from "../../../components/common/Input";
import TenantForm from "../../../components/tenant-form/TenantForm";
import { formatCurrency, formatDate } from "../../../utils/helpers";

const OwnerTenants = () => {
  const navigate = useNavigate();
  const [showTenantForm, setShowTenantForm] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProperty, setFilterProperty] = useState("all");

  // Mock data - only tenants for this owner's properties
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
      status: "active",
      occupation: "Software Engineer",
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
      status: "active",
      occupation: "Marketing Manager",
    },
  ]);

  const myProperties = [
    { id: "1", name: "Green Valley PG" },
    { id: "2", name: "Sunrise Residency" },
    { id: "3", name: "Peaceful Heights" },
  ];

  const handleAddTenant = (data) => {
    setTenants([...tenants, data]);
    console.log("Tenant added:", data);
  };

  const handleEditTenant = (data) => {
    setTenants(tenants.map((t) => (t.id === data.id ? data : t)));
    console.log("Tenant updated:", data);
  };

  const handleViewTenant = (tenantId) => {
    navigate(`/${window.location.pathname?.split("/")[1]}/tenant/${tenantId}`);
  };

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.phone.includes(searchQuery);
    const matchesProperty =
      filterProperty === "all" || tenant.propertyId === filterProperty;
    return matchesSearch && matchesProperty;
  });

  const stats = {
    total: tenants.length,
    active: tenants.filter((t) => t.status === "active").length,
    totalRevenue: tenants
      .filter((t) => t.status === "active")
      .reduce((sum, t) => sum + t.rentAmount, 0),
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            My Tenants
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage tenants across all your properties
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterProperty("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterProperty === "all"
                ? "bg-primary-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            All Properties
          </button>
          {myProperties.map((prop) => (
            <button
              key={prop.id}
              onClick={() => setFilterProperty(prop.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterProperty === prop.id
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {prop.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tenants Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tenant
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property & Room
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Rent
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Move-in Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.map((tenant) => (
                  <tr
                    key={tenant.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-white font-semibold">
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
                    <td className="py-4 px-4">
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
                    <td className="py-4 px-4">
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
                    <td className="py-4 px-4">
                      <div className="font-semibold text-primary-600">
                        {formatCurrency(tenant.rentAmount)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        /month
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {formatDate(tenant.moveInDate)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          tenant.status === "active" ? "success" : "danger"
                        }
                      >
                        {tenant.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No Tenants Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery
                  ? "Try adjusting your search"
                  : "Add your first tenant to get started"}
              </p>
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
        properties={myProperties}
        rooms={[]}
        initialData={selectedTenant}
      />
    </div>
  );
};

export default OwnerTenants;
