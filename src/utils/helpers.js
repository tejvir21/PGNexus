import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getRoomStatusColor = (status) => {
  const colors = {
    available: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300',
    occupied: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300',
    maintenance: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300',
    reserved: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300',
  };
  return colors[status] || colors.available;
};

export const getPaymentStatusColor = (status) => {
  const colors = {
    paid: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300',
    pending: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300',
    overdue: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300',
    partial: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300',
  };
  return colors[status] || colors.pending;
};

export const getComplaintStatusColor = (status) => {
  const colors = {
    open: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300',
    'in-progress': 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300',
    resolved: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300',
    closed: 'text-gray-600 bg-gray-100 dark:bg-gray-800/30 dark:text-gray-300',
  };
  return colors[status] || colors.open;
};

export const getPriorityColor = (priority) => {
  const colors = {
    low: 'text-gray-600 bg-gray-100 dark:bg-gray-800/30 dark:text-gray-300',
    medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300',
    high: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300',
    urgent: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300',
  };
  return colors[priority] || colors.medium;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
