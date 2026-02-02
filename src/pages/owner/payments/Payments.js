import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Calendar
} from 'lucide-react';
import Button from '../../../components/common/Button';
import Card, { CardContent } from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';
import Input from '../../../components/common/Input';
import PaymentForm from '../../../components/payment-form/PaymentForm';
import { formatCurrency, formatDate } from '../../../utils/helpers';

const OwnerPayments = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const payments = [
    {
      id: '1',
      tenantName: 'Arun Kumar',
      propertyName: 'Green Valley PG',
      roomNumber: '101',
      month: '2024-02',
      amount: 5500,
      paymentDate: '2024-02-05',
      paymentMethod: 'upi',
      transactionId: 'UPI123456',
      status: 'paid',
    },
    {
      id: '2',
      tenantName: 'Priya Sharma',
      propertyName: 'Sunrise Residency',
      roomNumber: '205',
      month: '2024-02',
      amount: 6000,
      paymentDate: '2024-02-03',
      paymentMethod: 'bank_transfer',
      transactionId: 'TRF789012',
      status: 'paid',
    },
    {
      id: '3',
      tenantName: 'Rahul Verma',
      propertyName: 'Peaceful Heights',
      roomNumber: '303',
      month: '2024-02',
      amount: 4500,
      paymentDate: null,
      paymentMethod: null,
      transactionId: null,
      status: 'pending',
    },
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.roomNumber.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: payments.reduce((sum, p) => sum + p.amount, 0),
    paid: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    count: payments.length,
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return CheckCircle2;
      case 'pending': return Clock;
      case 'overdue': return XCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Payments
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track all rent payments
          </p>
        </div>
        <Button variant="outline" icon={Download}>
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(stats.total)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Amount
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.paid)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Received
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {formatCurrency(stats.pending)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Pending
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.count}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Transactions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by tenant or room..."
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
            onClick={() => setFilterStatus('paid')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'paid'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Paid
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === 'pending'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tenant
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property & Room
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Month
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Payment Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Method
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => {
                  const StatusIcon = getStatusIcon(payment.status);
                  return (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {payment.tenantName}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-900 dark:text-gray-100">
                          {payment.propertyName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Room {payment.roomNumber}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900 dark:text-gray-100">
                            {new Date(payment.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {formatCurrency(payment.amount)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {payment.paymentDate ? formatDate(payment.paymentDate) : '-'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {payment.paymentMethod ? payment.paymentMethod.replace('_', ' ') : '-'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`w-5 h-5 ${getStatusColor(payment.status)}`} />
                          <Badge
                            variant={
                              payment.status === 'paid' ? 'success' :
                              payment.status === 'pending' ? 'warning' : 'danger'
                            }
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <PaymentForm
        isOpen={showPaymentForm}
        onClose={() => setShowPaymentForm(false)}
        onSubmit={(data) => console.log('Payment recorded:', data)}
        tenants={[]}
      />
    </div>
  );
};

export default OwnerPayments;
