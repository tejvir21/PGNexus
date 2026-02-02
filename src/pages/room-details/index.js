import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Users,
  IndianRupee,
  Home,
  Layers,
  Wind,
  Droplet,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  User,
} from "lucide-react";
import Button from "../../components/common/Button";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import RoomForm from "../../components/room-form/RoomForm";
import TenantForm from "../../components/tenant-form/TenantForm";
import PaymentForm from "../../components/payment-form/PaymentForm";
import { formatCurrency, formatDate } from "../../utils/helpers";

const RoomDetail = () => {
  const { id } = useParams();
  console.log('Room ID:', id);
  const navigate = useNavigate();
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [showTenantForm, setShowTenantForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  console.log(id);

  // Mock data - replace with actual data from your store/API
  const room = {
    id: "1",
    propertyId: "1",
    propertyName: "Green Valley PG",
    roomNumber: "101",
    floor: "Ground Floor",
    roomType: "single",
    capacity: 1,
    rent: 5500,
    area: 120,
    furnishing: "fully-furnished",
    status: "occupied",
    attachedBathroom: true,
    balcony: false,
    ac: true,
    description:
      "Spacious single occupancy room with attached bathroom and AC.",
  };

  const currentTenant = {
    id: "1",
    fullName: "Arun Kumar",
    email: "arun.kumar@email.com",
    phone: "9876543210",
    moveInDate: "2023-06-15",
    rentAmount: 5500,
    securityDeposit: 11000,
    idProofType: "aadhaar",
    idProofNumber: "1234-5678-9012",
    emergencyContactName: "Ramesh Kumar",
    emergencyContactPhone: "9876543211",
    occupation: "Software Engineer",
    companyName: "Tech Corp",
    status: "active",
  };

  const paymentHistory = [
    {
      id: "1",
      month: "2024-02",
      amount: 5500,
      lateFee: 0,
      discount: 0,
      totalAmount: 5500,
      paymentDate: "2024-02-05",
      paymentMethod: "upi",
      transactionId: "UPI123456",
      status: "paid",
    },
    {
      id: "2",
      month: "2024-01",
      amount: 5500,
      lateFee: 0,
      discount: 0,
      totalAmount: 5500,
      paymentDate: "2024-01-05",
      paymentMethod: "bank_transfer",
      transactionId: "TRF789012",
      status: "paid",
    },
    {
      id: "3",
      month: "2023-12",
      amount: 5500,
      lateFee: 100,
      discount: 0,
      totalAmount: 5600,
      paymentDate: "2023-12-08",
      paymentMethod: "cash",
      transactionId: null,
      status: "paid",
    },
  ];

  const getStatusIcon = (status) => {
    return status === "paid" ? CheckCircle2 : XCircle;
  };

  const getStatusColor = (status) => {
    return status === "paid" ? "text-green-600" : "text-red-600";
  };

  const getPaymentMethodLabel = (method) => {
    const labels = {
      cash: "Cash",
      upi: "UPI",
      bank_transfer: "Bank Transfer",
      card: "Card",
      cheque: "Cheque",
    };
    return labels[method] || method;
  };

  const totalPaid = paymentHistory.reduce(
    (sum, payment) => sum + payment.totalAmount,
    0,
  );

  return (
    <div className="pb-20 space-y-6 md:pb-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" icon={ArrowLeft} onClick={() => navigate(-1)} />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Room {room.roomNumber}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {room.propertyName} • {room.floor}
          </p>
        </div>
        <Button
          variant="outline"
          icon={Edit}
          onClick={() => setShowRoomForm(true)}
        >
          Edit Room
        </Button>
      </div>

      {/* Room Status */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Status
              </span>
              <Home className="w-5 h-5 text-gray-400" />
            </div>
            <Badge
              variant={
                room.status === "available"
                  ? "success"
                  : room.status === "occupied"
                    ? "info"
                    : "warning"
              }
              className="text-sm"
            >
              {room.status}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Monthly Rent
              </span>
              <IndianRupee className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-primary-600">
              {formatCurrency(room.rent)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Room Type
              </span>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-lg font-semibold text-gray-900 capitalize dark:text-gray-100">
              {room.roomType}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Area
              </span>
              <Layers className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {room.area} sq ft
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Room Details */}
        <Card>
          <CardHeader>
            <CardTitle>Room Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Room Number
              </span>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {room.roomNumber}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Floor
              </span>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {room.floor}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Capacity
              </span>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {room.capacity} {room.capacity === 1 ? "Person" : "Persons"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Furnishing
              </span>
              <p className="font-medium text-gray-900 capitalize dark:text-gray-100">
                {room.furnishing.replace("-", " ")}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Features
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Attached Bathroom
                    </span>
                  </div>
                  {room.attachedBathroom ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Balcony
                    </span>
                  </div>
                  {room.balcony ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Air Conditioner
                    </span>
                  </div>
                  {room.ac ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {room.description && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Description
                </span>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {room.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Tenant */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Current Tenant</CardTitle>
            {currentTenant ? (
              <Button
                variant="outline"
                size="sm"
                icon={Edit}
                onClick={() => setShowTenantForm(true)}
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowTenantForm(true)}
              >
                Assign Tenant
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {currentTenant ? (
              <div className="space-y-6">
                {/* Tenant Info */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Full Name
                    </span>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {currentTenant.fullName}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Status
                    </span>
                    <div className="mt-1">
                      <Badge
                        variant={
                          currentTenant.status === "active"
                            ? "success"
                            : "danger"
                        }
                      >
                        {currentTenant.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div>
                      <span className="block text-sm text-gray-600 dark:text-gray-400">
                        Phone
                      </span>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {currentTenant.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <div>
                      <span className="block text-sm text-gray-600 dark:text-gray-400">
                        Email
                      </span>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {currentTenant.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Move-in Date
                    </span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {formatDate(currentTenant.moveInDate)}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Occupation
                    </span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {currentTenant.occupation}
                    </p>
                  </div>
                </div>

                {/* Financial Details */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Financial Details
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Monthly Rent
                      </span>
                      <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                        {formatCurrency(currentTenant.rentAmount)}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Security Deposit
                      </span>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(currentTenant.securityDeposit)}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total Paid
                      </span>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {formatCurrency(totalPaid)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Emergency Contact
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <span className="block text-sm text-gray-600 dark:text-gray-400">
                          Name
                        </span>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {currentTenant.emergencyContactName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <div>
                        <span className="block text-sm text-gray-600 dark:text-gray-400">
                          Phone
                        </span>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {currentTenant.emergencyContactPhone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  No Tenant Assigned
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  This room is currently vacant
                </p>
                <Button
                  variant="primary"
                  onClick={() => setShowTenantForm(true)}
                >
                  Assign Tenant
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      {currentTenant && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Payment History ({paymentHistory.length})</CardTitle>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowPaymentForm(true)}
            >
              Record Payment
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                      Month
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                      Late Fee
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                      Total
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                      Payment Date
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                      Method
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => {
                    const StatusIcon = getStatusIcon(payment.status);
                    return (
                      <tr
                        key={payment.id}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          {new Date(payment.month).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          {formatCurrency(payment.amount)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                          {payment.lateFee > 0
                            ? formatCurrency(payment.lateFee)
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {formatCurrency(payment.totalAmount)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(payment.paymentDate)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                          {getPaymentMethodLabel(payment.paymentMethod)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <StatusIcon
                              className={`w-4 h-4 ${getStatusColor(payment.status)}`}
                            />
                            <span className="text-sm capitalize">
                              {payment.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Forms */}
      <RoomForm
        isOpen={showRoomForm}
        onClose={() => setShowRoomForm(false)}
        onSubmit={(data) => console.log("Room updated:", data)}
        properties={[{ id: room.propertyId, name: room.propertyName }]}
        rooms={[room]}
        initialData={room}
      />

      <TenantForm
        isOpen={showTenantForm}
        onClose={() => setShowTenantForm(false)}
        onSubmit={(data) => console.log("Tenant updated:", data)}
        properties={[{ id: room.propertyId, name: room.propertyName }]}
        rooms={[room]}
        initialData={currentTenant}
      />

      <PaymentForm
        isOpen={showPaymentForm}
        onClose={() => setShowPaymentForm(false)}
        onSubmit={(data) => console.log("Payment recorded:", data)}
        tenants={currentTenant ? [currentTenant] : []}
      />
    </div>
  );
};

export default RoomDetail;
