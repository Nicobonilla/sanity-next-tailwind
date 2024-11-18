import '../globals.css';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import {
  getComponentListFetch,
  getPagesNavFetch,
  getServicesNavFetch,
} from '@/sanity/lib/fetch';
import { formatPages } from '@/components/pages/services/format';
import DarkModeScript from '@/components/global/Navbar/ThemeToggle/DarkModeScript';
import { GoogleTagManager } from '@next/third-parties/google';
import GTMGlobals from '@/components/lib/GTMGlobals';
import { AppContextProvider, AppContextType } from '@/context/AppContext';
import { ScrollContextProvider } from '@/context/ScrollContext';
import { SanityLive } from '@/sanity/lib/live';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import { transformToDict } from '@/components/utils';
import { fonts } from '@/components/global/fonts';
import type { Links } from '@/types';
import {
  GetComponentListQueryResult,
  GetPagesNavQueryResult,
  GetServicesNavQueryResult,
} from '@/sanity.types';

// Async function to fetch data
async function getData() {
  try {
    const pages: GetPagesNavQueryResult | null = await getPagesNavFetch();
    const servicesList: GetServicesNavQueryResult | null = await getServicesNavFetch();
    const componentList: GetComponentListQueryResult | null = await getComponentListFetch();

    // Ensure we always return an object with null checks
    return {
      pages,
      servicesList,
      componentList,
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return {
      pages: null,
      servicesList: null,
      componentList: null,
    };
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetching data for the layout (pages, services, and components)
  const { pages, servicesList, componentList } = await getData();

  // Error handling if no data is returned
  if (!pages || !servicesList) {
    return (
      <div className="error-message">
        {!pages && 'Lista de páginas no encontrada'}
        {!servicesList && 'Lista de servicios no encontrada'}
      </div>
    );
  }

  // Prepare the initial data for context
  const initialData = {
    componentsMap: transformToDict(componentList) as AppContextType['componentsMap'],
    pagesLink: formatPages(pages, servicesList) as Links[],
  };

  // Check if draft mode is enabled (for content editing features)
  const isDraftMode = await draftMode();

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
        <AppContextProvider initialData={initialData}>
          <Navbar />
          <main className="grow flex-col">
            {children}
            <SanityLive />
            {isDraftMode.isEnabled && <VisualEditing />}
          </main>
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}
