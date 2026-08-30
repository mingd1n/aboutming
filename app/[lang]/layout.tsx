import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { langFromParam, LANGS, t, type Lang } from '@/lib/i18n';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = langFromParam(raw);
  return {
    title: 'Ming / Axel',
    description: t(lang, 'meta.desc'),
    alternates: {
      languages: { zh: '/zh', en: '/en', 'x-default': '/zh' },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Lang = langFromParam(raw);

  return (
    <div className="min-h-screen flex flex-col overflow-visible">
      <Header lang={lang} />
      <main className="flex-1 overflow-visible">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
