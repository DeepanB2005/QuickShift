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
    <div className="w-full min-h-screen bg-slate-950 text-gray-100">
      {/* Navigation */}
      <nav className={`flex items-center justify-between px-6 py-4 fixed top-0 left-0 w-full z-20 shadow-md transition-all duration-300 ${scrollY > 50 ? 'bg-slate-900/95 backdrop-blur-md' : 'bg-transparent'}`}>
        <Link to="/" className="font-bold text-xl text-blue-400">QuickShift</Link>
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a href="#services" className="hover:text-blue-400 transition-colors">{t("home.nav.services")}</a>
          <a href="#features" className="hover:text-blue-400 transition-colors">{t("home.nav.features")}</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">{t("home.nav.about")}</a>
          <button 
            onClick={() => window.location.href = '/auth'}
            className="px-4 py-2 lg:px-6 lg:py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105"
          >
            {t("home.nav.get_started")}
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <LanguageSwitcher />
          {token ? (
            <Link
              className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              to="/dashboard"
            >
              {userName || t("home.nav.dashboard")}
            </Link>
          ) : (
            <Link className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" to="/auth">{t("home.nav.login")}</Link>
          )}
        </div>
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6 text-gray-100" /> : <Menu className="w-6 h-6 text-gray-100" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-slate-900/95 backdrop-blur-md`}>
        <div className="px-4 py-6 space-y-4">
          <a href="#services" className="block hover:text-blue-400 transition-colors">{t("home.nav.services")}</a>
          <a href="#features" className="block hover:text-blue-400 transition-colors">{t("home.nav.features")}</a>
          <a href="#about" className="block hover:text-blue-400 transition-colors">{t("home.nav.about")}</a>
          <button 
            onClick={() => window.location.href = '/auth'}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all"
          >
            {t("home.nav.get_started")}
          </button>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-0 max-w- mx-auto">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-3xl"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-80 sm:h-80 bg-blue-700/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-700/30 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-2 bg-blue-500/20 rounded-full mb-6 backdrop-blur-sm border border-blue-400/30">
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm">{t("home.stats.active_workers")}</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
              {t("home.hero.title")}
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                {t("home.hero.subtitle")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={() => window.location.href = '/auth'}
                className="group w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                {t("home.cta.start_journey")}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-6 py-3 border-2 border-blue-400 rounded-full font-semibold hover:bg-blue-400/10 transition-all flex items-center justify-center">
                <Search className="w-5 h-5 mr-2" />
                {t("home.explore_services")}
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-slate-900/60 rounded-xl border border-slate-800 hover:bg-slate-800 transition-all">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 bg-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{t("home.services.title")}</h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                {t("home.services.home_repairs_desc")}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={index}
                    className={`p-6 rounded-2xl cursor-pointer transition-all transform hover:scale-105 ${
                      activeService === index 
                        ? 'bg-gradient-to-br from-blue-700 to-cyan-700 shadow-2xl' 
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                    onMouseEnter={() => setActiveService(index)}
                  >
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-400">{service.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{t("home.features.title")}</h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">{t("home.hero.subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index}
                    className="group p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all transform hover:-translate-y-2"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">{t("home.cta.title")}</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">{t("home.cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/auth'}
                className="group w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                {t("home.cta.start_journey")}
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-10 py-4 border-2 border-gray-300 text-gray-300 rounded-full font-bold hover:bg-gray-200 hover:text-slate-900 transition-all">
                {t("home.cta.learn_more")}
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-slate-950 border-t border-slate-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-6 md:mb-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  QuickShift
                </span>
              </div>
              <div className="flex space-x-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">{t("home.footer.privacy")}</a>
                <a href="#" className="hover:text-white transition-colors">{t("home.footer.terms")}</a>
                <a href="#" className="hover:text-white transition-colors">{t("home.footer.support")}</a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800 text-center text-gray-500">
              <p>{t("home.footer.copyright")}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
