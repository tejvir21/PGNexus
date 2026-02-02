import React from 'react';
import OwnerPayments from '../../owner/payments/Payments';

// Admin sees all payments (same view as owner but for all properties)
const AdminPayments = () => {
  return <OwnerPayments />;
};

export default AdminPayments;
