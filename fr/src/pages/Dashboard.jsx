// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    totalSpent: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      fetchDashboardData();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch recent bookings
      const bookingsRes = await API.get('/bookings?limit=5');
      setRecentBookings(bookingsRes.data.bookings);

      // Calculate stats from bookings
      const allBookingsRes = await API.get('/bookings?limit=1000');
      const bookings = allBookingsRes.data.bookings;
      
      const stats = {
        totalBookings: bookings.length,
        activeBookings: bookings.filter(b => ['pending', 'accepted', 'in-progress'].includes(b.status)).length,
        completedBookings: bookings.filter(b => b.status === 'completed').length,
        totalSpent: bookings
          .filter(b => b.status === 'completed')
          .reduce((sum, b) => sum + (b.pricing?.totalCost || 0), 0)
      };
      
      setStats(stats);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      rejected: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getServiceIcon = (service) => {
    const icons = {
      plumbing: '🔧',
      electrical: '⚡',
      cleaning: '🧹',
      carpentry: '🔨',
      ac_repair: '❄️',
      painting: '🎨',
      gardening: '🌱',
      tv_installation: '📺',
      appliance_repair: '🔧',
      handyman: '🛠️'
    };
    return icons[service] || '🔧';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('dashboard.welcome', { name: user?.name })}
              </h1>
              <p className="text-gray-600">{t('dashboard.subtitle')}</p>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/workers"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('dashboard.book_service')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.total_bookings')}</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.active_bookings')}</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.completed_bookings')}</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.completedBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('dashboard.stats.total_spent')}</p>
                <p className="text-2xl font-semibold text-gray-900">₹{stats.totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">{t('dashboard.quick_actions')}</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/workers?service=plumbing"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-3xl mb-2">🔧</span>
                <span className="text-sm font-medium">{t('services.plumbing')}</span>
              </Link>
              
              <Link
                to="/workers?service=electrical"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-3xl mb-2">⚡</span>
                <span className="text-sm font-medium">{t('services.electrical')}</span>
              </Link>
              
              <Link
                to="/workers?service=cleaning"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-3xl mb-2">🧹</span>
                <span className="text-sm font-medium">{t('services.cleaning')}</span>
              </Link>
              
              <Link
                to="/workers"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-3xl mb-2">🔍</span>
                <span className="text-sm font-medium">{t('dashboard.browse_all')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">{t('dashboard.recent_bookings')}</h2>
            <Link
              to="/bookings"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              {t('dashboard.view_all')} →
            </Link>
          </div>
          <div className="p-6">
            {recentBookings.length > 0 ? (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">
                        {getServiceIcon(booking.service)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{booking.title}</h3>
                        <p className="text-sm text-gray-600">
                          {t('services.' + booking.service)} • {booking.worker?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(booking.scheduledDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                        {t('booking_status.' + booking.status)}
                      </span>
                      {booking.pricing?.totalCost && (
                        <span className="text-sm font-medium text-gray-900">
                          ₹{booking.pricing.totalCost}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📅</span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('dashboard.no_bookings')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('dashboard.no_bookings_desc')}
                </p>
                <Link
                  to="/workers"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  {t('dashboard.book_first_service')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}