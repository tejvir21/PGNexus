import { useState } from 'react';
import { Building2, MapPin, Phone, Mail, User, IndianRupee, X } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import Modal from '../common/Modal';

const PropertyForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    pincode: initialData?.pincode || '',
    propertyType: initialData?.propertyType || 'boys',
    contactPerson: initialData?.contactPerson || '',
    contactNumber: initialData?.contactNumber || '',
    contactEmail: initialData?.contactEmail || '',
    totalRooms: initialData?.totalRooms || '',
    amenities: initialData?.amenities || [],
    description: initialData?.description || '',
    securityDeposit: initialData?.securityDeposit || '',
    maintenanceCharge: initialData?.maintenanceCharge || '',
  });

  const [errors, setErrors] = useState({});
  const [selectedAmenities, setSelectedAmenities] = useState(initialData?.amenities || []);

  const propertyTypes = [
    { value: 'boys', label: 'Boys PG' },
    { value: 'girls', label: 'Girls PG' },
    { value: 'co-living', label: 'Co-Living' },
  ];

  const availableAmenities = [
    'WiFi',
    'AC',
    'Parking',
    'Laundry',
    'Meals',
    'Power Backup',
    'Water 24x7',
    'Security',
    'Gym',
    'Common Area',
    'Refrigerator',
    'TV',
    'Washing Machine',
    'CCTV',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Property name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^[0-9]{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Email is invalid';
    }
    if (!formData.totalRooms || formData.totalRooms < 1) {
      newErrors.totalRooms = 'Total rooms must be at least 1';
    }
    if (!formData.securityDeposit || formData.securityDeposit < 0) {
      newErrors.securityDeposit = 'Security deposit is required';
    }
    if (!formData.maintenanceCharge || formData.maintenanceCharge < 0) {
      newErrors.maintenanceCharge = 'Maintenance charge is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submissionData = {
      ...formData,
      amenities: selectedAmenities,
      id: initialData?.id || Date.now().toString(),
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSubmit(submissionData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      propertyType: 'boys',
      contactPerson: '',
      contactNumber: '',
      contactEmail: '',
      totalRooms: '',
      amenities: [],
      description: '',
      securityDeposit: '',
      maintenanceCharge: '',
    });
    setSelectedAmenities([]);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={initialData ? 'Edit Property' : 'Add New Property'}
      size="xl"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {initialData ? 'Update Property' : 'Create Property'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <Building2 className="w-5 h-5 mr-2" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Property Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Green Valley PG"
              icon={Building2}
              required
            />
            <Select
              label="Property Type"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              options={propertyTypes}
              required
            />
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <MapPin className="w-5 h-5 mr-2" />
            Address Details
          </h3>
          <div className="space-y-4">
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              placeholder="123, Main Street, Sector 15"
              icon={MapPin}
              required
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
                placeholder="Noida"
                required
              />
              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={errors.state}
                placeholder="Uttar Pradesh"
                required
              />
              <Input
                label="Pincode"
                name="pincode"
                type="text"
                value={formData.pincode}
                onChange={handleChange}
                error={errors.pincode}
                placeholder="201301"
                maxLength={6}
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <User className="w-5 h-5 mr-2" />
            Contact Details
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              label="Contact Person"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              error={errors.contactPerson}
              placeholder="John Doe"
              icon={User}
              required
            />
            <Input
              label="Contact Number"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleChange}
              error={errors.contactNumber}
              placeholder="9876543210"
              icon={Phone}
              maxLength={10}
              required
            />
            <Input
              label="Contact Email"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              error={errors.contactEmail}
              placeholder="contact@example.com"
              icon={Mail}
              required
            />
          </div>
        </div>

        {/* Property Details */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <IndianRupee className="w-5 h-5 mr-2" />
            Property Details
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              label="Total Rooms"
              name="totalRooms"
              type="number"
              value={formData.totalRooms}
              onChange={handleChange}
              error={errors.totalRooms}
              placeholder="10"
              min={1}
              required
            />
            <Input
              label="Security Deposit (₹)"
              name="securityDeposit"
              type="number"
              value={formData.securityDeposit}
              onChange={handleChange}
              error={errors.securityDeposit}
              placeholder="10000"
              icon={IndianRupee}
              min={0}
              required
            />
            <Input
              label="Maintenance Charge (₹)"
              name="maintenanceCharge"
              type="number"
              value={formData.maintenanceCharge}
              onChange={handleChange}
              error={errors.maintenanceCharge}
              placeholder="1000"
              icon={IndianRupee}
              min={0}
              required
            />
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Amenities
          </h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {availableAmenities.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center p-3 space-x-2 transition-colors border border-gray-200 rounded-lg cursor-pointer dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {amenity}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add any additional details about the property..."
          rows={4}
        />
      </form>
    </Modal>
  );
};

export default PropertyForm;
