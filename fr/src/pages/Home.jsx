// src/pages/Home.jsx
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const services = [
    { id: 'plumbing', name: t('services.plumbing'), icon: '🔧', color: 'bg-blue-100' },
    { id: 'electrical', name: t('services.electrical'), icon: '⚡', color: 'bg-yellow-100' },
    { id: 'cleaning', name: t('services.cleaning'), icon: '🧹', color: 'bg-green-100' },
    { id: 'carpentry', name: t('services.carpentry'), icon: '🔨', color: 'bg-orange-100' },
    { id: 'ac_repair', name: t('services.ac_repair'), icon: '❄️', color: 'bg-cyan-100' },
    { id: 'painting', name: t('services.painting'), icon: '🎨', color: 'bg-purple-100' },
  ];

  const handleServiceClick = (service) => {
    if (user) {
      navigate(`/workers?service=${service.id}`);
    } else {
      navigate('/login');
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate(user.role === 'worker' ? '/worker/dashboard' : '/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {t('welcome')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            {t('home.subtitle')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={handleGetStarted}
              className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
            >
              {user ? t('home.go_to_dashboard') : t('home.get_started')}
            </button>
            
            {!user && (
              <Link
                to="/register"
                className="rounded-md border border-gray-300 bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-50 transition-all duration-200"
              >
                {t('register')}
              </Link>
            )}
          </div>

          {user && (
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                {t('home.welcome_back', { name: user.name })}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Services Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('home.popular_services')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('home.services_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className={`${service.color} group cursor-pointer rounded-2xl p-6 text-center transition-all duration-200 hover:scale-105 hover:shadow-lg`}
            >
              <div className="text-3xl mb-2">{service.icon}</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                {service.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/workers"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            {t('home.view_all_services')} →
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t('home.why_choose_us')}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">
                {t('home.features.verified')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.verified_desc')}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">
                {t('home.features.quick')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.quick_desc')}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">
                {t('home.features.secure')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.secure_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action for Workers */}
      <div className="bg-blue-600 py-16">
        <div className="mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t('home.worker_cta.title')}
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            {t('home.worker_cta.subtitle')}
          </p>
          <div className="mt-8">
            <Link
              to="/register?role=worker"
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-lg font-semibold text-blue-600 shadow-sm hover:bg-blue-50 transition-all duration-200"
            >
              {t('home.worker_cta.button')}
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 QuickShift. {t('home.footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}