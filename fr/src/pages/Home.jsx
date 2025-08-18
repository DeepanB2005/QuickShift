import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../components/LanguageSwitcher.jsx";
import { useI18n } from "../i18n/I18nProvider";
import { ChevronRight, Users, Shield, CreditCard, MapPin, Search, Star, ArrowRight, Menu, X, Wrench, Zap, Clock } from 'lucide-react';

export default function Home() {
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Responsive Navbar
  const token = localStorage.getItem("token");
  let userName = null;
  if (token) {
    try {
      userName = JSON.parse(atob(token.split('.')[1])).name;
    } catch {
      userName = null;
    }
  }

  const services = [
    { icon: Wrench, title: t("home.services.home_repairs"), desc: t("home.services.home_repairs_desc") },
    { icon: Zap, title: t("home.services.installation"), desc: t("home.services.installation_desc") },
    { icon: Users, title: t("home.services.maintenance"), desc: t("home.services.maintenance_desc") },
    { icon: Clock, title: t("home.services.emergency"), desc: t("home.services.emergency_desc") }
  ];

  const features = [
    { icon: Users, title: t("home.features.skilled_workers"), desc: t("home.features.skilled_workers_desc") },
    { icon: Shield, title: t("home.features.secure_platform"), desc: t("home.features.secure_platform_desc") },
    { icon: CreditCard, title: t("home.features.easy_payments"), desc: t("home.features.easy_payments_desc") },
    { icon: MapPin, title: t("home.features.location_based"), desc: t("home.features.location_based_desc") }
  ];

  const stats = [
    { number: "10K+", label: t("home.stats.active_workers") },
    { number: "50K+", label: t("home.stats.jobs_completed") },
    { number: "4.9", label: t("home.stats.avg_rating") },
    { number: "24/7", label: t("home.stats.support") }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className={`flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-300 to-red-300 shadow-md fixed top-0 left-0 w-full z-20 transition-all duration-300 ${scrollY > 50 ? 'bg-purple-900/95 backdrop-blur-md' : 'bg-transparent'}`}>
        <Link to="/" className="font-bold text-xl text-indigo-700">QuickShift</Link>
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a href="#services" className="hover:text-pink-400 transition-colors text-sm lg:text-base">{t("home.nav.services")}</a>
          <a href="#features" className="hover:text-pink-400 transition-colors text-sm lg:text-base">{t("home.nav.features")}</a>
          <a href="#about" className="hover:text-pink-400 transition-colors text-sm lg:text-base">{t("home.nav.about")}</a>
          <button 
            onClick={() => window.location.href = '/auth'}
            className="px-4 py-2 lg:px-6 lg:py-2 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full hover:from-pink-700 hover:to-orange-700 transition-all transform hover:scale-105 text-sm lg:text-base"
          >
            {t("home.nav.get_started")}
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <LanguageSwitcher />
          {token ? (
            <Link
              className="text-sm px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              to="/dashboard"
            >
              {userName || t("home.nav.dashboard")}
            </Link>
          ) : (
            <Link className="text-sm px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition" to="/auth">{t("home.nav.login")}</Link>
          )}
        </div>
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-purple-900/95 backdrop-blur-md`}>
        <div className="px-4 py-6 space-y-4">
          <a href="#services" className="block hover:text-pink-400 transition-colors">{t("home.nav.services")}</a>
          <a href="#features" className="block hover:text-pink-400 transition-colors">{t("home.nav.features")}</a>
          <a href="#about" className="block hover:text-pink-400 transition-colors">{t("home.nav.about")}</a>
          <button 
            onClick={() => window.location.href = '/auth'}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full hover:from-pink-700 hover:to-orange-700 transition-all"
          >
            {t("home.nav.get_started")}
          </button>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-0 max-w- mx-auto">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-orange-600/20 backdrop-blur-3xl"></div>
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-orange-500/30 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-pink-500/20 rounded-full mb-6 backdrop-blur-sm border border-pink-400/30">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-2" />
              <span className="text-xs sm:text-sm">{t("home.stats.active_workers")}</span>
            </div>
            <h1 className="text-3xl sm:text-3xl md:text-6xl lg:text-4xl font-bold mb-6 leading-tight px-4">
              {t("home.hero.title")}
              <span className="block bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                {t("home.hero.subtitle")}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed px-4">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
              <button 
                onClick={() => window.location.href = '/auth'}
                className="group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-pink-600 to-orange-600 rounded-full text-base sm:text-lg font-semibold hover:from-pink-700 hover:to-orange-700 transition-all transform hover:scale-105 hover:shadow-2xl flex items-center justify-center"
              >
                {t("home.cta.start_journey")}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 border-2 border-pink-400 rounded-full text-base sm:text-lg font-semibold hover:bg-pink-400/10 transition-all flex items-center justify-center">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t("home.explore_services")}
              </button>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto px-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 sm:p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-pink-400 mb-1">{stat.number}</div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                {t("home.services.title")} <span className="text-pink-400"></span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto px-4">
                {t("home.services.home_repairs_desc")}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={index}
                    className={`p-4 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      activeService === index 
                        ? 'bg-gradient-to-br from-pink-600 to-orange-700 shadow-2xl' 
                        : 'bg-purple-700/50 hover:bg-purple-700'
                    }`}
                    onMouseEnter={() => setActiveService(index)}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300">{service.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 sm:py-16 lg:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                {t("home.features.title")} <span className="text-pink-400"></span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto px-4">
                {t("home.hero.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index}
                    className="group p-6 sm:p-8 bg-gradient-to-br from-purple-800 to-pink-900 rounded-2xl border border-purple-700 hover:border-pink-500/50 transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 group-hover:text-pink-400 transition-colors">{feature.title}</h3>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-pink-900 to-orange-900">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {t("home.cta.title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-pink-100 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              {t("home.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <button 
                onClick={() => window.location.href = '/auth'}
                className="group w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-4 bg-white text-pink-900 rounded-full text-base sm:text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 hover:shadow-2xl flex items-center justify-center"
              >
                {t("home.cta.start_journey")}
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-4 border-2 border-white text-white rounded-full text-base sm:text-lg font-bold hover:bg-white hover:text-pink-900 transition-all">
                {t("home.cta.learn_more")}
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-slate-900 border-t border-slate-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-6 md:mb-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  QuickShift
                </span>
              </div>
              <div className="flex space-x-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">{t("home.footer.privacy")}</a>
                <a href="#" className="hover:text-white transition-colors">{t("home.footer.terms")}</a>
                <a href="#" className="hover:text-white transition-colors">{t("home.footer.support")}</a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800 text-center text-gray-400">
              <p>{t("home.footer.copyright")}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}