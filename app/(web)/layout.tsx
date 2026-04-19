import '../globals.css';

import { Metadata } from 'next';

import ErrorBoundary from '@/components/ErrorBoundary';
import Footer from '@/components/global/Footer';
import FormMount from '@/components/global/Form/FormMount';
import { fonts } from '@/components/global/fonts';
import Navbar from '@/components/global/Navbar';
import WhatsappSticky from '@/components/global/WhatsappSticky';
import Providers from '@/context/Providers';
import { buildMetadataBase, isProductionIndexableEnvironment } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import {
  buildLocalBusinessJsonLd,
  buildOrganizationJsonLd,
} from '@/lib/structured-data';
import { resolveOpenGraphImage } from '@/sanity/lib/image-utils';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { getPagesNavFetch } from '@/sanity/lib/fetchs/page.fetch';
import { getUnitBusinessListFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';

const isGtmEnabled =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_ENABLE_GTM === 'true' &&
  Boolean(process.env.NEXT_PUBLIC_GTM_ID);

const isSpeedInsightsEnabled =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS === 'true';

type LayoutData = {
  pages: NonNullable<Awaited<ReturnType<typeof getPagesNavFetch>>>;
  unitBusinessList: NonNullable<
    Awaited<ReturnType<typeof getUnitBusinessListFetch>>
  >;
  settings: NonNullable<Awaited<ReturnType<typeof getSettingsFetch>>>;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  const { settings } = data;
  const indexable = isProductionIndexableEnvironment();

  return {
    metadataBase: buildMetadataBase(
      process.env.NODE_ENV === 'development'
        ? 'localhost:3000'
        : settings?.metaBaseWebsite
    ),
    title: {
      template: `%s ${settings?.templateTitle || ''}`.trim(),
      default: settings?.templateTitle || '',
    },
    generator: 'Next.js',
    description: settings?.description,
    publisher: siteConfig.firmName,
    robots: {
      index: indexable,
      follow: indexable,
      nocache: false,
      googleBot: {
        index: indexable,
        follow: indexable,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/icon',
      apple: '/apple-icon',
      other: [
        { rel: 'icon', url: '/icon-192', sizes: '192x192' },
        { rel: 'icon', url: '/icon-512', sizes: '512x512' },
      ],
    },
    openGraph: {
      title: settings?.title || '',
      images: resolveOpenGraphImage(settings?.ogImage),
      type: 'website',
    },
  };
}

async function getData(): Promise<LayoutData> {
  const [pages, unitBusinessList, settings] = await Promise.all([
    getPagesNavFetch(),
    getUnitBusinessListFetch(),
    getSettingsFetch(),
  ]);

  if (!pages) throw new Error('Failed to fetch pages');
  if (!unitBusinessList) throw new Error('Failed to fetch unit business');
  if (!settings) throw new Error('Failed to fetch settings');

  return { pages, unitBusinessList, settings };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pages, unitBusinessList, settings } = await getData();
  const metadataBase = buildMetadataBase(
    process.env.NODE_ENV === 'development'
      ? 'localhost:3000'
      : settings?.metaBaseWebsite
  );
  const GoogleTagManager =
    isGtmEnabled
      ? (await import('@next/third-parties/google')).GoogleTagManager
      : null;
  const GTMGlobals = isGtmEnabled
    ? (await import('@/components/lib/GTMGlobals')).default
    : null;
  const SpeedInsights =
    isSpeedInsightsEnabled
      ? (await import('@vercel/speed-insights/next')).SpeedInsights
      : null;

  const siteUrl = metadataBase.toString().replace(/\/$/, '');
  const organizationJsonLd = buildOrganizationJsonLd({
    addressLine: siteConfig.addressLine,
    city: siteConfig.city,
    description: settings?.description || siteConfig.descriptor,
    email: siteConfig.email,
    firmName: settings?.title || siteConfig.firmName,
    phoneDisplay: siteConfig.phoneDisplay,
    region: siteConfig.region,
    url: siteUrl,
  });
  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    addressLine: siteConfig.addressLine,
    city: siteConfig.city,
    description: settings?.description || siteConfig.descriptor,
    email: siteConfig.email,
    firmName: settings?.title || siteConfig.firmName,
    phoneDisplay: siteConfig.phoneDisplay,
    region: siteConfig.region,
    url: siteUrl,
  });

  return (
    <html
      lang="es"
      className={`${Object.values(fonts)
        .map((font) => font.variable)
        .join(' ')} scroll-smooth`}
    >
      <head />
      <body className="min-h-screen min-w-[320px] bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
          type="application/ld+json"
        />
        {isGtmEnabled && (
          <>
            {GoogleTagManager && (
              <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
            )}
            {GTMGlobals && <GTMGlobals />}
          </>
        )}
        <ErrorBoundary>
          <Providers withDarkMode={false}>
            <Navbar
              pages={pages}
              unitBusinessList={unitBusinessList}
              logo={settings?.logo}
              slogan={settings?.slogan}
            />
            <main className="flex min-h-screen flex-col">
              {children}
              {SpeedInsights && <SpeedInsights />}
              <FormMount
                unitBusinessList={unitBusinessList}
                settings={settings}
              />
              <WhatsappSticky />
            </main>
            <Footer
              logo={settings?.logo}
              pages={pages}
              slogan={settings?.slogan}
            />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
