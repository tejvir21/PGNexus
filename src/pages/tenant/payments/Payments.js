import React from 'react';
import {
  CheckCircle2,
  Clock,
  Calendar,
  Download
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import { formatCurrency, formatDate } from '../../../utils/helpers';

const TenantPayments = () => {
  const paymentHistory = [
    {
      id: '1',
      month: '2024-02',
      amount: 5500,
      paymentDate: '2024-02-05',
      paymentMethod: 'upi',
      transactionId: 'UPI123456',
      status: 'paid',
    },
    {
      id: '2',
      month: '2024-01',
      amount: 5500,
      paymentDate: '2024-01-05',
      paymentMethod: 'bank_transfer',
      transactionId: 'TRF789012',
      status: 'paid',
    },
    {
      id: '3',
      month: '2023-12',
      amount: 5600,
      paymentDate: '2023-12-08',
      paymentMethod: 'cash',
      status: 'paid',
      lateFee: 100,
    },
    {
      id: '4',
      month: '2024-03',
      amount: 5500,
      dueDate: '2024-03-05',
      status: 'pending',
    },
  ];

  const stats = {
    totalPaid: paymentHistory.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    pending: paymentHistory.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    paymentsCount: paymentHistory.filter(p => p.status === 'paid').length,
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            My Payments
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View your payment history
          </p>
        </div>
        <Button variant="outline" icon={Download}>
          Download Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.totalPaid)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Paid
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
              {stats.paymentsCount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Payments
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                  payment.status === 'paid'
                    ? 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    : 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    payment.status === 'paid'
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-yellow-100 dark:bg-yellow-900/30'
                  }`}>
                    {payment.status === 'paid' ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <Clock className="w-6 h-6 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {new Date(payment.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {payment.status === 'paid' ? (
                        <span>Paid on {formatDate(payment.paymentDate)}</span>
                      ) : (
                        <span>Due on {formatDate(payment.dueDate)}</span>
                      )}
                    </div>
                    {payment.paymentMethod && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
                        via {payment.paymentMethod.replace('_', ' ')}
                        {payment.transactionId && ` • ${payment.transactionId}`}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {formatCurrency(payment.amount)}
                  </p>
                  {payment.lateFee && (
                    <p className="text-sm text-red-600">+{formatCurrency(payment.lateFee)} late fee</p>
                  )}
                  <Badge 
                    variant={payment.status === 'paid' ? 'success' : 'warning'} 
                    size="sm"
                    className="mt-1"
                  >
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantPayments;
