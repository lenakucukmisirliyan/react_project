import messages_tr from '../locales/tr.json';
import messages_en from '../locales/en.json';

export const MENU_ITEMS = [
  { id: 1, label: { tr: 'Hakkımda', en: 'About Me' }, url: '/about-me' },
  { id: 2, label: { tr: 'Filmler', en: 'Movies' }, url: '/movies' },
  { id: 3, label: { tr: 'İletişim', en: 'Contact' }, url: '/contact' },
];

export const PAGE_ID_LIST = {
  ABOUT: 1,
  MOVIES: 2,
  CONTACT: 3,
};

export const messages = {
  tr: messages_tr,
  en: messages_en,
};

export const API_KEY = '23a0dfb4e623e111fa20f927a8922a98';

export const METHOD = {
  GET : 'GET',
  POST : 'POST'
}