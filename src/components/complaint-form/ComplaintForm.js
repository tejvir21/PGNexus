import { useState } from "react";
import { AlertCircle, FileText, Tag } from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
import Modal from "../common/Modal";

const ComplaintForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  userRole = "tenant",
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "maintenance",
    priority: initialData?.priority || "medium",
    description: initialData?.description || "",
    location: initialData?.location || "",
    propertyId: initialData?.propertyId || "",
    roomNumber: initialData?.roomNumber || "",
  });

  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { value: "maintenance", label: "Maintenance" },
    { value: "electrical", label: "Electrical" },
    { value: "plumbing", label: "Plumbing" },
    { value: "cleaning", label: "Cleaning" },
    { value: "security", label: "Security" },
    { value: "wifi", label: "WiFi/Internet" },
    { value: "appliance", label: "Appliance" },
    { value: "other", label: "Other" },
  ];

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.title.trim().length < 5)
      newErrors.title = "Title must be at least 5 characters";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    if (!formData.location.trim()) newErrors.location = "Location is required";

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
      status: initialData?.status || "open",
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit(submissionData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: "",
      category: "maintenance",
      priority: "medium",
      description: "",
      location: "",
      propertyId: "",
      roomNumber: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={initialData ? "Edit Complaint" : "Raise New Complaint"}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {initialData ? "Update Complaint" : "Submit Complaint"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <Input
          label="Complaint Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="e.g., Water leakage in bathroom"
          icon={FileText}
          required
        />

        {/* Category & Priority */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categoryOptions}
            required
          />
          <Select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={priorityOptions}
            required
          />
        </div>

        {/* Location */}
        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          error={errors.location}
          placeholder="Room 101 / Common Area / Kitchen"
          icon={Tag}
          required
        />

        {/* Room Number (Optional) */}
        {userRole === "tenant" && (
          <Input
            label="Room Number (Optional)"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            placeholder="Your room number"
          />
        )}

        {/* Description */}
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          placeholder="Please describe the issue in detail..."
          rows={5}
          required
        />

        {/* Priority Info */}
        <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="mb-1 font-medium text-blue-900 dark:text-blue-300">
                Priority Guidelines
              </h4>
              <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
                <li>
                  <strong>Urgent:</strong> Safety issues, major leaks, power
                  outage
                </li>
                <li>
                  <strong>High:</strong> Broken appliances, heating/cooling
                  issues
                </li>
                <li>
                  <strong>Medium:</strong> Minor repairs, WiFi issues
                </li>
                <li>
                  <strong>Low:</strong> Cosmetic issues, minor inconveniences
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ComplaintForm;
