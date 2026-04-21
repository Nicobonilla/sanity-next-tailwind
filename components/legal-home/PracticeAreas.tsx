'use client';

import Link from 'next/link';

import { trackPracticeAreaClick } from '@/components/lib/GTMTrackers';
import type { GetUnitBusinessListQueryResult } from '@/sanity.types';
import SectionHeading from './SectionHeading';

const summaryByKeyword = [
  {
    match: 'famil',
    text: 'Orientacion y representacion en materias familiares, patrimoniales y relaciones personales de alta sensibilidad.',
  },
  {
    match: 'inmob',
    text: 'Asesoria para compraventas, contratos, regularizacion y decisiones vinculadas a bienes raices.',
  },
  {
    match: 'civil',
    text: 'Patrocinio en asuntos civiles, obligaciones, contratos y conflictos que requieren respaldo tecnico riguroso.',
  },
  {
    match: 'labor',
    text: 'Acompanamiento en conflictos laborales y revision juridica de relaciones de trabajo.',
  },
  {
    match: 'suces',
    text: 'Apoyo juridico en herencias, posesiones efectivas y resguardo patrimonial familiar.',
  },
];

const actionByKeyword = [
  {
    match: 'famil',
    text: 'Quiero ayuda en familia',
  },
  {
    match: 'inmob',
    text: 'Revisar un asunto inmobiliario',
  },
  {
    match: 'civil',
    text: 'Ver asuntos civiles',
  },
  {
    match: 'labor',
    text: 'Revisar un conflicto laboral',
  },
  {
    match: 'suces',
    text: 'Revisar herencia o posesion efectiva',
  },
];

function getAreaSummary(title: string | null) {
  if (!title) {
    return 'Asesoria juridica especializada, ordenada y enfocada en resolver asuntos concretos con respaldo profesional.';
  }

  const normalized = title.toLowerCase();
  const matched = summaryByKeyword.find((item) => normalized.includes(item.match));

  return (
    matched?.text ||
    `Acompanamiento profesional en ${title.toLowerCase()}, con analisis tecnico, comunicacion clara y atencion responsable.`
  );
}

function getAreaAction(title: string | null, fallback?: string) {
  const normalizedFallback = fallback?.trim();

  if (
    normalizedFallback &&
    normalizedFallback !== 'Ver detalle' &&
    normalizedFallback !== 'Ver servicios del area'
  ) {
    return normalizedFallback;
  }

  if (!title) {
    return 'Ver servicios del area';
  }

  const normalized = title.toLowerCase();
  const matched = actionByKeyword.find((item) => normalized.includes(item.match));

  return matched?.text || 'Ver servicios del area';
}

export default function PracticeAreas({
  areas,
  eyebrow = 'Areas de practica',
  title = 'Servicios juridicos enfocados en problemas concretos.',
  description = 'Materias frecuentes para personas, familias y propietarios que necesitan orientacion juridica clara.',
  servicesLabel = 'Servicios relacionados',
  detailLabel = 'Ver servicios del area',
}: {
  areas: GetUnitBusinessListQueryResult;
  eyebrow?: string;
  title?: string;
  description?: string;
  servicesLabel?: string;
  detailLabel?: string;
}) {
  const featuredAreas = areas.slice(0, 6);

  return (
    <section className="section-shell" id="areas">
      <div className="site-container">
        <SectionHeading
          description={description}
          eyebrow={eyebrow}
          title={title}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featuredAreas.map((area) => (
            <article className="surface-card flex h-full flex-col p-7" key={area.slug}>
              <p className="legal-kicker">Area de practica</p>
              <h3 className="mt-3 text-3xl font-semibold text-[color:var(--color-primary)]">
                {area.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--color-text-soft)]">
                {area.summary || getAreaSummary(area.title)}
              </p>

              <div className="divider-line my-6" />

              <div className="flex flex-1 flex-col gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-soft)]">
                  {servicesLabel}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {(area.services || []).slice(0, 3).map((service) => (
                    <li
                      className="rounded-full border border-[color:rgba(31,39,51,0.12)] bg-[color:rgba(245,242,236,0.8)] px-3 py-2 text-sm text-[color:var(--color-text)]"
                      key={service.slug || service.title}
                    >
                      {service.title}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-[color:var(--color-primary)] hover:text-[color:var(--color-accent)]"
                href={area.slug ? `/area-de-practica/${area.slug}` : '#contacto'}
                onClick={() =>
                  trackPracticeAreaClick(
                    area.slug || '',
                    area.title || '',
                    'home_practice_areas'
                  )
                }
              >
                {getAreaAction(area.title, detailLabel)}
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
