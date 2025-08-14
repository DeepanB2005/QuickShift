import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import hiTranslation from './locales/hi.json';
import taTranslation from './locales/ta.json';

i18n
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Passes i18n instance to react-i18next.
  .init({
    resources: {
      en: { translation: enTranslation },
      hi: { translation: hiTranslation },
      ta: { translation: taTranslation }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safe from xss
    }
  });

export default i18n;
