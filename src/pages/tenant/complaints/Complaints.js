import React, { useState } from 'react';
import {
  AlertCircle,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  MessageSquare
} from 'lucide-react';
import Button from '../../../components/common/Button';
import Card, { CardContent } from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';
import ComplaintForm from '../../../components/complaint-form/ComplaintForm';
import { formatDate } from '../../../utils/helpers';

const TenantComplaints = () => {
  const [showComplaintForm, setShowComplaintForm] = useState(false);

  const [complaints, setComplaints] = useState([
    {
      id: '1',
      title: 'Water supply issue',
      category: 'plumbing',
      priority: 'high',
      description: 'Water pressure is very low in the bathroom',
      status: 'in-progress',
      createdAt: '2024-02-01',
      response: 'Plumber has been scheduled for tomorrow',
    },
    {
      id: '2',
      title: 'WiFi connectivity',
      category: 'wifi',
      priority: 'medium',
      description: 'Internet speed is slow',
      status: 'open',
      createdAt: '2024-02-03',
      response: null,
    },
    {
      id: '3',
      title: 'AC maintenance',
      category: 'electrical',
      priority: 'low',
      description: 'AC needs servicing',
      status: 'resolved',
      createdAt: '2024-01-28',
      response: 'AC has been serviced',
      resolvedAt: '2024-01-30',
    },
  ]);

  const stats = {
    total: complaints.length,
    open: complaints.filter(c => c.status === 'open').length,
    inProgress: complaints.filter(c => c.status === 'in-progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return Clock;
      case 'in-progress': return AlertCircle;
      case 'resolved': return CheckCircle2;
      case 'closed': return XCircle;
      default: return Clock;
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
            My Complaints
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your maintenance requests
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setShowComplaintForm(true)}
        >
          Raise Complaint
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total
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

      {/* Complaints List */}
      <div className="space-y-4">
        {complaints.map((complaint) => {
          const StatusIcon = getStatusIcon(complaint.status);
          return (
            <Card key={complaint.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    complaint.status === 'resolved' 
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : complaint.status === 'in-progress'
                      ? 'bg-blue-100 dark:bg-blue-900/30'
                      : 'bg-yellow-100 dark:bg-yellow-900/30'
                  }`}>
                    <StatusIcon className={`w-6 h-6 ${
                      complaint.status === 'resolved'
                        ? 'text-green-600'
                        : complaint.status === 'in-progress'
                        ? 'text-blue-600'
                        : 'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {complaint.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="default" size="sm">
                            {complaint.category}
                          </Badge>
                          <Badge variant={complaint.priority === 'high' ? 'danger' : complaint.priority === 'medium' ? 'warning' : 'default'} size="sm">
                            {complaint.priority}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(complaint.createdAt)}
                          </span>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(complaint.status)}>
                        {complaint.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {complaint.description}
                    </p>
                    {complaint.response && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                              Response:
                            </p>
                            <p className="text-sm text-blue-700 dark:text-blue-400">
                              {complaint.response}
                            </p>
                            {complaint.resolvedAt && (
                              <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">
                                Resolved on {formatDate(complaint.resolvedAt)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {complaints.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Complaints
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You haven't raised any complaints yet
            </p>
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => setShowComplaintForm(true)}
            >
              Raise Complaint
            </Button>
          </CardContent>
        </Card>
      )}

      <ComplaintForm
        isOpen={showComplaintForm}
        onClose={() => setShowComplaintForm(false)}
        onSubmit={(data) => {
          setComplaints([data, ...complaints]);
          console.log('Complaint raised:', data);
        }}
        userRole="tenant"
      />
    </div>
  );
};

export default TenantComplaints;
