import i18n, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from '../locales/en/common.json';
import vnCommon from '../locales/vn/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  vn: {
    common: vnCommon,
  },
};

export const SupportedLanguages = Object.keys(
  resources,
) as (keyof typeof resources)[];

const createI18n = (options?: InitOptions) => {
  i18n.use(initReactI18next).init({
    debug: true,
    lng: 'en',
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
      ...options?.interpolation,
    },
    ...options,
  });
  return i18n;
};

export default createI18n;
