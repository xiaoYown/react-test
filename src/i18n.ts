import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en_US from './locales/en-US';
import zh_CN from './locales/zh-CN';
import zh_TW from './locales/zh-TW';

const resources:any = {};

[
  { name: 'en_US', data: en_US },
  { name: 'zh_CN', data: zh_CN },
  { name: 'zh_TW', data: zh_TW },
].forEach(item => {
  resources[item.name] = { translation: item.data };
});

export const lang = () => {};

lang.get = () => {
  return window.localStorage.getItem('BB_LANG') || 'zh_CN';
}
lang.set = (val: string) => {
  return window.localStorage.setItem('BB_LANG', val);
}

let lng = lang.get();

export const translator = (text: string) => {
  return i18n.t(text)
}

export const setLang = (lng: string) => {
  lang.set(lng);
  window.location.reload();
}

export function onChange(lng: string) {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: lng,
      fallbackLng: lng,

      interpolation: {
        escapeValue: false
      }
    })
}

onChange(lng);
