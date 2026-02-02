import { useState } from "react";
import { BedDouble, Users, IndianRupee, Layers, Home } from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
import Modal from "../common/Modal";

const RoomForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  properties = [],
}) => {
  const [formData, setFormData] = useState({
    propertyId: initialData?.propertyId || "",
    roomNumber: initialData?.roomNumber || "",
    floor: initialData?.floor || "",
    roomType: initialData?.roomType || "single",
    capacity: initialData?.capacity || "1",
    rent: initialData?.rent || "",
    area: initialData?.area || "",
    furnishing: initialData?.furnishing || "unfurnished",
    balcony: initialData?.balcony || false,
    attachedBathroom: initialData?.attachedBathroom || false,
    ac: initialData?.ac || false,
    status: initialData?.status || "available",
    description: initialData?.description || "",
  });

  const [errors, setErrors] = useState({});

  const roomTypes = [
    { value: "single", label: "Single Occupancy" },
    { value: "double", label: "Double Sharing" },
    { value: "triple", label: "Triple Sharing" },
    { value: "four", label: "Four Sharing" },
  ];

  const furnishingOptions = [
    { value: "unfurnished", label: "Unfurnished" },
    { value: "semi-furnished", label: "Semi-Furnished" },
    { value: "fully-furnished", label: "Fully Furnished" },
  ];

  const statusOptions = [
    { value: "available", label: "Available" },
    { value: "occupied", label: "Occupied" },
    { value: "maintenance", label: "Under Maintenance" },
    { value: "reserved", label: "Reserved" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.propertyId) newErrors.propertyId = "Property is required";
    if (!formData.roomNumber.trim())
      newErrors.roomNumber = "Room number is required";
    if (!formData.floor.trim()) newErrors.floor = "Floor is required";
    if (!formData.rent || formData.rent <= 0)
      newErrors.rent = "Valid rent amount is required";
    if (!formData.area || formData.area <= 0)
      newErrors.area = "Valid room area is required";

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
      id: initialData?.id || Date.now().toString(),
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSubmit(submissionData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      propertyId: "",
      roomNumber: "",
      floor: "",
      roomType: "single",
      capacity: "1",
      rent: "",
      area: "",
      furnishing: "unfurnished",
      balcony: false,
      attachedBathroom: false,
      ac: false,
      status: "available",
      description: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={initialData ? "Edit Room" : "Add New Room"}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {initialData ? "Update Room" : "Create Room"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Property Selection */}
        <Select
          label="Property"
          name="propertyId"
          value={formData.propertyId}
          onChange={handleChange}
          error={errors.propertyId}
          options={[
            { value: "", label: "Select Property" },
            ...properties.map((prop) => ({
              value: prop.id,
              label: prop.name,
            })),
          ]}
          required
        />

        {/* Room Details */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <BedDouble className="w-5 h-5 mr-2" />
            Room Details
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Room Number"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              error={errors.roomNumber}
              placeholder="101"
              icon={Home}
              required
            />
            <Input
              label="Floor"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              error={errors.floor}
              placeholder="Ground Floor / 1st Floor"
              icon={Layers}
              required
            />
            <Select
              label="Room Type"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              options={roomTypes}
              required
            />
            <Input
              label="Capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="1"
              icon={Users}
              min={1}
              max={10}
              required
            />
          </div>
        </div>

        {/* Rent & Area */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <IndianRupee className="w-5 h-5 mr-2" />
            Rent & Area
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Monthly Rent (₹)"
              name="rent"
              type="number"
              value={formData.rent}
              onChange={handleChange}
              error={errors.rent}
              placeholder="5000"
              icon={IndianRupee}
              min={0}
              required
            />
            <Input
              label="Area (sq ft)"
              name="area"
              type="number"
              value={formData.area}
              onChange={handleChange}
              error={errors.area}
              placeholder="120"
              min={0}
              required
            />
          </div>
        </div>

        {/* Furnishing & Status */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Select
            label="Furnishing"
            name="furnishing"
            value={formData.furnishing}
            onChange={handleChange}
            options={furnishingOptions}
            required
          />
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
            required
          />
        </div>

        {/* Features */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Features
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <label className="flex items-center p-3 space-x-2 border border-gray-200 rounded-lg cursor-pointer dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              <input
                type="checkbox"
                name="attachedBathroom"
                checked={formData.attachedBathroom}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Attached Bathroom
              </span>
            </label>
            <label className="flex items-center p-3 space-x-2 border border-gray-200 rounded-lg cursor-pointer dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              <input
                type="checkbox"
                name="balcony"
                checked={formData.balcony}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Balcony
              </span>
            </label>
            <label className="flex items-center p-3 space-x-2 border border-gray-200 rounded-lg cursor-pointer dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              <input
                type="checkbox"
                name="ac"
                checked={formData.ac}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Air Conditioner
              </span>
            </label>
          </div>
        </div>

        {/* Description */}
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add any additional details about the room..."
          rows={3}
        />
      </form>
    </Modal>
  );
};

export default RoomForm;
