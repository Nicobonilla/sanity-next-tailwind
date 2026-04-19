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
import { siteConfig } from '@/lib/site-config';
import {
  GetPageDetailQueryResult,
  GetUnitBusinessListQueryResult,
} from '@/sanity.types';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPageBySlugFetch } from '@/sanity/lib/fetchs/page.fetch';
import { getUnitBusinessListFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';
import { urlForImage } from '@/sanity/lib/image-utils';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Estudio juridico en San Felipe | Asesoria legal y judicial',
    description:
      'Sitio corporativo del estudio juridico Sebastian Bonilla Marin. Asesoria legal clara, seria y responsable en San Felipe y la Region de Valparaiso.',
  };
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

function resolveHeroImage(home: GetPageDetailQueryResult | null) {
  const heroComponent = home?.components?.find((component) => {
    const type = component.typeComponentValue?.toLowerCase();
    return type === 'carousel' && component.variant === 'hero';
  });

  const heroImage =
    heroComponent?.items?.find((item) => item?.image)?.image ||
    heroComponent?.imageBackground;

  return (
    urlForImage(heroImage)?.width(960).height(1120).fit('crop').quality(72).url() ||
    '/meeting.jpeg'
  );
}

function resolveLeaderName(settingsTitle?: string | null) {
  return settingsTitle || siteConfig.shortName;
}

export default async function Page() {
  const { settings, areas, home } = await getData();
  const heroImageUrl = resolveHeroImage(home);
  const leaderName = resolveLeaderName(settings?.title);
  const practiceAreas = (areas || []) as GetUnitBusinessListQueryResult;

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
        areaCount={practiceAreas.length}
        heroImageUrl={heroImageUrl}
        leaderName={leaderName}
      />
      <TrustStrip />
      <FirmIntro />
      <PracticeAreas areas={practiceAreas} />
      <LeadershipPreview leaderName={leaderName} />
      <ProcessSteps />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
