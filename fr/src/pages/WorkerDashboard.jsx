// src/pages/WorkerDashboard.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function WorkerDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [workerProfile, setWorkerProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    pendingBookings: 0,
    acceptedBookings: 0,
    completedJobs: 0,
    totalEarnings: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    fetchWorkerData();
  }, []);

  const fetchWorkerData = async () => {
    try {
      setIsLoading(true);
      const [profileRes, bookingsRes, statsRes] = await Promise.all([
        API.get('/workers/profile'),
        API.get('/bookings/worker'),
        API.get('/workers/stats')
      ]);

      setUser(profileRes.data.user);
      setWorkerProfile(profileRes.data.workerProfile);
      setBookings(bookingsRes.data.bookings);
      setStats(statsRes.data.stats);
      setIsAvailable(profileRes.data.workerProfile?.isAvailableNow || false);
    } catch (error) {
      console.error('Error fetching worker data:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvailabilityToggle = async () => {
    try {
      const response = await API.patch('/workers/availability', {
        isAvailableNow: !isAvailable
      });
      setIsAvailable(response.data.isAvailableNow);
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const handleBookingAction = async (bookingId, action, note = '') => {
    try {
      await API.patch(`/bookings/${bookingId}/status`, {
        status: action,
        note
      });
      fetchWorkerData(); // Refresh data
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      rejected: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {t(`booking.status.${status}`)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user?.profileImage || '/default-avatar.png'}
                  alt={user?.name}
                />
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  {t('worker.dashboard.welcome', { name: user?.name })}
                </h1>
                <p className="text-sm text-gray-600">
                  {workerProfile?.services?.join(', ') || t('worker.dashboard.no_services')}
                </p>
              </div>
            </div>
            
            {/* Availability Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-3">
                  {t('worker.dashboard.availability')}
                </span>
                <button
                  onClick={handleAvailabilityToggle}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isAvailable ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isAvailable ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className={`ml-3 text-sm ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {isAvailable ? t('worker.dashboard.online') : t('worker.dashboard.offline')}
                </span>
              </div>

              <Link
                to="/worker/profile"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('worker.dashboard.edit_profile')}
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'bookings', 'earnings', 'profile'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {t(`worker.dashboard.tabs.${tab}`)}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-medium">📋</span>
                    </div>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">
                      {t('worker.dashboard.pending_requests')}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.pendingBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-medium">⚡</span>
                    </div>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">
                      {t('worker.dashboard.active_jobs')}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.acceptedBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-medium">✅</span>
                    </div>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">
                      {t('worker.dashboard.completed_jobs')}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.completedJobs}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-medium">💰</span>
                    </div>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">
                      {t('worker.dashboard.total_earnings')}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">₹{stats.totalEarnings}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  {t('worker.dashboard.recent_bookings')}
                </h3>
              </div>
              <div className="overflow-hidden">
                {bookings.slice(0, 5).map((booking) => (
                  <div key={booking._id} className="px-6 py-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">
                            {booking.title}
                          </h4>
                          {getStatusBadge(booking.status)}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {booking.customer?.name} • {booking.scheduledDate && new Date(booking.scheduledDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          ₹{booking.pricing?.estimatedCost || 0} • {booking.estimatedDuration}h
                        </p>
                      </div>
                      
                      {booking.status === 'pending' && (
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleBookingAction(booking._id, 'accepted')}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                          >
                            {t('common.accept')}
                          </button>
                          <button
                            onClick={() => handleBookingAction(booking._id, 'rejected')}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            {t('common.reject')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {t('worker.dashboard.all_bookings')}
              </h3>
            </div>
            <div className="overflow-hidden">
              {bookings.map((booking) => (
                <div key={booking._id} className="px-6 py-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">
                          {booking.title}
                        </h4>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <p><strong>{t('common.customer')}:</strong> {booking.customer?.name}</p>
                          <p><strong>{t('common.service')}:</strong> {t(`services.${booking.service}`)}</p>
                          <p><strong>{t('common.date')}:</strong> {booking.scheduledDate && new Date(booking.scheduledDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p><strong>{t('common.time')}:</strong> {booking.scheduledTime?.start} - {booking.scheduledTime?.end}</p>
                          <p><strong>{t('common.duration')}:</strong> {booking.estimatedDuration}h</p>
                          <p><strong>{t('common.price')}:</strong> ₹{booking.pricing?.estimatedCost || 0}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>{t('common.description')}:</strong> {booking.description}
                      </p>
                      
                      {booking.address && (
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>{t('common.address')}:</strong> {booking.address.street}, {booking.address.city}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleBookingAction(booking._id, 'accepted')}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                          >
                            {t('common.accept')}
                          </button>
                          <button
                            onClick={() => handleBookingAction(booking._id, 'rejected')}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            {t('common.reject')}
                          </button>
                        </>
                      )}
                      
                      {booking.status === 'accepted' && (
                        <button
                          onClick={() => handleBookingAction(booking._id, 'in-progress')}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          {t('worker.dashboard.start_job')}
                        </button>
                      )}
                      
                      {booking.status === 'in-progress' && (
                        <button
                          onClick={() => handleBookingAction(booking._id, 'completed')}
                          className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
                        >
                          {t('worker.dashboard.complete_job')}
                        </button>
                      )}
                      
                      <Link
                        to={`/bookings/${booking._id}`}
                        className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 text-center"
                      >
                        {t('common.view_details')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              {bookings.length === 0 && (
                <div className="px-6 py-8 text-center text-gray-500">
                  <p>{t('worker.dashboard.no_bookings')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('worker.dashboard.earnings_overview')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-semibold text-green-600">₹{stats.totalEarnings}</p>
                <p className="text-sm text-gray-600">{t('worker.dashboard.total_earned')}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-semibold text-blue-600">₹{(stats.totalEarnings / Math.max(stats.completedJobs, 1)).toFixed(0)}</p>
                <p className="text-sm text-gray-600">{t('worker.dashboard.avg_per_job')}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-semibold text-purple-600">₹{workerProfile?.hourlyRate || 0}</p>
                <p className="text-sm text-gray-600">{t('worker.dashboard.hourly_rate')}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('worker.dashboard.profile_overview')}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('common.services')}
                  </label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {workerProfile?.services?.map((service) => (
                      <span
                        key={service}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                      >
                        {t(`services.${service}`)}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t('worker.profile.experience')}
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {workerProfile?.experience || 0} {t('common.years')}
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <Link
                  to="/worker/profile/edit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('worker.dashboard.edit_profile')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}