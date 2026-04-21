'use client';

import { trackReviewClick } from '@/components/lib/GTMTrackers';
import { SiteIdentity } from '@/lib/site-identity';

function formatReviewCount(value?: number | null) {
  if (typeof value !== 'number' || value <= 0) {
    return null;
  }

  return new Intl.NumberFormat('es-CL').format(value);
}

function formatRating(value?: number | null) {
  if (typeof value !== 'number') {
    return null;
  }

  return value.toFixed(1);
}

export default function ReviewsProof({
  compact = false,
  description,
  eyebrow = 'Reseñas y referencias',
  siteIdentity,
  source,
  title = 'Prueba social verificable para reforzar la decision de contacto.',
}: {
  compact?: boolean;
  description?: string;
  eyebrow?: string;
  siteIdentity: SiteIdentity;
  source: string;
  title?: string;
}) {
  const profiles = siteIdentity.reviewProfiles || [];

  if (!profiles.length) {
    return null;
  }

  return (
    <section className={compact ? '' : 'section-tight'}>
      <div className={compact ? '' : 'site-container'}>
        {!compact ? (
          <div className="mb-8 max-w-3xl space-y-3">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-subtitle">{title}</h2>
            <p className="section-copy text-base md:text-lg">
              {description ||
                'Use esta capa solo con fuentes reales. Cada tarjeta puede apuntar a perfiles externos verificables del estudio.'}
            </p>
          </div>
        ) : null}

        <div
          className={`grid gap-4 ${compact ? 'md:grid-cols-2' : 'lg:grid-cols-3'}`}
        >
          {profiles.map((profile) => {
            const rating = formatRating(profile.rating);
            const reviewCount = formatReviewCount(profile.reviewCount);

            return (
              <article
                className="surface-card h-full p-6"
                key={`${profile.platform}-${profile.reviewUrl}`}
              >
                <div className="space-y-3">
                  <p className="legal-kicker">
                    {profile.platform || 'Perfil externo'}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-[color:var(--color-primary)]">
                    {rating ? (
                      <p className="text-3xl font-semibold leading-none">
                        {rating}
                      </p>
                    ) : null}
                    {rating ? (
                      <p className="text-sm font-medium uppercase tracking-[0.16em] text-[color:var(--color-accent)]">
                        / 5
                      </p>
                    ) : null}
                    {reviewCount ? (
                      <p className="text-sm text-[color:var(--color-text-soft)]">
                        {reviewCount} reseñas
                      </p>
                    ) : null}
                  </div>
                  {profile.summary ? (
                    <p className="text-base leading-7 text-[color:var(--color-text-soft)]">
                      {profile.summary}
                    </p>
                  ) : null}
                  <a
                    className="inline-flex items-center text-sm font-semibold text-[color:var(--color-primary)] underline-offset-4 transition-colors duration-200 hover:text-[color:var(--color-accent)] hover:underline"
                    href={profile.reviewUrl || '#'}
                    onClick={() =>
                      trackReviewClick(profile.platform || 'review_profile', source)
                    }
                    rel="noreferrer"
                    target="_blank"
                  >
                    {profile.ctaLabel || 'Ver reseñas'}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
