// src/pages/ServiceWorkers.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../services/api';

const ServiceWorkers = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    service: searchParams.get('service') || '',
    city: searchParams.get('city') || '',
    minRating: searchParams.get('minRating') || '',
    maxRate: searchParams.get('maxRate') || '',
    availability: searchParams.get('availability') || '',
    sortBy: searchParams.get('sortBy') || 'rating'
  });
  
  const services = [
    'plumbing', 'electrical', 'carpentry', 'cleaning', 'moving', 
    'painting', 'gardening', 'ac_repair', 'tv_installation', 
    'appliance_repair', 'handyman', 'pest_control', 'deep_cleaning', 
    'home_maintenance'
  ];

  useEffect(() => {
    fetchWorkers();
  }, [filters]);

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await API.get(`/workers/search?${params.toString()}`);
      setWorkers(response.data.workers);
    } catch (error) {
      console.error('Error fetching workers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      service: '',
      city: '',
      minRating: '',
      maxRate: '',
      availability: '',
      sortBy: 'rating'
    });
    setSearchParams({});
  };

  const handleBookNow = (workerId) => {
    // Navigate to booking page with worker ID
    window.location.href = `/book/${workerId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {t('services.find_workers')} 🔧
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {t('services.hero_subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('common.filters')} 🎯
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {t('common.clear_all')}
                </button>
              </div>

              <div className="space-y-6">
                {/* Service Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('common.service')}
                  </label>
                  <select
                    value={filters.service}
                    onChange={(e) => handleFilterChange('service', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('common.all_services')}</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {t(`services.${service}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('common.city')}
                  </label>
                  <input
                    type="text"
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    placeholder={t('common.enter_city')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('common.min_rating')}
                  </label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => handleFilterChange('minRating', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('common.any_rating')}</option>
                    <option value="4">4+ ⭐</option>
                    <option value="3">3+ ⭐</option>
                    <option value="2">2+ ⭐</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('common.max_hourly_rate')}
                  </label>
                  <input
                    type="number"
                    value={filters.maxRate}
                    onChange={(e) => handleFilterChange('maxRate', e.target.value)}
                    placeholder="₹500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('common.availability')}
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('common.any_time')}</option>
                    <option value="available_now">{t('common.available_now')}</option>
                    <option value="today">{t('common.today')}</option>
                    <option value="this_week">{t('common.this_week')}</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('common.sort_by')}
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="rating">{t('common.rating')}</option>
                    <option value="price_low">{t('common.price_low_high')}</option>
                    <option value="price_high">{t('common.price_high_low')}</option>
                    <option value="experience">{t('common.experience')}</option>
                    <option value="reviews">{t('common.reviews')}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Workers List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('services.available_workers')}
                </h2>
                <p className="text-gray-600 mt-1">
                  {workers.length} {t('common.workers_found')}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-3 bg-gray-300 rounded w-32"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-8 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : workers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {t('services.no_workers_found')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('services.try_different_filters')}
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('common.clear_filters')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {workers.map((worker) => (
                  <div key={worker._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {/* Worker Card Header */}
                    <div className="relative p-6 pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <img
                              src={worker.userId?.profileImage || '/default-avatar.png'}
                              alt={worker.userId?.name}
                              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                            />
                            {worker.isAvailableNow && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {worker.userId?.name}
                            </h3>
                            <div className="flex items-center space-x-1 mt-1">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={i < Math.floor(worker.rating) ? '⭐' : '☆'}>
                                    ⭐
                                  </span>
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-1">
                                ({worker.totalReviews})
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {worker.isAvailableNow && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            {t('common.available')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Worker Details */}
                    <div className="px-6 pb-6">
                      {/* Services */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {worker.services?.slice(0, 3).map((service) => (
                            <span
                              key={service}
                              className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded"
                            >
                              {t(`services.${service}`)}
                            </span>
                          ))}
                          {worker.services?.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                              +{worker.services.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center mb-4">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">
                            ₹{worker.hourlyRate}
                          </p>
                          <p className="text-xs text-gray-600">{t('common.per_hour')}</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">
                            {worker.experience}
                          </p>
                          <p className="text-xs text-gray-600">{t('common.years_exp')}</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">
                            {worker.completedJobs}
                          </p>
                          <p className="text-xs text-gray-600">{t('common.jobs')}</p>
                        </div>
                      </div>

                      {/* Location */}
                      {worker.serviceArea?.cities?.length > 0 && (
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <span className="mr-1">📍</span>
                          <span>{worker.serviceArea.cities.slice(0, 2).join(', ')}</span>
                          {worker.serviceArea.cities.length > 2 && (
                            <span className="ml-1">+{worker.serviceArea.cities.length - 2}</span>
                          )}
                        </div>
                      )}

                      {/* Response Time */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span className="flex items-center">
                          <span className="mr-1">⚡</span>
                          {t('common.responds_in')} {worker.responseTime}m
                        </span>
                        {worker.emergencyService && (
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                            {t('common.emergency')}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleBookNow(worker._id)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]"
                        >
                          {t('common.book_now')} 🚀
                        </button>
                        <Link
                          to={`/workers/${worker._id}`}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          {t('common.view')}
                        </Link>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceWorkers;