import ThoughtTimeline from '@/components/ThoughtTimeline';
import { langFromParam, t } from '@/lib/i18n';

export default async function LearnPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = langFromParam(raw);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 pt-32 pb-24">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">{t(lang, 'learn.title')}</h1>
      <ThoughtTimeline lang={lang} />
    </div>
  );
}
