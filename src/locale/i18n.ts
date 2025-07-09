import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import ru from './ru.json';
import en from './en.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: { ru: { translation: ru }, en: { translation: en } },
    lng: Localization.locale.startsWith('ru') ? 'ru' : 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;