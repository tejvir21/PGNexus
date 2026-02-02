import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Users, 
  BedDouble, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card, { CardContent } from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import PropertyForm from '../../components/pg-form/PropertyForm';
import { formatCurrency } from '../../utils/helpers';

const PropertiesList = () => {
  const navigate = useNavigate();
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock data - replace with actual data from your store/API
  const [properties, setProperties] = useState([
    {
      id: '1',
      name: 'Green Valley PG',
      address: 'Sector 15, Noida',
      city: 'Noida',
      state: 'Uttar Pradesh',
      propertyType: 'boys',
      totalRooms: 12,
      occupiedRooms: 10,
      availableRooms: 2,
      contactPerson: 'Rajesh Kumar',
      contactNumber: '9876543210',
      contactEmail: 'rajesh@greenvalley.com',
      securityDeposit: 10000,
      maintenanceCharge: 1000,
      amenities: ['WiFi', 'AC', 'Parking', 'Laundry', 'Meals'],
      monthlyRevenue: 52000,
      status: 'active',
    },
    {
      id: '2',
      name: 'Sunrise Residency',
      address: 'Gomti Nagar, Lucknow',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      propertyType: 'girls',
      totalRooms: 15,
      occupiedRooms: 15,
      availableRooms: 0,
      contactPerson: 'Priya Sharma',
      contactNumber: '9876543211',
      contactEmail: 'priya@sunrise.com',
      securityDeposit: 12000,
      maintenanceCharge: 1200,
      amenities: ['WiFi', 'Security', 'Meals', 'Power Backup'],
      monthlyRevenue: 68000,
      status: 'active',
    },
    {
      id: '3',
      name: 'Blue Haven',
      address: 'Civil Lines, Allahabad',
      city: 'Allahabad',
      state: 'Uttar Pradesh',
      propertyType: 'co-living',
      totalRooms: 8,
      occupiedRooms: 6,
      availableRooms: 2,
      contactPerson: 'Amit Patel',
      contactNumber: '9876543212',
      contactEmail: 'amit@bluehaven.com',
      securityDeposit: 8000,
      maintenanceCharge: 800,
      amenities: ['WiFi', 'Gym', 'Common Area'],
      monthlyRevenue: 32000,
      status: 'active',
    },
  ]);

  const handleAddProperty = (data) => {
    setProperties([...properties, data]);
    console.log('Property added:', data);
  };

  const handleEditProperty = (data) => {
    setProperties(properties.map(p => p.id === data.id ? data : p));
    console.log('Property updated:', data);
  };

  const handleDeleteProperty = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || property.propertyType === filterType;
    return matchesSearch && matchesType;
  });

  const getOccupancyPercentage = (property) => {
    return Math.round((property.occupiedRooms / property.totalRooms) * 100);
  };

  const getOccupancyColor = (percentage) => {
    if (percentage === 100) return 'success';
    if (percentage >= 75) return 'info';
    if (percentage >= 50) return 'warning';
    return 'danger';
  };

  const stats = {
    total: properties.length,
    active: properties.filter(p => p.status === 'active').length,
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
            Properties
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage all PG properties
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
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
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

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <Input
            placeholder="Search by name or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('boys')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'boys'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Boys
          </button>
          <button
            onClick={() => setFilterType('girls')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'girls'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Girls
          </button>
          <button
            onClick={() => setFilterType('co-living')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'co-living'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Co-Living
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property) => {
          const occupancyPercentage = getOccupancyPercentage(property);
          const occupancyColor = getOccupancyColor(occupancyPercentage);

          return (
            <Card key={property.id} hover>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl">
                    <Building2 className="text-white w-7 h-7" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={property.status === 'active' ? 'success' : 'danger'}>
                      {property.status}
                    </Badge>
                    <Badge variant="info">
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
                      <span className="text-xs text-gray-600 dark:text-gray-400">Rooms</span>
                      <BedDouble className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {property.totalRooms}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Tenants</span>
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
                    <span className="text-sm text-gray-600 dark:text-gray-400">Occupancy</span>
                    <Badge variant={occupancyColor} size="sm">
                      {occupancyPercentage}%
                    </Badge>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        occupancyPercentage === 100
                          ? 'bg-green-500'
                          : occupancyPercentage >= 75
                          ? 'bg-blue-500'
                          : occupancyPercentage >= 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${occupancyPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Revenue */}
                <div className="flex items-center justify-between p-3 mb-4 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Monthly Revenue</span>
                  <span className="font-bold text-primary-600 dark:text-primary-400">
                    {formatCurrency(property.monthlyRevenue)}
                  </span>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded dark:bg-gray-800 dark:text-gray-300"
                      >
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded dark:bg-gray-800 dark:text-gray-300">
                        +{property.amenities.length - 3} more
                      </span>
                    )}
                  </div>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    onClick={() => handleDeleteProperty(property.id)}
                    className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
              No Properties Found
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Try adjusting your search criteria' : 'Get started by adding your first property'}
            </p>
            {!searchQuery && (
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
            )}
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

export default PropertiesList;
