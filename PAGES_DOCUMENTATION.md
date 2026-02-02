# Pages Documentation - PG Nexus

Complete guide to all pages and navigation flow in the PG Management System.

## 📄 Page Structure

### Properties Pages

#### 1. Properties List (`/properties`)
**Purpose**: View and manage all PG properties

**Features**:
- ✅ Grid view of all properties with cards
- ✅ Statistics dashboard (Total, Active, Rooms, Revenue)
- ✅ Search by name or city
- ✅ Filter by property type (Boys/Girls/Co-Living)
- ✅ Add new property
- ✅ Edit existing property
- ✅ Delete property
- ✅ View property details
- ✅ Occupancy percentage visualization
- ✅ Monthly revenue display
- ✅ Amenities preview (first 3 + count)

**Actions**:
- Click "View Details" → Navigate to Property Detail page
- Click Edit icon → Open PropertyForm modal
- Click Delete icon → Confirm and delete
- Click "+ Add Property" → Open PropertyForm modal

**Data Displayed**:
- Property name and type
- Location (address)
- Total rooms vs occupied
- Occupancy percentage with color-coded progress bar
- Monthly revenue
- Status badge
- Top amenities

---

#### 2. Property Detail (`/properties/:id`)
**Purpose**: Detailed view of a single property with all rooms

**Features**:
- ✅ Complete property information
- ✅ Statistics cards (Rooms, Occupied, Available, Revenue)
- ✅ Contact information display
- ✅ All amenities list with icons
- ✅ Grid view of all rooms in the property
- ✅ Add new room to property
- ✅ Edit property details
- ✅ View/Edit individual rooms
- ✅ Room status indicators

**Sections**:
1. **Header**: Property name, address, Edit button
2. **Stats**: 4 stat cards with trends
3. **Property Info**: Basic details, contact, description
4. **Amenities**: Full list with icons
5. **Rooms Grid**: All rooms with key details

**Room Cards Show**:
- Room number and floor
- Room type (single/double/triple/four)
- Rent amount
- Area in sq ft
- Status badge (available/occupied/maintenance)
- Current tenant name (if occupied)
- View and Edit buttons

**Actions**:
- Click "Edit Property" → Open PropertyForm with data
- Click "+ Add Room" → Open RoomForm
- Click room card → Navigate to Room Detail
- Click Edit on room → Open RoomForm with data

---

### Room Pages

#### 3. Room Detail (`/rooms/:id`)
**Purpose**: Complete details of a room, tenant, and payment history

**Features**:
- ✅ Room information and specifications
- ✅ Current tenant details (if occupied)
- ✅ Payment history table
- ✅ Edit room details
- ✅ Assign/Edit tenant
- ✅ Record new payment
- ✅ Feature checklist (Bathroom, Balcony, AC)
- ✅ Financial summary (Rent, Deposit, Total Paid)

**Sections**:
1. **Header**: Room number, property name, Edit button
2. **Status Cards**: Status, Rent, Type, Area
3. **Room Info**: Details, features, description
4. **Current Tenant**: Full tenant information OR vacant state
5. **Payment History**: Complete payment records table

**Tenant Info Shown** (when occupied):
- Full name and status
- Contact details (phone, email)
- Move-in date
- Occupation and company
- Financial details (rent, deposit, total paid)
- Emergency contact information

**Payment History Table**:
- Month
- Amount
- Late fee
- Total paid
- Payment date
- Payment method
- Transaction ID
- Status with icon

**Actions**:
- Click "Edit Room" → Open RoomForm with data
- Click "Edit" on tenant → Open TenantForm with data
- Click "Assign Tenant" (if vacant) → Open TenantForm
- Click "Record Payment" → Open PaymentForm

---

### Tenant Pages

#### 4. Tenants List (`/tenants`)
**Purpose**: View and manage all tenants across all properties

**Features**:
- ✅ Table view of all tenants
- ✅ Statistics (Total, Active, Inactive, Revenue)
- ✅ Search by name, email, phone, or room
- ✅ Filter by status (All/Active/Inactive)
- ✅ Add new tenant
- ✅ View tenant details
- ✅ Edit tenant
- ✅ Remove tenant
- ✅ Tenant avatar with initials
- ✅ Quick contact info display

**Table Columns**:
- Tenant (name, occupation)
- Contact (phone, email)
- Property & Room
- Rent amount
- Move-in date
- Status badge
- Action buttons

**Actions**:
- Click View icon → Navigate to Tenant Detail
- Click Edit icon → Open TenantForm with data
- Click Delete icon → Confirm and remove
- Click "+ Add Tenant" → Open TenantForm

---

#### 5. Tenant Detail (`/tenants/:id`)
**Purpose**: Complete profile and history of a tenant

**Features**:
- ✅ Personal information
- ✅ Employment details
- ✅ Room and property assignment
- ✅ Financial summary
- ✅ Payment history
- ✅ Emergency contact
- ✅ ID proof information
- ✅ Permanent address
- ✅ Days stayed calculation

**Sections**:
1. **Header**: Tenant name, room info, Edit button
2. **Quick Stats**: Days Stayed, Rent, Total Paid, Deposit
3. **Personal Info**: All personal and employment details
4. **Room Details**: Property, room, rent in cards
5. **Emergency Contact**: Name and phone
6. **Payment History**: All payments with dates

**Actions**:
- Click "Edit Details" → Open TenantForm with data
- Click "Record Payment" → Open PaymentForm
- Back button → Return to previous page

---

## 🗺️ Navigation Flow

### Example User Journeys

#### Journey 1: Add New Property and Rooms
```
/properties
  → Click "+ Add Property"
  → Fill PropertyForm
  → Submit
  → Click "View Details" on new property
  → /properties/:id
  → Click "+ Add Room"
  → Fill RoomForm
  → Submit
  → Room appears in grid
```

#### Journey 2: Assign Tenant to Room
```
/properties/:id
  → Click on a room card
  → /rooms/:id
  → Click "Assign Tenant"
  → Fill TenantForm
  → Submit
  → Tenant info appears
```

#### Journey 3: Record Payment
```
/tenants
  → Click View icon on tenant
  → /tenants/:id
  → Click "Record Payment"
  → Fill PaymentForm
  → Submit
  → Payment appears in history
```

#### Journey 4: View All Rooms in a Property
```
/properties
  → Click "View Details" on property
  → /properties/:id
  → See all rooms grid
  → Click on room
  → /rooms/:id
  → See complete room details
```

---

## 🎨 Design Features

### Consistent Elements Across All Pages

1. **Header Section**:
   - Page title
   - Subtitle/breadcrumb
   - Primary action button
   - Back button (on detail pages)

2. **Statistics Cards**:
   - Large number display
   - Icon
   - Descriptive label
   - Trend indicators (where applicable)

3. **Action Buttons**:
   - Primary: Add new items
   - Outline: Edit items
   - Ghost: View/Delete items
   - Consistent icon usage

4. **Empty States**:
   - Large icon
   - Descriptive message
   - Call-to-action button

5. **Search & Filters**:
   - Search input with icon
   - Filter chips/buttons
   - Real-time filtering

### Responsive Behavior

**Desktop (≥768px)**:
- Grid layouts (2-4 columns)
- Full table views
- Side-by-side cards

**Mobile (<768px)**:
- Single column layouts
- Horizontal scroll tables
- Stacked cards
- Bottom navigation

---

## 🔄 State Management

Each page manages:
- Modal visibility states
- Search queries
- Filter selections
- Selected items for edit
- Form data

Example:
```javascript
const [showPropertyForm, setShowPropertyForm] = useState(false);
const [selectedProperty, setSelectedProperty] = useState(null);
const [searchQuery, setSearchQuery] = useState('');
const [filterType, setFilterType] = useState('all');
```

---

## 📊 Data Flow

### Creating Items
```
1. User clicks "Add" button
2. Modal opens with empty form
3. User fills form and submits
4. Data sent to handler function
5. State updated with new item
6. Modal closes
7. UI re-renders with new item
```

### Editing Items
```
1. User clicks "Edit" button
2. Modal opens with pre-filled form
3. User modifies and submits
4. Data sent to handler with ID
5. State updated with modified item
6. Modal closes
7. UI re-renders with updates
```

### Viewing Details
```
1. User clicks "View" or item card
2. Navigate to detail page
3. Fetch/display item data
4. Show related information
5. Provide edit/delete actions
```

---

## 🔌 API Integration Points

Replace mock data with API calls:

```javascript
// Properties List
useEffect(() => {
  const fetchProperties = async () => {
    const response = await api.get('/properties');
    setProperties(response.data);
  };
  fetchProperties();
}, []);

// Property Detail
useEffect(() => {
  const fetchProperty = async () => {
    const response = await api.get(`/properties/${id}`);
    setProperty(response.data);
  };
  fetchProperty();
}, [id]);

// Add Property
const handleAddProperty = async (data) => {
  const response = await api.post('/properties', data);
  setProperties([...properties, response.data]);
};
```

---

## 🎯 Best Practices

1. **Always Navigate Back**: Provide back buttons on detail pages
2. **Confirm Deletions**: Use confirm dialogs for destructive actions
3. **Show Loading States**: Display loading indicators during operations
4. **Handle Empty States**: Show helpful messages when no data
5. **Validate Forms**: Check data before submission
6. **Update Lists**: Refresh lists after create/update/delete
7. **Preserve Context**: Remember search/filter state when navigating back

---

## 🚀 Quick Reference

### All Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/properties` | PropertiesList | View all properties |
| `/properties/:id` | PropertyDetail | View single property + rooms |
| `/rooms/:id` | RoomDetail | View room + tenant + payments |
| `/tenants` | TenantsList | View all tenants |
| `/tenants/:id` | TenantDetail | View single tenant profile |
| `/forms` | FormsDemo | Test all forms |

### Quick Actions

| Action | Location | Result |
|--------|----------|--------|
| Add Property | /properties | Opens PropertyForm |
| View Property | /properties | Navigate to /properties/:id |
| Add Room | /properties/:id | Opens RoomForm |
| View Room | /properties/:id | Navigate to /rooms/:id |
| Assign Tenant | /rooms/:id | Opens TenantForm |
| View Tenant | /tenants | Navigate to /tenants/:id |
| Record Payment | /rooms/:id or /tenants/:id | Opens PaymentForm |

---

**All pages are production-ready with full CRUD functionality!** 🎉
