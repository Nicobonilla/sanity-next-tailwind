'use server';

import { Metadata } from 'next';
import { LegalService, WithContext } from 'schema-dts';

import FAQSection from '@/components/legal-home/FAQSection';
import FinalCTA from '@/components/legal-home/FinalCTA';
import FirmIntro from '@/components/legal-home/FirmIntro';
import HomeHero from '@/components/legal-home/HomeHero';
import LeadershipPreview from '@/components/legal-home/LeadershipPreview';
import PracticeAreas from '@/components/legal-home/PracticeAreas';
import ProcessSteps from '@/components/legal-home/ProcessSteps';
import TrustStrip from '@/components/legal-home/TrustStrip';
import { buildLegalHomeContent } from '@/lib/legal-home-content';
import { buildSeoMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import {
  GetUnitBusinessListQueryResult,
} from '@/sanity.types';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import { getUnitBusinessListFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';

export async function generateMetadata(): Promise<Metadata> {
  const { home, settings } = await getData();

  return buildSeoMetadata({
    title:
      home?.seo?.metaTitle ||
      'Estudio juridico en San Felipe | Asesoria legal y judicial',
    description:
      home?.seo?.metaDescription ||
      home?.resumen ||
      'Asesoria legal clara, seria y responsable en San Felipe y la Region de Valparaiso.',
    path: '/',
    seo: home?.seo,
    settings,
    fallbackImage: home?.components?.[0]?.imageBackground,
    type: 'website',
  });
}

async function getData() {
  const [settings, areas, home] = await Promise.all([
    getSettingsFetch(),
    getUnitBusinessListFetch(),
    getPageBySlugFetch('inicio'),
  ]);

  return {
    settings,
    areas: areas || [],
    home,
  };
}

export default async function Page() {
  const { settings, areas, home } = await getData();
  const practiceAreas = (areas || []) as GetUnitBusinessListQueryResult;
  const homeContent = buildLegalHomeContent({
    areas: practiceAreas,
    home,
    settings,
  });

  const jsonLd: WithContext<LegalService> = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: siteConfig.firmName,
    description:
      'Asesoria legal y judicial para personas y empresas en San Felipe, con un enfoque claro, sobrio y profesional.',
    areaServed: `${siteConfig.city}, ${siteConfig.region}, Chile`,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    url: 'https://www.abogadossanfelipe.cl',
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: 'CL',
    },
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />

      <HomeHero
        areaCount={homeContent.hero.areaCount}
        description={homeContent.hero.description}
        eyebrow={homeContent.hero.eyebrow}
        heroImageUrl={homeContent.hero.heroImageUrl}
        leaderName={homeContent.hero.leaderName}
        panelTitle={homeContent.hero.panelTitle}
        title={homeContent.hero.title}
      />
      <TrustStrip items={homeContent.trustStrip.items} />
      <FirmIntro
        cards={homeContent.firmIntro.cards}
        description={homeContent.firmIntro.description}
        eyebrow={homeContent.firmIntro.eyebrow}
        paragraphs={homeContent.firmIntro.paragraphs}
        title={homeContent.firmIntro.title}
      />
      <PracticeAreas
        areas={practiceAreas}
        description={homeContent.practiceAreas.description}
        eyebrow={homeContent.practiceAreas.eyebrow}
        title={homeContent.practiceAreas.title}
      />
      <LeadershipPreview
        bullets={homeContent.leadership.bullets}
        description={homeContent.leadership.description}
        eyebrow={homeContent.leadership.eyebrow}
        leaderName={homeContent.leadership.leaderName}
        title={homeContent.leadership.title}
      />
      <ProcessSteps
        description={homeContent.processSteps.description}
        eyebrow={homeContent.processSteps.eyebrow}
        steps={homeContent.processSteps.steps}
        title={homeContent.processSteps.title}
      />
      <FAQSection
        description={homeContent.faq.description}
        eyebrow={homeContent.faq.eyebrow}
        items={homeContent.faq.items}
        title={homeContent.faq.title}
      />
      <FinalCTA
        description={homeContent.finalCta.description}
        eyebrow={homeContent.finalCta.eyebrow}
        primaryLabel={homeContent.finalCta.primaryLabel}
        secondaryLabel={homeContent.finalCta.secondaryLabel}
        title={homeContent.finalCta.title}
      />
    </>
  );
}
