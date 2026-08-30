import { langFromParam, type Lang } from '@/lib/i18n';
import HomeView from '@/components/HomeView';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Lang = langFromParam(raw);
  return <HomeView lang={lang} />;
}
