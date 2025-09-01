import createI18n from '@repo/i18n';

export const i18n = createI18n({ debug: !import.meta.env.PROD });
