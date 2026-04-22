import { SiteIdentity } from '@/lib/site-identity';

import ReviewsProof from './ReviewsProof';
import TrackedFaqDisclosure from './TrackedFaqDisclosure';

type ServiceLandingValue = {
  deliverables?: Array<string | null> | null;
  deliverablesTitle?: string | null;
  documents?: Array<string | null> | null;
  documentsTitle?: string | null;
  faqItems?:
    | Array<{
        answer?: string | null;
        question?: string | null;
      }>
    | null;
  faqTitle?: string | null;
  intro?: string | null;
  processSteps?:
    | Array<{
        description?: string | null;
        step?: string | null;
        title?: string | null;
      }>
    | null;
  processTitle?: string | null;
  situations?: Array<string | null> | null;
  situationsTitle?: string | null;
};

function renderStringList(items?: Array<string | null> | null) {
  return (items || []).filter(
    (item): item is string => typeof item === 'string' && item.trim().length > 0
  );
}

export default function ServiceLandingSections({
  landing,
  serviceTitle,
  siteIdentity,
  source,
}: {
  landing?: ServiceLandingValue | null;
  serviceTitle: string;
  siteIdentity: SiteIdentity;
  source: string;
}) {
  if (!landing) {
    return null;
  }

  const situations = renderStringList(landing.situations);
  const deliverables = renderStringList(landing.deliverables);
  const documents = renderStringList(landing.documents);
  const hasIntro = Boolean(landing.intro?.trim());
  const hasProcess = Boolean(landing.processSteps?.length);
  const hasFaq = Boolean(landing.faqItems?.length);

  if (!hasIntro && !situations.length && !deliverables.length && !documents.length && !hasProcess && !hasFaq) {
    return null;
  }

  return (
    <section className="section-tight">
      <div className="site-container space-y-10">
        {hasIntro ? (
          <div className="max-w-4xl space-y-3">
            <p className="eyebrow">Antes de avanzar</p>
            <h2 className="section-subtitle">
              {serviceTitle} con orientacion clara desde el primer analisis.
            </h2>
            <p className="section-copy text-base md:text-lg">{landing.intro}</p>
          </div>
        ) : null}

        {situations.length || deliverables.length || documents.length ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {situations.length ? (
              <article className="surface-card p-6">
                <p className="legal-kicker">
                  {landing.situationsTitle || 'Este servicio es para usted si...'}
                </p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-[color:var(--color-text-soft)]">
                  {situations.map((item) => (
                    <li className="flex gap-3" key={item}>
                      <span className="mt-2 size-2 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}

            {deliverables.length ? (
              <article className="surface-card p-6">
                <p className="legal-kicker">
                  {landing.deliverablesTitle || 'Que revisaremos en su caso'}
                </p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-[color:var(--color-text-soft)]">
                  {deliverables.map((item) => (
                    <li className="flex gap-3" key={item}>
                      <span className="mt-2 size-2 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}

            {documents.length ? (
              <article className="surface-card p-6">
                <p className="legal-kicker">
                  {landing.documentsTitle || 'Antecedentes utiles para avanzar'}
                </p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-[color:var(--color-text-soft)]">
                  {documents.map((item) => (
                    <li className="flex gap-3" key={item}>
                      <span className="mt-2 size-2 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}
          </div>
        ) : null}

        {hasProcess ? (
          <div className="space-y-6">
            <div className="max-w-3xl space-y-3">
              <p className="eyebrow">Proceso</p>
              <h2 className="section-subtitle">
                {landing.processTitle || 'Como se trabaja este tipo de caso'}
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {landing.processSteps?.map((step) => (
                <article className="surface-card p-6" key={`${step.step}-${step.title}`}>
                  <p className="legal-kicker">Paso {step.step}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-[color:var(--color-primary)]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[color:var(--color-text-soft)]">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        <ReviewsProof compact siteIdentity={siteIdentity} source={`${source}_reviews`} />

        {hasFaq ? (
          <div className="space-y-6">
            <div className="max-w-3xl space-y-3">
              <p className="eyebrow">Dudas frecuentes</p>
              <h2 className="section-subtitle">
                {landing.faqTitle || 'Preguntas frecuentes'}
              </h2>
            </div>

            <div className="grid gap-4">
              {landing.faqItems?.map((item, index) =>
                item.question ? (
                  <TrackedFaqDisclosure
                    answer={item.answer || ''}
                    answerClassName="mt-4 text-base leading-7 text-[color:var(--color-text-soft)]"
                    className="surface-card group p-6"
                    key={`${item.question}-${index}`}
                    question={item.question}
                    source={source}
                    summaryClassName="cursor-pointer list-none text-lg font-semibold text-[color:var(--color-primary)]"
                  />
                ) : null
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
