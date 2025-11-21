import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';
import { useI18n } from '../i18n/I18nProvider';
import { Menu, X, ChevronRight, Zap } from 'lucide-react';
import HowItWorksSection from '../components/HowItWorksSection';

// External hero & illustrations (royalty-free placeholders)
const HERO = "/image.png";
const FEATURE_1 = 'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=abc123def456ghi789jkl0mnopqrstu';
const FEATURE_2 = '/i1.png';
const FEATURE_3 = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=ghi789abc123def456jkl0mnopqrstu';
const FEATURE_4 = '/12.png';
const FEATURE_5 = '/bg-2.jpg';

function FeatureCarousel({ features, interval = 3500 }) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, interval);
    return () => clearTimeout(timeoutRef.current);
  }, [current, features.length, interval]);

  return (
    <div className="relative w-full h-80">
      {features.map((f, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
        >
          <div className="bg-purple-100 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full">
            <img src={f.img} alt="feature" className="w-full h-2/3 object-cover" />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="font-semibold">{f.title}</div>
                <div className="text-sm text-gray-600 mt-1">{f.desc}</div>
              </div>
              {f.link && (
                <div className="mt-4">
                  <Link to={f.link.to} className="text-blue-600">{f.link.text}</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {/* Carousel indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {features.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-blue-500' : 'bg-gray-300'} transition-colors`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { t, lang, setLang } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = localStorage.getItem('token');

  // Set English as default language on mount
  useEffect(() => {
    if (lang !== 'en') setLang('en');
  }, [lang, setLang]);

  return (
    <div className="text-gray-900 bg-purple-200">
      {/* NAV */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="backdrop-blur-sm bg-purple-100/60 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-purple-100">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-semibold text-lg">QuickShift</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm hover:text-blue-600">{t('home.nav.features')}</a>
              <a href="#how" className="text-sm hover:text-blue-600">{t('home.nav.post_job')}</a>
              <a href="#partners" className="text-sm hover:text-blue-600">{t('home.nav.about')}</a>
              <LanguageSwitcher />
              {token
                ? <Link to="/dashboard" className="px-3 py-2 bg-blue-600 text-purple-100 rounded">{t('home.nav.dashboard')}</Link>
                : <Link to="/auth" className="px-3 py-2 bg-blue-600 text-purple-100 rounded">{t('home.nav.login')}</Link>
              }
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileOpen(v => !v)} className="p-2">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* mobile menu */}
          {mobileOpen && (
            <div className="md:hidden px-6 pb-4 bg-purple-100 border-t border-gray-100">
              <a href="#features" className="block py-2">{t('home.nav.features')}</a>
              <a href="#how" className="block py-2">{t('home.nav.post_job')}</a>
              <a href="#partners" className="block py-2">{t('home.nav.about')}</a>
              <Link to="/auth" className="block mt-3 py-2 px-4 bg-blue-600 text-purple-100 rounded text-center">{t('home.nav.login')}</Link>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-16">
        <div className="relative">
          <div className="h-screen max-h-[980px] md:h-[90vh] w-full overflow-hidden">
            <img src={HERO} alt="hero" className="w-full h-full object-cover brightness-100" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-700/50 via-transparent to-transparent"></div>

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className=" z-10 mt-16">
                    <h1 className="text-shadow-2xl bg-gradient-to-l from-yellow-200 to-blue-100 bg-clip-text text-transparent text-4xl md:text-5xl font-extrabold leading-tight">
                      {t('home.hero.title')}
                    </h1>
                    <p className="mt-6 text-lg md:text-xl max-w-xl text-green-200">
                      {t('home.hero.subtitle')}
                    </p>

                    <div className="mt-10 text-amber-200 flex flex-col sm:flex-row gap-5">
                      <Link to="/auth" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold shadow-lg">
                        {t('home.get_started')} <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>

                   
                  </div>

                  <div>
                    <div className="z-10">
                      {/* Auto-scrolling carousel for feature cards */}
                      <FeatureCarousel
                        features={[
                          {
                            img: FEATURE_1,
                            title: t('home.hero.instant_apply'),
                            desc: t('home.hero.instant_apply_desc'),
                          },
                          {
                            img: FEATURE_2,
                            title: t('home.hero.manage_dashboard'),
                            desc: t('home.hero.manage_dashboard_desc'),
                            link: { to: "/dashboard", text: t('home.go_to_dashboard') },
                          },
                          {
                            img: FEATURE_3,
                            title: t('home.hero.map_navigation'),
                            desc: t('home.hero.map_navigation_desc'),
                          },
                          {
                            img: FEATURE_4,
                            title: t('home.hero.secure_communication'),
                            desc: t('home.hero.secure_communication_desc'),
                          },
                          {
                            img: FEATURE_5,
                            title: t('home.hero.support_chatbot'),
                            desc: t('home.hero.support_chatbot_desc'),
                          },
                        ]}
                      />
                    </div>
                    <div className="bg-purple-100 rounded-2xl shadow-lg p-5 mt-10">
                      <div className="font-semibold">{t('home.hero.manage_dashboard')}</div>
                      <div className="text-sm text-gray-600 mt-1">{t('home.hero.manage_dashboard_desc')}</div>
                      <div className="mt-4">
                        <Link to="/dashboard" className="text-blue-600">{t('home.go_to_dashboard')}</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* wave divider */}
            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 40C120 20 300 0 480 10C660 20 840 80 1020 80C1200 80 1320 40 1440 20V120H0V40Z" fill="#ffffff"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-purple-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t('home.features.title')}</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-tr from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-md">
              <img src={FEATURE_1} alt="f1" className="w-full h-44 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{t('home.features.post_job')}</h3>
              <p className="text-gray-600 mt-2">{t('home.features.post_job_desc')}</p>
              <div className="mt-4">
                <Link to="/search" className="text-blue-600">{t('home.features.browse_workers')}</Link>
              </div>
            </div>

            <div className="bg-gradient-to-tr from-purple-100 to-slate-50 p-8 rounded-2xl shadow-md">
              <img src={FEATURE_2} alt="f2" className="w-full h-44 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{t('home.features.apply_jobs')}</h3>
              <p className="text-gray-600 mt-2">{t('home.features.apply_jobs_desc')}</p>
              <div className="mt-4">
                <Link to="/for-businesses" className="text-blue-600">{t('home.features.for_workers')}</Link>
              </div>
            </div>

            <div className="bg-gradient-to-tr from-purple-100 to-slate-50 p-8 rounded-2xl shadow-md">
              <img src={FEATURE_3} alt="f3" className="w-full h-44 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{t('home.features.chatbot_nav')}</h3>
              <p className="text-gray-600 mt-2">{t('home.features.chatbot_nav_desc')}</p>
              <div className="mt-4">
                <Link to="/for-learners" className="text-blue-600">{t('home.features.learn_more')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <HowItWorksSection t={t}/>
       <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-green-100">
                      <div className="p-3 bg-violet-800/50 rounded w-40 ml-40">
                        <div className="font-semibold">{t('home.hero.easy_posting')}</div>
                        <div className="text-sm">{t('home.hero.easy_posting_desc')}</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded w-40 ml-40">
                        <div className="font-semibold">{t('home.hero.nearby_discovery')}</div>
                        <div className="text-sm">{t('home.hero.nearby_discovery_desc')}</div>
                      </div>
                      <div className="p-3 bg-green-800/50 rounded w-40 ml-40">
                        <div className="font-semibold">{t('home.hero.chatbot_help')}</div>
                        <div className="text-sm">{t('home.hero.chatbot_help_desc')}</div>
                      </div>
                    </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 pt-12 pb-8 mt-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-semibold text-purple-100 text-lg">QuickShift</div>
            <p className="text-sm text-gray-300 mt-3">
              {t('home.footer.description')}
            </p>
          </div>

          <div>
            <div className="font-semibold">{t('home.footer.contact')}</div>
            <div className="text-sm text-gray-300 mt-2">{t('home.footer.address')}</div>
            <div className="text-sm text-gray-300 mt-1">{t('home.footer.phone')}</div>
            <div className="text-sm text-gray-300">{t('home.footer.email')}</div>
          </div>

          <div>
            <div className="font-semibold">{t('home.footer.explore')}</div>
            <ul className="mt-2 space-y-2 text-sm text-gray-300">
              <li><a href="/for-businesses">{t('home.footer.for_businesses')}</a></li>
              <li><a href="/for-workers">{t('home.footer.for_workers')}</a></li>
              <li><a href="/for-learners">{t('home.footer.for_learners')}</a></li>
              <li><a href="/careers">{t('home.footer.careers')}</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-8">
          © {new Date().getFullYear()} QuickShift — {t('home.footer.copyright')}
        </div>
      </footer>
    </div>
  );
}