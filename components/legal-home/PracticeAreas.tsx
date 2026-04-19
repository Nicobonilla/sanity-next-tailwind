import Link from 'next/link';

import type { GetUnitBusinessListQueryResult } from '@/sanity.types';
import SectionHeading from './SectionHeading';

const summaryByKeyword = [
  {
    match: 'famil',
    text: 'Orientación y representación en materias familiares, patrimoniales y relaciones personales de alta sensibilidad.',
  },
  {
    match: 'inmob',
    text: 'Asesoría para compraventas, contratos, regularización y decisiones vinculadas a bienes raíces.',
  },
  {
    match: 'civil',
    text: 'Patrocinio en asuntos civiles, obligaciones, contratos y conflictos que requieren respaldo técnico riguroso.',
  },
  {
    match: 'labor',
    text: 'Acompañamiento en conflictos laborales y revisión jurídica de relaciones de trabajo.',
  },
  {
    match: 'suces',
    text: 'Apoyo jurídico en herencias, posesiones efectivas y resguardo patrimonial familiar.',
  },
];

function getAreaSummary(title: string | null) {
  if (!title) {
    return 'Asesoría jurídica especializada, ordenada y enfocada en resolver asuntos concretos con respaldo profesional.';
  }

  const normalized = title.toLowerCase();
  const matched = summaryByKeyword.find((item) => normalized.includes(item.match));

  return (
    matched?.text ||
    `Acompañamiento profesional en ${title.toLowerCase()}, con análisis técnico, comunicación clara y atención responsable.`
  );
}

export default function PracticeAreas({
  areas,
}: {
  areas: GetUnitBusinessListQueryResult;
}) {
  const featuredAreas = areas.slice(0, 6);

  return (
    <section className="section-shell" id="areas">
      <div className="site-container">
        <SectionHeading
          description={
            <>
              La especialización debe ayudar a entender rápidamente si el
              estudio puede acompañar un asunto concreto. Por eso las áreas se
              presentan de forma clara, ordenada y útil para el usuario.
            </>
          }
          eyebrow="Áreas de práctica"
          title="Especialidades presentadas con claridad para facilitar la toma de contacto."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featuredAreas.map((area) => (
            <article className="surface-card flex h-full flex-col p-7" key={area.slug}>
              <p className="legal-kicker">Área de práctica</p>
              <h3 className="mt-3 text-3xl font-semibold text-[color:var(--color-primary)]">
                {area.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--color-text-soft)]">
                {getAreaSummary(area.title)}
              </p>

              <div className="divider-line my-6" />

              <div className="flex flex-1 flex-col gap-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-soft)]">
                  Servicios relacionados
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
              >
                Ver detalle
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
