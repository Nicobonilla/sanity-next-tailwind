'use client';

import ContactDrawerButton from '@/components/global/ContactDrawerButton';
import { trackPhoneClick } from '@/components/lib/GTMTrackers';
import { siteConfig } from '@/lib/site-config';

type ContentCtaValue = {
  description?: string | null;
  eyebrow?: string | null;
  isEnabled?: boolean | null;
  primaryLabel?: string | null;
  secondaryLabel?: string | null;
  title?: string | null;
} | null;

type ContentContactCtaProps = {
  cta?: ContentCtaValue;
  source: string;
};

export default function ContentContactCta({
  cta,
  source,
}: ContentContactCtaProps) {
  if (cta?.isEnabled === false) {
    return null;
  }

  return (
    <section className="mt-10 rounded-2xl border border-[color:rgba(31,39,51,0.08)] bg-[color:var(--color-surface)] p-6 shadow-[var(--shadow-soft)] md:p-8">
      <div className="max-w-2xl space-y-4">
        {cta?.eyebrow ? (
          <p className="legal-kicker">{cta.eyebrow}</p>
        ) : null}

        <div className="space-y-3">
          <h2 className="font-display text-3xl leading-tight text-[color:var(--color-primary)] md:text-4xl">
            {cta?.title || 'Podemos revisar su caso y orientar el siguiente paso.'}
          </h2>
          <p className="max-w-xl text-base leading-7 text-[color:var(--color-text-soft)]">
            {cta?.description ||
              'Si necesita claridad para tomar una decision legal, puede contactarnos para una primera orientacion profesional y confidencial.'}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ContactDrawerButton source={`${source}_drawer`}>
            {cta?.primaryLabel || 'Solicitar orientacion'}
          </ContactDrawerButton>
          <a
            className="inline-flex min-h-[52px] items-center justify-center rounded-md border border-[color:var(--color-primary)] px-6 text-sm font-semibold text-[color:var(--color-primary)] transition-colors duration-200 hover:bg-[color:rgba(30,42,56,0.04)]"
            href={siteConfig.phoneHref}
            onClick={() => trackPhoneClick(`${source}_phone`)}
          >
            {cta?.secondaryLabel || 'Llamar ahora'}
          </a>
        </div>
      </div>
    </section>
  );
}
