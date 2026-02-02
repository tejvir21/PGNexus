# PG Nexus - Complete PG Management System

A comprehensive, production-ready PG (Paying Guest) management system built with **Create React App**, Zustand, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Login

| Role   | Email                  | Password |
|--------|------------------------|----------|
| Admin  | admin@pgnexus.com     | password |
| Owner  | owner@pgnexus.com     | password |
| Tenant | tenant@pgnexus.com    | password |

## ✨ Complete Feature Set

### 📄 Pages (11 Total)

#### Core Pages
1. **Login & Signup** - Authentication with role selection
2. **Admin Dashboard** - System-wide overview
3. **Owner Dashboard** - Property management overview
4. **Tenant Dashboard** - Personal tenant view

#### Property Management
5. **Properties List** (`/properties`) - Grid view of all PG properties
   - Search and filter
   - Add/Edit/Delete
   - Occupancy tracking
   - Revenue display
   
6. **Property Detail** (`/properties/:id`) - Single property with all rooms
   - Property information
   - Statistics
   - Room grid
   - Add/Edit rooms

#### Room Management
7. **Room Detail** (`/rooms/:id`) - Complete room view
   - Room specifications
   - Current tenant info
   - Payment history table
   - Assign/Edit tenant
   - Record payments

#### Tenant Management
8. **Tenants List** (`/tenants`) - All tenants table
   - Search and filter
   - Contact information
   - Room assignments
   - Status tracking

9. **Tenant Detail** (`/tenants/:id`) - Full tenant profile
   - Personal information
   - Employment details
   - Payment history
   - Emergency contact

#### Demo & Testing
10. **Forms Demo** (`/forms`) - Interactive form testing
11. **Dashboard Pages** - Role-specific views

### 📝 Forms (6 Complete Forms)

All forms include validation, dark mode, and responsive design:

1. **PropertyForm** - Create/edit PG properties
   - 15+ fields
   - Amenities selection
   - Address management
   
2. **RoomForm** - Create/edit rooms
   - Room specifications
   - Features checklist
   - Status management

3. **TenantForm** - Onboard/edit tenants
   - 16+ fields
   - ID proof capture
   - Smart room filtering
   - Emergency contacts

4. **ComplaintForm** - Raise issues
   - Categorized complaints
   - Priority levels
   - Detailed descriptions

5. **PaymentForm** - Record payments
   - Multiple payment types
   - Auto-calculations
   - Transaction tracking

6. **NoticeForm** - Create announcements
   - Priority levels
   - Validity period
   - Live preview

### 🎨 Design System

- **4 Dynamic Themes**: Blue, Purple, Green, Orange
- **Dark Mode**: Full dark theme support
- **Responsive**: Mobile-first design
- **Components**: 18+ reusable components
- **Animations**: Smooth transitions throughout

## 📁 Project Structure

```
src/
├── components/
│   └── common/
│       ├── Forms/          # 6 complete forms
│       │   ├── PropertyForm.js
│       │   ├── RoomForm.js
│       │   ├── TenantForm.js
│       │   ├── ComplaintForm.js
│       │   ├── PaymentForm.js
│       │   └── NoticeForm.js
│       └── UI/             # 12 UI components
│           ├── Button.js
│           ├── Card.js
│           ├── Input.js
│           ├── Select.js
│           ├── Modal.js
│           ├── Badge.js
│           ├── Navbar.js
│           ├── BottomNav.js
│           └── ...
├── pages/
│   ├── auth/              # Authentication
│   │   ├── Login.js
│   │   └── Signup.js
│   ├── admin/             # Admin views
│   │   └── Dashboard.js
│   ├── owner/             # Owner views
│   │   └── Dashboard.js
│   ├── tenant/            # Tenant views
│   │   └── Dashboard.js
│   ├── PropertiesList.js  # All properties
│   ├── PropertyDetail.js  # Single property
│   ├── RoomDetail.js      # Single room
│   ├── TenantsList.js     # All tenants
│   ├── TenantDetail.js    # Single tenant
│   └── FormsDemo.js       # Forms testing
├── store/
│   └── index.js           # Zustand stores
├── utils/
│   └── helpers.js         # Utility functions
└── styles/
    └── index.css          # Global styles + themes
```

## 🗺️ Navigation Flow

```
Login → Dashboard (role-based)

Properties Flow:
/properties → /properties/:id → /rooms/:id

Tenants Flow:
/tenants → /tenants/:id

Forms Testing:
/forms (all forms in one place)
```

## 🎯 Key Features by Page

### Properties List
- ✅ Grid/card view
- ✅ Search by name/city
- ✅ Filter by type
- ✅ Stats dashboard
- ✅ CRUD operations

### Property Detail
- ✅ Complete property info
- ✅ All rooms grid
- ✅ Add/edit rooms
- ✅ Occupancy tracking
- ✅ Revenue display

### Room Detail
- ✅ Room specifications
- ✅ Current tenant info
- ✅ Payment history table
- ✅ Assign tenant
- ✅ Record payments

### Tenants List
- ✅ Table view
- ✅ Search/filter
- ✅ Quick actions
- ✅ Status indicators
- ✅ Contact info

### Tenant Detail
- ✅ Complete profile
- ✅ Payment history
- ✅ Emergency contact
- ✅ Days stayed counter
- ✅ Financial summary

## 📚 Documentation

- **README.md** - This file
- **SETUP_GUIDE.md** - Detailed setup instructions
- **FORMS_DOCUMENTATION.md** - Complete forms guide
- **PAGES_DOCUMENTATION.md** - All pages explained

## 🛠️ Available Scripts

### `npm start`
Runs app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

## 🎨 Customization

### Change Theme Colors
Edit `src/styles/index.css`:
```css
:root {
  --color-primary-600: 37 99 235;  /* Your RGB */
}
```

### Add New Page
1. Create in `src/pages/YourPage.js`
2. Add route in `src/App.js`
3. Add navigation in `Navbar.js` or `BottomNav.js`

### Modify Forms
Edit form components in `src/components/common/`

## 🔌 Backend Integration

Replace mock data with API calls:

```javascript
// Example
const fetchProperties = async () => {
  const response = await api.get('/properties');
  setProperties(response.data);
};
```

## 📊 Data Models

### Property
```javascript
{
  id, name, address, city, state, propertyType,
  totalRooms, occupiedRooms, contactPerson,
  contactNumber, securityDeposit, amenities, ...
}
```

### Room
```javascript
{
  id, propertyId, roomNumber, floor, roomType,
  capacity, rent, area, furnishing, status,
  attachedBathroom, balcony, ac, ...
}
```

### Tenant
```javascript
{
  id, fullName, email, phone, propertyId, roomId,
  moveInDate, rentAmount, securityDeposit,
  occupation, emergencyContact, ...
}
```

## 🚀 What's Included

✅ 11 Complete Pages
✅ 6 Production-Ready Forms
✅ 18+ UI Components
✅ Dynamic Theme System
✅ Dark Mode
✅ Responsive Design
✅ State Management (Zustand)
✅ Routing (React Router v6)
✅ Form Validation
✅ Search & Filters
✅ CRUD Operations
✅ Mock Data for Testing
✅ Comprehensive Documentation

## 🎓 Perfect For

- PG/Hostel Management
- Co-living Spaces
- Student Housing
- Rental Property Management
- Learning React/Zustand
- Portfolio Projects

## 📞 Support

Check documentation files:
- Setup issues → SETUP_GUIDE.md
- Form questions → FORMS_DOCUMENTATION.md
- Page navigation → PAGES_DOCUMENTATION.md

## 🎉 You're Ready!

```bash
npm install
npm start
# Visit http://localhost:3000
# Login and explore!
```

---

**Built with ❤️ using React + Zustand + Tailwind CSS**

**Production-ready • Fully responsive • Completely documented**
