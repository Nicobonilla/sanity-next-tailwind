'use client';

import BookingButton from '@/components/content/BookingButton';
import ReviewsProof from '@/components/content/ReviewsProof';
import {
  trackPhoneClick,
  trackWhatsappClick,
} from '@/components/lib/GTMTrackers';
import { Button } from '@/components/ui/Button';
import { SiteIdentity } from '@/lib/site-identity';

function buildTitle(serviceTitle: string) {
  return `Puede iniciar su consulta sobre ${serviceTitle.toLowerCase()} por videollamada, WhatsApp o llamada.`;
}

export default function ServiceQuickActions({
  practiceAreaTitle,
  serviceSummary,
  serviceTitle,
  siteIdentity,
  source,
}: {
  practiceAreaTitle?: string | null;
  serviceSummary?: string | null;
  serviceTitle: string;
  siteIdentity: SiteIdentity;
  source: string;
}) {
  const highlights = [
    practiceAreaTitle || 'Servicio legal',
    `Atencion en ${siteIdentity.city} y Aconcagua`,
    'Consulta virtual disponible',
    'Reserva y confidencialidad',
  ];

  return (
    <section className="site-container pt-10">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_360px]">
        <div className="surface-card p-7 md:p-8">
          <p className="legal-kicker">Consulta inicial</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-[color:var(--color-primary)] md:text-4xl">
            {buildTitle(serviceTitle)}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--color-text-soft)]">
            {serviceSummary ||
              'Si este servicio se parece a su situacion, puede iniciar con una consulta para revisar antecedentes, aclarar dudas y definir el camino juridico mas conveniente.'}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {highlights.map((highlight) => (
              <li
                className="rounded-full border border-[color:rgba(31,39,51,0.12)] bg-[color:rgba(245,242,236,0.8)] px-3 py-2 text-sm text-[color:var(--color-text)]"
                key={highlight}
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-panel flex h-full flex-col gap-4 p-6">
          <div>
            <p className="legal-kicker">Que puede hacer ahora</p>
            <p className="mt-3 text-base leading-7 text-[color:var(--color-text-soft)]">
              Inicie contacto por el canal que le resulte mas simple. La
              prioridad es revisar si este servicio aplica a su caso y definir
              el siguiente paso.
            </p>
          </div>

          <BookingButton
            className="w-full"
            siteIdentity={siteIdentity}
            source={`${source}_booking`}
          >
            {siteIdentity.booking.buttonLabel || 'Agendar videollamada'}
          </BookingButton>

          {siteIdentity.booking.availabilityNote ||
          siteIdentity.booking.durationLabel ||
          siteIdentity.booking.priceLabel ? (
            <div className="rounded-xl border border-[color:rgba(31,39,51,0.08)] bg-[color:rgba(255,255,255,0.6)] p-4 text-sm leading-6 text-[color:var(--color-text-soft)]">
              <p className="font-semibold text-[color:var(--color-primary)]">
                {siteIdentity.booking.priceLabel || 'Consulta virtual'}
              </p>
              <p className="mt-2">
                {[siteIdentity.booking.durationLabel, siteIdentity.booking.availabilityNote]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
          ) : null}

          <Button asChild className="w-full" variant="secondary">
            <a
              href={siteIdentity.whatsappHref}
              onClick={() => trackWhatsappClick(`${source}_whatsapp`)}
              rel="noreferrer"
              target="_blank"
            >
              Hablar por WhatsApp
            </a>
          </Button>

          <Button asChild className="w-full" variant="ghost">
            <a
              href={siteIdentity.phoneHref}
              onClick={() => trackPhoneClick(`${source}_phone`)}
            >
              Llamar ahora
            </a>
          </Button>

          <div className="rounded-xl border border-[color:rgba(31,39,51,0.08)] bg-[color:rgba(255,255,255,0.6)] p-4 text-sm leading-6 text-[color:var(--color-text-soft)]">
            Respuesta inicial clara, contacto directo y orientacion confidencial
            para asuntos familiares, patrimoniales e inmobiliarios.
          </div>

          <ReviewsProof
            compact
            siteIdentity={siteIdentity}
            source={`${source}_reviews`}
          />
        </div>
      </div>
    </section>
  );
}
