// src/components/BookingForm.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { apiHelpers } from '../services/api';
import toast from 'react-hot-toast';

const BookingForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { workerId } = useParams();
  
  const [worker, setWorker] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    service: '',
    title: '',
    description: '',
    scheduledDate: '',
    scheduledTime: {
      start: '',
      end: ''
    },
    estimatedDuration: 1,
    priority: 'medium',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      landmark: ''
    },
    images: [],
    emergencyService: false
  });

  const services = [
    'plumbing', 'electrical', 'carpentry', 'cleaning', 'moving',
    'painting', 'gardening', 'ac_repair', 'tv_installation',
    'appliance_repair', 'handyman', 'pest_control', 'deep_cleaning',
    'home_maintenance'
  ];

  useEffect(() => {
    if (workerId) {
      fetchWorkerDetails();
    }
  }, [workerId]);

  const fetchWorkerDetails = async () => {
    try {
      const response = await apiHelpers.workers.getById(workerId);
      setWorker(response.data.worker);
    } catch (error) {
      toast.error('Failed to load worker details');
      navigate('/workers');
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const calculateEstimatedCost = () => {
    if (!worker) return 0;
    return worker.hourlyRate * formData.estimatedDuration;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const bookingData = {
        ...formData,
        worker: workerId,
        pricing: {
          hourlyRate: worker.hourlyRate,
          estimatedCost: calculateEstimatedCost(),
          laborCost: calculateEstimatedCost()
        }
      };

      const response = await apiHelpers.bookings.create(bookingData);
      toast.success('Booking created successfully!');
      navigate(`/bookings/${response.data.booking._id}`);
    } catch (error) {
      toast.error('Failed to create booking');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (!worker && workerId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('booking.create_booking')} 📋
            </h1>
            {worker && (
              <div className="flex items-center justify-center space-x-4 bg-gray-50 rounded-xl p-4">
                <img
                  src={worker.userId?.profileImage || '/default-avatar.png'}
                  alt={worker.userId?.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{worker.userId?.name}</h3>
                  <p className="text-sm text-gray-600">₹{worker.hourlyRate}/hour</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-8">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Service Details */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('booking.service_details')} 🔧
              </h2>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.service')} *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => handleInputChange('service', e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t('booking.select_service')}</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {t(`services.${service}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('booking.job_title')} *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                  placeholder={t('booking.title_placeholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.description')} *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                  rows={4}
                  placeholder={t('booking.description_placeholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Priority & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('booking.priority')}
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">{t('booking.priority_low')}</option>
                    <option value="medium">{t('booking.priority_medium')}</option>
                    <option value="high">{t('booking.priority_high')}</option>
                    <option value="emergency">{t('booking.priority_emergency')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('booking.estimated_duration')} (hours)
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    max="24"
                    step="0.5"
                    value={formData.estimatedDuration}
                    onChange={(e) => handleInputChange('estimatedDuration', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Emergency Service */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emergency"
                  checked={formData.emergencyService}
                  onChange={(e) => handleInputChange('emergencyService', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="emergency" className="ml-2 block text-sm text-gray-700">
                  {t('booking.emergency_service')} (+20% charge)
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Schedule & Location */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('booking.schedule_location')} 📅
              </h2>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('common.date')} *
                  </label>
                  <input
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('booking.start_time')} *
                  </label>
                  <input
                    type="time"
                    value={formData.scheduledTime.start}
                    onChange={(e) => handleInputChange('scheduledTime.start', e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('booking.end_time')} *
                  </label>
                  <input
                    type="time"
                    value={formData.scheduledTime.end}
                    onChange={(e) => handleInputChange('scheduledTime.end', e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('booking.street_address')} *
                  </label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => handleInputChange('address.street', e.target.value)}
                    required
                    placeholder={t('booking.street_placeholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('common.city')} *
                  </label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => handleInputChange('address.city', e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('booking.zip_code')}
                  </label>
                  <input
                    type="text"
                    value={formData.address.zipCode}
                    onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('booking.landmark')}
                  </label>
                  <input
                    type="text"
                    value={formData.address.landmark}
                    onChange={(e) => handleInputChange('address.landmark', e.target.value)}
                    placeholder={t('booking.landmark_placeholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('booking.review_confirm')} ✅
              </h2>

              {/* Booking Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('booking.booking_summary')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>{t('common.service')}:</strong> {t(`services.${formData.service}`)}</p>
                    <p><strong>{t('booking.job_title')}:</strong> {formData.title}</p>
                    <p><strong>{t('common.date')}:</strong> {new Date(formData.scheduledDate).toLocaleDateString()}</p>
                    <p><strong>{t('common.time')}:</strong> {formData.scheduledTime.start} - {formData.scheduledTime.end}</p>
                  </div>
                  <div>
                    <p><strong>{t('common.duration')}:</strong> {formData.estimatedDuration} hours</p>
                    <p><strong>{t('booking.priority')}:</strong> {t(`booking.priority_${formData.priority}`)}</p>
                    <p><strong>{t('booking.emergency')}:</strong> {formData.emergencyService ? t('common.yes') : t('common.no')}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p><strong>{t('common.address')}:</strong></p>
                  <p className="text-gray-600">
                    {formData.address.street}, {formData.address.city}
                    {formData.address.zipCode && ` - ${formData.address.zipCode}`}
                    {formData.address.landmark && ` (${formData.address.landmark})`}
                  </p>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('booking.cost_breakdown')} 💰
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t('booking.labor_cost')} ({formData.estimatedDuration}h × ₹{worker?.hourlyRate}):</span>
                    <span>₹{calculateEstimatedCost()}</span>
                  </div>
                  {formData.emergencyService && (
                    <div className="flex justify-between text-orange-600">
                      <span>{t('booking.emergency_charge')} (20%):</span>
                      <span>₹{Math.round(calculateEstimatedCost() * 0.2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-lg">
                    <span>{t('booking.estimated_total')}:</span>
                    <span>₹{formData.emergencyService ? Math.round(calculateEstimatedCost() * 1.2) : calculateEstimatedCost()}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  * {t('booking.cost_disclaimer')}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                ← {t('common.previous')}
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                {t('common.next')} →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t('booking.creating')}...
                  </div>
                ) : (
                  <>
                    {t('booking.confirm_book')} 🚀
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;