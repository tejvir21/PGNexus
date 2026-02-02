import React from 'react';
import { 
  Building2, 
  Users, 
  IndianRupee, 
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import StatCard from '../../../components/common/StatCard';
import Card, { CardHeader, CardTitle, CardContent } from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';
import { formatDate } from '../../../utils/helpers';

const AdminDashboard = () => {
  // Mock data
  const stats = [
    { title: 'Total Properties', value: '24', icon: Building2, trend: 'up', trendValue: '+12%', color: 'primary' },
    { title: 'Total Tenants', value: '186', icon: Users, trend: 'up', trendValue: '+8%', color: 'success' },
    { title: 'Monthly Revenue', value: '₹4.2L', icon: IndianRupee, trend: 'up', trendValue: '+15%', color: 'info' },
    { title: 'Open Complaints', value: '12', icon: AlertCircle, trend: 'down', trendValue: '-5%', color: 'warning' },
  ];

  const recentProperties = [
    { id: 1, name: 'Green Valley PG', owner: 'Rajesh Kumar', rooms: 12, occupied: 10, status: 'active' },
    { id: 2, name: 'Sunrise Residency', owner: 'Priya Sharma', rooms: 15, occupied: 15, status: 'full' },
    { id: 3, name: 'Blue Haven', owner: 'Amit Patel', rooms: 8, occupied: 6, status: 'active' },
    { id: 4, name: 'Silver Oak PG', owner: 'Neha Gupta', rooms: 10, occupied: 8, status: 'active' },
  ];

  const recentComplaints = [
    { id: 1, tenant: 'Arun Kumar', pg: 'Green Valley PG', issue: 'Water supply issue', status: 'open', priority: 'high', date: '2024-02-01' },
    { id: 2, tenant: 'Sneha Reddy', pg: 'Sunrise Residency', issue: 'AC not working', status: 'in-progress', priority: 'medium', date: '2024-01-31' },
    { id: 3, tenant: 'Rahul Verma', pg: 'Blue Haven', issue: 'Wifi connectivity', status: 'resolved', priority: 'low', date: '2024-01-30' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: 'success',
      full: 'warning',
      inactive: 'danger',
    };
    return colors[status] || 'default';
  };

  const getComplaintStatusColor = (status) => {
    const colors = {
      open: 'warning',
      'in-progress': 'info',
      resolved: 'success',
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'default',
      medium: 'warning',
      high: 'danger',
    };
    return colors[priority] || 'default';
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Welcome Section */}
      <div className="animate-slide-down">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Overview of all properties and operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
        {stats.map((stat, index) => (
          <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Revenue chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy Chart */}
        <Card className="animate-slide-up" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle>Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Occupancy chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Properties */}
      <Card className="animate-slide-up" style={{ animationDelay: '400ms' }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Properties</CardTitle>
          <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1">
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Owner
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Rooms
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Occupancy
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentProperties.map((property) => (
                  <tr 
                    key={property.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {property.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {property.owner}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {property.rooms}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[80px]">
                          <div 
                            className="bg-primary-600 h-2 rounded-full" 
                            style={{ width: `${(property.occupied / property.rooms) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {property.occupied}/{property.rooms}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(property.status)}>
                        {property.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Complaints */}
      <Card className="animate-slide-up" style={{ animationDelay: '500ms' }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Complaints</CardTitle>
          <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1">
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentComplaints.map((complaint) => (
              <div 
                key={complaint.id}
                className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {complaint.issue}
                    </h4>
                    <Badge variant={getPriorityColor(complaint.priority)} size="sm">
                      {complaint.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {complaint.tenant} • {complaint.pg}
                  </p>
                  <div className="flex items-center space-x-3">
                    <Badge variant={getComplaintStatusColor(complaint.status)} size="sm">
                      {complaint.status}
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(complaint.date)}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
