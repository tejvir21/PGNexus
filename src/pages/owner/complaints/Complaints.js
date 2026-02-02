import React, { useState } from 'react';
import {
  AlertCircle,
  Search,
  CheckCircle2,
  Calendar,
  Tag
} from 'lucide-react';
import Card, { CardContent } from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';
import Input from '../../../components/common/Input';
import ComplaintForm from '../../../components/complaint-form/ComplaintForm';
import { formatDate } from '../../../utils/helpers';

const OwnerComplaints = () => {
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [complaints, setComplaints] = useState([
    {
      id: '1',
      tenantName: 'Arun Kumar',
      propertyName: 'Green Valley PG',
      roomNumber: '101',
      title: 'Water supply issue',
      category: 'plumbing',
      priority: 'high',
      description: 'Water pressure is very low in the bathroom',
      status: 'open',
      createdAt: '2024-02-01',
    },
    {
      id: '2',
      tenantName: 'Priya Sharma',
      propertyName: 'Sunrise Residency',
      roomNumber: '205',
      title: 'AC not working',
      category: 'electrical',
      priority: 'medium',
      description: 'AC stopped working since yesterday',
      status: 'in-progress',
      createdAt: '2024-01-31',
    },
    {
      id: '3',
      tenantName: 'Rahul Verma',
      propertyName: 'Peaceful Heights',
      roomNumber: '303',
      title: 'WiFi connectivity',
      category: 'wifi',
      priority: 'low',
      description: 'Slow internet speed',
      status: 'resolved',
      createdAt: '2024-01-30',
    },
  ]);

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.roomNumber.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: complaints.length,
    open: complaints.filter(c => c.status === 'open').length,
    inProgress: complaints.filter(c => c.status === 'in-progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
  };

  const handleUpdateStatus = (id, newStatus) => {
    setComplaints(complaints.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'warning';
      case 'in-progress': return 'info';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Complaints & Issues
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage maintenance requests and issues
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Complaints
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.open}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Open
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {stats.inProgress}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              In Progress
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {stats.resolved}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Resolved
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by title, tenant, or room..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('open')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'open'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Open
          </button>
          <button
            onClick={() => setFilterStatus('in-progress')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'in-progress'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilterStatus('resolved')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'resolved'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint) => (
          <Card key={complaint.id} hover>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {complaint.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {complaint.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="default" size="sm">
                        <Tag className="w-3 h-3 mr-1" />
                        {complaint.category}
                      </Badge>
                      <Badge variant={getPriorityColor(complaint.priority)} size="sm">
                        {complaint.priority} priority
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(complaint.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{complaint.tenantName}</span>
                      <span>•</span>
                      <span>{complaint.propertyName}</span>
                      <span>•</span>
                      <span>Room {complaint.roomNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={getStatusColor(complaint.status)}>
                    {complaint.status.replace('-', ' ')}
                  </Badge>
                  <select
                    value={complaint.status}
                    onChange={(e) => handleUpdateStatus(complaint.id, e.target.value)}
                    className="text-sm px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredComplaints.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Complaints Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Try adjusting your search' : 'All clear! No open complaints.'}
            </p>
          </CardContent>
        </Card>
      )}

      <ComplaintForm
        isOpen={showComplaintForm}
        onClose={() => setShowComplaintForm(false)}
        onSubmit={(data) => {
          setComplaints([...complaints, data]);
          console.log('Complaint added:', data);
        }}
        userRole="owner"
      />
    </div>
  );
};

export default OwnerComplaints;
