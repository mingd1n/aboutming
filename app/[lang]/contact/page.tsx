import { langFromParam, t, type Lang } from '@/lib/i18n';
import { site } from '@/data/site';

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Lang = langFromParam(raw);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 pt-32 pb-24">
      <div className="mb-12">
        <span className="text-[11px] tracking-[0.3em] text-faint">CONTACT</span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-3">{t(lang, 'contact.title')}</h1>
        <p className="mt-3 text-[13px] tracking-[0.2em] text-accent">{t(lang, 'contact.sub')}</p>
      </div>

      <div className="mb-8">
        <div className="group relative overflow-hidden border border-line/70 aspect-[16/9] max-w-md">
          <img
            src="/media/portrait/pfp.jpg"
            alt={`${site.name[lang]} / ${site.alias}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        </div>
      </div>

      <div className="grid gap-4">
        <a href={`mailto:${site.email}`} className="p-6 border border-line/70 hover:border-accent/50 hover:scale-[1.01] transition-all duration-500 flex items-center justify-between">
          <span className="text-[12px] tracking-[0.2em] text-muted">{t(lang, 'contact.email')}</span>
          <span className="text-fg">{site.email}</span>
        </a>
        <div className="p-6 border border-line/70 flex items-center justify-between">
          <span className="text-[12px] tracking-[0.2em] text-muted">{t(lang, 'contact.wechat')}</span>
          <span className="text-fg">{site.wechat}</span>
        </div>
        <div className="p-6 border border-line/70 flex items-center justify-between">
          <span className="text-[12px] tracking-[0.2em] text-muted">{t(lang, 'contact.location')}</span>
          <span className="text-fg">{site.location[lang]}</span>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-[11px] tracking-[0.22em] text-muted mb-5">{t(lang, 'contact.social')}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {site.social.map((s) => (
            <div key={s.id} className="p-6 border border-line/70 hover:border-accent/50 hover:scale-[1.01] transition-all duration-500 flex flex-col gap-3">
              <span className="text-[12px] font-semibold tracking-[0.14em]">{s.label}</span>
              {s.href ? (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-muted hover:text-accent transition-colors break-all"
                >
                  {s.note[lang]}
                </a>
              ) : (
                <span className="text-[13px] text-muted">{s.note[lang]}</span>
              )}
              {s.qr ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.qr}
                  alt={s.label}
                  className="w-28 h-28 object-contain border border-line/50 mt-1"
                />
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
