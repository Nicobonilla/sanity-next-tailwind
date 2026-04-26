'use client';

import BookingButton from '@/components/content/BookingButton';
import {
  trackEmailClick,
  trackPhoneClick,
  trackWhatsappClick,
} from '@/components/lib/GTMTrackers';
import { Button } from '@/components/ui/Button';
import { SiteIdentity } from '@/lib/site-identity';

export default function FinalCTA({
  eyebrow = 'Contacto',
  title = 'Agende una consulta virtual o escriba por WhatsApp para revisar su caso con claridad y confidencialidad.',
  description = 'El estudio puede orientar el siguiente paso, indicar antecedentes utiles y proponer una forma de trabajo concreta segun el problema juridico.',
  primaryLabel = 'Agendar consulta virtual',
  secondaryLabel = 'Hablar por WhatsApp',
  siteIdentity,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  siteIdentity: SiteIdentity;
}) {
  return (
    <section className="section-shell" id="contacto">
      <div className="site-container">
        <div className="rounded-lg bg-[color:var(--color-primary)] px-5 py-8 text-[color:var(--color-bg)] sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
            <div className="flex flex-col gap-5">
              <span className="text-sm uppercase tracking-[0.2em] text-[color:rgba(245,242,236,0.72)]">
                {eyebrow}
              </span>
              <h2 className="font-display text-3xl leading-tight text-[color:var(--color-bg)] sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="max-w-2xl text-base leading-7 text-[color:rgba(245,242,236,0.76)] sm:text-lg sm:leading-8">
                {description}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <BookingButton
                  className="w-full justify-center border-[color:var(--color-bg)] bg-[color:var(--color-bg)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-surface-muted)] hover:text-[color:var(--color-primary)] sm:w-auto"
                  siteIdentity={siteIdentity}
                  source="final_cta"
                >
                  {primaryLabel}
                </BookingButton>
                <Button
                  asChild
                  className="w-full justify-center border-[color:rgba(245,242,236,0.4)] text-[color:var(--color-bg)] hover:bg-[color:rgba(255,255,255,0.08)] hover:text-[color:var(--color-bg)] sm:w-auto"
                  variant="secondary"
                >
                  <a
                    href={siteIdentity.whatsappHref}
                    onClick={() => trackWhatsappClick('final_cta_whatsapp')}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {secondaryLabel}
                  </a>
                </Button>
              </div>
            </div>

            <div className="surface-panel border-white/20 bg-[color:rgba(255,255,255,0.08)] p-5 sm:p-6">
              <div className="space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:rgba(245,242,236,0.65)]">
                    Disponibilidad
                  </p>
                  <p className="mt-2 text-lg text-[color:var(--color-bg)]">
                    {siteIdentity.booking.availabilityNote ||
                      'Consulta virtual y respuesta inicial por WhatsApp.'}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:rgba(245,242,236,0.65)]">
                    Telefono
                  </p>
                  <a
                    className="mt-2 block text-xl font-semibold text-[color:var(--color-bg)] sm:text-2xl"
                    href={siteIdentity.phoneHref}
                    onClick={() => trackPhoneClick('final_cta_contact_panel_phone')}
                  >
                    {siteIdentity.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:rgba(245,242,236,0.65)]">
                    WhatsApp
                  </p>
                  <a
                    className="mt-2 block text-lg text-[color:var(--color-bg)]"
                    href={siteIdentity.whatsappHref}
                    onClick={() => trackWhatsappClick('final_cta_contact_panel_whatsapp')}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Escribir ahora
                  </a>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:rgba(245,242,236,0.65)]">
                    Correo
                  </p>
                  <a
                    className="mt-2 block text-lg text-[color:var(--color-bg)]"
                    href={siteIdentity.emailHref}
                    onClick={() => trackEmailClick('final_cta_contact_panel_email')}
                  >
                    {siteIdentity.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:rgba(245,242,236,0.65)]">
                    Ubicacion
                  </p>
                  <p className="mt-2 text-lg text-[color:var(--color-bg)]">
                    {siteIdentity.addressLine}
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
