import '../globals.css';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import { getSettingsFetch } from '@/sanity/lib/fetch';
import { formatPages } from '@/components/pages/services/format';
import DarkModeScript from '@/components/global/Navbar/ThemeToggle/DarkModeScript';
import { GoogleTagManager } from '@next/third-parties/google';
import GTMGlobals from '@/components/lib/GTMGlobals';
import { type SanityContextType } from '@/context/SanityContext';
import { SanityLive } from '@/sanity/lib/live';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { fonts } from '@/components/global/fonts';
import type { Links } from '@/types';
import DisableDraftMode from '@/components/global/DisableDraftMode';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Suspense } from 'react';
import { Spinner } from '@/components/global/Spinner';
import Providers from '@/context/Providers';
import { getPagesNavFetch } from '@/sanity/lib/fetchs/page.fetch';
import { getServicesNavFetch } from '@/sanity/lib/fetchs/service.fetch';
import { getComponentListFetch } from '@/sanity/lib/fetchs/component.fetch';
import { getUnitBusinessListFetch } from '@/sanity/lib/fetchs/unitBusiness.fetch';
import WhatsappSticky from '@/components/global/WhatsappSticky';
import Form from '@/components/global/Form';

// Async function to fetch data
async function getData() {
  try {
    const [pages, servicesList, componentsMap, unitBusinessList, settings] =
      await Promise.all([
        getPagesNavFetch(),
        getServicesNavFetch(),
        getComponentListFetch(),
        getUnitBusinessListFetch(),
        getSettingsFetch(),
      ]);

    return { pages, servicesList, componentsMap, unitBusinessList, settings };
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
    const { pages, servicesList, componentsMap, unitBusinessList, settings } =
      await getData();
    if (
      !pages ||
      !servicesList ||
      !componentsMap ||
      !unitBusinessList ||
      !settings
    ) {
      throw new Error('Essential data is missing');
    }

    const initialData: SanityContextType = {
      componentsMap,
      pages,
      unitBusinessList,
    };

    const { isEnabled } = draftMode();

    return (
      <html
        lang="es"
        className={`${Object.values(fonts)
          .map((font) => font.variable)
          .join(' ')} scroll-smooth`}
      >
        <head>
          <DarkModeScript />
        </head>
        {/* Uncomment for Google Tag Manager if needed */}
        {/* <GTMGlobals />
        <GoogleTagManager gtmId={process.env.GTM || ''} /> */}
        <body className="flex min-h-screen min-w-[320px] flex-col">
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Providers
                initialData={initialData}
                withDarkMode={settings.withDarkTheme || false}
              >
                <Navbar />
                <main className="grow flex-col">
                  {children}
                  <Form />

                  <WhatsappSticky />
                  <SanityLive />
                  {isEnabled && (
                    <>
                      <DisableDraftMode />
                      <VisualEditing />
                    </>
                  )}
                </main>
                <Footer />
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
