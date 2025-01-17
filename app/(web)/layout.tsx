import '../globals.css';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import {
  getComponentListFetch,
  getPagesNavFetch,
  getServicesNavFetch,
  getSettingsFetch,
} from '@/sanity/lib/fetch';
import { formatPages } from '@/components/pages/services/format';
import DarkModeScript from '@/components/global/Navbar/ThemeToggle/DarkModeScript';
import { GoogleTagManager } from '@next/third-parties/google';
import GTMGlobals from '@/components/lib/GTMGlobals';
import {
  SanityContextProvider,
  type SanityContextType,
} from '@/context/SanityContext';
import { SanityLive } from '@/sanity/lib/live';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { fonts } from '@/components/global/fonts';
import type { Links } from '@/types';
import DisableDraftMode from '@/components/global/DisableDraftMode';
import { ThemeProvider } from '@/context/ThemeContext';
import ErrorBoundary from '@/components/ErrorBoundary';
// Async function to fetch data
async function getData() {
  try {
    const [pages, servicesList, componentList, settings] = await Promise.all([
      getPagesNavFetch(),
      getServicesNavFetch(),
      getComponentListFetch(),
      getSettingsFetch(),
    ]);

    return { pages, servicesList, componentList, settings };
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
    // Fetching data for the layout (pages, services, and components)
    const { pages, servicesList, componentList, settings } = await getData();
    // Error handling if no data is returned
    if (!pages || !servicesList || !componentList || !settings) {
      throw new Error('Essential data is missing');
    }

    // Prepare the initial data for context
    const initialData: SanityContextType = {
      componentsMap: componentList,
      pagesLink: formatPages(pages, servicesList) as Links[],
    };

    // Check if draft mode is enabled (for content editing features)
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
            <SanityContextProvider
              initialData={initialData as SanityContextType}
            >
              <ThemeProvider withDarkMode={settings.withDarkTheme || false}>
                <Navbar />
                <main className="grow flex-col">
                  {children}
                  <SanityLive />
                  {isEnabled && (
                    <>
                      <DisableDraftMode />
                      <VisualEditing />
                    </>
                  )}
                </main>
                <Footer />
              </ThemeProvider>
            </SanityContextProvider>
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
