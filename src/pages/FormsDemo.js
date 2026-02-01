import React, { useState } from 'react';
import { 
  Building2, 
  BedDouble, 
  Users, 
  AlertCircle, 
  IndianRupee, 
  Megaphone,
  Plus
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import PropertyForm from '../../components/common/PropertyForm';
import RoomForm from '../../components/common/RoomForm';
import TenantForm from '../../components/common/TenantForm';
import ComplaintForm from '../../components/common/ComplaintForm';
import PaymentForm from '../../components/common/PaymentForm';
import NoticeForm from '../../components/common/NoticeForm';

const FormsDemo = () => {
  const [activeForm, setActiveForm] = useState(null);

  // Mock data for forms
  const mockProperties = [
    { id: '1', name: 'Green Valley PG' },
    { id: '2', name: 'Sunrise Residency' },
    { id: '3', name: 'Blue Haven' },
  ];

  const mockRooms = [
    { id: '1', propertyId: '1', roomNumber: '101', roomType: 'single', rent: 5000, status: 'available' },
    { id: '2', propertyId: '1', roomNumber: '102', roomType: 'double', rent: 4000, status: 'available' },
    { id: '3', propertyId: '2', roomNumber: '201', roomType: 'single', rent: 5500, status: 'available' },
  ];

  const mockTenants = [
    { id: '1', fullName: 'John Doe', roomNumber: '101' },
    { id: '2', fullName: 'Jane Smith', roomNumber: '102' },
    { id: '3', fullName: 'Mike Johnson', roomNumber: '201' },
  ];

  const handleFormSubmit = (formType, data) => {
    console.log(`${formType} submitted:`, data);
    alert(`${formType} submitted successfully! Check console for data.`);
  };

  const forms = [
    {
      id: 'property',
      title: 'Property Form',
      description: 'Add or edit PG properties with complete details',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      component: PropertyForm,
      props: {},
    },
    {
      id: 'room',
      title: 'Room Form',
      description: 'Create and manage individual rooms',
      icon: BedDouble,
      color: 'from-green-500 to-green-600',
      component: RoomForm,
      props: { properties: mockProperties, rooms: mockRooms },
    },
    {
      id: 'tenant',
      title: 'Tenant Form',
      description: 'Onboard new tenants with complete information',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      component: TenantForm,
      props: { properties: mockProperties, rooms: mockRooms },
    },
    {
      id: 'complaint',
      title: 'Complaint Form',
      description: 'Raise and track maintenance issues',
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600',
      component: ComplaintForm,
      props: { userRole: 'tenant' },
    },
    {
      id: 'payment',
      title: 'Payment Form',
      description: 'Record rent and other payments',
      icon: IndianRupee,
      color: 'from-emerald-500 to-emerald-600',
      component: PaymentForm,
      props: { tenants: mockTenants },
    },
    {
      id: 'notice',
      title: 'Notice Form',
      description: 'Create and publish notices for tenants',
      icon: Megaphone,
      color: 'from-red-500 to-red-600',
      component: NoticeForm,
      props: {},
    },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="animate-slide-down">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Forms Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Interactive demonstration of all available forms
        </p>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form, index) => {
          const Icon = form.icon;
          const FormComponent = form.component;

          return (
            <Card
              key={form.id}
              hover
              className="animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 bg-gradient-to-br ${form.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle>{form.title}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {form.description}
                </p>
              </CardHeader>
              <CardContent>
                <Button
                  variant="primary"
                  fullWidth
                  icon={Plus}
                  onClick={() => setActiveForm(form.id)}
                >
                  Open Form
                </Button>

                {/* Render Form Modal */}
                <FormComponent
                  isOpen={activeForm === form.id}
                  onClose={() => setActiveForm(null)}
                  onSubmit={(data) => handleFormSubmit(form.title, data)}
                  {...form.props}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Instructions */}
      <Card className="animate-slide-up" style={{ animationDelay: '600ms' }}>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                1. Click "Open Form" Button
              </h4>
              <p>Each card represents a different form. Click the button to open the modal.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                2. Fill in the Details
              </h4>
              <p>All forms have validation. Required fields are marked with an asterisk (*).</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                3. Submit the Form
              </h4>
              <p>Click the submit button. Data will be logged to the console and shown in an alert.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                4. Integration
              </h4>
              <p>
                In production, replace the <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">handleFormSubmit</code> 
                {' '}function with your API calls to save data to your backend.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features List */}
      <Card className="animate-slide-up" style={{ animationDelay: '700ms' }}>
        <CardHeader>
          <CardTitle>Form Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Validation
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>• Required field validation</li>
                <li>• Email format validation</li>
                <li>• Phone number validation</li>
                <li>• Custom validation rules</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                User Experience
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>• Real-time error messages</li>
                <li>• Keyboard navigation</li>
                <li>• ESC key to close</li>
                <li>• Backdrop click to close</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                Design
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>• Responsive layouts</li>
                <li>• Dark mode support</li>
                <li>• Icon integration</li>
                <li>• Smooth animations</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                Functionality
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                <li>• Add & Edit modes</li>
                <li>• Dynamic field updates</li>
                <li>• Calculated fields</li>
                <li>• Preview sections</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormsDemo;
