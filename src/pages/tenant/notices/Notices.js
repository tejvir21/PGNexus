import React from 'react';
import {
  Megaphone,
  Calendar,
  AlertCircle,
  Info,
  CheckCircle2
} from 'lucide-react';
import Card, { CardContent } from '../../../components/common/Card';
import Badge from '../../../components/common/Badge';
import { formatDate } from '../../../utils/helpers';

const TenantNotices = () => {
  const notices = [
    {
      id: '1',
      title: 'Electricity Maintenance',
      content: 'Power will be off on Sunday from 9 AM to 12 PM for maintenance work.',
      category: 'maintenance',
      priority: 'high',
      validFrom: '2024-02-03',
      validTill: '2024-02-11',
    },
    {
      id: '2',
      title: 'Rent Payment Reminder',
      content: 'Please pay your monthly rent by the 5th of every month to avoid late fees.',
      category: 'payment',
      priority: 'medium',
      validFrom: '2024-02-01',
      validTill: null,
    },
    {
      id: '3',
      title: 'WiFi Upgrade',
      content: 'We have upgraded our internet connection to 100 Mbps for better speed.',
      category: 'general',
      priority: 'low',
      validFrom: '2024-01-28',
      validTill: null,
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent':
      case 'high': return AlertCircle;
      case 'medium': return Info;
      case 'low': return CheckCircle2;
      default: return Info;
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Notices & Announcements
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Important updates from management
        </p>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice) => {
          const PriorityIcon = getPriorityIcon(notice.priority);
          return (
            <Card key={notice.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notice.priority === 'high' || notice.priority === 'urgent'
                      ? 'bg-red-100 dark:bg-red-900/30'
                      : notice.priority === 'medium'
                      ? 'bg-blue-100 dark:bg-blue-900/30'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    <Megaphone className={`w-6 h-6 ${
                      notice.priority === 'high' || notice.priority === 'urgent'
                        ? 'text-red-600'
                        : notice.priority === 'medium'
                        ? 'text-blue-600'
                        : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {notice.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="default" size="sm">
                            {notice.category}
                          </Badge>
                          <Badge variant={getPriorityColor(notice.priority)} size="sm">
                            <PriorityIcon className="w-3 h-3 mr-1" />
                            {notice.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-wrap">
                      {notice.content}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>From: {formatDate(notice.validFrom)}</span>
                      </div>
                      {notice.validTill && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Till: {formatDate(notice.validTill)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {notices.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Megaphone className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Notices
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              There are no active notices at the moment
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TenantNotices;
