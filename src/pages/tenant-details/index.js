import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  Home,
  IndianRupee,
  CheckCircle2,
  Building2,
} from "lucide-react";
import Button from "../../components/common/Button";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import TenantForm from "../../components/tenant-form/TenantForm";
import PaymentForm from "../../components/payment-form/PaymentForm";
import { formatCurrency, formatDate } from "../../utils/helpers";

const TenantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTenantForm, setShowTenantForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  console.log(id);

  // Mock data
  const tenant = {
    id: "1",
    fullName: "Arun Kumar",
    email: "arun.kumar@email.com",
    phone: "9876543210",
    alternatePhone: "9876543211",
    propertyId: "1",
    propertyName: "Green Valley PG",
    roomId: "1",
    roomNumber: "101",
    moveInDate: "2023-06-15",
    rentAmount: 5500,
    securityDeposit: 11000,
    idProofType: "aadhaar",
    idProofNumber: "1234-5678-9012",
    emergencyContactName: "Ramesh Kumar",
    emergencyContactPhone: "9876543212",
    occupation: "Software Engineer",
    companyName: "Tech Corp",
    permanentAddress: "123, ABC Street, XYZ City, State - 123456",
    status: "active",
  };

  const paymentHistory = [
    {
      id: "1",
      month: "2024-02",
      amount: 5500,
      paymentDate: "2024-02-05",
      paymentMethod: "upi",
      transactionId: "UPI123456",
      status: "paid",
    },
    {
      id: "2",
      month: "2024-01",
      amount: 5500,
      paymentDate: "2024-01-05",
      paymentMethod: "bank_transfer",
      transactionId: "TRF789012",
      status: "paid",
    },
    {
      id: "3",
      month: "2023-12",
      amount: 5600,
      paymentDate: "2023-12-08",
      paymentMethod: "cash",
      status: "paid",
    },
  ];

  const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0);
  const daysStayed = Math.floor(
    (new Date() - new Date(tenant.moveInDate)) / (1000 * 60 * 60 * 24),
  );

  return (
    <div className="pb-20 space-y-6 md:pb-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" icon={ArrowLeft} onClick={() => navigate(-1)} />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {tenant.fullName}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {tenant.propertyName} - Room {tenant.roomNumber}
          </p>
        </div>
        <Button
          variant="outline"
          icon={Edit}
          onClick={() => setShowTenantForm(true)}
        >
          Edit Details
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {daysStayed}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Days Stayed
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary-600">
              {formatCurrency(tenant.rentAmount)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Monthly Rent
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalPaid)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Paid
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(tenant.securityDeposit)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Deposit
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Full Name
                </span>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {tenant.fullName}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Status
                </span>
                <div className="mt-1">
                  <Badge
                    variant={tenant.status === "active" ? "success" : "danger"}
                  >
                    {tenant.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Phone
                  </span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {tenant.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Email
                  </span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {tenant.email}
                  </p>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ID Proof
                </span>
                <p className="font-medium text-gray-900 capitalize dark:text-gray-100">
                  {tenant.idProofType} - {tenant.idProofNumber}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Move-in Date
                </span>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {formatDate(tenant.moveInDate)}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Employment Details
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Occupation
                  </span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {tenant.occupation}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Company
                  </span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {tenant.companyName}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Permanent Address
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {tenant.permanentAddress}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Room & Emergency Contact */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                <Building2 className="w-5 h-5 text-primary-600" />
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Property
                  </span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {tenant.propertyName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Home className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Room Number
                  </span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {tenant.roomNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <IndianRupee className="w-5 h-5 text-green-600" />
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly Rent
                  </span>
                  <p className="font-semibold text-green-600">
                    {formatCurrency(tenant.rentAmount)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Name
                  </span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {tenant.emergencyContactName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Phone
                  </span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {tenant.emergencyContactPhone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Payment History</CardTitle>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowPaymentForm(true)}
          >
            Record Payment
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 transition-colors border border-gray-200 rounded-lg dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg dark:bg-green-900/30">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {new Date(payment.month).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Paid on {formatDate(payment.paymentDate)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-gray-100">
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

      {/* Forms */}
      <TenantForm
        isOpen={showTenantForm}
        onClose={() => setShowTenantForm(false)}
        onSubmit={(data) => console.log("Tenant updated:", data)}
        properties={[{ id: tenant.propertyId, name: tenant.propertyName }]}
        rooms={[
          {
            id: tenant.roomId,
            roomNumber: tenant.roomNumber,
            propertyId: tenant.propertyId,
          },
        ]}
        initialData={tenant}
      />

      <PaymentForm
        isOpen={showPaymentForm}
        onClose={() => setShowPaymentForm(false)}
        onSubmit={(data) => console.log("Payment recorded:", data)}
        tenants={[tenant]}
      />
    </div>
  );
};

export default TenantDetail;
