import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../components/LanguageSwitcher.jsx";
import { useI18n } from "../i18n/I18nProvider";
import {
  ChevronRight,
  Users,
  Shield,
  CreditCard,
  MapPin,
  Search,
  Star,
  ArrowRight,
  Menu,
  X,
  Wrench,
  Zap,
  Clock,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL; // resolves to https://quickshift-11fb.onrender.com

export default function Home() {
  const { t, isTranslating } = useI18n();
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
      userName = JSON.parse(atob(token.split(".")[1])).name;
    } catch {
      userName = null;
    }
  }

  const services = [
    {
      icon: Wrench,
      title: t("home.services.home_repairs"),
      desc: t("home.services.home_repairs_desc"),
    },
    {
      icon: Zap,
      title: t("home.services.installation"),
      desc: t("home.services.installation_desc"),
    },
    {
      icon: Users,
      title: t("home.services.maintenance"),
      desc: t("home.services.maintenance_desc"),
    },
    {
      icon: Clock,
      title: t("home.services.emergency"),
      desc: t("home.services.emergency_desc"),
    },
  ];

  const features = [
    {
      icon: Users,
      title: t("home.features.skilled_workers"),
      desc: t("home.features.skilled_workers_desc"),
    },
    {
      icon: Shield,
      title: t("home.features.secure_platform"),
      desc: t("home.features.secure_platform_desc"),
    },
    {
      icon: CreditCard,
      title: t("home.features.easy_payments"),
      desc: t("home.features.easy_payments_desc"),
    },
    {
      icon: MapPin,
      title: t("home.features.location_based"),
      desc: t("home.features.location_based_desc"),
    },
  ];

  const stats = [
    { number: "10K+", label: t("home.stats.active_workers") },
    { number: "50K+", label: t("home.stats.jobs_completed") },
    { number: "4.9", label: t("home.stats.avg_rating") },
    { number: "24/7", label: t("home.stats.support") },
  ];

  return (
    <div
      className={`w-full min-h-screen bg-slate-950 text-gray-100 ${
        isTranslating ? "opacity-90" : ""
      }`}
    >
      {/* Loading overlay for translations */}
      {isTranslating && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-600 animate-pulse z-50"></div>
      )}

      {/* Navigation */}
      <nav
        className={`flex items-center justify-between px-6 py-4 fixed top-0 left-0 w-full z-20 shadow-md transition-all duration-300 ${
          scrollY > 50
            ? "bg-slate-900/95 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <Link to="/" className="font-bold text-xl text-blue-400">
          QuickShift
        </Link>
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a
            href="#services"
            className="hover:text-blue-400 transition-colors"
          >
            {t("home.nav.services")}
          </a>
          <a
            href="#features"
            className="hover:text-blue-400 transition-colors"
          >
            {t("home.nav.features")}
          </a>
          <a
            href="#about"
            className="hover:text-blue-400 transition-colors"
          >
            {t("home.nav.about")}
          </a>
          <button
            onClick={() => (window.location.href = "/auth")}
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
            <Link
              className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              to="/auth"
            >
              {t("home.nav.login")}
            </Link>
          )}
        </div>
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-100" />
          ) : (
            <Menu className="w-6 h-6 text-gray-100" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-slate-900/95 backdrop-blur-md`}
      >
        <div className="px-4 py-6 space-y-4">
          <a
            href="#services"
            className="block hover:text-blue-400 transition-colors"
          >
            {t("home.nav.services")}
          </a>
          <a
            href="#features"
            className="block hover:text-blue-400 transition-colors"
          >
            {t("home.nav.features")}
          </a>
          <a
            href="#about"
            className="block hover:text-blue-400 transition-colors"
          >
            {t("home.nav.about")}
          </a>
          <button
            onClick={() => (window.location.href = "/auth")}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all"
          >
            {t("home.nav.get_started")}
          </button>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-0 max-w- mx-auto">
        {/* Hero Section */}
        {/* ... (rest of your code is aligned the same way) ... */}
      </div>
    </div>
  );
}
