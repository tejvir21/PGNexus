import React from 'react';
import {
  Home,
  Wifi,
  Wind,
  Droplet,
  UtensilsCrossed,
  Shirt,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../../../components/common/Card';
import { formatCurrency } from '../../../utils/helpers';

const TenantRoom = () => {
  // Mock data - this would come from the logged-in tenant's data
  const roomDetails = {
    propertyName: 'Green Valley PG',
    roomNumber: '101',
    floor: 'Ground Floor',
    roomType: 'single',
    rent: 5500,
    area: 120,
    furnishing: 'fully-furnished',
    moveInDate: '2023-06-15',
    amenities: {
      WiFi: true,
      AC: true,
      attachedBathroom: true,
      balcony: false,
      meals: true,
      laundry: true,
    },
  };

  const amenityItems = [
    { name: 'WiFi', icon: Wifi, available: roomDetails.amenities.WiFi },
    { name: 'AC', icon: Wind, available: roomDetails.amenities.AC },
    { name: 'Attached Bathroom', icon: Droplet, available: roomDetails.amenities.attachedBathroom },
    { name: 'Balcony', icon: Home, available: roomDetails.amenities.balcony },
    { name: 'Meals', icon: UtensilsCrossed, available: roomDetails.amenities.meals },
    { name: 'Laundry', icon: Shirt, available: roomDetails.amenities.laundry },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          My Room
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {roomDetails.propertyName}
        </p>
      </div>

      {/* Room Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Room Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Room Number</span>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {roomDetails.roomNumber}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Floor</span>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {roomDetails.floor}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Room Type</span>
                <p className="font-semibold text-gray-900 dark:text-gray-100 capitalize">
                  {roomDetails.roomType} Occupancy
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Area</span>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {roomDetails.area} sq ft
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Furnishing</span>
                <p className="font-semibold text-gray-900 dark:text-gray-100 capitalize">
                  {roomDetails.furnishing.replace('-', ' ')}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Rent</span>
                <p className="text-xl font-bold text-primary-600">
                  {formatCurrency(roomDetails.rent)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Info */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Property</span>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {roomDetails.propertyName}
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Move-in Date</span>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {new Date(roomDetails.moveInDate).toLocaleDateString()}
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Days Stayed</span>
              <p className="text-2xl font-bold text-blue-600">
                {Math.floor((new Date() - new Date(roomDetails.moveInDate)) / (1000 * 60 * 60 * 24))}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Room Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {amenityItems.map((amenity) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={amenity.name}
                  className={`p-4 border rounded-lg flex items-center justify-between ${
                    amenity.available
                      ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${amenity.available ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className={`font-medium ${amenity.available ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      {amenity.name}
                    </span>
                  </div>
                  {amenity.available ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantRoom;
