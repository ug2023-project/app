import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

const selectedLang = localStorage.getItem('lng') || 'en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    fallbackLng: 'en',
    preload: ['en'],
    debug: process.env.NODE_ENV !== 'production',
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'lng',
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    defaultNS: 'translation',
    lng: selectedLang,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
