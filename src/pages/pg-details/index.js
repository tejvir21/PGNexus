import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  User,
  BedDouble,
  Users,
  IndianRupee,
  ArrowLeft,
  Edit,
  Plus,
  Eye,
  Wifi,
  Home,
} from "lucide-react";
import Button from "../../components/common/Button";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import PropertyForm from "../../components/pg-form/PropertyForm";
import RoomForm from "../../components/room-form/RoomForm";
import StatCard from "../../components/common/StatCard";
import { formatCurrency } from "../../utils/helpers";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  console.log(id);
  // Mock data - replace with actual data from your store/API
  const property = {
    id: "1",
    name: "Green Valley PG",
    address: "Sector 15, Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301",
    propertyType: "boys",
    totalRooms: 12,
    occupiedRooms: 10,
    availableRooms: 2,
    contactPerson: "Rajesh Kumar",
    contactNumber: "9876543210",
    contactEmail: "rajesh@greenvalley.com",
    securityDeposit: 10000,
    maintenanceCharge: 1000,
    amenities: [
      "WiFi",
      "AC",
      "Parking",
      "Laundry",
      "Meals",
      "Power Backup",
      "Security",
      "CCTV",
    ],
    description:
      "Well-maintained PG with all modern amenities in a prime location.",
    monthlyRevenue: 52000,
    status: "active",
    createdAt: "2023-06-15",
  };

  const [rooms, setRooms] = useState([
    {
      id: "1",
      propertyId: "1",
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
      tenant: { name: "Arun Kumar", phone: "9876543210" },
    },
    {
      id: "2",
      propertyId: "1",
      roomNumber: "102",
      floor: "Ground Floor",
      roomType: "double",
      capacity: 2,
      rent: 4000,
      area: 150,
      furnishing: "semi-furnished",
      status: "occupied",
      attachedBathroom: true,
      balcony: true,
      ac: false,
      tenant: { name: "Priya Sharma", phone: "9876543211" },
    },
    {
      id: "3",
      propertyId: "1",
      roomNumber: "201",
      floor: "1st Floor",
      roomType: "single",
      capacity: 1,
      rent: 6000,
      area: 130,
      furnishing: "fully-furnished",
      status: "available",
      attachedBathroom: true,
      balcony: true,
      ac: true,
      tenant: null,
    },
    {
      id: "4",
      propertyId: "1",
      roomNumber: "202",
      floor: "1st Floor",
      roomType: "triple",
      capacity: 3,
      rent: 3500,
      area: 180,
      furnishing: "unfurnished",
      status: "maintenance",
      attachedBathroom: false,
      balcony: false,
      ac: false,
      tenant: null,
    },
  ]);

  const handleAddRoom = (data) => {
    setRooms([...rooms, data]);
    console.log("Room added:", data);
  };

  const handleEditRoom = (data) => {
    setRooms(rooms.map((r) => (r.id === data.id ? data : r)));
    console.log("Room updated:", data);
  };

  const handleViewRoom = (roomId) => {
    navigate(`/${window.location.pathname?.split("/")[1]}/room/${roomId}`);
  };

  const stats = [
    {
      title: "Total Rooms",
      value: property.totalRooms.toString(),
      icon: BedDouble,
      color: "primary",
      to: `#`,
    },
    {
      title: "Occupied",
      value: property.occupiedRooms.toString(),
      icon: Users,
      color: "success",
      trend: "up",
      trendValue: "83%",
      to: "#",
    },
    {
      title: "Available",
      value: property.availableRooms.toString(),
      icon: Home,
      color: "info",
      to: "#",
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(property.monthlyRevenue),
      icon: IndianRupee,
      color: "purple",
      trend: "up",
      trendValue: "+12%",
      to: `/${window.location.pathname?.split("/")[1]}/payments`,
    },
  ];

  const amenityIcons = {
    WiFi: Wifi,
    AC: Home,
    Parking: Home,
    Laundry: Home,
    Meals: Home,
    "Power Backup": Home,
    Security: Home,
    CCTV: Home,
  };

  return (
    <div className="pb-20 space-y-6 md:pb-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" icon={ArrowLeft} onClick={() => navigate(-1)} />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {property.name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">
              {property.address}, {property.city}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          icon={Edit}
          onClick={() => setShowPropertyForm(true)}
        >
          Edit Property
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Property Type
                  </span>
                  <p className="font-medium text-gray-900 capitalize dark:text-gray-100">
                    {property.propertyType} PG
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Status
                  </span>
                  <div className="mt-1">
                    <Badge
                      variant={
                        property.status === "active" ? "success" : "danger"
                      }
                    >
                      {property.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Security Deposit
                  </span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(property.securityDeposit)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Maintenance Charge
                  </span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(property.maintenanceCharge)}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Contact Person
                    </span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {property.contactPerson}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Phone
                    </span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {property.contactNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Email
                    </span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {property.contactEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {property.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {property.amenities.map((amenity) => {
                const Icon = amenityIcons[amenity] || Home;
                return (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <Icon className="w-5 h-5 text-primary-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {amenity}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rooms Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Rooms ({rooms.length})</CardTitle>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => {
              setSelectedRoom(null);
              setShowRoomForm(true);
            }}
          >
            Add Room
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="p-4 transition-all border border-gray-200 cursor-pointer dark:border-gray-800 rounded-xl hover:shadow-md"
                onClick={() => handleViewRoom(room.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600">
                    <BedDouble className="w-6 h-6 text-white" />
                  </div>
                  <Badge
                    variant={
                      room.status === "available"
                        ? "success"
                        : room.status === "occupied"
                          ? "info"
                          : "warning"
                    }
                  >
                    {room.status}
                  </Badge>
                </div>

                <h4 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Room {room.roomNumber}
                </h4>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  {room.floor} • {room.roomType}
                </p>

                <div className="mb-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Rent
                    </span>
                    <span className="font-semibold text-primary-600">
                      {formatCurrency(room.rent)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Area
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {room.area} sq ft
                    </span>
                  </div>
                </div>

                {room.tenant && (
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {room.tenant.name}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-3 mt-3 border-t border-gray-200 dark:border-gray-800">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    icon={Eye}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewRoom(room.id);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Edit}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRoom(room);
                      setShowRoomForm(true);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Property Form Modal */}
      <PropertyForm
        isOpen={showPropertyForm}
        onClose={() => setShowPropertyForm(false)}
        onSubmit={(data) => console.log("Property updated:", data)}
        initialData={property}
      />

      {/* Room Form Modal */}
      <RoomForm
        isOpen={showRoomForm}
        onClose={() => {
          setShowRoomForm(false);
          setSelectedRoom(null);
        }}
        onSubmit={selectedRoom ? handleEditRoom : handleAddRoom}
        properties={[property]}
        rooms={rooms}
        initialData={selectedRoom}
      />
    </div>
  );
};

export default PropertyDetail;
