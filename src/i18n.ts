import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,

    supportedLngs: [
      'en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'pl', 'ru', 'uk',
      'ja', 'zh', 'ko', 'ar', 'hi', 'tr', 'id', 'vi', 'th', 'sw',
      'am', 'yo', 'ig', 'ha'
    ],

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'],
    },

    defaultNS: 'translation',
    ns: ['translation'],
  });

export default i18n;