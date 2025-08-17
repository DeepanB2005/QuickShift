// src/services/api.js
import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base configuration
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add loading indicator for requests
    if (config.showLoading !== false) {
      // You can add a loading spinner here
      console.log('Request started:', config.method?.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common responses
API.interceptors.response.use(
  (response) => {
    // Hide loading indicator
    console.log('Request completed:', response.status, response.config.url);
    
    // Show success message for POST, PUT, DELETE operations
    if (['post', 'put', 'delete', 'patch'].includes(response.config.method?.toLowerCase())) {
      const successMessage = response.data?.message;
      if (successMessage && response.config.showSuccessToast !== false) {
        toast.success(successMessage);
      }
    }
    
    return response;
  },
  (error) => {
    // Hide loading indicator
    console.error('Request failed:', error);
    
    // Handle different error scenarios
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Only redirect if not already on login/register page
          if (!window.location.pathname.includes('/login') && 
              !window.location.pathname.includes('/register')) {
            window.location.href = '/login';
            toast.error('Session expired. Please login again.');
          }
          break;
          
        case 403:
          toast.error('Access denied. You don\'t have permission to perform this action.');
          break;
          
        case 404:
          toast.error('Resource not found.');
          break;
          
        case 422:
          // Validation errors
          if (data.errors && Array.isArray(data.errors)) {
            data.errors.forEach(err => {
              toast.error(err.message || err.msg);
            });
          } else {
            toast.error(data.message || 'Validation failed.');
          }
          break;
          
        case 429:
          toast.error('Too many requests. Please wait a moment and try again.');
          break;
          
        case 500:
          toast.error('Server error. Please try again later.');
          break;
          
        default:
          toast.error(data?.message || 'Something went wrong. Please try again.');
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your internet connection.');
    } else {
      // Request setup error
      toast.error('Request failed. Please try again.');
    }
    
    return Promise.reject(error);
  }
);

// Helper functions for common API operations
export const apiHelpers = {
  // User authentication
  auth: {
    login: (credentials) => API.post('/auth/login', credentials),
    register: (userData) => API.post('/auth/register', userData),
    logout: () => API.post('/auth/logout'),
    getCurrentUser: () => API.get('/auth/me'),
    updateProfile: (userData) => API.put('/auth/profile', userData),
    forgotPassword: (email) => API.post('/auth/forgot-password', { email }),
    resetPassword: (token, password) => API.post('/auth/reset-password', { token, password }),
  },

  // Workers
  workers: {
    getAll: (params = {}) => API.get('/workers', { params }),
    search: (params = {}) => API.get('/workers/search', { params }),
    getById: (id) => API.get(`/workers/${id}`),
    updateProfile: (data) => API.put('/workers/profile', data),
    updateAvailability: (availability) => API.patch('/workers/availability', availability),
    getStats: () => API.get('/workers/stats'),
    uploadDocument: (formData) => API.post('/workers/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  },

  // Bookings
  bookings: {
    create: (bookingData) => API.post('/bookings', bookingData),
    getAll: (params = {}) => API.get('/bookings', { params }),
    getById: (id) => API.get(`/bookings/${id}`),
    updateStatus: (id, statusData) => API.patch(`/bookings/${id}/status`, statusData),
    cancel: (id, reason) => API.patch(`/bookings/${id}/cancel`, { reason }),
    rate: (id, ratingData) => API.post(`/bookings/${id}/rate`, ratingData),
    getCustomerBookings: () => API.get('/bookings/customer'),
    getWorkerBookings: () => API.get('/bookings/worker'),
  },

  // Payments
  payments: {
    createOrder: (bookingId, amount) => API.post('/payments/create-order', { bookingId, amount }),
    verifyPayment: (paymentData) => API.post('/payments/verify', paymentData),
    getHistory: () => API.get('/payments/history'),
  },

  // Users
  users: {
    getProfile: () => API.get('/users/profile'),
    updateProfile: (userData) => API.put('/users/profile', userData),
    uploadAvatar: (formData) => API.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getFavorites: () => API.get('/users/favorites'),
    addFavorite: (workerId) => API.post(`/users/favorites/${workerId}`),
    removeFavorite: (workerId) => API.delete(`/users/favorites/${workerId}`),
  },

  // Notifications
  notifications: {
    getAll: () => API.get('/notifications'),
    markAsRead: (id) => API.patch(`/notifications/${id}/read`),
    markAllAsRead: () => API.patch('/notifications/read-all'),
    updateSettings: (settings) => API.put('/notifications/settings', settings),
  },

  // Support
  support: {
    createTicket: (ticketData) => API.post('/support/tickets', ticketData),
    getTickets: () => API.get('/support/tickets'),
    updateTicket: (id, updateData) => API.patch(`/support/tickets/${id}`, updateData),
  }
};

// Export configured axios instance as default
export default API;