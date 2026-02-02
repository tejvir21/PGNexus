import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  IdCard,
  Calendar,
  Home,
  IndianRupee,
} from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
import Modal from "../common/Modal";

const TenantForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  properties = [],
  rooms = [],
}) => {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    alternatePhone: initialData?.alternatePhone || "",
    idProofType: initialData?.idProofType || "aadhaar",
    idProofNumber: initialData?.idProofNumber || "",
    propertyId: initialData?.propertyId || "",
    roomId: initialData?.roomId || "",
    moveInDate: initialData?.moveInDate || "",
    rentAmount: initialData?.rentAmount || "",
    securityDeposit: initialData?.securityDeposit || "",
    emergencyContactName: initialData?.emergencyContactName || "",
    emergencyContactPhone: initialData?.emergencyContactPhone || "",
    occupation: initialData?.occupation || "",
    companyName: initialData?.companyName || "",
    permanentAddress: initialData?.permanentAddress || "",
  });

  const [errors, setErrors] = useState({});
  const [filteredRooms, setFilteredRooms] = useState([]);

  const idProofTypes = [
    { value: "aadhaar", label: "Aadhaar Card" },
    { value: "pan", label: "PAN Card" },
    { value: "passport", label: "Passport" },
    { value: "driving_license", label: "Driving License" },
    { value: "voter_id", label: "Voter ID" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Filter rooms when property is selected
    if (name === "propertyId") {
      const availableRooms = rooms.filter(
        (room) => room.propertyId === value && room.status === "available",
      );
      setFilteredRooms(availableRooms);
      setFormData((prev) => ({ ...prev, roomId: "" }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.idProofNumber.trim())
      newErrors.idProofNumber = "ID proof number is required";
    if (!formData.propertyId) newErrors.propertyId = "Property is required";
    if (!formData.roomId) newErrors.roomId = "Room is required";
    if (!formData.moveInDate) newErrors.moveInDate = "Move-in date is required";
    if (!formData.rentAmount || formData.rentAmount <= 0) {
      newErrors.rentAmount = "Valid rent amount is required";
    }
    if (!formData.securityDeposit || formData.securityDeposit <= 0) {
      newErrors.securityDeposit = "Valid security deposit is required";
    }
    if (!formData.emergencyContactName.trim()) {
      newErrors.emergencyContactName = "Emergency contact name is required";
    }
    if (!formData.emergencyContactPhone.trim()) {
      newErrors.emergencyContactPhone = "Emergency contact phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.emergencyContactPhone)) {
      newErrors.emergencyContactPhone = "Phone must be 10 digits";
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
      id: initialData?.id || Date.now().toString(),
      status: initialData?.status || "active",
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSubmit(submissionData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      alternatePhone: "",
      idProofType: "aadhaar",
      idProofNumber: "",
      propertyId: "",
      roomId: "",
      moveInDate: "",
      rentAmount: "",
      securityDeposit: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      occupation: "",
      companyName: "",
      permanentAddress: "",
    });
    setErrors({});
    setFilteredRooms([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={initialData ? "Edit Tenant" : "Add New Tenant"}
      size="xl"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {initialData ? "Update Tenant" : "Add Tenant"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              placeholder="John Doe"
              icon={User}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="john@example.com"
              icon={Mail}
              required
            />
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="9876543210"
              icon={Phone}
              maxLength={10}
              required
            />
            <Input
              label="Alternate Phone"
              name="alternatePhone"
              type="tel"
              value={formData.alternatePhone}
              onChange={handleChange}
              placeholder="9876543211"
              icon={Phone}
              maxLength={10}
            />
          </div>
        </div>

        {/* ID Proof */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <IdCard className="w-5 h-5 mr-2" />
            Identity Proof
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Select
              label="ID Proof Type"
              name="idProofType"
              value={formData.idProofType}
              onChange={handleChange}
              options={idProofTypes}
              required
            />
            <Input
              label="ID Proof Number"
              name="idProofNumber"
              value={formData.idProofNumber}
              onChange={handleChange}
              error={errors.idProofNumber}
              placeholder="Enter ID number"
              icon={IdCard}
              required
            />
          </div>
        </div>

        {/* Room Assignment */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <Home className="w-5 h-5 mr-2" />
            Room Assignment
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            <Select
              label="Room"
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              error={errors.roomId}
              options={[
                {
                  value: "",
                  label: formData.propertyId
                    ? "Select Room"
                    : "Select Property First",
                },
                ...filteredRooms.map((room) => ({
                  value: room.id,
                  label: `${room.roomNumber} - ${room.roomType} (₹${room.rent})`,
                })),
              ]}
              required
              disabled={!formData.propertyId}
            />
          </div>
        </div>

        {/* Financial Details */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <IndianRupee className="w-5 h-5 mr-2" />
            Financial Details
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              label="Move-in Date"
              name="moveInDate"
              type="date"
              value={formData.moveInDate}
              onChange={handleChange}
              error={errors.moveInDate}
              icon={Calendar}
              required
            />
            <Input
              label="Monthly Rent (₹)"
              name="rentAmount"
              type="number"
              value={formData.rentAmount}
              onChange={handleChange}
              error={errors.rentAmount}
              placeholder="5000"
              icon={IndianRupee}
              min={0}
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
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <Phone className="w-5 h-5 mr-2" />
            Emergency Contact
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Contact Name"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
              error={errors.emergencyContactName}
              placeholder="Jane Doe"
              icon={User}
              required
            />
            <Input
              label="Contact Phone"
              name="emergencyContactPhone"
              type="tel"
              value={formData.emergencyContactPhone}
              onChange={handleChange}
              error={errors.emergencyContactPhone}
              placeholder="9876543210"
              icon={Phone}
              maxLength={10}
              required
            />
          </div>
        </div>

        {/* Employment Details */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Employment Details (Optional)
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Software Engineer"
            />
            <Input
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Tech Corp"
            />
          </div>
        </div>

        {/* Permanent Address */}
        <Textarea
          label="Permanent Address"
          name="permanentAddress"
          value={formData.permanentAddress}
          onChange={handleChange}
          placeholder="Enter permanent address..."
          rows={3}
        />
      </form>
    </Modal>
  );
};

export default TenantForm;
