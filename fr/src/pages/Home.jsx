import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';
import { useI18n } from '../i18n/I18nProvider';
import { Menu, X, ChevronRight, Zap } from 'lucide-react';

// External hero & illustrations (royalty-free placeholders)
const HERO = "/image.png";
const FEATURE_1 = 'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=abc123def456ghi789jkl0mnopqrstu';
const FEATURE_2 = '/i1.png';
const FEATURE_3 = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=ghi789abc123def456jkl0mnopqrstu';

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
              <a href="#features" className="text-sm hover:text-blue-600">{t("home.nav.features")}</a>
              <a href="#how" className="text-sm hover:text-blue-600">{t("home.nav.services")}</a>
              <a href="#partners" className="text-sm hover:text-blue-600">{t("home.nav.about")}</a>
              <LanguageSwitcher />
              {token
                ? <Link to="/dashboard" className="px-3 py-2 bg-blue-600 text-purple-100 rounded">{t("home.nav.dashboard")}</Link>
                : <Link to="/auth" className="px-3 py-2 bg-blue-600 text-purple-100 rounded">{t("home.nav.get_started")}</Link>
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
              <a href="#features" className="block py-2">{t("home.nav.features")}</a>
              <a href="#how" className="block py-2">{t("home.nav.how_works")}</a>
              <a href="#partners" className="block py-2">{t("home.nav.partners")}</a>
              <Link to="/auth" className="block mt-3 py-2 px-4 bg-blue-600 text-purple-100 rounded text-center">{t("home.nav.get_started")}</Link>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-16">
        <div className="relative">
          <div className="h-screen max-h-[980px] md:h-[90vh] w-full overflow-hidden">
            <img src={HERO} alt="hero" className="w-full h-full object-cover brightness-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-transparent to-transparent"></div>

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="text-purple-100 z-10 mt-36">
                    <h1 className="text-shadow-2xs bg-gradient-to-l from-yellow-100 to-green-200 bg-clip-text text-transparent text-4xl md:text-5xl font-extrabold leading-tight">{t('home.hero.title')}</h1>
                    <p className="mt-6 text-lg md:text-xl max-w-xl">{t('home.hero.subtitle')}</p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-5">
                      <Link to="/auth" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold shadow-lg">{t('home.get_started')} <ChevronRight className="w-4 h-4" /></Link>
                    </div>

                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-green-100">
                      <div className="p-3 bg-violet-800/50 rounded">
                        <div className="font-semibold">{t("home.hero.simple_bookings")}</div>
                        <div className="text-sm">{t("home.hero.simple_bookings_desc")}</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded">
                        <div className="font-semibold">{t("home.hero.verified_workers")}</div>
                        <div className="text-sm">{t("home.hero.verified_workers_desc")}</div>
                      </div>
                      <div className="p-3 bg-green-800/50 rounded">
                        <div className="font-semibold">{t("home.hero.secure_payments")}</div>
                        <div className="text-sm">{t("home.hero.secure_payments_desc")}</div>
                      </div>
                    </div>
                  </div>

                  <div className="z-10">
                    {/* decorative card stack to the right for visual interest */}
                    <div className="space-y-6">
                      <div className="bg-purple-100 rounded-2xl shadow-xl overflow-hidden">
                        <img src={FEATURE_1} alt="feature" className="w-full h-64 object-cover" />
                        <div className="p-5">
                          <div className="font-semibold">{t("home.features.book_instantly")}</div>
                          <div className="text-sm text-gray-600 mt-1">{t("home.features.book_instantly_desc")}</div>
                        </div>
                      </div>

                      <div className="bg-purple-100 rounded-2xl shadow-lg p-5">
                        <div className="font-semibold">{t("home.features.manage_teams")}</div>
                        <div className="text-sm text-gray-600 mt-1">{t("home.features.manage_teams_desc")}</div>
                        <div className="mt-4">
                          <Link to="/for-businesses" className="text-blue-600">{t("home.features.learn_more_business")}</Link>
                        </div>
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
            <h2 className="text-3xl font-bold">{t("home.features.title")}</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{t("home.features.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-tr from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-md">
              <img src={FEATURE_1} alt="f1" className="w-full h-44 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{t("home.features.on_demand_services")}</h3>
              <p className="text-gray-600 mt-2">{t("home.features.on_demand_services_desc")}</p>
              <div className="mt-4">
                <Link to="/search" className="text-blue-600">{t("home.features.browse_services")}</Link>
              </div>
            </div>

            <div className="bg-gradient-to-tr from-purple-100 to-slate-50 p-8 rounded-2xl shadow-md">
              <img src={FEATURE_2} alt="f2" className="w-full h-44 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{t("home.features.workforce_solutions")}</h3>
              <p className="text-gray-600 mt-2">{t("home.features.workforce_solutions_desc")}</p>
              <div className="mt-4">
                <Link to="/for-businesses" className="text-blue-600">{t("home.features.explore_business_plans")}</Link>
              </div>
            </div>

            <div className="bg-gradient-to-tr from-purple-100 to-slate-50 p-8 rounded-2xl shadow-md">
              <img src={FEATURE_3} alt="f3" className="w-full h-44 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{t("home.features.skilling_certification")}</h3>
              <p className="text-gray-600 mt-2">{t("home.features.skilling_certification_desc")}</p>
              <div className="mt-4">
                <Link to="/for-learners" className="text-blue-600">{t("home.features.view_courses")}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">{t("home.how_works.title")}</h2>
            <p className="mt-3 text-gray-600">{t("home.how_works.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-purple-100 rounded-2xl shadow">
              <div className="text-2xl font-bold">1</div>
              <h4 className="mt-3 font-semibold">{t("home.how_works.choose_service")}</h4>
              <p className="text-gray-600 mt-2">{t("home.how_works.choose_service_desc")}</p>
            </div>

            <div className="p-8 bg-purple-100 rounded-2xl shadow">
              <div className="text-2xl font-bold">2</div>
              <h4 className="mt-3 font-semibold">{t("home.how_works.schedule_confirm")}</h4>
              <p className="text-gray-600 mt-2">{t("home.how_works.schedule_confirm_desc")}</p>
            </div>

            <div className="p-8 bg-purple-100 rounded-2xl shadow">
              <div className="text-2xl font-bold">3</div>
              <h4 className="mt-3 font-semibold">{t("home.how_works.pay_review")}</h4>
              <p className="text-gray-600 mt-2">{t("home.how_works.pay_review_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-20 bg-purple-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold">{t("home.partners.title")}</h2>
          <p className="text-gray-600 mt-3">{t("home.partners.subtitle")}</p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
            <img src="https://via.placeholder.com/220x80?text=Partner+1" alt="p1" className="mx-auto" />
            <img src="https://via.placeholder.com/220x80?text=Partner+2" alt="p2" className="mx-auto" />
            <img src="https://via.placeholder.com/220x80?text=Partner+3" alt="p3" className="mx-auto" />
            <img src="https://via.placeholder.com/220x80?text=Partner+4" alt="p4" className="mx-auto" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-semibold text-purple-100 text-lg">QuickShift</div>
            <p className="text-sm text-gray-300 mt-3">{t("home.footer.description")}</p>
          </div>

          <div>
            <div className="font-semibold">{t("home.footer.contact")}</div>
            <div className="text-sm text-gray-300 mt-2">{t("home.footer.address")}</div>
            <div className="text-sm text-gray-300 mt-1">{t("home.footer.phone")}</div>
            <div className="text-sm text-gray-300">{t("home.footer.email")}</div>
          </div>

          <div>
            <div className="font-semibold">{t("home.footer.explore")}</div>
            <ul className="mt-2 space-y-2 text-sm text-gray-300">
              <li><a href="/for-businesses">{t("home.footer.for_businesses")}</a></li>
              <li><a href="/for-workers">{t("home.footer.for_workers")}</a></li>
              <li><a href="/for-learners">{t("home.footer.for_learners")}</a></li>
              <li><a href="/careers">{t("home.footer.careers")}</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-8">© {new Date().getFullYear()} QuickShift — {t("home.footer.copyright")}</div>
      </footer>
    </div>
  );
}