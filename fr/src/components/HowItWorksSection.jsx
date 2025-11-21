import React from 'react';

// HowItWorksSectionSimple.jsx
// Simplified vertical "How it works" section for a blue-collar / labour marketplace.
// Uses Tailwind CSS utility classes and a few small embedded keyframes for gentle effects.
// Accepts `t` (i18n) as prop like your original.

export default function HowItWorksSectionSimple({ t }) {
  return (
    <section id="how" className="py-16 bg-gradient-to-r from-purple-200 to-blue-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-8">

          {/* Left visual column: blue-collar illustrations */}
          <aside className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-4">
            <div className="w-40 h-40 rounded-lg bg-blue-50 flex items-center justify-center shadow-md transform transition-transform hover:scale-105">
              {/* simple stacked worker icons/illustration */}
              <div className="flex flex-col items-center gap-1">
                <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-sm font-semibold text-blue-700">Trusted Workers</div>
              </div>
            </div>

            <div className="w-full md:w-48 text-center md:text-left">
              <h3 className="text-2xl font-bold">{t('home.how_works.title')}</h3>
              <p className="mt-2 text-gray-600">{t('home.how_works.subtitle')}</p>
            </div>

            <div className="mt-4 w-full md:w-48 grid grid-cols-3 gap-2">
              {/* small badges representing trades */}
              {['Plumber','Electrician','Carpenter','Painter','Cleaner','Mover'].map((s, i) => (
                <div key={i} className="flex flex-col items-center p-2 bg-blue-50 rounded-lg shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">⚒️</div>
                  <div className="text-xs mt-1 text-blue-700">{s}</div>
                </div>
              ))}
            </div>
          </aside>

          {/* Right content column: vertical steps */}
          <div className="w-full md:w-2/3">
            <div className="space-y-6">
              <Step
                number={1}
                title={t('home.how_works.step1')}
                desc={t('home.how_works.step1_desc')}
                accent="bg-blue-50"
              />

              <Step
                number={2}
                title={t('home.how_works.step2')}
                desc={t('home.how_works.step2_desc')}
                accent="bg-blue-100"
              />

              <Step
                number={3}
                title={t('home.how_works.step3')}
                desc={t('home.how_works.step3_desc')}
                accent="bg-blue-50"
              />
            </div>

            
          </div>
        </div>
      </div>

      <style>{`
        /* gentle appear animation for steps */
        @keyframes appearUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .step-appear { animation: appearUp 420ms ease both; }

        /* small pulsing accent for the step number */
        @keyframes pulseSoft { 0% { transform: scale(1); opacity: 1 } 70% { transform: scale(1.06); opacity: 0.85 } 100% { transform: scale(1); opacity: 1 } }
        .num-pulse { animation: pulseSoft 2000ms ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .step-appear, .num-pulse { animation: none; }
        }
      `}</style>
    </section>
  );
}

function Step({ number, title, desc, accent = 'bg-blue-50' }) {
  return (
    <div className={`flex items-start gap-4 p-4 rounded-xl shadow-sm ${accent} step-appear`}>
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-l from-green-300 to-blue-300 flex items-center justify-center shadow num-pulse text-blue-700 font-bold">{number}</div>
      </div>

      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        <p className="mt-1 text-gray-600 text-sm">{desc}</p>
      </div>

      <div className="flex-shrink-0 hidden sm:block">
        <div className="w-16 h-16 bg-white rounded-lg shadow flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
