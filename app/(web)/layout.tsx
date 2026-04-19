import '../globals.css';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { fonts } from '@/components/global/fonts';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Suspense } from 'react';
import { Spinner } from '@/components/global/Spinner';
import Providers from '@/context/Providers';
import { getPagesNavFetch } from '@/sanity/lib/fetchs/page.fetch';
import { getUnitBusinessListFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';
import { Metadata } from 'next';
import { resolveOpenGraphImage } from '@/sanity/lib/image-utils';
import dynamic from 'next/dynamic';

const FormMount = dynamic(() => import('@/components/global/Form/FormMount'), {
  ssr: false,
});
const WhatsappSticky = dynamic(
  () => import('@/components/global/WhatsappSticky'),
  {
    ssr: false,
  }
);
const isGtmEnabled =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_ENABLE_GTM === 'true' &&
  Boolean(process.env.NEXT_PUBLIC_GTM_ID);
const isSpeedInsightsEnabled =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS === 'true';

type LayoutData = {
  pages: Awaited<ReturnType<typeof getPagesNavFetch>>;
  unitBusinessList: Awaited<ReturnType<typeof getUnitBusinessListFetch>>;
  settings: Awaited<ReturnType<typeof getSettingsFetch>>;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  const { settings } = data;
  return {
    metadataBase: new URL(
      `https://${
        process.env.NODE_ENV == 'development'
          ? 'localhost:3000'
          : settings?.metaBaseWebsite
      }`
    ), // URL base
    title: {
      template: '%s ' + settings?.templateTitle,
      default: settings?.templateTitle || '',
    },
    generator: 'Next.js',
    keywords: [
      'abogados San Felipe',
      'bufete de abogados San Felipe',
      'asesoría legal San Felipe',
      'servicios jurídicos San Felipe',
      'consulta legal San Felipe',
      'abogados de familia San Felipe',
      'derecho inmobiliario San Felipe',
      'contratos de arrendamiento San Felipe',
      'compraventa de inmuebles San Felipe',
      'herencias y testamentos San Felipe',
    ],
    description: settings?.description,
    publisher: 'Vercel',
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
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

// Async function to fetch data
async function getData(): Promise<LayoutData> {
  try {
    const [pages, unitBusinessList, settings] = await Promise.all([
      getPagesNavFetch(),
      getUnitBusinessListFetch(),
      getSettingsFetch(),
    ]);
    if (!pages) throw new Error('Failed to fetch pages');
    if (!unitBusinessList) throw new Error('Failed to fetch unit business');
    if (!settings) throw new Error('Failed to fetch settings');
    return { pages, unitBusinessList, settings };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw new Error('Failed to fetch necessary data for the application');
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { pages, unitBusinessList, settings } = await getData();
    if (!pages || !unitBusinessList || !settings) {
      throw new Error('Essential data is missing');
    }

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

    return (
      <html
        lang="es"
        className={`${Object.values(fonts)
          .map((font) => font.variable)
          .join(' ')} scroll-smooth`}
      >
        <head />
        <body className="min-h-screen min-w-[320px] bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
          {isGtmEnabled && (
            <>
              {GoogleTagManager && (
                <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
              )}
              {GTMGlobals && <GTMGlobals />}
            </>
          )}
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
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
            </Suspense>
          </ErrorBoundary>
        </body>
      </html>
    );
  } catch (error) {
    console.error('Error in RootLayout:', error);
    return (
      <html lang="es">
        <body>
          <div className="error-message">
            An error occurred while loading the application. Please try again
            later.
          </div>
        </body>
      </html>
    );
  }
}
