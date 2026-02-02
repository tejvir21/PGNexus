import { useState } from 'react';
import { Megaphone, Tag, Calendar } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import Modal from '../common/Modal';

const NoticeForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    priority: initialData?.priority || 'medium',
    category: initialData?.category || 'general',
    validFrom: initialData?.validFrom || new Date().toISOString().split('T')[0],
    validTill: initialData?.validTill || '',
    targetAudience: initialData?.targetAudience || 'all',
  });

  const [errors, setErrors] = useState({});

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ];

  const categoryOptions = [
    { value: 'general', label: 'General Announcement' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'event', label: 'Event' },
    { value: 'payment', label: 'Payment Reminder' },
    { value: 'policy', label: 'Policy Update' },
    { value: 'safety', label: 'Safety Alert' },
    { value: 'other', label: 'Other' },
  ];

  const audienceOptions = [
    { value: 'all', label: 'All Tenants' },
    { value: 'specific_property', label: 'Specific Property' },
    { value: 'specific_floor', label: 'Specific Floor' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.title.trim().length < 5) newErrors.title = 'Title must be at least 5 characters';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (formData.content.trim().length < 20) {
      newErrors.content = 'Content must be at least 20 characters';
    }
    if (!formData.validFrom) newErrors.validFrom = 'Valid from date is required';
    if (formData.validTill && formData.validTill < formData.validFrom) {
      newErrors.validTill = 'Valid till date must be after valid from date';
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
      status: 'active',
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit(submissionData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      content: '',
      priority: 'medium',
      category: 'general',
      validFrom: new Date().toISOString().split('T')[0],
      validTill: '',
      targetAudience: 'all',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={initialData ? 'Edit Notice' : 'Create New Notice'}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {initialData ? 'Update Notice' : 'Publish Notice'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <Input
          label="Notice Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="e.g., Electricity Maintenance on Sunday"
          icon={Megaphone}
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

        {/* Content */}
        <Textarea
          label="Notice Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          error={errors.content}
          placeholder="Write the full notice content here..."
          rows={6}
          required
        />

        {/* Validity Period */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <Calendar className="w-5 h-5 mr-2" />
            Validity Period
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Valid From"
              name="validFrom"
              type="date"
              value={formData.validFrom}
              onChange={handleChange}
              error={errors.validFrom}
              icon={Calendar}
              required
            />
            <Input
              label="Valid Till (Optional)"
              name="validTill"
              type="date"
              value={formData.validTill}
              onChange={handleChange}
              error={errors.validTill}
              icon={Calendar}
              helperText="Leave empty if notice is indefinite"
            />
          </div>
        </div>

        {/* Target Audience */}
        <Select
          label="Target Audience"
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleChange}
          options={audienceOptions}
          required
        />

        {/* Priority Info */}
        <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
          <div className="flex items-start space-x-2">
            <Tag className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="mb-1 font-medium text-yellow-900 dark:text-yellow-300">
                Priority Guidelines
              </h4>
              <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-400">
                <li><strong>Urgent:</strong> Critical alerts, immediate action required</li>
                <li><strong>High:</strong> Important announcements, deadlines</li>
                <li><strong>Medium:</strong> General updates, event notifications</li>
                <li><strong>Low:</strong> Information notices, reminders</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {(formData.title || formData.content) && (
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Preview:
            </h4>
            <div className="space-y-2">
              {formData.title && (
                <h5 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {formData.title}
                </h5>
              )}
              {formData.content && (
                <p className="text-sm text-gray-600 whitespace-pre-wrap dark:text-gray-400">
                  {formData.content}
                </p>
              )}
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default NoticeForm;
