import React from 'react';
import OwnerComplaints from '../../owner/complaints/Complaints';

// Admin sees all complaints (same view as owner but for all properties)
const AdminComplaints = () => {
  return <OwnerComplaints />;
};

export default AdminComplaints;
