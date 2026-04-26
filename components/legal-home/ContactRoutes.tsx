'use client';

import BookingButton from '@/components/content/BookingButton';
import {
  trackPhoneClick,
  trackWhatsappClick,
} from '@/components/lib/GTMTrackers';
import { Button } from '@/components/ui/Button';
import { SiteIdentity } from '@/lib/site-identity';

import SectionHeading from './SectionHeading';

type RouteCard = {
  title: string;
  description: string;
  label: string;
  type: 'drawer' | 'whatsapp' | 'phone';
  highlights: string[];
};

const defaultRoutes: RouteCard[] = [
  {
    title: 'Consulta virtual',
    description:
      'La mejor opcion para revisar antecedentes, entender el escenario y ordenar el siguiente paso con mas contexto.',
    label: 'Agendar consulta virtual',
    type: 'drawer',
    highlights: [
      'Revision inicial del caso',
      'Orientacion confidencial',
      'Siguiente paso claro',
    ],
  },
  {
    title: 'WhatsApp',
    description:
      'Util para un primer contacto rapido, confirmar si el estudio puede ayudar y coordinar la forma de atencion.',
    label: 'Hablar por WhatsApp',
    type: 'whatsapp',
    highlights: [
      'Respuesta inicial breve',
      'Coordinacion agil',
      'Contacto directo',
    ],
  },
  {
    title: 'Llamada',
    description:
      'Adecuada cuando necesita iniciar contacto de inmediato y explicar el problema en pocos minutos.',
    label: 'Llamar ahora',
    type: 'phone',
    highlights: [
      'Contacto inmediato',
      'Orientacion inicial',
      'Atencion en San Felipe',
    ],
  },
];

export default function ContactRoutes({
  siteIdentity,
  eyebrow = 'Primer contacto',
  title = 'Elija la forma mas simple de iniciar su consulta.',
  description = 'La web no deberia obligar a leer demasiado antes de contactar. Puede empezar por videollamada, WhatsApp o llamada segun la urgencia del caso.',
  routes = defaultRoutes,
}: {
  siteIdentity: SiteIdentity;
  eyebrow?: string;
  title?: string;
  description?: string;
  routes?: RouteCard[];
}) {
  return (
    <section className="section-shell bg-[color:rgba(232,225,215,0.35)]" id="consulta">
      <div className="site-container">
        <SectionHeading
          align="center"
          description={description}
          eyebrow={eyebrow}
          title={title}
        />

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-3">
          {routes.map((route) => (
            <article className="surface-card flex h-full flex-col p-5 sm:p-7" key={route.title}>
              <p className="legal-kicker">Canal de contacto</p>
              <h3 className="mt-3 text-2xl font-semibold text-[color:var(--color-primary)]">
                {route.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-[color:var(--color-text-soft)] sm:text-base sm:leading-7">
                {route.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {route.highlights.map((highlight) => (
                  <li
                    className="rounded-full border border-[color:rgba(31,39,51,0.12)] bg-[color:rgba(245,242,236,0.8)] px-3 py-2 text-sm text-[color:var(--color-text)]"
                    key={highlight}
                  >
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-6 sm:mt-8">
                {route.type === 'drawer' ? (
                  <BookingButton
                    className="w-full justify-center"
                    siteIdentity={siteIdentity}
                    source="home_contact_routes_drawer"
                  >
                    {route.label}
                  </BookingButton>
                ) : null}

                {route.type === 'whatsapp' ? (
                  <Button asChild className="w-full justify-center" variant="secondary">
                    <a
                      href={siteIdentity.whatsappHref}
                      onClick={() => trackWhatsappClick('home_contact_routes_whatsapp')}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {route.label}
                    </a>
                  </Button>
                ) : null}

                {route.type === 'phone' ? (
                  <Button asChild className="w-full justify-center" variant="secondary">
                    <a
                      href={siteIdentity.phoneHref}
                      onClick={() => trackPhoneClick('home_contact_routes_phone')}
                    >
                      {route.label}
                    </a>
                  </Button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
