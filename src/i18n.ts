import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es', // Idioma por defecto
    interpolation: {
      escapeValue: false, // React ya escapa los valores
    },
    resources: {
      en: {
        translation: require('./locales/en/translation.json'),
      },
      es: {
        translation: require('./locales/es/translation.json'),
      },
    },
  });

export default i18n;
