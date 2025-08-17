// src/pages/Home.jsx
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const services = [
    { key: 'plumbing', icon: '🔧', color: 'from-blue-500 to-cyan-500' },
    { key: 'electrical', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
    { key: 'carpentry', icon: '🔨', color: 'from-amber-500 to-yellow-600' },
    { key: 'cleaning', icon: '🧹', color: 'from-green-500 to-emerald-500' },
    { key: 'painting', icon: '🎨', color: 'from-purple-500 to-pink-500' },
    { key: 'ac_repair', icon: '❄️', color: 'from-cyan-500 to-blue-500' },
    { key: 'tv_installation', icon: '📺', color: 'from-indigo-500 to-purple-500' },
    { key: 'appliance_repair', icon: '🔧', color: 'from-red-500 to-pink-500' }
  ];

  const testimonials = [
    { name: 'Priya Sharma', city: 'Mumbai', rating: 5, text: 'Amazing service! Found a reliable plumber within minutes.' },
    { name: 'Rajesh Kumar', city: 'Delhi', rating: 5, text: 'Professional workers, fair pricing. Highly recommended!' },
    { name: 'Anita Patel', city: 'Bangalore', rating: 4, text: 'Quick and efficient. Will definitely use again.' }
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [services.length]);

  const handleGetStarted = () => {
    if (user) {
      navigate(user.role === 'worker' ? '/worker/dashboard' : '/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QuickShift
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('home.nav.services')}
              </Link>
              <Link to="/workers" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('home.nav.find_workers')}
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('home.nav.about')}
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('home.nav.contact')}
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">
                    {t('home.welcome')}, {user.name}!
                  </span>
                  <Link
                    to={user.role === 'worker' ? '/worker/dashboard' : '/dashboard'}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    {t('home.dashboard')} 🚀
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    {t('home.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    {t('home.get_started')} ✨
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QuickShift
              </span>
              <div className="text-4xl md:text-5xl mt-4">
                {t('home.hero.title')} 🏠
              </div>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>

            {/* Dynamic Service Display */}
            <div className="mb-12">
              <div className={`inline-flex items-center space-x-4 bg-gradient-to-r ${services[currentServiceIndex].color} text-white px-8 py-4 rounded-2xl transform transition-all duration-500 hover:scale-105 shadow-2xl`}>
                <span className="text-4xl">{services[currentServiceIndex].icon}</span>
                <span className="text-2xl font-semibold">
                  {t(`services.${services[currentServiceIndex].key}`)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-2xl"
              >
                {user ? t('home.go_to_dashboard') : t('home.get_started')} 🚀
              </button>
              
              <Link
                to="/services"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 transform hover:scale-105"
              >
                {t('home.explore_services')} 🔍
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('home.services.title')} 🛠️
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link
                key={service.key}
                to={`/workers?service=${service.key}`}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 hover:border-blue-200"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center group-hover:text-blue-600 transition-colors">
                  {t(`services.${service.key}`)}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('home.how_it_works.title')} ⚡
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.how_it_works.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('home.how_it_works.step1.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.how_it_works.step1.description')}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">📅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('home.how_it_works.step2.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.how_it_works.step2.description')}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl text-white">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('home.how_it_works.step3.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.how_it_works.step3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">{t('home.stats.workers')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">{t('home.stats.bookings')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">25+</div>
              <div className="text-blue-100">{t('home.stats.cities')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8</div>
              <div className="text-blue-100">{t('home.stats.rating')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('home.testimonials.title')} 💬
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.city}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('home.cta.title')} 🎯
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('home.cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/register?role=customer"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
            >
              {t('home.cta.find_workers')} 👤
            </Link>
            
            <Link
              to="/register?role=worker"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
            >
              {t('home.cta.become_worker')} 🔧
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">Q</span>
                </div>
                <span className="text-xl font-bold">QuickShift</span>
              </div>
              <p className="text-gray-400">
                {t('home.footer.description')}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t('home.footer.services')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/workers?service=plumbing" className="hover:text-white">{t('services.plumbing')}</Link></li>
                <li><Link to="/workers?service=electrical" className="hover:text-white">{t('services.electrical')}</Link></li>
                <li><Link to="/workers?service=cleaning" className="hover:text-white">{t('services.cleaning')}</Link></li>
                <li><Link to="/workers?service=painting" className="hover:text-white">{t('services.painting')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t('home.footer.company')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">{t('home.footer.about')}</Link></li>
                <li><Link to="/contact" className="hover:text-white">{t('home.footer.contact')}</Link></li>
                <li><Link to="/careers" className="hover:text-white">{t('home.footer.careers')}</Link></li>
                <li><Link to="/help" className="hover:text-white">{t('home.footer.help')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t('home.footer.legal')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">{t('home.footer.privacy')}</Link></li>
                <li><Link to="/terms" className="hover:text-white">{t('home.footer.terms')}</Link></li>
                <li><Link to="/safety" className="hover:text-white">{t('home.footer.safety')}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 QuickShift. {t('home.footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}