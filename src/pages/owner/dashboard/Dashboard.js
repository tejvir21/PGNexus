import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  IndianRupee,
  Home,
  BedDouble,
  UserCheck,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import StatCard from "../../../components/common/StatCard";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/common/Card";
import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import { formatCurrency, formatDate } from "../../../utils/helpers";
import PropertyForm from "../../../components/pg-form/PropertyForm";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [isPropertyFormOpen, setIsPropertyFormOpen] = useState(false);
  const stats = [
    {
      title: "My Properties",
      value: "3",
      icon: Building2,
      color: "primary",
      onClick: () => navigate("/owner/properties"),
    },
    {
      title: "Total Rooms",
      value: "28",
      icon: BedDouble,
      color: "success",
    },
    {
      title: "Active Tenants",
      value: "22",
      icon: UserCheck,
      color: "info",
      onClick: () => navigate("/owner/tenants"),
    },
    {
      title: "This Month Revenue",
      value: "₹1.2L",
      icon: IndianRupee,
      trend: "up",
      trendValue: "+10%",
      color: "purple",
      onClick: () => navigate("/owner/payments"),
    },
  ];

  const myProperties = [
    {
      id: 1,
      name: "Green Valley PG",
      address: "Sector 15, Noida",
      totalRooms: 12,
      occupied: 10,
      available: 2,
      revenue: 52000,
      status: "active",
    },
    {
      id: 2,
      name: "Sunrise Residency",
      address: "Gomti Nagar, Lucknow",
      totalRooms: 10,
      occupied: 8,
      available: 2,
      revenue: 38000,
      status: "active",
    },
    {
      id: 3,
      name: "Peaceful Heights",
      address: "Civil Lines, Allahabad",
      totalRooms: 6,
      occupied: 4,
      available: 2,
      revenue: 24000,
      status: "active",
    },
  ];

  const recentPayments = [
    {
      id: 1,
      tenant: "Arun Kumar",
      room: "Room 101",
      amount: 5500,
      date: "2024-02-01",
      status: "paid",
    },
    {
      id: 2,
      tenant: "Priya Sharma",
      room: "Room 205",
      amount: 6000,
      date: "2024-01-31",
      status: "paid",
    },
    {
      id: 3,
      tenant: "Rahul Verma",
      room: "Room 303",
      amount: 5000,
      date: "2024-01-30",
      status: "pending",
    },
    {
      id: 4,
      tenant: "Neha Gupta",
      room: "Room 102",
      amount: 5500,
      date: "2024-01-28",
      status: "overdue",
    },
  ];

  const openComplaints = [
    {
      id: 1,
      tenant: "Arun Kumar",
      pg: "Green Valley PG",
      issue: "Water supply issue",
      priority: "high",
      date: "2024-02-01",
    },
    {
      id: 2,
      tenant: "Sneha Reddy",
      pg: "Sunrise Residency",
      issue: "AC not working",
      priority: "medium",
      date: "2024-01-31",
    },
  ];

  return (
    <div className="pb-20 space-y-6 md:pb-6">
      <div className="animate-slide-down">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Owner Dashboard
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Manage your properties and tenants
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up">
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={stat.onClick}
            className={stat.onClick ? "cursor-pointer" : ""}
          >
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* My Properties */}
      <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Properties</CardTitle>
          <Button size="sm" icon={Building2}>
            <span onClick={() => setIsPropertyFormOpen(true)}>
              Add Property
            </span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myProperties.map((property) => (
              <div
                key={property.id}
                className="p-4 transition-all border border-gray-200 cursor-pointer dark:border-gray-800 rounded-xl hover:shadow-md"
                onClick={() =>
                  navigate(
                    `/${window.location.pathname?.split("/")[1]}/properties/${property.id}`,
                  )
                }
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="success">{property.status}</Badge>
                </div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                  {property.name}
                </h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  {property.address}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Rooms
                    </span>
                    <span className="font-medium">{property.totalRooms}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Occupied
                    </span>
                    <span className="font-medium text-green-600">
                      {property.occupied}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Available
                    </span>
                    <span className="font-medium text-blue-600">
                      {property.available}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Revenue
                      </span>
                      <span className="font-semibold text-primary-600">
                        {formatCurrency(property.revenue)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Payments */}
        <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Payments</CardTitle>
            <span
              onClick={() =>
                navigate(`/${window.location.pathname?.split("/")[1]}/payments`)
              }
            >
              <button className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700">
                View All
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </span>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 transition-colors border border-gray-200 rounded-lg dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                      <IndianRupee className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {payment.tenant}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {payment.room}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {formatCurrency(payment.amount)}
                    </p>
                    <Badge
                      variant={
                        payment.status === "paid"
                          ? "success"
                          : payment.status === "pending"
                            ? "warning"
                            : "danger"
                      }
                      size="sm"
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Open Complaints */}
        <Card className="animate-slide-up" style={{ animationDelay: "400ms" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Open Complaints</CardTitle>
            <span
              onClick={() =>
                navigate(
                  `/${window.location.pathname?.split("/")[1]}/complaints`,
                )
              }
            >
              <button className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700">
                View All
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </span>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {openComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="p-4 transition-colors border border-gray-200 rounded-lg dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {complaint.issue}
                    </h4>
                    <Badge
                      variant={
                        complaint.priority === "high" ? "danger" : "warning"
                      }
                      size="sm"
                    >
                      {complaint.priority}
                    </Badge>
                  </div>
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                    {complaint.tenant} • {complaint.pg}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(complaint.date)}</span>
                    </span>
                    <Button size="sm" variant="outline">
                      Resolve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <PropertyForm
        isOpen={isPropertyFormOpen}
        onClose={() => setIsPropertyFormOpen(false)}
        onSubmit={() => setIsPropertyFormOpen(false)}
        initialData={null}
      />
    </div>
  );
};

export default OwnerDashboard;
