
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';

// Configure i18next
i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    debug: import.meta.env.DEV,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    resources: {
      en: {
        translation: enTranslation
      },
      es: {
        translation: esTranslation
      }
    }
  });

export default i18n;
