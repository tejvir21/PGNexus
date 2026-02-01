# Forms Documentation - PG Nexus

Complete guide to all forms in the PG Management System.

## 📋 Available Forms

### 1. Property Form (`PropertyForm.js`)
**Purpose**: Add or edit PG properties

**Fields**:
- **Basic Information**
  - Property Name (required)
  - Property Type (Boys/Girls/Co-Living)

- **Address Details**
  - Address (required)
  - City, State, Pincode (required)

- **Contact Details**
  - Contact Person (required)
  - Contact Number (10 digits, required)
  - Contact Email (required)

- **Property Details**
  - Total Rooms (required, minimum 1)
  - Security Deposit (required)
  - Maintenance Charge (required)

- **Amenities** (Multiple selection)
  - WiFi, AC, Parking, Laundry, Meals
  - Power Backup, Water 24x7, Security
  - Gym, Common Area, Refrigerator
  - TV, Washing Machine, CCTV

- **Description** (Optional)

**Usage**:
```javascript
import PropertyForm from './components/common/PropertyForm';

<PropertyForm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={(data) => console.log(data)}
  initialData={null} // For add mode
  // initialData={existingProperty} // For edit mode
/>
```

---

### 2. Room Form (`RoomForm.js`)
**Purpose**: Create and manage individual rooms

**Fields**:
- Property Selection (dropdown, required)
- Room Number (required)
- Floor (required)
- Room Type (Single/Double/Triple/Four Sharing)
- Capacity (required, 1-10)
- Monthly Rent (required)
- Area in sq ft (required)
- Furnishing Status (Unfurnished/Semi-Furnished/Fully Furnished)
- Status (Available/Occupied/Maintenance/Reserved)
- Features (Attached Bathroom, Balcony, AC)
- Description (optional)

**Usage**:
```javascript
import RoomForm from './components/common/RoomForm';

<RoomForm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={(data) => console.log(data)}
  properties={propertiesList}
  rooms={existingRooms}
  initialData={null}
/>
```

**Features**:
- Dynamic room filtering based on property selection
- Checkbox features for amenities
- Status management

---

### 3. Tenant Form (`TenantForm.js`)
**Purpose**: Onboard new tenants with complete information

**Fields**:
- **Personal Information**
  - Full Name (required)
  - Email (required, validated)
  - Phone Number (required, 10 digits)
  - Alternate Phone (optional)

- **Identity Proof**
  - ID Proof Type (Aadhaar/PAN/Passport/DL/Voter ID)
  - ID Proof Number (required)

- **Room Assignment**
  - Property Selection (required)
  - Room Selection (required, filtered by property)

- **Financial Details**
  - Move-in Date (required)
  - Monthly Rent (required)
  - Security Deposit (required)

- **Emergency Contact**
  - Contact Name (required)
  - Contact Phone (required, 10 digits)

- **Employment Details** (Optional)
  - Occupation
  - Company Name

- **Permanent Address** (Optional)

**Usage**:
```javascript
import TenantForm from './components/common/TenantForm';

<TenantForm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={(data) => console.log(data)}
  properties={propertiesList}
  rooms={availableRooms}
  initialData={null}
/>
```

**Features**:
- Smart room filtering (only shows available rooms for selected property)
- Multi-section organization
- Comprehensive tenant information capture

---

### 4. Complaint Form (`ComplaintForm.js`)
**Purpose**: Raise and track maintenance/service issues

**Fields**:
- Complaint Title (required, min 5 characters)
- Category (Maintenance/Electrical/Plumbing/Cleaning/Security/WiFi/Appliance/Other)
- Priority (Low/Medium/High/Urgent)
- Location (required)
- Room Number (optional, for tenants)
- Description (required, min 10 characters)

**Usage**:
```javascript
import ComplaintForm from './components/common/ComplaintForm';

<ComplaintForm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={(data) => console.log(data)}
  userRole="tenant" // or "owner" or "admin"
  initialData={null}
/>
```

**Features**:
- Priority guidelines displayed
- Categorized complaints
- Detailed description support

---

### 5. Payment Form (`PaymentForm.js`)
**Purpose**: Record rent and other payments

**Fields**:
- Tenant Selection (required)
- Payment Type (Rent/Security Deposit/Maintenance/Electricity/Water/Other)
- Payment Method (Cash/UPI/Bank Transfer/Card/Cheque)
- Base Amount (required)
- Late Fee (optional, defaults to 0)
- Discount (optional, defaults to 0)
- Payment Date (required)
- For Month (required for rent payments)
- Due Date (optional)
- Transaction ID (required for non-cash payments)
- Notes (optional)

**Usage**:
```javascript
import PaymentForm from './components/common/PaymentForm';

<PaymentForm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={(data) => console.log(data)}
  tenants={tenantsList}
  initialData={null}
/>
```

**Features**:
- Auto-calculates total amount (Base + Late Fee - Discount)
- Shows transaction ID field only for non-cash payments
- Month selector for rent payments
- Real-time total calculation display

---

### 6. Notice Form (`NoticeForm.js`)
**Purpose**: Create and publish notices for tenants

**Fields**:
- Notice Title (required, min 5 characters)
- Category (General/Maintenance/Event/Payment/Policy/Safety/Other)
- Priority (Low/Medium/High/Urgent)
- Content (required, min 20 characters)
- Valid From Date (required)
- Valid Till Date (optional, must be after Valid From)
- Target Audience (All/Specific Property/Specific Floor)

**Usage**:
```javascript
import NoticeForm from './components/common/NoticeForm';

<NoticeForm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSubmit={(data) => console.log(data)}
  initialData={null}
/>
```

**Features**:
- Live preview of notice
- Priority guidelines
- Date validation
- Indefinite notices (leave Valid Till empty)

---

## 🎯 Common Features Across All Forms

### Validation
- **Required Field Validation**: All required fields must be filled
- **Format Validation**: Email, phone, numbers validated
- **Custom Rules**: Length checks, date comparisons, etc.
- **Real-time Error Messages**: Errors shown immediately on blur

### User Experience
- **Modal-based**: All forms open in modals
- **Keyboard Support**: ESC to close, Tab navigation
- **Backdrop Click**: Click outside to close
- **Loading States**: Can show loading during submission
- **Clear on Close**: Form resets when closed

### Styling
- **Dark Mode**: All forms support dark mode
- **Responsive**: Work on all screen sizes
- **Icons**: Lucide icons for visual appeal
- **Animations**: Smooth transitions

---

## 🔧 Implementation Guide

### Basic Implementation

```javascript
import React, { useState } from 'react';
import PropertyForm from './components/common/PropertyForm';
import Button from './components/common/Button';

function MyComponent() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    // Add your API call here
    // api.createProperty(data).then(...)
  };

  return (
    <>
      <Button onClick={() => setIsFormOpen(true)}>
        Add Property
      </Button>

      <PropertyForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
```

### Edit Mode Implementation

```javascript
function EditProperty({ property }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (data) => {
    console.log('Updated property:', data);
    // api.updateProperty(property.id, data).then(...)
  };

  return (
    <>
      <Button onClick={() => setIsFormOpen(true)}>
        Edit Property
      </Button>

      <PropertyForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        initialData={property} // Pre-fill form with existing data
      />
    </>
  );
}
```

---

## 📊 Form Data Structure

### Property Form Output
```javascript
{
  id: "1234567890",
  name: "Green Valley PG",
  propertyType: "boys",
  address: "123 Main Street",
  city: "Noida",
  state: "Uttar Pradesh",
  pincode: "201301",
  contactPerson: "John Doe",
  contactNumber: "9876543210",
  contactEmail: "contact@example.com",
  totalRooms: 12,
  securityDeposit: 10000,
  maintenanceCharge: 1000,
  amenities: ["WiFi", "AC", "Parking"],
  description: "Description text...",
  createdAt: "2024-02-01T10:30:00Z"
}
```

### Room Form Output
```javascript
{
  id: "1234567890",
  propertyId: "prop123",
  roomNumber: "101",
  floor: "Ground Floor",
  roomType: "single",
  capacity: 1,
  rent: 5000,
  area: 120,
  furnishing: "semi-furnished",
  balcony: true,
  attachedBathroom: true,
  ac: false,
  status: "available",
  description: "Description text...",
  createdAt: "2024-02-01T10:30:00Z"
}
```

### Tenant Form Output
```javascript
{
  id: "1234567890",
  fullName: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  alternatePhone: "9876543211",
  idProofType: "aadhaar",
  idProofNumber: "1234-5678-9012",
  propertyId: "prop123",
  roomId: "room456",
  moveInDate: "2024-02-15",
  rentAmount: 5000,
  securityDeposit: 10000,
  emergencyContactName: "Jane Doe",
  emergencyContactPhone: "9876543212",
  occupation: "Software Engineer",
  companyName: "Tech Corp",
  permanentAddress: "Address text...",
  status: "active",
  createdAt: "2024-02-01T10:30:00Z"
}
```

### Complaint Form Output
```javascript
{
  id: "1234567890",
  title: "Water leakage issue",
  category: "plumbing",
  priority: "high",
  description: "Detailed description...",
  location: "Room 101",
  roomNumber: "101",
  status: "open",
  createdAt: "2024-02-01T10:30:00Z",
  updatedAt: "2024-02-01T10:30:00Z"
}
```

### Payment Form Output
```javascript
{
  id: "1234567890",
  tenantId: "tenant123",
  paymentType: "rent",
  amount: 5000,
  lateFee: 100,
  discount: 0,
  totalAmount: 5100,
  paymentDate: "2024-02-05",
  paymentMethod: "upi",
  transactionId: "TXN123456",
  month: "2024-02",
  dueDate: "2024-02-05",
  notes: "Payment notes...",
  status: "paid",
  createdAt: "2024-02-01T10:30:00Z"
}
```

### Notice Form Output
```javascript
{
  id: "1234567890",
  title: "Electricity Maintenance",
  content: "Notice content...",
  priority: "high",
  category: "maintenance",
  validFrom: "2024-02-10",
  validTill: "2024-02-11",
  targetAudience: "all",
  status: "active",
  createdAt: "2024-02-01T10:30:00Z",
  updatedAt: "2024-02-01T10:30:00Z"
}
```

---

## 🧪 Testing Forms

### Testing in Demo Page

Navigate to `/forms` to see all forms in action:
```
http://localhost:3000/forms
```

### Manual Testing Checklist

For each form, test:
- [ ] Required field validation
- [ ] Format validation (email, phone)
- [ ] Submit with valid data
- [ ] Submit with invalid data
- [ ] Edit mode (if applicable)
- [ ] ESC key closes modal
- [ ] Backdrop click closes modal
- [ ] Cancel button works
- [ ] Form resets on close
- [ ] Dark mode appearance
- [ ] Mobile responsiveness

---

## 🔌 Backend Integration

### Example API Integration

```javascript
// Create a service file: src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const propertyService = {
  create: async (data) => {
    const response = await axios.post(`${API_URL}/properties`, data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await axios.put(`${API_URL}/properties/${id}`, data);
    return response.data;
  },
};

// Use in component:
import { propertyService } from './services/api';

const handleSubmit = async (data) => {
  try {
    const result = await propertyService.create(data);
    console.log('Success:', result);
    // Show success message
  } catch (error) {
    console.error('Error:', error);
    // Show error message
  }
};
```

---

## 💡 Best Practices

### 1. Always Validate on Backend
Frontend validation is for UX. Always validate on backend too.

### 2. Handle Loading States
```javascript
const [loading, setLoading] = useState(false);

const handleSubmit = async (data) => {
  setLoading(true);
  try {
    await api.create(data);
  } finally {
    setLoading(false);
  }
};
```

### 3. Show Success/Error Messages
Use toast notifications or alerts to inform users.

### 4. Clear Forms After Success
Forms auto-clear on close, but ensure data is saved before closing.

### 5. Accessibility
All forms are keyboard-navigable and screen-reader friendly.

---

## 🎨 Customization

### Changing Form Appearance

Edit the form component file and modify styling:

```javascript
// In PropertyForm.js, change modal size:
<Modal
  size="xl"  // Change to 'sm', 'md', 'lg', 'xl', 'full'
  ...
/>
```

### Adding New Fields

1. Add to formData state
2. Add Input/Select component
3. Add validation in validate()
4. Field appears automatically

### Custom Validation

```javascript
const validate = () => {
  const newErrors = {};
  
  // Add custom validation
  if (formData.rent < 1000) {
    newErrors.rent = 'Rent must be at least ₹1000';
  }
  
  return newErrors;
};
```

---

## 📞 Support

For issues or questions about forms:
1. Check this documentation
2. Review form component code
3. Check console for errors
4. Test in FormsDemo page (`/forms`)

---

**All forms are production-ready and follow React best practices!** 🚀
