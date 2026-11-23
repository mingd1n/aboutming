import WorldContent from '@/components/WorldContent';
import WorldAbout from '@/components/WorldAbout';
import { langFromParam, t } from '@/lib/i18n';

export default async function WorldPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = langFromParam(raw);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 pt-32 pb-24">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">{t(lang, 'world.title')}</h1>
      <div className="mb-12"><WorldAbout lang={lang} showLens={false} headingLevel={2} /></div>
      <WorldContent lang={lang} headingLevel={2} />
    </div>
  );
}
