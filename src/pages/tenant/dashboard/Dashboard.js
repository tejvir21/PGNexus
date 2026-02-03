import React, { useState } from "react";
import {
  Home,
  IndianRupee,
  AlertCircle,
  BedDouble,
  Wifi,
  Wind,
  Droplet,
  Calendar,
  CheckCircle2,
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
import { useNavigate } from "react-router-dom";
import ComplaintForm from "../../../components/complaint-form/ComplaintForm";

const TenantDashboard = () => {
  const navigate = useNavigate();
  const [openComplaintForm, setOpenComplaintForm] = useState(false);
  const stats = [
    {
      title: "Monthly Rent",
      value: "₹5,500",
      icon: IndianRupee,
      color: "primary",
    },
    {
      title: "Pending Complaints",
      value: "1",
      icon: AlertCircle,
      color: "warning",
    },
    { title: "Days Until Payment", value: "5", icon: Calendar, color: "info" },
    {
      title: "Maintenance Paid",
      value: "✓",
      icon: CheckCircle2,
      color: "success",
    },
  ];

  const roomDetails = {
    number: "Room 205",
    floor: "2nd Floor",
    pg: "Green Valley PG",
    address: "Sector 15, Noida",
    rent: 5500,
    deposit: 11000,
    amenities: ["WiFi", "AC", "Attached Bathroom", "Laundry", "Meals Included"],
    joinedDate: "2023-06-15",
  };

  const paymentHistory = [
    {
      id: 1,
      month: "January 2024",
      amount: 5500,
      date: "2024-01-05",
      status: "paid",
    },
    {
      id: 2,
      month: "December 2023",
      amount: 5500,
      date: "2023-12-05",
      status: "paid",
    },
    {
      id: 3,
      month: "November 2023",
      amount: 5500,
      date: "2023-11-05",
      status: "paid",
    },
    {
      id: 4,
      month: "October 2023",
      amount: 5500,
      date: "2023-10-05",
      status: "paid",
    },
  ];

  const myComplaints = [
    {
      id: 1,
      issue: "Water supply issue",
      status: "open",
      priority: "high",
      date: "2024-02-01",
      response: null,
    },
    {
      id: 2,
      issue: "AC making noise",
      status: "resolved",
      priority: "medium",
      date: "2024-01-28",
      response: "AC has been serviced",
    },
  ];

  const notices = [
    {
      id: 1,
      title: "Electricity Maintenance",
      content: "Power will be off from 10 AM to 2 PM on Sunday",
      date: "2024-02-03",
      priority: "high",
    },
    {
      id: 2,
      title: "Rent Due Date Reminder",
      content: "Monthly rent is due by 5th of every month",
      date: "2024-02-01",
      priority: "medium",
    },
    {
      id: 3,
      title: "New WiFi Password",
      content:
        "WiFi password has been updated. Contact management for new password",
      date: "2024-01-30",
      priority: "low",
    },
  ];

  const amenityIcons = {
    WiFi: Wifi,
    AC: Wind,
    "Attached Bathroom": Droplet,
    Laundry: Home,
    "Meals Included": Home,
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="animate-slide-down">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Welcome Back!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {roomDetails.pg} - {roomDetails.number}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
        {stats.map((stat, index) => (
          <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Room Details */}
        <Card
          className="lg:col-span-2 animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          <CardHeader>
            <CardTitle>My Room Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <BedDouble className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {roomDetails.number}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {roomDetails.floor}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {roomDetails.pg}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {roomDetails.address}
                  </p>
                </div>
                <span
                  onClick={() =>
                    navigate(
                      `/${window.location.pathname?.split("/")[1]}/room/${101 || roomDetails.number}`,
                    )
                  }
                >
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </span>
              </div>

              {/* Financial Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly Rent
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {formatCurrency(roomDetails.rent)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Security Deposit
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {formatCurrency(roomDetails.deposit)}
                  </p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Amenities
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {roomDetails.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || Home;
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20"
                      >
                        <Icon className="w-4 h-4 text-primary-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button variant="primary" icon={IndianRupee}>
                  Pay Rent
                </Button>
                <Button variant="outline" icon={AlertCircle}>
                  <span onClick={() => setOpenComplaintForm(true)}>
                    Raise Complaint
                  </span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <CardTitle>Recent Notices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notices.slice(0, 3).map((notice) => (
                <div
                  key={notice.id}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      {notice.title}
                    </h4>
                    <Badge
                      variant={
                        notice.priority === "high"
                          ? "danger"
                          : notice.priority === "medium"
                            ? "warning"
                            : "info"
                      }
                      size="sm"
                    >
                      {notice.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {notice.content}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {formatDate(notice.date)}
                  </p>
                </div>
              ))}
            </div>
            <span
              onClick={() =>
                navigate(`/${window.location.pathname?.split("/")[1]}/notices`)
              }
            >
              <Button variant="outline" fullWidth size="sm" className="mt-3">
                View All Notices
              </Button>
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment History */}
        <Card className="animate-slide-up" style={{ animationDelay: "400ms" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1">
              <span
                onClick={() =>
                  navigate(
                    `/${window.location.pathname?.split("/")[1]}/payments`,
                  )
                }
              >
                View All
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <IndianRupee className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {payment.month}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Paid on {formatDate(payment.date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {formatCurrency(payment.amount)}
                    </p>
                    <Badge variant="success" size="sm">
                      Paid
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Complaints */}
        <Card className="animate-slide-up" style={{ animationDelay: "500ms" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Complaints</CardTitle>
            <span
              onClick={() =>
                navigate(
                  `/${window.location.pathname?.split("/")[1]}/complaints`,
                )
              }
            >
              <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1">
                View All
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </span>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {complaint.issue}
                    </h4>
                    <Badge
                      variant={
                        complaint.status === "open"
                          ? "warning"
                          : complaint.status === "resolved"
                            ? "success"
                            : "info"
                      }
                      size="sm"
                    >
                      {complaint.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Filed on {formatDate(complaint.date)}
                  </p>
                  {complaint.response && (
                    <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-xs text-green-700 dark:text-green-300">
                        Response: {complaint.response}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              <span onClick={() => setOpenComplaintForm(true)}>
                <Button variant="primary" fullWidth icon={AlertCircle}>
                  Raise New Complaint
                </Button>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Complaint Form Modal */}

      <ComplaintForm
        isOpen={openComplaintForm}
        onClose={() => setOpenComplaintForm(false)}
        onSubmit={() => setOpenComplaintForm(false)}
        initialData={null}
      />
    </div>
  );
};

export default TenantDashboard;
