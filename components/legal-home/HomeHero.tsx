'use client';

import Image from 'next/image';

import BookingButton from '@/components/content/BookingButton';
import {
  trackPhoneClick,
  trackWhatsappClick,
} from '@/components/lib/GTMTrackers';
import { Button } from '@/components/ui/Button';
import { SiteIdentity } from '@/lib/site-identity';

export default function HomeHero({
  heroImageUrl,
  leaderName,
  leaderLabel,
  areaCount,
  areasLabel,
  areasSuffix,
  contactLabel,
  trustBullets,
  siteIdentity,
  eyebrow = 'Estudio juridico en San Felipe',
  title = 'Abogado en San Felipe para consultas familiares e inmobiliarias con orientacion clara desde el primer contacto.',
  description = 'Revise su situacion con una consulta virtual o por WhatsApp. La prioridad es entender el caso, ordenar los antecedentes y proponer el siguiente paso con criterio juridico claro.',
  panelTitle = 'Consulta virtual disponible y respuesta inicial clara para asuntos familiares, patrimoniales e inmobiliarios.',
  primaryLabel = 'Agendar consulta virtual',
  secondaryLabel = 'Hablar por WhatsApp',
}: {
  heroImageUrl: string;
  leaderName: string;
  leaderLabel: string;
  areaCount: number;
  areasLabel: string;
  areasSuffix: string;
  contactLabel: string;
  trustBullets: string[];
  siteIdentity: SiteIdentity;
  eyebrow?: string;
  title?: string;
  description?: string;
  panelTitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="section-shell pt-24 sm:pt-28 lg:pt-40">
      <div className="site-container">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] lg:gap-16">
          <div className="flex flex-col gap-6 sm:gap-8">
            <span className="eyebrow">{eyebrow}</span>
            <div className="flex flex-col gap-5 sm:gap-6">
              <h1 className="section-title text-balance">{title}</h1>
              <p className="section-copy max-w-2xl">{description}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <BookingButton
                className="w-full justify-center sm:w-auto"
                siteIdentity={siteIdentity}
                source="home_hero"
              >
                {primaryLabel}
              </BookingButton>
              <Button
                asChild
                className="w-full justify-center sm:w-auto"
                variant="secondary"
              >
                <a
                  href={siteIdentity.whatsappHref}
                  onClick={() => trackWhatsappClick('home_hero_whatsapp')}
                  rel="noreferrer"
                  target="_blank"
                >
                  {secondaryLabel}
                </a>
              </Button>
            </div>
            {siteIdentity.booking.availabilityNote ||
            siteIdentity.booking.durationLabel ? (
              <p className="text-sm text-[color:var(--color-text-soft)]">
                {[siteIdentity.booking.durationLabel, siteIdentity.booking.availabilityNote]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            ) : null}
            <a
              className="inline-flex w-full items-center justify-center rounded-full border border-[color:rgba(31,39,51,0.12)] px-5 py-3 text-sm font-semibold text-[color:var(--color-primary)] transition-colors duration-200 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] sm:w-fit"
              href="#areas"
            >
              Ver areas de practica
            </a>

            <div className="surface-card grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
              <div>
                <p className="legal-kicker">{leaderLabel}</p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--color-text)]">
                  {leaderName}
                </p>
              </div>
              <div>
                <p className="legal-kicker">{areasLabel}</p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--color-text)]">
                  {areaCount} {areasSuffix}
                </p>
              </div>
              <div>
                <p className="legal-kicker">{contactLabel}</p>
                <a
                  className="mt-2 block text-lg font-semibold text-[color:var(--color-text)] transition-colors duration-200 hover:text-[color:var(--color-accent)]"
                  href={siteIdentity.phoneHref}
                  onClick={() => trackPhoneClick('home_hero_phone')}
                >
                  {siteIdentity.phoneDisplay}
                </a>
              </div>
            </div>

            <ul className="grid gap-3 text-sm text-[color:var(--color-text-soft)] md:grid-cols-3">
              {trustBullets.map((item) => (
                <li
                  className="flex items-start gap-3 rounded-md border border-[color:rgba(31,39,51,0.08)] bg-[color:rgba(255,255,255,0.55)] px-3 py-3 sm:px-4"
                  key={item}
                >
                  <span className="mt-2 size-2 rounded-full bg-[color:var(--color-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="surface-card overflow-hidden">
              <div className="relative aspect-[5/6] min-h-[320px] max-h-[70svh] sm:aspect-[5/4] sm:min-h-[380px] sm:max-h-[78svh] md:aspect-[16/10] md:max-h-svh lg:aspect-[4/5] lg:min-h-[420px] lg:max-h-none">
                <Image
                  alt="Reunion de asesoria legal del estudio"
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 42vw"
                  src={heroImageUrl}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,42,56,0.58),rgba(30,42,56,0.06))]" />
                <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/20 bg-[rgba(255,255,255,0.88)] p-4 backdrop-blur-sm sm:inset-x-6 sm:bottom-6 sm:p-6">
                  <p className="legal-kicker">Confianza institucional</p>
                  <p className="mt-3 text-xl font-semibold text-[color:var(--color-primary)] sm:text-2xl">
                    {panelTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
