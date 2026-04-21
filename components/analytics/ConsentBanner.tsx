'use client';

import Link from 'next/link';

import { useAnalyticsConsent } from '@/context/AnalyticsConsentContext';

export default function ConsentBanner() {
  const {
    acceptConsent,
    bannerOpen,
    closePreferences,
    hasDecision,
    rejectConsent,
  } = useAnalyticsConsent();

  if (!bannerOpen) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-[color:rgba(31,39,51,0.12)] bg-[color:rgba(245,242,236,0.98)] shadow-[var(--shadow-soft)] backdrop-blur-sm">
      <div className="site-container py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
              Privacidad y medicion
            </p>
            <p className="text-sm leading-6 text-[color:var(--color-text)] md:text-base">
              Usamos medicion web para saber que contenidos, articulos y canales
              generan consultas. No activamos analytics sin tu autorizacion.
              Puedes revisar el detalle en la{' '}
              <Link
                className="underline decoration-[color:var(--color-accent)] underline-offset-4"
                href="/politica-de-privacidad"
              >
                politica de privacidad
              </Link>{' '}
              y en la{' '}
              <Link
                className="underline decoration-[color:var(--color-accent)] underline-offset-4"
                href="/politica-de-cookies"
              >
                politica de cookies
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {hasDecision ? (
              <button
                className="min-h-[48px] rounded-md border border-[color:var(--color-border)] px-5 text-sm font-semibold text-[color:var(--color-text)] transition-colors hover:bg-[color:rgba(30,42,56,0.04)]"
                onClick={closePreferences}
                type="button"
              >
                Mantener decision actual
              </button>
            ) : null}
            <button
              className="min-h-[48px] rounded-md border border-[color:var(--color-border)] px-5 text-sm font-semibold text-[color:var(--color-text)] transition-colors hover:bg-[color:rgba(30,42,56,0.04)]"
              onClick={rejectConsent}
              type="button"
            >
              Rechazar analytics
            </button>
            <button
              className="min-h-[48px] rounded-md bg-[color:var(--color-primary)] px-5 text-sm font-semibold text-[color:var(--color-bg)] transition-colors hover:bg-[color:var(--color-primary-hover)]"
              onClick={acceptConsent}
              type="button"
            >
              Aceptar analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
