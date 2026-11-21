import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { isLang, LANGS } from '@/lib/i18n';
import '../globals.css';
import '../interactions.css';

type LangParams = Promise<{ lang: string }>;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Ming / Axel',
    description: lang === 'en'
      ? 'A visual operating system for one person'
      : '丁铭（Axel）的个人站 —— 一个人的视觉操作系统。',
    icons: { icon: '/favicon.svg' },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LangParams;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-fg antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){var t;try{t=localStorage.getItem('theme');}catch{}document.documentElement.classList.toggle('dark',t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches));})();`}
        </Script>
        <div className="site-shell min-h-screen flex flex-col overflow-visible">
          <Header lang={lang} />
          <main className="flex-1 overflow-visible">{children}</main>
          <Footer lang={lang} />
        </div>
      </body>
    </html>
  );
}
