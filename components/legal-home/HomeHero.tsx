'use client';

import Image from 'next/image';

import ContactDrawerButton from '@/components/global/ContactDrawerButton';
import { trackPhoneClick } from '@/components/lib/GTMTrackers';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site-config';

const trustBullets = [
  'Atencion juridica directa y confidencial',
  'Asesoria para personas y empresas',
  'Base de atencion en San Felipe y alrededores',
];

export default function HomeHero({
  heroImageUrl,
  leaderName,
  areaCount,
  eyebrow = 'Estudio juridico en San Felipe',
  title = 'Asesoria legal clara, seria y responsable para decisiones que requieren respaldo profesional.',
  description = 'Acompanamos a personas y empresas con una practica juridica rigurosa, cercana y enfocada en soluciones concretas. Cada asunto se aborda con estudio, orden y comunicacion clara desde el primer contacto.',
  panelTitle = 'Asesoria legal clara para decisiones que requieren respaldo profesional.',
}: {
  heroImageUrl: string;
  leaderName: string;
  areaCount: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  panelTitle?: string;
}) {
  return (
    <section className="section-shell pt-32 lg:pt-40">
      <div className="site-container">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] lg:gap-16">
          <div className="flex flex-col gap-8">
            <span className="eyebrow">{eyebrow}</span>
            <div className="flex flex-col gap-6">
              <h1 className="section-title text-balance">{title}</h1>
              <p className="section-copy max-w-2xl">{description}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <ContactDrawerButton
                className="w-full sm:w-auto"
                source="home_hero"
              >
                Solicitar orientacion
              </ContactDrawerButton>
              <Button asChild className="w-full sm:w-auto" variant="secondary">
                <a href="#areas">Ver areas de practica</a>
              </Button>
            </div>

            <div className="surface-card grid gap-4 p-6 sm:grid-cols-3">
              <div>
                <p className="legal-kicker">Direccion profesional</p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--color-text)]">
                  {leaderName}
                </p>
              </div>
              <div>
                <p className="legal-kicker">Areas activas</p>
                <p className="mt-2 text-lg font-semibold text-[color:var(--color-text)]">
                  {areaCount} especialidades principales
                </p>
              </div>
              <div>
                <p className="legal-kicker">Contacto</p>
                <a
                  className="mt-2 block text-lg font-semibold text-[color:var(--color-text)] transition-colors duration-200 hover:text-[color:var(--color-accent)]"
                  href={siteConfig.phoneHref}
                  onClick={() => trackPhoneClick('home_hero_phone')}
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>

            <ul className="grid gap-3 text-sm text-[color:var(--color-text-soft)] md:grid-cols-3">
              {trustBullets.map((item) => (
                <li
                  className="flex items-start gap-3 rounded-md border border-[color:rgba(31,39,51,0.08)] bg-[color:rgba(255,255,255,0.55)] px-4 py-3"
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
              <div className="relative aspect-[4/5] max-h-[92svh] min-h-[420px] sm:aspect-[5/4] md:aspect-[16/10] md:max-h-svh lg:aspect-[4/5] lg:max-h-none">
                <Image
                  alt="Reunion de asesoria legal del estudio"
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 42vw"
                  src={heroImageUrl}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,42,56,0.58),rgba(30,42,56,0.06))]" />
                <div className="absolute inset-x-6 bottom-6 rounded-lg border border-white/20 bg-[rgba(255,255,255,0.88)] p-6 backdrop-blur-sm">
                  <p className="legal-kicker">Confianza institucional</p>
                  <p className="mt-3 text-2xl font-semibold text-[color:var(--color-primary)]">
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
