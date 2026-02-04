import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Users,
  BedDouble,
  Plus,
  Edit,
  Eye,
  Home,
} from "lucide-react";
import Button from "../../../components/common/Button";
import Card, { CardContent } from "../../../components/common/Card";
import Badge from "../../../components/common/Badge";
import PropertyForm from "../../../components/pg-form/PropertyForm";
import { formatCurrency } from "../../../utils/helpers";

const OwnerProperties = () => {
  const navigate = useNavigate();
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Mock data - replace with actual data from your store/API
  const [properties, setProperties] = useState([
    {
      id: "1",
      name: "Green Valley PG",
      address: "Sector 15, Noida",
      city: "Noida",
      state: "Uttar Pradesh",
      propertyType: "boys",
      totalRooms: 12,
      occupiedRooms: 10,
      availableRooms: 2,
      monthlyRevenue: 52000,
      status: "active",
    },
    {
      id: "2",
      name: "Sunrise Residency",
      address: "Gomti Nagar, Lucknow",
      city: "Lucknow",
      state: "Uttar Pradesh",
      propertyType: "girls",
      totalRooms: 10,
      occupiedRooms: 8,
      availableRooms: 2,
      monthlyRevenue: 38000,
      status: "active",
    },
    {
      id: "3",
      name: "Peaceful Heights",
      address: "Civil Lines, Allahabad",
      city: "Allahabad",
      state: "Uttar Pradesh",
      propertyType: "co-living",
      totalRooms: 6,
      occupiedRooms: 4,
      availableRooms: 2,
      monthlyRevenue: 24000,
      status: "active",
    },
  ]);

  const handleAddProperty = (data) => {
    setProperties([...properties, data]);
    console.log("Property added:", data);
  };

  const handleEditProperty = (data) => {
    setProperties(properties.map((p) => (p.id === data.id ? data : p)));
    console.log("Property updated:", data);
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/owner/properties/${propertyId}`);
  };

  const getOccupancyPercentage = (property) => {
    return Math.round((property.occupiedRooms / property.totalRooms) * 100);
  };

  const stats = {
    total: properties.length,
    totalRooms: properties.reduce((sum, p) => sum + p.totalRooms, 0),
    occupiedRooms: properties.reduce((sum, p) => sum + p.occupiedRooms, 0),
    totalRevenue: properties.reduce((sum, p) => sum + p.monthlyRevenue, 0),
  };

  return (
    <div className="pb-20 space-y-6 md:pb-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            My Properties
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage your PG properties
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => {
            setSelectedProperty(null);
            setShowPropertyForm(true);
          }}
        >
          Add Property
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
              Total Properties
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.totalRooms}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Rooms
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {stats.occupiedRooms}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Occupied
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

      {/* Properties Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => {
          const occupancyPercentage = getOccupancyPercentage(property);

          return (
            <Card key={property.id} hover>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl">
                    <Building2 className="text-white w-7 h-7" />
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant={
                        property.status === "active" ? "success" : "danger"
                      }
                    >
                      {property.status}
                    </Badge>
                    <Badge variant="info" className="capitalize">
                      {property.propertyType}
                    </Badge>
                  </div>
                </div>

                {/* Property Details */}
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {property.name}
                </h3>
                <div className="flex items-center mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.address}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Rooms
                      </span>
                      <BedDouble className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {property.totalRooms}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Tenants
                      </span>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {property.occupiedRooms}
                    </div>
                  </div>
                </div>

                {/* Occupancy */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Occupancy
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {occupancyPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        occupancyPercentage === 100
                          ? "bg-green-500"
                          : occupancyPercentage >= 75
                            ? "bg-blue-500"
                            : occupancyPercentage >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                      }`}
                      style={{ width: `${occupancyPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Revenue */}
                <div className="flex items-center justify-between p-3 mb-4 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Monthly Revenue
                  </span>
                  <span className="font-bold text-primary-600 dark:text-primary-400">
                    {formatCurrency(property.monthlyRevenue)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Eye}
                    fullWidth
                    onClick={() => handleViewProperty(property.id)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Edit}
                    onClick={() => {
                      setSelectedProperty(property);
                      setShowPropertyForm(true);
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {properties.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Home className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
              No Properties Yet
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Get started by adding your first property
            </p>
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => {
                setSelectedProperty(null);
                setShowPropertyForm(true);
              }}
            >
              Add Property
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Property Form Modal */}
      <PropertyForm
        isOpen={showPropertyForm}
        onClose={() => {
          setShowPropertyForm(false);
          setSelectedProperty(null);
        }}
        onSubmit={selectedProperty ? handleEditProperty : handleAddProperty}
        initialData={selectedProperty}
      />
    </div>
  );
};

export default OwnerProperties;
