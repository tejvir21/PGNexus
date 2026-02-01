import React, { useState } from 'react';
import { IndianRupee, Calendar, CreditCard, FileText } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import Modal from '../common/Modal';

const PaymentForm = ({ isOpen, onClose, onSubmit, initialData = null, tenants = [] }) => {
  const [formData, setFormData] = useState({
    tenantId: initialData?.tenantId || '',
    paymentType: initialData?.paymentType || 'rent',
    amount: initialData?.amount || '',
    paymentDate: initialData?.paymentDate || new Date().toISOString().split('T')[0],
    paymentMethod: initialData?.paymentMethod || 'cash',
    transactionId: initialData?.transactionId || '',
    month: initialData?.month || new Date().toISOString().slice(0, 7), // YYYY-MM
    dueDate: initialData?.dueDate || '',
    lateFee: initialData?.lateFee || '0',
    discount: initialData?.discount || '0',
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState({});

  const paymentTypes = [
    { value: 'rent', label: 'Monthly Rent' },
    { value: 'security_deposit', label: 'Security Deposit' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'electricity', label: 'Electricity Bill' },
    { value: 'water', label: 'Water Bill' },
    { value: 'other', label: 'Other' },
  ];

  const paymentMethods = [
    { value: 'cash', label: 'Cash' },
    { value: 'upi', label: 'UPI' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'card', label: 'Card' },
    { value: 'cheque', label: 'Cheque' },
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

    if (!formData.tenantId) newErrors.tenantId = 'Tenant is required';
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Valid amount is required';
    if (!formData.paymentDate) newErrors.paymentDate = 'Payment date is required';
    if (formData.paymentMethod !== 'cash' && !formData.transactionId.trim()) {
      newErrors.transactionId = 'Transaction ID is required for non-cash payments';
    }
    if (formData.paymentType === 'rent' && !formData.month) {
      newErrors.month = 'Month is required for rent payment';
    }

    return newErrors;
  };

  const calculateTotal = () => {
    const amount = parseFloat(formData.amount) || 0;
    const lateFee = parseFloat(formData.lateFee) || 0;
    const discount = parseFloat(formData.discount) || 0;
    return amount + lateFee - discount;
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
      totalAmount: calculateTotal(),
      id: initialData?.id || Date.now().toString(),
      status: 'paid',
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSubmit(submissionData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      tenantId: '',
      paymentType: 'rent',
      amount: '',
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'cash',
      transactionId: '',
      month: new Date().toISOString().slice(0, 7),
      dueDate: '',
      lateFee: '0',
      discount: '0',
      notes: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={initialData ? 'Edit Payment' : 'Record New Payment'}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {initialData ? 'Update Payment' : 'Record Payment'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Tenant Selection */}
        <Select
          label="Tenant"
          name="tenantId"
          value={formData.tenantId}
          onChange={handleChange}
          error={errors.tenantId}
          options={[
            { value: '', label: 'Select Tenant' },
            ...tenants.map((tenant) => ({
              value: tenant.id,
              label: `${tenant.fullName} - ${tenant.roomNumber}`,
            })),
          ]}
          required
        />

        {/* Payment Type & Method */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Select
            label="Payment Type"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            options={paymentTypes}
            required
          />
          <Select
            label="Payment Method"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            options={paymentMethods}
            required
          />
        </div>

        {/* Amount Details */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <IndianRupee className="w-5 h-5 mr-2" />
            Amount Details
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              label="Base Amount (₹)"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              error={errors.amount}
              placeholder="5000"
              icon={IndianRupee}
              min={0}
              step="0.01"
              required
            />
            <Input
              label="Late Fee (₹)"
              name="lateFee"
              type="number"
              value={formData.lateFee}
              onChange={handleChange}
              placeholder="0"
              icon={IndianRupee}
              min={0}
              step="0.01"
            />
            <Input
              label="Discount (₹)"
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
              placeholder="0"
              icon={IndianRupee}
              min={0}
              step="0.01"
            />
          </div>

          {/* Total Amount Display */}
          <div className="p-4 mt-4 border rounded-lg bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Total Amount:
              </span>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                ₹{calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Date Details */}
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            <Calendar className="w-5 h-5 mr-2" />
            Date Details
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              label="Payment Date"
              name="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={handleChange}
              error={errors.paymentDate}
              icon={Calendar}
              required
            />
            {formData.paymentType === 'rent' && (
              <Input
                label="For Month"
                name="month"
                type="month"
                value={formData.month}
                onChange={handleChange}
                error={errors.month}
                icon={Calendar}
                required
              />
            )}
            <Input
              label="Due Date (Optional)"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              icon={Calendar}
            />
          </div>
        </div>

        {/* Transaction Details */}
        {formData.paymentMethod !== 'cash' && (
          <div>
            <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              <CreditCard className="w-5 h-5 mr-2" />
              Transaction Details
            </h3>
            <Input
              label="Transaction ID / Reference Number"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              error={errors.transactionId}
              placeholder="Enter transaction ID"
              icon={FileText}
              required={formData.paymentMethod !== 'cash'}
            />
          </div>
        )}

        {/* Notes */}
        <Textarea
          label="Notes (Optional)"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add any additional notes about this payment..."
          rows={3}
        />

        {/* Info Box */}
        <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <div className="text-sm text-blue-700 dark:text-blue-400">
            <strong>Note:</strong> This payment will be marked as paid immediately. 
            Make sure all details are correct before submitting.
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default PaymentForm;
