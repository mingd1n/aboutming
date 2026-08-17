import { defaultLang, ui, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang in ui) return maybeLang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key] ?? key;
  };
}

export function getLocalizedPath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return clean ? `/${lang}/${clean}` : `/${lang}/`;
}

export function switchLangPath(url: URL, nextLang: Lang): string {
  const segments = url.pathname.split('/').filter(Boolean);
  if (segments[0] in ui) {
    segments[0] = nextLang;
  } else {
    segments.unshift(nextLang);
  }
  return `/${segments.join('/')}${segments.length === 1 ? '/' : ''}`;
}
