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
import { resolveSiteIdentity } from '@/lib/site-identity';
import { buildOrganizationJsonLd } from '@/lib/structured-data';
import {
  GetHomePageQueryResult,
  GetUnitBusinessListQueryResult,
} from '@/sanity.types';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getHomePageFetch } from '@/sanity/lib/fetchs/homePage.fetch';
import { getUnitBusinessListFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';

export async function generateMetadata(): Promise<Metadata> {
  const { homePage, settings } = await getData();

  return buildSeoMetadata({
    title:
      homePage?.seo?.metaTitle ||
      'Estudio juridico en San Felipe | Asesoria legal y judicial',
    description:
      homePage?.seo?.metaDescription ||
      'Asesoria legal clara, seria y responsable en San Felipe y la Region de Valparaiso.',
    path: '/',
    seo: homePage?.seo,
    settings,
    fallbackImage: homePage?.hero?.heroImage || null,
    type: 'website',
  });
}

async function getData() {
  const [settings, areas, homePage] = await Promise.all([
    getSettingsFetch(),
    getUnitBusinessListFetch(),
    getHomePageFetch(),
  ]);

  return {
    settings,
    areas: areas || [],
    homePage,
  };
}

export default async function Page() {
  const { settings, areas, homePage } = await getData();
  const practiceAreas = (areas || []) as GetUnitBusinessListQueryResult;
  const siteIdentity = resolveSiteIdentity(settings);
  const homeContent = buildLegalHomeContent({
    areas: practiceAreas,
    homePage: homePage as GetHomePageQueryResult | null,
    siteIdentity,
  });

  const jsonLd: WithContext<LegalService> = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: siteIdentity.firmName,
    description:
      'Asesoria legal y judicial para personas y empresas en San Felipe, con un enfoque claro, sobrio y profesional.',
    areaServed: `${siteIdentity.city}, ${siteIdentity.region}, Chile`,
    telephone: siteIdentity.phoneDisplay,
    email: siteIdentity.email,
    url: 'https://www.abogadossanfelipe.cl',
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteIdentity.city,
      addressRegion: siteIdentity.region,
      addressCountry: 'CL',
    },
  };
  const organizationJsonLd = buildOrganizationJsonLd({
    addressLine: siteIdentity.addressLine,
    city: siteIdentity.city,
    description: homePage?.seo?.metaDescription || siteIdentity.descriptor,
    email: siteIdentity.email,
    firmName: siteIdentity.firmName,
    phoneDisplay: siteIdentity.phoneDisplay,
    region: siteIdentity.region,
    url: 'https://www.abogadossanfelipe.cl',
  });

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        type="application/ld+json"
      />

      <HomeHero
        areaCount={homeContent.hero.areaCount}
        areasLabel={homeContent.hero.areasLabel}
        areasSuffix={homeContent.hero.areasSuffix}
        contactLabel={homeContent.hero.contactLabel}
        description={homeContent.hero.description}
        eyebrow={homeContent.hero.eyebrow}
        heroImageUrl={homeContent.hero.heroImageUrl}
        leaderLabel={homeContent.hero.leaderLabel}
        leaderName={homeContent.hero.leaderName}
        panelTitle={homeContent.hero.panelTitle}
        primaryLabel={homeContent.hero.primaryLabel}
        secondaryLabel={homeContent.hero.secondaryLabel}
        siteIdentity={siteIdentity}
        title={homeContent.hero.title}
        trustBullets={homeContent.hero.trustBullets}
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
        detailLabel={homeContent.practiceAreas.detailLabel}
        eyebrow={homeContent.practiceAreas.eyebrow}
        servicesLabel={homeContent.practiceAreas.servicesLabel}
        title={homeContent.practiceAreas.title}
      />
      <LeadershipPreview
        bullets={homeContent.leadership.bullets}
        description={homeContent.leadership.description}
        eyebrow={homeContent.leadership.eyebrow}
        leaderCardLabel={homeContent.leadership.leaderCardLabel}
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
        siteIdentity={siteIdentity}
        title={homeContent.finalCta.title}
      />
    </>
  );
}
